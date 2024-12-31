import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import UserService from 'Services/users';
import RoleService from 'Services/roles';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { getReferralTypeLabel } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);
    const [motivations, setMotivations] = useState([]);
    const [motivation, setMotivation] = useState(null);
    const [groupMember, setGroupMember] = useState(null);

    useEffect(() => {
        getPosts();
        getGroupMember();
    }, []);

    useEffect(() => {
        setMotivations([]);
        if(post) {
            getPostMotivations(post.id);
        }
    }, [post]);

    useEffect(() => {
        if(posts.length > 0 && groupMember != null) {
            setPost(posts.find(p => p.id === groupMember.groupPostMotivation.groupPost.id));
        }
    }, [posts, groupMember]);

    const getGroupMember = () => {
        props.setRequestGlobalAction(true),
        GroupService.findGroupMemberByReference(props.match.params.id)
            .then(response => {
                setGroupMember(response);
            })
            .catch(err => {
                console.log(err);
                props.history.goBack();
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    const getPosts = () => {
        props.setRequestGlobalAction(true),
        GroupService.getGroupPosts(props.authUser.referralId)
        .then(response => setPosts(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getPostMotivations = (id) => {
        props.setRequestGlobalAction(true);
        GroupService.getGroupPostMotivations(id)
        .then(response => {
            setMotivations(response);
            if(groupMember != null) {
                setMotivation(response.find(m => m.id === groupMember.groupPostMotivation.id));
            }
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(!groupMember || !motivation) {
            return;
        }

        let data: any = {
            post_motivation_id: motivation.id,
        }
            
        props.setRequestGlobalAction(true);
        GroupService.updateMemberGroup(props.match.params.id, data).then(() => {
            NotificationManager.success("Le membre a été édité avec succès");
            props.history.push(GROUP.ADMINISTRATION.MEMBER.LIST);
        }).catch((err) => {
            NotificationManager.error("Une erreur est survenue");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Edition de membre"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Poste du membre
                        </InputLabel>
                        <Autocomplete
                            options={posts}
                            id="combo-box-demo"
                            value={post}
                            onChange={(__, item) => {
                                setPost(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Motivation du membre
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={motivations}
                            value={motivation}
                            onChange={(__, item) => {
                                setMotivation(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Update));
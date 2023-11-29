import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { structureMissionTypes } from 'Helpers/datas';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    const [label, setLabel] = useState('');
    const [posts, setPosts] = useState([]);
    const [mission, setMission] = useState(null);
    const [description, setDescription] = useState('');    
    const [selectedPosts, setSelectedPosts] = useState([]);

    useEffect(() => {
        getPosts();
        findStructure();
    }, []);

    const getPosts = () => {
        props.setRequestGlobalAction(true),
        GroupService.getPostTypes()
        .then(response => setPosts(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const findStructure = () => {
        props.setRequestGlobalAction(true),
        GroupService.findStructureType(props.match.params.id)
        .then(response => {
            setLabel(response.label);
            setDescription(response.description);
            setSelectedPosts(response.postTypes);
            setMission(structureMissionTypes().find(m => m.value == response.mission));
        }).finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!label || !description || selectedPosts.length <= 0 || !mission) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data: any = {
            label: label,
            mission: mission.value,
            description: description,
            post_type_references: selectedPosts.map(p => p.reference),
        }
        
        props.setRequestGlobalAction(true);
        GroupService.updateStructureType(props.match.params.id, data).then(() => {
            NotificationManager.success("L'item a été créé avec succès");
            props.history.push(GROUP.STRUCTURE.ORGANE_TYPE.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'item");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <RctCollapsibleCard>
            <Form onSubmit={onSubmit}>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="label">
                        Label
                    </InputLabel>
                    <InputStrap
                        required
                        id="label"
                        type="text"
                        name='label'
                        className="input-lg"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="label">
                        Description
                    </InputLabel>
                    <InputStrap
                        required
                        id="label"
                        type="text"
                        name='label'
                        className="input-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormGroup>

                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Types de postes
                    </InputLabel>
                    <Autocomplete
                        multiple
                        value={selectedPosts}
                        id="combo-box-demo"
                        options={posts}
                        onChange={(__, items) => {
                            setSelectedPosts(items);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>

                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Mission
                    </InputLabel>
                    <Autocomplete
                        value={mission}
                        id="combo-box-demo"
                        onChange={(__, item) => {
                            setMission(item);
                        }}
                        options={structureMissionTypes()}
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
                        Enregistrer
                    </Button>
                </FormGroup>
            </Form>
        </RctCollapsibleCard>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));
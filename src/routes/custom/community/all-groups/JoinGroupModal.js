import {FormGroup} from 'reactstrap';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { AbilityContext } from "Permissions/Can";
import CancelIcon from '@material-ui/icons/Cancel';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import { NotificationManager } from "react-notifications";
import { COMMUNITY, joinUrlWithParamsId } from 'Url/frontendUrl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import { getGroupPosts, getMotivations, sendRequestInvitation, setRequestGlobalAction } from "Actions";

class JoinGroupModal extends Component {
    static contextType = AbilityContext;

    state = {
        loading: true,
        communities: [],
        group: null,
        posts: [],
        post: null,
        motivations: [],
        motivation: null
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getPosts(this.props.community.id);
    }

    getPosts = (id) => {
        this.props.setRequestGlobalAction(true);
        getGroupPosts(id)
            .then(data => {
                this.setState({ posts: data });
            }).finally(() => {
                this.props.setRequestGlobalAction(false);
            });
    };

    getPostMotivations = (post) => {
        this.setState({ post: post });
        this.props.setRequestGlobalAction(true);
        getMotivations(post.id)
            .then(data => {
                this.setState({ motivations: data });
            }).finally(() => {
                this.props.setRequestGlobalAction(false);
            });
    };

    onAskingClick = (group) => {
        this.props.setRequestGlobalAction(true);
        let data = { motivation_id: this.state.motivation };
        sendRequestInvitation(group.id, this.props.authUser.user.id, data)
            .then(() => {
                NotificationManager.success("Votre demande pour le groupe " + group.label + " a été envoyé");
            })
            .catch(() => null)
            .finally(() => {
                this.props.setRequestGlobalAction(false);
                this.props.onClose();
            });
    };

    onJoinClick = (id) => {
        this.props.history.push(joinUrlWithParamsId(COMMUNITY.MEMBERS.LIST, id));
    };

    render() {

        const { show, community, onClose } = this.props;

        return (
            <Dialog
                open={show}
                onClose={() => onClose() }
                aria-labelledby="responsive-dialog-title"
                maxWidth={'sm'}
                fullWidth
            >
                <DialogTitle id="form-dialog-title">
                    <div className="row justify-content-between align-items-center">
                        Demander l'adhésion à {community ? community.label : ''}
                        <IconButton
                            color="primary"
                            aria-label="close"
                            className="text-danger"
                            onClick={() => onClose()}>
                            <CancelIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="row align-items-center" style={{ marginTop: '5%' }}>
                        <FormGroup className="col-sm-12 has-wrapper">
                            <CustomAsyncComponent
                                loading={false}
                                data={this.state.posts}
                                component={data => (
                                    <div className="form-group text-left">
                                        {data.length === 0 ? (
                                            <></>
                                        ) : (
                                            <FormControl fullWidth>
                                                <InputLabel className="text-left" htmlFor="currency-helper">
                                                    Catégorie d'utilisateur
                                                </InputLabel>
                                                <Select onChange={e => this.getPostMotivations(e.target.value)}>
                                                    {data.map(item => (
                                                        <MenuItem key={item.id} value={item} className="center-hor-ver">
                                                            {item.title}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                    </div>
                                )}
                            />
                        </FormGroup>

                        {this.state.post ?
                            <div style={{ display: "flex", flexDirection: 'column', width: '100%' }}>
                                <p style={{ fontWeight: 'bold' }}>
                                    Description de la catégorie:
                                </p>
                                <p className="mt-10 mb-20">
                                    {this.state.post.description}
                                </p>
                                <FormGroup className="col-sm-12 has-wrapper">
                                    <CustomAsyncComponent
                                        loading={false}
                                        data={this.state.motivations}
                                        component={data => (
                                            <div className="form-group text-left">
                                                <FormControl fullWidth>
                                                    <InputLabel className="text-left" htmlFor="currency-helper">
                                                        Selectionner votre motivation
                                                    </InputLabel>
                                                    <Select onChange={e => this.setState({ motivation: e.target.value })}>
                                                        {data.map(item => (
                                                            <MenuItem key={item.id} value={item.id} className="center-hor-ver">
                                                                {item.title}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        )}
                                    />
                                </FormGroup>
                            </div>
                            : null}
                        <div style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>

                            <Button
                                color="primary"
                                variant="contained"
                                className="text-white font-weight-bold bg-danger"
                                style={{ marginRight: 10 }}
                                onClick={() => this.setState({ showAskingBox: false, group: null, posts: [], post: null, motivations: [], motivation: null })}
                            >
                                Annuler
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                className="text-white font-weight-bold"
                                onClick={() => this.onAskingClick(community)}
                            >
                                Demander l'adhésion
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(JoinGroupModal)));

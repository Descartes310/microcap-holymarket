import React, { Fragment } from 'react'

import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { sendInvitationCommunityMember } from "Actions/independentActions";
import { NotificationManager } from "react-notifications";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

import { setRequestGlobalAction } from 'Actions';


import ChangeRoleProjectDialog from './ChangeRoleProjectDialog'

import {
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Col,
    FormFeedback
} from 'reactstrap';



const TabContainer = ({ children }) => {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

class InvitationCreateDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            userOrProject: "user",
            userIdentifier: "",
            email: "",
            tel: "",
            currentDialogNotOpened: false,
            showNextDialog: false
        }
    }

    handleChangeRadio = (e, key) => {
        console.log(e.target.value);
        this.setState({ [key]: e.target.value });
    };

    handleChangeInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleTabChange(e, value) {
        this.setState({ activeIndex: value }, () => {
            if (this.state.activeIndex == 0) {
                this.state.email = '';
                this.state.tel = '';
            }

            if (this.state.activeIndex == 1) {
                this.state.userIdentifier = '';
            }
        });
    }

    handleCloseChangeRole = () => {
        const { handleClose } = this.props
        this.setState({
            showNextDialog: false, currentDialogNotOpened: false,
            userIdentifier: '', email: '', tel: ''
        }, () => {
            handleClose();
        });
    };

    handleSubmit = () => {
        const { handleClose } = this.props
        //handleClose();

        let data = {};

        if (this.state.activeIndex == 0) {
            data = {
                group_id: this.props.community ? this.props.community.id : this.props.currentCommunity.community.id,
                reference: this.state.userIdentifier,
                id: this.props.authUser.user.id
            };
        }

        if (this.state.activeIndex == 1) {
            data = {
                group_id: this.props.community ? this.props.community.id : this.props.currentCommunity.community.id,
                email: this.state.email,
                // number: this.state.tel,
                id: this.props.authUser.user.id
            };
        }
        
        this.props.setRequestGlobalAction(true);

        sendInvitationCommunityMember(data)
            .then((res) => {
                NotificationManager.success("Invitation envoyé avec succès");
                if (this.state.userOrProject === 'project')
                    this.setState({ currentDialogNotOpened: true, showNextDialog: true })
                else {
                    handleClose();
                }
            })
            .catch(() => {
                NotificationManager.error("L'invitation n'a pas pu être envoyé. Veuillez réessayer.");
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    }

    render() {
        const { open, handleClose } = this.props;
        return (
            <Fragment>
                <Dialog open={open && !this.state.currentDialogNotOpened} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Invitation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            L'invitation concerne
                    </DialogContentText>

                        <form onSubmit={this.handleSubmit}>
                            <FormGroup>

                                <FormControl component="fieldset" required>
                                    <RadioGroup row aria-label="userOrProject" name="userOrProject" value={this.state.userOrProject} onChange={(e) => this.handleChangeRadio(e, 'userOrProject')} >
                                        <FormControlLabel value="user" control={<Radio />} label="Un utilisateur" />
                                        <FormControlLabel value="project" control={<Radio />} label="L'accès à un projet" />
                                    </RadioGroup>
                                </FormControl>
                            </FormGroup>

                            <AppBar position="static" color="default">
                                <Tabs
                                    value={this.state.activeIndex}
                                    onChange={(e, value) => this.handleTabChange(e, value)}
                                    textColor="primary"
                                    indicatorColor="primary"
                                    variant="scrollable"
                                    scrollButtons="auto">
                                    <Tab label="Invitation membre" />
                                    <Tab label="Invitation anonyme" />
                                </Tabs>
                            </AppBar>
                            {this.state.activeIndex === 0 && <TabContainer>
                                <FormGroup>
                                    <Label for="Identifiant-3">Identifiant de l'utilisateur</Label>
                                    <Input type="text" name="userIdentifier" id="Identifiant-3" placeholder="Identifiant de l'utilisateur" onChange={this.handleChangeInput}
                                        value={this.state.userIdentifier} disabled={this.state.userOrProject === 'project'} />
                                </FormGroup>
                            </TabContainer>}
                            {this.state.activeIndex === 1 && <TabContainer>
                                <FormGroup>
                                    <Label for="Email-3">Mail</Label>
                                    <Input type="email" name="email" id="Email-3" placeholder="adresse mail" onChange={this.handleChangeInput}
                                        value={this.state.email} />
                                </FormGroup>
{/* 
                                <FormGroup>
                                    <Label for="Tel-3">Tel</Label>
                                    <Input type="number" name="tel" id="Tel-3" placeholder="Telephone" onChange={this.handleChangeInput}
                                        value={this.state.tel} />
                                </FormGroup> */}
                            </TabContainer>}

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleSubmit} className="btn-info text-white">
                            Valider
                        </Button>
                        <Button variant="contained" onClick={handleClose} className="btn-warning text-white">
                            Annuler
                        </Button>
                    </DialogActions>
                </Dialog>

            </Fragment>
        )
    }

}


// map state to props
const mapStateToProps = ({ requestGlobalAction, currentCommunity, communitySpace, userCommunitiesAdmin, authUser }) => {
    return {
        loading: requestGlobalAction,
        userCommunitiesAdmin,
        currentCommunity: currentCommunity.data,
        authUser: authUser.data,
        communitySpace: communitySpace
    };
};

export default withRouter(connect(mapStateToProps, {
    setRequestGlobalAction,

})(InvitationCreateDialog));
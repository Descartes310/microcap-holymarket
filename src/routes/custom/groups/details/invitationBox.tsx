import { connect } from "react-redux";
import Tab from '@material-ui/core/Tab';
import React, { Component } from 'react';
import UserService from "Services/users";
import Tabs from '@material-ui/core/Tabs';
import GroupService from "Services/groups";
import AppBar from '@material-ui/core/AppBar';
import { setRequestGlobalAction } from "Actions";
import SwipeableViews from "react-swipeable-views";
import TabContainer from "Components/TabContainer";
import { getReferralTypeLabel } from "Helpers/helpers";
import DialogComponent from "Components/DialogComponent";
import { NotificationManager } from "react-notifications";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap, Button } from 'reactstrap';

class InvitationBox extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            activeTab: 0,
            member: null,
            message: null,
            loading: false,
            reference: null,
        }
    }

    handleChange = (__, value) => {
        this.setState({ activeTab: value });
    };

    findUserByReference = () => {
        if (!this.state.reference)
            return;
        this.props.setRequestGlobalAction(true),
            UserService.findUserByReference(this.state.reference)
                .then(response => this.setState({ member: response }))
                .catch(err => {
                    this.setState({ member: null });
                    console.log(err);
                    NotificationManager.error("Reference incorrecte");
                })
                .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {
        const { reference, email, message } = this.state;
        if (!reference && !email)
            return;
        this.props.setRequestGlobalAction(true),
            GroupService.sendExternalGroupInvitation({ reference, email, message })
                .then(() => {
                    NotificationManager.success("L'invitation a été envoyée avec succès");
                    this.props.onClose();
                })
                .catch(err => {
                    this.setState({ member: null });
                    console.log(err);
                    NotificationManager.error("Reference incorrecte");
                })
                .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {
        const { member, reference, activeTab, email, message } = this.state;
        return (
            <DialogComponent
                title="Nouvelle invitation"
                onClose={this.props.onClose}
                show={this.props.show}
            >
                <>
                    <AppBar position="static" color="default">
                        <div className="d-flex align-items-center">
                            <div className="w-100">
                                <Tabs
                                    value={activeTab}
                                    onChange={this.handleChange}
                                    indicatorColor="primary"
                                    scrollButtons="off"
                                    variant="scrollable"
                                    centered
                                >
                                    <Tab label="Invitation interne" />
                                    <Tab label="Invitation externe" />
                                </Tabs>
                            </div>
                        </div>
                    </AppBar>
                    <SwipeableViews
                        index={activeTab}>
                        <div className="card mb-0 transaction-box">
                            <TabContainer>
                                <Form>
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="reference">
                                            Reference utilisateur
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="reference"
                                            type="text"
                                            name='reference'
                                            className="input-lg"
                                            value={reference}
                                            onChange={(e) => this.setState({ reference: e.target.value })}
                                        />
                                    </FormGroup>

                                    {member && (
                                        <>
                                            <FormGroup className="has-wrapper">
                                                <InputStrap
                                                    disabled
                                                    className="input-lg"
                                                    value={member.userName}
                                                />
                                            </FormGroup>
                                            <FormGroup className="has-wrapper">
                                                <InputStrap
                                                    disabled
                                                    className="input-lg"
                                                    value={member.email}
                                                />
                                            </FormGroup>
                                            <FormGroup className="has-wrapper">
                                                <InputStrap
                                                    disabled
                                                    className="input-lg"
                                                    value={getReferralTypeLabel(member.referralType)}
                                                />
                                            </FormGroup>
                                        </>
                                    )}

                                    <FormGroup>
                                        <Button
                                            variant="contained"
                                            disabled={!reference}
                                            onClick={this.findUserByReference}
                                            className="text-white font-weight-bold mr-20 bg-blue"
                                        >
                                            Vérifier l'utilisateur
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() => this.onSubmit()}
                                            className="text-white font-weight-bold"
                                        >
                                            Envoyer l'invitation
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </TabContainer>
                        </div>
                        <div className="card mb-0 transaction-box">
                            <TabContainer>
                                <Form>
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="email">
                                            Email de l'utilisateur à inviter
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="email"
                                            type="email"
                                            name='email'
                                            className="input-lg"
                                            value={email}
                                            onChange={(e) => this.setState({ email: e.target.value })}
                                        />
                                    </FormGroup>
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="message">
                                            Message associé
                                        </InputLabel>
                                        <InputStrap
                                            id="message"
                                            type="text"
                                            name='message'
                                            className="input-lg"
                                            value={message}
                                            onChange={(e) => this.setState({ message: e.target.value })}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() => this.onSubmit()}
                                            className="text-white font-weight-bold"
                                        >
                                            Envoyer l'invitation
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </TabContainer>
                        </div>
                    </SwipeableViews>
                </>
            </DialogComponent>
        );
    }
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(InvitationBox);

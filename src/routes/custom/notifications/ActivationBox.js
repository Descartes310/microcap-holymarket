import { connect } from "react-redux";
import Tab from '@material-ui/core/Tab';
import React, { Component } from 'react';
import UserService from "Services/users";
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import { setRequestGlobalAction } from "Actions";
import SwipeableViews from "react-swipeable-views";
import TabContainer from "Components/TabContainer";
import { FormGroup, Input, Button } from "reactstrap";
import DialogComponent from "Components/DialogComponent";
import { NotificationManager } from "react-notifications";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

class ActivationBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            loading: false,
            codeToVerify: '',
            hasAskCode: false,
            acceptCGU: false,
            numPages: 1,
            pageNumber: 1,
        }
    }

    handleChange = (__, value) => {
        this.setState({ activeTab: value });
    };

    onAskCode = () => {
        this.props.setRequestGlobalAction(true);
        this.setState({ loading: true });
        UserService.generateOTP()
            .then(() => {
                NotificationManager.success("Un code vous a été envoyé par email. Veuillez saisir ce code dans ce formulaire");
                this.setState({ activeTab: 1, hasAskCode: true });
            })
            .finally(() => {
                this.setState({ loading: false });
                this.props.setRequestGlobalAction(false);
            });
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages, pageNumber: 1 });
    }

    onVerifyCode = () => {
        this.props.setRequestGlobalAction(true);
        this.setState({ loading: true });
        UserService.confirmOTP(this.state.codeToVerify)
            .then(() => {
                NotificationManager.success("Votre compte a été activé avec success");
                this.props.onClose();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .finally(() => {
                this.setState({ loading: false });
                this.props.setRequestGlobalAction(false);
            });
    };

    render() {
        return (
            <DialogComponent
                title="Acivation du compte"
                onClose={this.props.onClose}
                show={this.props.show}
            >
                <>
                    <AppBar position="static" color="default">
                        <div className="d-flex align-items-center">
                            <Tabs
                                value={this.state.activeTab}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="Demander un code" />
                                <Tab label="Vérifier le code" />
                            </Tabs>
                        </div>
                    </AppBar>
                    <SwipeableViews
                        index={this.state.activeTab}>
                        <div className="card mb-0 transaction-box">
                            <TabContainer>
                                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                    <div>
                                        <label>J'ai lu et j'accepte les CGU</label>
                                        <Checkbox
                                            color="primary"
                                            onChange={(e) => this.setState({ acceptCGU: e.target.checked })}
                                        />
                                    </div>
                                    <Button
                                        color="primary"
                                        disabled={this.state.loading || !this.state.acceptCGU}
                                        className="text-white mr-2"
                                        onClick={this.onAskCode}
                                    >
                                        Initier la demande
                                    </Button>
                                    <Button
                                        color="primary"
                                        className="text-white bg-blue mr-2"
                                        href={this.props.pdfURL}
                                        target="_blank"
                                        download
                                    >
                                        Télécharger les CGU ICI
                                    </Button>
                                </div>
                            </TabContainer>
                        </div>
                        <div className="card mb-0 transaction-box">
                            <TabContainer>
                                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <InputLabel className="text-left" htmlFor="label">
                                                Enter le code reçu
                                            </InputLabel>
                                        </div>
                                        <FormGroup className="col-sm-12 has-wrapper">
                                            <Input
                                                required
                                                id="label"
                                                name={'label'}
                                                value={this.state.codeToVerify}
                                                className="has-input input-lg border"
                                                onChange={event => this.setState({ codeToVerify: event.target.value })}
                                            />
                                        </FormGroup>
                                        <div className="col-sm-12">
                                            <div>
                                                <Button
                                                    color="primary"
                                                    onClick={this.onVerifyCode}
                                                    className="text-white bg-blue mr-2"
                                                    disabled={this.state.codeToVerify.length === 0 || this.state.loading}
                                                >
                                                    Vérifier mon code
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabContainer>
                        </div>
                    </SwipeableViews>
                </>
            </DialogComponent>
        );
    }
}

export default connect(({ authUser }) => ({ authUser: authUser.data }), { setRequestGlobalAction })(ActivationBox);

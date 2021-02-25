import React, { Component } from 'react';
// import Button from "@material-ui/core/Button";
import SwipeableViews from "react-swipeable-views";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { Form, FormGroup, Input, Button } from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import DialogComponent from "Components/DialogComponent";
import TabContainer from "Components/TabContainer";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { NotificationManager } from "react-notifications";
import { askValidationCode, verifyCode, setRequestGlobalAction } from "Actions";
import { ERROR_500 } from "Constants/errors";
import { connect } from "react-redux";
import { Document, Page, pdfjs } from 'react-pdf';
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import InputComponent from "Components/InputComponent";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class ActivationBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            loading: false,
            codeToVerify: '',
            hasAskCode: false,
            accept: false,
            numPages: 1,
            pageNumber: 1,
        }
    }

    handleChange = (event, value) => {
        this.setState({ activeTab: value });
    };

    onAskCode = () => {
        this.props.setRequestGlobalAction(true);
        this.setState({ loading: true });
        askValidationCode(this.props.authUser.user.id)
            .then(() => {
                NotificationManager.success("Un code vous a été envoyé par email. Veuillez saisir ce code dans ce formulaire");
                this.setState({ activeTab: 1, hasAskCode: true });
            })
            .catch(() => NotificationManager.error(ERROR_500))
            .finally(() => {
                this.setState({ loading: false });
                this.props.setRequestGlobalAction(false);
            });
    };

    onAskAnotherCode = () => {
        this.onAskCode();
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages, pageNumber: 1 });
    }

    onVerifyCode = () => {
        this.props.setRequestGlobalAction(true);
        this.setState({ loading: true });
        verifyCode(this.props.authUser.user.id, this.state.codeToVerify, this.props.notification.id)
            .then(() => {
                NotificationManager.success("Votre compte a été activé avec success");
                this.props.onClose();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(() => NotificationManager.error(ERROR_500))
            .finally(() => {
                this.setState({ loading: false });
                this.props.setRequestGlobalAction(false);
            });
    };

    render() {
        console.log('PDF File => ', this.props.pdfUrl)
        return (
            <DialogComponent
                title="Acivation du compte"
                onClose={this.props.onClose}
                show={this.props.show}
            >
                <>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.activeTab}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Demander un code" />
                            <Tab label="Verifier le code" />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        //animateHeight
                        // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.activeTab}>
                        <div className="card mb-0 transaction-box">
                            <TabContainer>
                                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">

                                    <>
                                        {this.state.hasAskCode ? (
                                            <>
                                                <div>
                                                    <label>J'ai lu et j'accepte les CGU</label>
                                                    <Checkbox
                                                        color="primary"
                                                        onChange={(e) => this.setState({ accept: e.target.checked })}
                                                    />
                                                </div>
                                                <Button
                                                    color="primary"
                                                    disabled={this.state.loading || !this.state.accept}
                                                    className="text-white bg-blue mr-2"
                                                    onClick={this.onAskAnotherCode}
                                                >
                                                    Demander un autre code
                                            </Button>
                                            </>
                                        ) : (
                                                <>
                                                    <Document
                                                        file={this.props.pdfUrl}
                                                        onLoadSuccess={this.onDocumentLoadSuccess}
                                                    >
                                                        <Page pageNumber={this.state.pageNumber} />
                                                    </Document>
                                                    <div>
                                                        <label>J'ai lu et j'accepte les CGU</label>
                                                        <Checkbox
                                                            color="primary"
                                                            onChange={(e) => this.setState({ accept: e.target.checked })}
                                                        />
                                                    </div>
                                                    <Button
                                                        color="primary"
                                                        disabled={this.state.loading || !this.state.accept}
                                                        className="text-white mr-2"
                                                        onClick={this.onAskCode}
                                                    >
                                                        Initier la demande
                                                    </Button>
                                                </>
                                            )}
                                    </>
                                    <Button
                                        color="primary"
                                        className="text-white bg-blue mr-2"
                                        href={this.props.pdfUrl}
                                        target="_blank"
                                        download
                                    >
                                        Télécharger les CGU ici
                                    </Button>
                                </div>
                            </TabContainer>
                        </div>
                        <div className="card mb-0 transaction-box">
                            <TabContainer>
                                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                    <RctCollapsibleCard>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <InputLabel className="text-left" htmlFor="label">
                                                    Enter le code
                                                </InputLabel>
                                            </div>
                                            <FormGroup className="col-sm-12 has-wrapper">
                                                <Input
                                                    required
                                                    id="label"
                                                    name={'label'}
                                                    value={this.state.codeToVerify}
                                                    className="has-input input-lg border"
                                                    onChange={event => this.setState({ 'codeToVerify': event.target.value })}
                                                />
                                                <span className="has-icon"><i className="ti-pencil" /></span>
                                            </FormGroup>
                                            <div className="col-sm-12">
                                                <div>
                                                    <Button
                                                        color="primary"
                                                        onClick={this.onVerifyCode}
                                                        className="text-white bg-blue mr-2"
                                                        disabled={this.state.codeToVerify.length === 0 || this.state.loading}
                                                    >
                                                        Verifier mon code
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </RctCollapsibleCard>
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

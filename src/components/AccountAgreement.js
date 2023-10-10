import { connect } from "react-redux";
import { FormGroup } from 'reactstrap';
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { getFilePath } from "Helpers/helpers";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import AccountService from 'Services/accounts';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { FileUploader } from "react-drag-drop-files";
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const fileTypes = ["PDF"];

class AccountAgreement extends Component {

    state = {
        file: null,
        agreements: null
    }
  
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getAgreements();
    }

    getAgreements() {
        this.props.setRequestGlobalAction(true);
        AccountService.getAgreements(this.props.accountReference).then((response) => {
            this.setState({ agreements: response });
        }).catch((err) => {
            console.log(err);
            this.props.onClose();
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    setAgreement() {
        if(!this.state.file) {
            return;
        }
        this.props.setRequestGlobalAction(true);
        AccountService.setAgreement(this.props.accountReference, {agreement: this.state.file, notification_id: this.props.notification_id}, { fileData: ['agreement'], multipart: true }).then((response) => {
            NotificationManager.success("La convention a été mis a jour avec succès");
            window.location.reload();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue, veuillez reesayer");
        }).finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })
    }

    setAgreementTemplate() {
        if(!this.state.file) {
            return;
        }
        this.props.setRequestGlobalAction(true);
        AccountService.setAgreementTemplate(this.props.accountReference, {agreement: this.state.file}, { fileData: ['agreement'], multipart: true }).then((response) => {
            console.log(response);
            NotificationManager.success("La convention a été mis a jour avec succès");
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue, veuillez reesayer");
        }).finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title, isUserValidating } = this.props;
        const { agreements } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <RctCardContent>
                    { isUserValidating && (
                        <div>
                            <p onClick={() => window.open(getFilePath(agreements?.agreementTemplate), 'blank')}>Téléhargez la convention ici</p>
                        </div>
                    )}
                    { isUserValidating && (
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="title">
                                Convention de compte <br />
                                { agreements?.agreement && 
                                    <span
                                        style={{ cursor: 'pointer',  }} 
                                        onClick={() => window.open(getFilePath(agreements?.agreement), 'blank')}>
                                            Voir l'ancienne version
                                    </span> 
                                }
                            </InputLabel>
                            <FileUploader
                                classes="mw-100"
                                label="Sélectionner la convention"
                                handleChange={(file) => { this.setState({ file })}} name="file" types={fileTypes} />
                        </FormGroup>
                    )}
                    { !isUserValidating && (
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="title">
                                Convention de compte (avant signature client) <br />
                                { agreements?.agreementTemplate && 
                                    <span
                                        style={{ cursor: 'pointer',  }} 
                                        onClick={() => window.open(getFilePath(agreements?.agreementTemplate), 'blank')}>
                                            Voir l'ancienne version
                                    </span> 
                                }
                            </InputLabel>
                            <FileUploader
                                classes="mw-100"
                                label="Sélectionner la convention"
                                handleChange={(file) => { this.setState({ file })}} name="file" types={fileTypes} />
                        </FormGroup>
                    )}
                    { !isUserValidating ?
                        <FormGroup>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => this.setAgreementTemplate()}
                                className="text-white font-weight-bold"
                            >
                                Enregistrer
                            </Button>
                        </FormGroup> :
                        <FormGroup>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => this.setAgreement()}
                                className="text-white font-weight-bold"
                            >
                                Activer mon compte
                            </Button>
                        </FormGroup>
                    }
                </RctCardContent>
            </DialogComponent>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(AccountAgreement)));
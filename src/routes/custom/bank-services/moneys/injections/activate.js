import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import { FormGroup, Button } from 'reactstrap';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { FileUploader } from "react-drag-drop-files";
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class ActivateInjectionModal extends Component {
  
    state = {
        proof: null,
    }

    constructor(props) {
        super(props);
    }

    onSubmit = () => {

        const { proof } = this.state;

        if(!proof) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let data = {proof};

        BankService.activateInjection(this.props.injection.reference, data, { fileData: ['proof'], multipart: true }).then(() => {
            NotificationManager.success("L'injection a été positionnée avec succès");
        }).catch((err) => {
            NotificationManager.error("Une erreur est survenu lors de la position");
        }).finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;

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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="proof">
                            Justificatif
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionnez le justificatif"
                            handleChange={(file) => { this.setState({ proof: file })}} name="file" types={["PDF", "JPG", "PNG"]} />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Mettre en position
                        </Button>
                    </FormGroup>
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(ActivateInjectionModal)));
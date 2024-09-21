import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import { getFilePath } from 'Helpers/helpers';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { FileUploader } from "react-drag-drop-files";
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';

class CreateInjectionDocumentModal extends Component {
  
    state = {
        documents: [],
        label: null,
        isCreation: false,
        proof: null,
    }

    constructor(props) {
        super(props);
        this.getDocuments();
    }

    getDocuments = () => {
        BankService.getInjectionDocuments(this.props.injection.reference).then((documents) => {
            this.setState({ documents });
        }).catch((err) => {
            this.setState({ documents: [] });
            NotificationManager.error("Une erreur est survenue");
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    onSubmit = () => {

        const { label, proof } = this.state;

        if(!label || !proof) {
            NotificationManager.error("Le formulaire est mal rempli");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let data = {label, file: proof};

        BankService.createInjectionDocument(this.props.injection.reference, data, { fileData: ['file'], multipart: true }).then(() => {
            NotificationManager.success("L'argument a été créé avec succès");
            this.getDocuments();
        }).catch((err) => {
            NotificationManager.error("Une erreur est survenu lors de l'argument");
        }).finally(() => {
            this.setState({ isCreation: false });
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { label, isCreation, documents } = this.state;

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
             { isCreation ? (
                <RctCardContent>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="label"
                            name='label'
                            value={label}
                            className="input-lg"
                            onChange={(e) => this.setState({ label: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="proof">
                            Argument
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
                            Créer l'argument
                        </Button>
                    </FormGroup>
                </RctCardContent>
            ) : (
                <CustomList
                    loading={false}
                    list={documents}
                    itemsFoundText={n => `${n} arguments trouvés`}
                    onAddClick={() => this.setState({ isCreation: true })}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun argument trouvé
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Désignation</th>
                                                <th className="fw-bold">Fichier</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <p className="m-0 text-dark" onClick={() => window.open(getFilePath(item.file), '_blank')}>Consulter l'argument</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                />
            )}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(CreateInjectionDocumentModal)));
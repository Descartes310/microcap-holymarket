import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import { getFilePath } from 'Helpers/helpers';
import SettingService from 'Services/settings';
import { FormGroup, Button } from 'reactstrap';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import { FileUploader } from "react-drag-drop-files";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from "react-notifications";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class AddFileToOrderModal extends Component {

    state = {
        file: null,
        order: null,
        userFiles: [],
        userFile: null,
        uploadedFile: null,
        orderUserFiles: [],
     }
  
     constructor(props) {
        super(props);
     }

     componentDidMount() {
        this.findOrder();
     }

     findOrder = () => {
        this.props.setRequestGlobalAction(true),
        OrderService.findOrder(this.props.order.id)
            .then(response => {
                this.setState({ order: response }, () => {
                    this.getUserFiles();
                });
            })
            .catch(err => {
                console.log(err);
                this.props.history.goBack();
            })
            .finally(() => this.props.setRequestGlobalAction(false))
    }

    getUserFiles = () => {
        this.props.setRequestGlobalAction(true);
        SettingService.getUserFileTypes()
        .then(response => {
            this.setState({ userFiles: response, orderUserFiles: response.filter(file => this.state.order.pieces?.includes(file.reference)) });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findUploadedFile = () => {
        let uploadedFile = this.state.order.details.find(d => d.type === 'PIECE' && d.label === this.state.userFile.reference);
        if(uploadedFile) {
            this.setState({ uploadedFile});
        } else {
            this.setState({ uploadedFile: null });
        }
    }

    onSubmit = () => {
        if(!this.state.userFile || !this.state.file) {
            NotificationManager.error("Veuillez renseigner les informations");
            return;
        }

        this.props.setRequestGlobalAction(true);
        
        let data = {
            file: this.state.file, 
            fileReference: this.state.userFile.reference
        };

        OrderService.addFileToOrder(this.state.order.id, data, { fileData: ['file'], multipart: true })
        .finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { orderUserFiles, userFile, uploadedFile } = this.state;

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
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Séléctionnez le fichier à renseigner
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={userFile}
                            options={orderUserFiles}
                            onChange={(__, item) => {
                                this.setState({ userFile: item }, () => {
                                    this.findUploadedFile();
                                });                                    
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    { userFile &&  uploadedFile &&(
                        <div className="mb-30">
                            <p style={{ fontSize: '1.07em'}}>
                                Vous avez déjà renseigné cette pièce:
                            </p>
                            <span className="cursor-pointer" style={{ color: '#008000c4', fontStyle: 'italic'}} onClick={() => window.open(getFilePath(uploadedFile.value), 'blank')}>Consulter la pièce versée</span>
                        </div>
                    )}

                    { userFile && (
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left">
                                Verser le fichier ici
                            </InputLabel>
                            <FileUploader
                                classes="mw-100"
                                label="Sélectionner le dossier demandé ici"
                                handleChange={(item) => {
                                    this.setState({ file: item });
                                }} name="file" />
                        </FormGroup>
                    )}

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Téléverser
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(AddFileToOrderModal)));
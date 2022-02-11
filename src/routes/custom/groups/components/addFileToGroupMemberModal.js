import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import GroupService from 'Services/groups';
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

class AddFileToGroupMemberModal extends Component {

    state = {
        file: null,
        userFiles: [],
        userFile: null,
        uploadedFile: null,
        groupUserFiles: [],
     }
  
     constructor(props) {
        super(props);
     }

     componentDidMount() {
         this.getUserFiles();
     }

    getUserFiles = () => {
        this.props.setRequestGlobalAction(true);
        SettingService.getUserFileTypes()
        .then(response => {
            this.setState({ userFiles: response, groupUserFiles: response.filter(file => this.props.groupMember.joinRequestPieces?.includes(file.reference)) });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findUploadedFile = () => {
        let uploadedFile = this.props.groupMember.details.find(d => d.type === 'PIECE' && d.label === this.state.userFile.reference);
        if(uploadedFile) {
            this.setState({ uploadedFile});
            //this.setState({ uploadedFile: userFiles.find(uf => uf.reference === uploadedFile.label) });
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

        GroupService.addFileToGroupMember(this.props.groupMember.requestId, data, { fileData: ['file'], multipart: true })
        .finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { groupUserFiles, userFile, uploadedFile } = this.state;

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
                            options={groupUserFiles}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(AddFileToGroupMemberModal)));
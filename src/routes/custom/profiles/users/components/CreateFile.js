import { connect } from 'react-redux';
import React, { useState } from 'react';
import UserService from "Services/users";
import {Form, FormGroup} from 'reactstrap';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import {setRequestGlobalAction} from 'Actions';
import { imageFileTypes } from 'Helpers/datas';
import { RctCardContent } from 'Components/RctCard';
import { FileUploader } from "react-drag-drop-files";
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const CreateFileModal = (props) => {

    const [file, setFile] = useState(null);
    const [page, setPage] = useState(0);
    const {show, onClose, referralCode} = props;
    const [hasManyPages, setHasManyPages] = useState(false);

    const onSubmit = () => {

        if(!file) {
            NotificationManager.error("Toutes les informations sont obligatoires");
            return;
        }
        
        let data = {
            file, source_reference: props.file.source,
            erase: page <= 0
        }
        
        if(referralCode) {
            data.referralCode = referralCode
        }
        
        if(props.onSubmit) {
            props.onSubmit({...data, type: 'UPDATE_USER_FOLDER'});
        } else {
            props.setRequestGlobalAction(true);
            UserService.createFile(data, { fileData: ['file'], multipart: true }).then(() => {
                NotificationManager.success("La pièce a bien été ajoutée");
                setFile(null);
                if(hasManyPages) {
                    setPage(page+1);
                } else {
                    props.onClose();
                }
            }).catch((err) => {
                console.log(err);
                NotificationManager.error("Une erreur est survenue");
            }).finally(() => {
                props.setRequestGlobalAction(false);
            })
        }
    }

    return (
        <DialogComponent
            show={show}
            onClose={() => {
                setPage(0);
                setHasManyPages(false);
                onClose();
            }}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Editer mon dossier
                </h3>
            )}
        >
            <RctCardContent>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={hasManyPages}
                                onChange={() => setHasManyPages(!hasManyPages)}
                            />
                        } label={'Le document a plusieurs pages'}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            {props.file?.label} {hasManyPages ? '(Importez une page après l\'autre)' : ''}
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label={props.file?.label}
                            handleChange={(file) => {
                                setFile(file);
                            }} name="file" types={imageFileTypes} />
                    </FormGroup>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Editer
                        </Button>
                    </FormGroup>
                </Form>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateFileModal));
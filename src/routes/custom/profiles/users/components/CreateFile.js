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
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const CreateFileModal = (props) => {

    const {show, onClose, referralCode} = props;
    const [file, setFile] = useState(null);

    const onSubmit = () => {

        if(!file) {
            NotificationManager.error("Toutes les informations sont obligatoires");
            return;
        }
        props.setRequestGlobalAction(true);

        let data = {
            file, source_reference: props.file.source
        }

        if(referralCode) {
            data.referralCode = referralCode
        }

        UserService.createFile(data, { fileData: ['file'], multipart: true }).then(() => {
            NotificationManager.success("La pièce a bien été ajoutée");
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue");
        }).finally(() => {
            props.setRequestGlobalAction(false);
            props.onClose();
        })
    }

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Editer mon dossier
                </h3>
            )}
        >
            <RctCardContent>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            {props.file?.label}
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
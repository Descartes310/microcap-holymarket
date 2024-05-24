import { connect } from 'react-redux';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import { RctCardContent } from 'Components/RctCard';
import { FileUploader } from "react-drag-drop-files";
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import {Form, FormGroup, Input as InputStrap, Button} from 'reactstrap';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
const BlogSetting = (props) => {

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
        getSettings();
    }, []);

    const getSettings = () => {
        UserService.getBlogSettings().then((settings) => {
            setTitle(settings?.title);
            setEnabled(settings?.enabled);
            setDescription(settings?.description);
        }).catch((err) => {
            console.log(err);
        })
    } 

    const onSubmit = () => {

        if(!title || !description) {
            NotificationManager.error("Toutes les informations sont obligatoires");
            return;
        }
        
        let data = {
            title, description, active: enabled
        }

        if(file) data.cover = file;
        
        props.setRequestGlobalAction(true);
        UserService.updateBlogSettings(data, { fileData: ['cover'], multipart: true }).then(() => {
            NotificationManager.success("Paramètres enregistrés avec succès");
            props.onClose();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const {show, onClose} = props;

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Configurer mon fil d'actualité
                </h3>
            )}
        >
            <RctCardContent>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="title">
                            Titre du fil d'actualité
                        </InputLabel>
                        <InputStrap
                            required
                            id="title"
                            type="text"
                            name='title'
                            className="input-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Petite description
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Photo de couverture
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionner la photo de couverture"
                            handleChange={(file) => {
                                setFile(file);
                            }} 
                            name="file" 
                            types={fileTypes} 
                        />
                    </FormGroup>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={enabled}
                                onChange={() => setEnabled(!enabled)}
                            />
                        } label={`Rendre mon fil d'actualité publique`}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </Form>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(BlogSetting));
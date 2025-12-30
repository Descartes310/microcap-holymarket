import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { getFilePath } from 'Helpers/helpers';
import SettingService from 'Services/settings';
import {setRequestGlobalAction} from 'Actions';
import { referraTypes } from 'Helpers/helpers';
import { GROUP, SETTING } from 'Url/frontendUrl';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    const [code, setCode] = useState('');
    const [label, setLabel] = useState('');
    const [sample, setSample] = useState(null);
    const [userFile, setUserFile] = useState(null);
    const [description, setDescription] = useState('');
    const [referralType, setReferralType] = useState(null);

    useEffect(() => {
        findUserFileType();
    }, []);

    const findUserFileType = () => {
        props.setRequestGlobalAction(true),
        SettingService.findUserFileType(props.match.params.id)
        .then(response => {
            setUserFile(response);
            setLabel(response.label);
            setCode(response.code);
            setDescription(response.description);
            setReferralType(referraTypes().find(t => t.value == response.referralType));
        })
        .catch((err) => {
            console.log(err);
            props.history.push(SETTING.USER_FILE.LIST);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        props.setRequestGlobalAction(true);

        let data: any = {
            label: label,
            code: code,
            sample: sample,
            description: description,
            referralType: referralType.value
        }

        SettingService.updateUserFileType(props.match.params.id, data, { fileData: ['sample'], multipart: true }).then(() => {
            NotificationManager.success("Le dossier a été édité avec succès");
            props.history.push(SETTING.USER_FILE.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'édition du dossier");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Edition du dossier utilisateur"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="code">
                            Code
                        </InputLabel>
                        <InputStrap
                            required
                            id="code"
                            type="text"
                            name='code'
                            className="input-lg"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Cible
                        </InputLabel>
                        <Autocomplete
                            value={referralType}
                            id="combo-box-demo"
                            options={referraTypes()}
                            onChange={(__, item) => {
                                setReferralType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Description
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
                        <InputLabel className="text-left" htmlFor="title">
                            Exemple {userFile?.sample && (
                                <span onClick={() => window.open(getFilePath(userFile.sample), 'blank')}>
                                    (Ancien fichier)
                                </span>
                            )}
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionner l'exemple de votre dossier ici"
                            handleChange={(file) => {
                                setSample(file);
                                
                            }} name="file" />
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
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));
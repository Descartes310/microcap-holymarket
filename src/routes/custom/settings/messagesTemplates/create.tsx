import { connect } from 'react-redux';
import React, { useState } from 'react';
import { SETTING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import SettingService from 'Services/settings';
import {setRequestGlobalAction} from 'Actions';
import {NotificationManager} from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit = () => {

        if(!label || !description) {
            NotificationManager.error("Le sujet et le contenu sont obligatoires");
            return;
        }
        props.setRequestGlobalAction(true);

        let data: any = {
            title: label,
            content: description,
        }

        SettingService.createMessageTemplate(data).then(() => {
            NotificationManager.success("Le message a été créé avec succès");
            props.history.push(SETTING.MESSAGE_TEMPLATE.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création du message");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Création d'un template"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Sujet
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
                    <p>Notes importantes: utilisez les variables ci-dessous pour personnaliser le message</p>
                    <ul className='ml-20'>
                        <li><b>$name$</b>: nom de l'utilisateur</li>
                        <li><b>$contact$</b>: adresse de contact</li>
                        <li><b>$number$</b>: numéro de l'utilisateur</li>
                        <li><b>$email$</b>: email de l'utilisateur</li>
                    </ul>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="content">
                            Contenu
                        </InputLabel>
                        <InputStrap
                            required
                            id="content"
                            type="textarea"
                            name='content'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Create));
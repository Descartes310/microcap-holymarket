import { connect } from 'react-redux';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import {NotificationManager} from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { PROJECT } from 'Url/frontendUrl';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit = () => {
        if(!label)
        return;

        let data = {
            label,
            description
        }

        props.setRequestGlobalAction(true);
        ProjectService.createProjectPost(data)
        .then(() => {
            NotificationManager.success('Le poste projet a été créé avec succès');
            props.history.push(PROJECT.POST.LIST);
        }).catch((error) => {
            console.log(error);
            NotificationManager.error('Une erreur est survenue lors de la création du poste');
        }).finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Création de poste"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            id="description"
                            type="text"
                            name='description'
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));
import { connect } from 'react-redux';
import { BROKER } from 'Url/frontendUrl';
import BrokerService from 'Services/brokers';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        findCounter();
    }, []);
    
    const findCounter = () => {
        props.setRequestGlobalAction(true);
        BrokerService.findCounter(props.match.params.id).then((response) => {
            setLabel(response.label);
            setDescription(response.description);
        })
        .catch((err) => {
            console.log(err);
            props.history.goBack();
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {
        if(!label) {
            NotificationManager.error("Formulaire mal renseigné");
            return;
        }

        let data: any = {
            label, description
        }

        BrokerService.updateCounter(props.match.params.id, data).then(() => {
            NotificationManager.success("Le point de service a été éditée avec succès");
            props.history.push(BROKER.COUNTER.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue lors de l'édition du point de service");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Edition d'un point de service"}
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
                            type="text"
                            id="description"
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
                            disabled={!label}
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Update));
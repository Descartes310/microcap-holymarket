import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import {NotificationManager} from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    const [contact, setContact] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [relationNature, setRelationNature] = useState('');

    useEffect(() => {
        findGroupRelation();
    }, []);

    const findGroupRelation = () => {
        props.setRequestGlobalAction(true),
        GroupService.findGroupRelation(props.match.params.id)
        .then(response => {
            setContact(response.contact);
            setLastName(response.lastName);
            setFirstName(response.firstName);
            setBirthdate(response.birthdate);
            setRelationNature(response.relationNature);
        }).catch(() => {
            NotificationManager.error("Lien introuvable");
            props.history.push(GROUP.ADMINISTRATION.RELATION.LIST)
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!lastName || !firstName || !contact || !birthdate || !relationNature) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        props.setRequestGlobalAction(true);

        let data: any = {
            firstName, lastName, contact, birthdate, relationNature
        }

        GroupService.updateGroupRelation(props.match.params.id, data).then(() => {
            NotificationManager.success("Le lien a été édité avec succès");
            props.history.push(GROUP.ADMINISTRATION.RELATION.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'édition du lien");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }


    return (
        <>
            <PageTitleBar
                title={"Edition de poste"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="firstName">
                            Prénoms
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="firstName"
                            name='firstName'
                            className="input-lg"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="lastName">
                            Noms
                        </InputLabel>
                        <InputStrap
                            required
                            id="lastName"
                            type="text"
                            name='lastName'
                            className="input-lg"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="contact">
                            Contact
                        </InputLabel>
                        <InputStrap
                            required
                            id="contact"
                            type="text"
                            name='contact'
                            className="input-lg"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="birthdate">
                            Date de naissance
                        </InputLabel>
                        <InputStrap
                            required
                            type="date"
                            id="birthdate"
                            name='birthdate'
                            className="input-lg"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="relationNature">
                            Relation avec le porteur
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="relationNature"
                            name='relationNature'
                            className="input-lg"
                            value={relationNature}
                            onChange={(e) => setRelationNature(e.target.value)}
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
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));
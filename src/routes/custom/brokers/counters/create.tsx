import { connect } from 'react-redux';
import UserService from 'Services/users';
import { BROKER } from 'Url/frontendUrl';
import BrokerService from 'Services/brokers';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { getReferralTypeLabel } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [agency, setAgency] = useState(null);
    const [member, setMember] = useState(null);
    const [agencies, setAgencies] = useState([]);
    const [reference, setReference] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        getAgencies();
    }, []);

    const getAgencies = () => {
        props.setRequestGlobalAction(true),
        BrokerService.getAgencies()
        .then(response => setAgencies(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const findUserByReference = () => {
        if (!reference)
            return;
        props.setRequestGlobalAction(true),
            UserService.findUserByReference(reference)
                .then(response => setMember(response))
                .catch(err => {
                    setMember(null);
                    console.log(err);
                    NotificationManager.error("Reference incorrecte");
                })
                .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(!label || !reference || !agency) {
            NotificationManager.error("Formulaire mal renseigné");
            return;
        }

        let data: any = {
            label, description,
            agency_id: agency.id,
            manager_reference: reference,
        }

        BrokerService.createCounter(data).then(() => {
            NotificationManager.success("Le guichet a été créée avec succès");
            props.history.push(BROKER.COUNTER.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création du guichet");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Création de guichet"}
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
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Agence mère
                        </InputLabel>
                        <Autocomplete
                            options={agencies}
                            id="combo-box-demo"
                            value={agency}
                            onChange={(__, item) => {
                                setAgency(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Référence du responsable
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="reference"
                            name='reference'
                            value={reference}
                            className="input-lg"
                            onChange={(e) => setReference(e.target.value)}
                        />
                    </FormGroup>

                    {member && (
                        <>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.userName}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.email}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={getReferralTypeLabel(member.referralType)}
                                />
                            </FormGroup>
                        </>
                    )}

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!reference}
                            onClick={() => findUserByReference()}
                            className="text-white font-weight-bold mr-20 bg-blue"
                        >
                            Vérifier l'utilisateur
                        </Button>
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
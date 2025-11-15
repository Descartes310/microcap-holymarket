import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import UserService from 'Services/users';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import UserSelect from 'Components/UserSelect';
import { setRequestGlobalAction } from 'Actions';
import { PAYMENT_METHODS } from 'Helpers/helpers';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [name, setName] = useState(null);
    // const [agents, setAgents] = useState([]);
    const [member, setMember] = useState(null); 
    // const [broker, setBroker] = useState(null);
    // const [brokerCode, setBrokerCode] = useState(null);
    const [agency, setAgency] = useState(null);
    const [agencies, setAgencies] = useState([]);
    const [prestations, setPrestations] = useState([]);
    const [membership, setMembership] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    // const [selectedAgent, setSelectedAgent] = useState(null);  

    useEffect(() => {
        getAgencies();
        getPrestations();
    }, []);

    // useEffect(() => {
    //     if(broker) {
    //         getPotentialAgents();
    //     }
    // }, [broker])

    const getAgencies = () => {
        props.setRequestGlobalAction(true),
        UserService.getInstitutions({type: 'PSG_AGENCY'})
        .then(response => setAgencies(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getPrestations = () => {
        props.setRequestGlobalAction(true),
        BankService.getPrestations()
        .then(response => setPrestations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    // const getPotentialAgents = () => {
    //     props.setRequestGlobalAction(true),
    //     BankService.getPotentialAgents({referralCode: brokerCode})
    //     .then(response => setAgents(response))
    //     .finally(() => props.setRequestGlobalAction(false))
    // }

    const onSubmit = () => {

        if(!paymentMethod || !name || !agency) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            name: name,
            agency_id: agency.id,
            reference: membership,
            payment_mode: paymentMethod.value
        }

        BankService.createAgent(data).then(() => {
            NotificationManager.success("Le point de service a été créé avec succès");
            props.history.push(BANK.PARTY.AGENT.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue lors de la création du point de service");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    {/* <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <UserSelect label={"Réference du Broker"} type='BROKER' fromMyOrganisation={false} onChange={(membership, user) => {
                            setBrokerCode(membership);
                            setBroker(user);
                        }}/>
                    </div>
                    {broker && (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Potentiels point de service
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                options={agents}
                                value={selectedAgent}
                                onChange={(__, item) => {
                                    setSelectedAgent(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    )} */}
                    

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="name">
                            Nom du point
                        </InputLabel>
                        <InputStrap
                            required
                            id="name"
                            type="text"
                            name='name'
                            value={name}
                            className="input-lg"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Etablissement
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={agencies}
                            value={agency}
                            onChange={(__, item) => {
                                setAgency(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    
                    <FormGroup className="has-wrapper">
                        <UserSelect isSelect={true} label={'Sélectionner le responsable'} onChange={(_, user) => {
                            setMember(user);
                            setMembership(user.referralId)
                        }}/>
                    </FormGroup>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Méthode de règlement
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={PAYMENT_METHODS}
                            value={paymentMethod}
                            onChange={(__, item) => {
                                setPaymentMethod(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <FormGroup>
                        <Button
                            color="primary"
                            onClick={onSubmit}
                            variant="contained"
                            disabled={!member}
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

const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Create));
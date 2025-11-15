import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
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
import UserAccountTypeService from 'Services/account-types';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import UserService from 'Services/users';

const Create = (props) => {

    const [name, setName] = useState(null);
    const [agency, setAgency] = useState(null);
    const [agencies, setAgencies] = useState([]);
    const [member, setMember] = useState(null);
    const [membership, setMembership] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null); 

    useEffect(() => {
        getCounters()
    }, []);

    const getCounters = () => {
        props.setRequestGlobalAction(true),
        UserService.getInstitutions({type: 'PSG_COUNTER'})
        .then(response => setAgencies(response))
        .finally(() => props.setRequestGlobalAction(false))
    }
    
    const onSubmit = () => {

        if(!member || !agency || !paymentMethod || !name) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        props.setRequestGlobalAction(true);

        let data: any = {
            name: name,
            agency_id: agency.id,
            reference: membership,
            payment_mode: paymentMethod.value,
        }

        BankService.createCounter(data).then(() => {
            NotificationManager.success("Le guichet a été créé avec succès");
            props.history.push(BANK.PARTY.COUNTER.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors du guichet");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <UserSelect isSelect={true} label={'Sélectionner un utilisateur'} onChange={(_, user) => {
                        setMember(user);
                        setMembership(user.referralId)
                    }}/>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="name">
                            Nom du guichet
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

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Create));
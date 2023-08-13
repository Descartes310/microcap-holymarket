import { connect } from 'react-redux';
import UserService from 'Services/users';
import MarketService from 'Services/markets';
import { withRouter } from "react-router-dom";
import { MARKETPLACE } from 'Url/frontendUrl';
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { getReferralTypeLabel } from 'Helpers/helpers';
import {NotificationManager} from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    const [label, setLabel] = useState(null);
    const [member, setMember] = useState(null);
    const [membership, setMembership] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        findMarket();
    }, []);

    const findMarket = () => {
        props.setRequestGlobalAction(true),
        MarketService.find(props.match.params.id)
        .then(response => {
            setLabel(response.label);
            setMembership(response.referralCode);
            setDescription(response.description);
        })
        .catch((err) => {
            console.log(err);
            props.history.push(MARKETPLACE.MARKET.LIST);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const findUserByMembership = () => {
        props.setRequestGlobalAction(true);
        UserService.findUserByReference(membership)
        .then(response => {
            setMember(response);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Ce numéro utilisateur est inexistant");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }
    const onSubmit = () => {

        if(!label) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }
        props.setRequestGlobalAction(true);

        let data: any = {
            label: label,
            description: description,
        }

        if(membership)
            data.referralCode = membership;

        MarketService.update(props.match.params.id, data).then(() => {
            NotificationManager.success("Le marché a été édité avec succès");
            props.history.push(MARKETPLACE.MARKET.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'édition du marché");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Edition du marché"}
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
                        <InputLabel className="text-left" htmlFor="membership">
                            Numéro utilisateur (pour un marché privé)
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="membership"
                            name='membership'
                            value={membership}
                            className="input-lg"
                            onChange={(e) => setMembership(e.target.value)}
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
                            disabled={!membership}
                            onClick={() => findUserByMembership()}
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));
import { connect } from 'react-redux';
import UserService from 'Services/users';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { getReferralTypeLabel } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { getUserAssistanceTypes } from 'Helpers/datas';
import ActivationBox from '../../notifications/ActivationBox';

const Assist = (props) => {

    const [member, setMember] = useState(null);
    const [action, setAction] = useState(null);
    const [membership, setMembership] = useState(null);
    const [showActivationBox, setShowActivationBox] = useState(false);

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
        if(!member || !action) {
            NotificationManager.error("Le formulaire n'est pas correctement renseigné");
            return;
        }

        switch (action.value) {
            case 'ACTIVATE_PROFILE':
                activateProfile();
                break;
        
            default:
                break;
        }
    }

    const activateProfile = () => {
        setShowActivationBox(true);
    }


    return (
        <>
            <PageTitleBar
                title={"Assistance"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="membership">
                            Numéro utilisateur
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
                            <div className="row">
                                <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                    <InputStrap
                                        disabled
                                        className="input-lg"
                                        value={member.userName}
                                    />
                                </FormGroup>
                                <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                    <InputStrap
                                        disabled
                                        className="input-lg"
                                        value={member.email}
                                    />
                                </FormGroup>
                                <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                    <InputStrap
                                        disabled
                                        className="input-lg"
                                        value={getReferralTypeLabel(member.referralType)}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Action à effectuer
                                </InputLabel>
                                <Autocomplete
                                    id="combo-box-demo"
                                    value={action}
                                    options={getUserAssistanceTypes()}
                                    onChange={(__, item) => {
                                        setAction(item);
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </div>
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
                        {
                            member && (
                                <Button
                                    color="primary"
                                    variant="contained"
                                    disabled={!member}
                                    onClick={() => onSubmit()}
                                    className="text-white font-weight-bold mr-20"
                                >
                                    Commencer l'assistance
                                </Button>
                            )
                        }
                    </FormGroup>
                </Form>
                { !member && action?.value == 'ACTIVATE_PROFILE'}
                <ActivationBox
                    member={member}
                    show={showActivationBox}
                    pdfURL={'http://www.africau.edu/images/default/sample.pdf'}
                    onClose={() => {
                        setShowActivationBox(false);
                        setMember(null);
                        setAction(null);
                        setMembership(null);
                    }} 
                />
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Assist));
import { connect } from "react-redux";
import { contactTypes } from '../data';
import React, { Component } from 'react';
import UserService from "Services/users";
import GroupService from "Services/groups";
import ProductService from "Services/products";
import UserSelect from 'Components/UserSelect';
import { setRequestGlobalAction } from "Actions";
import { invitationObjects } from 'Helpers/datas';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogComponent from "Components/DialogComponent";
import { NotificationManager } from "react-notifications";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { Form, FormGroup, Input as InputStrap, Button, InputGroup, InputGroupAddon } from 'reactstrap';

class InvitationBox extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            type: null,
            value: null,
            object: null,
            member: null,
            booking: null,
            message: null,
            hasCode: false,
            loading: false,
            isMember: true,
            reference: null,
            reservationCode: null,
        }
    }

    handleChange = (__, value) => {
        this.setState({ activeTab: value });
    };

    findUserByReference = () => {
        if (!this.state.reference)
            return;
        this.props.setRequestGlobalAction(true),
            UserService.findUserByReference(this.state.reference)
                .then(response => this.setState({ member: response }))
                .catch(err => {
                    this.setState({ member: null });
                    console.log(err);
                    NotificationManager.error("Reference incorrecte");
                })
                .finally(() => this.props.setRequestGlobalAction(false))
    }

    findBooking = () => {
        if (!this.state.reservationCode) {
            return;
        }
        this.props.setRequestGlobalAction(true);
        ProductService.findBookingByCode(this.state.reservationCode, {natures: ['INVITATION'], usable: false})
        .then(response => {
            this.setState({ booking: response });
            NotificationManager.success("Le code de reservation est correct");
        })
        .catch(err => {
            this.setState({ booking: null });
            console.log(err);
            NotificationManager.error("Le code de reservation est incorrect");
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {
        const { object, type, value, member, message, booking } = this.state;
        if(!object || !message) {
            NotificationManager.error("Veuillez bien remplir le formulaire");
            return;
        }
        if (!member) {
            if(!type || !value) {
                NotificationManager.error("Veuillez bien remplir le formulaire");
                return;
            }
            if(['WHATSAPP', 'PHONE'].includes(type.value) && !value.startsWith('+')) {
                NotificationManager.error("Le numéro doit contenir le code pays (+237 par exemple)")
                return;
            }
        }
        let data: any = {message, object: object.value};
        if(member) {
            data.referralCode = member.referralCode;
        }
        if(type && value) {
            data.type = type.value;
            data.value = value;
        }
        if(booking) {
            data.code = booking.code
        }

        this.props.setRequestGlobalAction(true);
        GroupService.sendExternalGroupInvitation(data)
            .then(() => {
                NotificationManager.success("L'invitation a été envoyée avec succès");
                this.setState({ member: null, type: null, value: null, message: '', reference: null, booking: null, reservationCode: null, object: null, hasCode: false});
            })
            .catch(err => {
                NotificationManager.error("Reference incorrecte");
            })
            .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {
        const { type, message, value, object, hasCode, reservationCode, isMember } = this.state;
        return (
            <DialogComponent
                title="Nouvelle invitation"
                onClose={this.props.onClose}
                show={this.props.show}
            >                    
                <Form>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={isMember}
                                onChange={() => this.setState({ isMember: !isMember })}
                            />
                        } label={'Inviter un membre MicroCap'}
                        />
                    </FormGroup>
                    { isMember && (
                        <UserSelect label={'Numéro utilisateur'} onChange={(_, user) => {
                            this.setState({ member: user });
                        }}/>
                    )}
                    { !isMember && (
                        <>
                            <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                                <InputLabel className="text-left">
                                    Type de contact
                                </InputLabel>
                                <Autocomplete
                                    value={type}
                                    id="combo-box-demo"
                                    options={contactTypes}
                                    classes={{ paper: 'custom-input' }}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(__, item) => { this.setState({ type: item }) }}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </div>
                            { type && (
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="value">
                                        {
                                            type?.value === 'EMAIL' ? "Veuillez saisir l'adresse e-mail" : 
                                            type?.value === 'ADDRESS' ? "Veuillez saisir l'adresse" :
                                            "Veuillez saisir le numéro de télephone" 
                                        }
                                    </InputLabel>
                                    <InputStrap
                                        required
                                        id="value"
                                        type="text"
                                        name='value'
                                        value={value}
                                        className="input-lg"
                                        onChange={(e) => this.setState({ value: e.target.value })}
                                    />
                                </FormGroup>
                            )}
                        </>
                    )}
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                        <InputLabel className="text-left">
                            Objet
                        </InputLabel>
                        <Autocomplete
                            value={object}
                            id="combo-box-demo"
                            options={invitationObjects()}
                            classes={{ paper: 'custom-input' }}
                            getOptionLabel={(option) => option.label}
                            onChange={(__, item) => { this.setState({ object: item }) }}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="message">
                            Message associé
                        </InputLabel>
                        <InputStrap
                            id="message"
                            type="text"
                            name='message'
                            className="input-lg"
                            value={message}
                            onChange={(e) => this.setState({ message: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={hasCode}
                                onChange={() => this.setState({ hasCode: !hasCode })}
                            />
                        } label={'Associer un coupon de réduction'}
                        />
                    </FormGroup>
                    { hasCode && (
                        <FormGroup className="col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="reservationCode">
                                Code de parainnage
                            </InputLabel>
                            <InputGroup>
                                <InputStrap
                                    type="text"
                                    id="reservationCode"
                                    value={reservationCode}
                                    name={'reservationCode'}
                                    className="has-input input-lg custom-input"
                                    onChange={(e) => this.setState({ reservationCode: e.target.value })}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button color="primary" variant="contained" onClick={() => {
                                        this.findBooking();
                                    }} >
                                        <span className='text-white'>Vérifier</span>
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    )}
                    <FormGroup>

                        <Button
                            color="danger"
                            variant="contained"
                            onClick={() => this.props.onClose()}
                            className="text-white font-weight-bold"
                        >
                            Terminer
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold ml-5"
                        >
                            Envoyer l'invitation
                        </Button>
                    </FormGroup>
                </Form>
            </DialogComponent>
        );
    }
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(InvitationBox);

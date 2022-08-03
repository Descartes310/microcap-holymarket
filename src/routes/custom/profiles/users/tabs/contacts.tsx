import { connect } from 'react-redux';
import UserService from 'Services/users';
import { RctCard } from 'Components/RctCard';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Form } from 'reactstrap';

const PROFILE_BANNER = 'https://reactify.theironnetwork.org/static/media/profile-bg.5573c7e7.jpg';

const Personal = (props) => {

    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = () => {
        UserService.getContacts().then((contacts) => {
            setEmail(contacts.find(c => c.type === 'EMAIL')?.value);
            setPhone(contacts.find(c => c.type === 'PHONE')?.value);
            setAddress(contacts.find(c => c.type === 'ADDRESS')?.value)
        });
    }

    const onSubmit = () => {

        props.setRequestGlobalAction(true);

        let data: any = {};

        if(email) data.email = email;
        if(phone) data.phone = phone;
        if(address) data.address = address;

        UserService.updateContact(data).then(() => {
            NotificationManager.success('Le contact a été enregistré');
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.success("Une erreur s'est produite");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    return (
        <div className="userProfile-wrapper">
            <RctCard>
                <div className="profile-top mb-20" style={{ maxHeight: 260 }}>
                    <img src={PROFILE_BANNER} alt="profile banner" className="img-fluid" width="1920" height="200" />
                    <div className="profile-content">
                        <div className="media">
                            <img src={require('Assets/avatars/profile.jpg')} alt="user profile" className="rounded-circle mr-30 bordered" width="140" height="140" />
                            <div className="media-body pt-25">
                                <div className="mb-20">
                                    <h2>{props.authUser.userName}</h2>
                                    <p>{props.authUser.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-50">
                    <Form onSubmit={onSubmit}>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="reference">
                                Adresse email principale
                            </InputLabel>
                            <InputStrap
                                disabled
                                className="input-lg"
                                value={props.authUser.email}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="email">
                                Adresse email secondaire
                            </InputLabel>
                            <InputStrap
                                value={email}
                                className="input-lg"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="phone">
                                Numéro de téléphone
                            </InputLabel>
                            <InputStrap
                                value={phone}
                                className="input-lg"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="address">
                                Adresse
                            </InputLabel>
                            <InputStrap
                                value={address}
                                className="input-lg"
                                onChange={(e) => setAddress(e.target.value)}
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
                </div>
            </RctCard>
        </div>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Personal));
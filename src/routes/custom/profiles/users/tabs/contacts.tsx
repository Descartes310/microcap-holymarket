import CreateAlias from './alias';
import { connect } from 'react-redux';
import UserService from 'Services/users';
import { RctCard } from 'Components/RctCard';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Form } from 'reactstrap';

const PROFILE_BANNER = 'https://reactify.theironnetwork.org/static/media/profile-bg.5573c7e7.jpg';

const Personal = (props) => {

    const [alias, setAlias] = useState([]);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [showCreateAliasBox, setShowCreateAliasBox] = useState(false);

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = () => {
        UserService.getContacts().then((contacts) => {
            setAlias(contacts.filter(c => c.type === 'ALIAS'));
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

                        <h2>Mes Alias</h2>
                        <CustomList
                            list={alias}
                            loading={false}
                            onAddClick={() => setShowCreateAliasBox(true)}
                            itemsFoundText={n => `${n} alias trouvés`}
                            renderItem={list => (
                                <>
                                    {list && list.length === 0 ? (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucun alias trouvé
                                            </h4>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-hover table-middle mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="fw-bold">Alias</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list && list.map((item, key) => (
                                                        <tr key={key} className="cursor-pointer">
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{item.value}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </>
                            )}
                        />

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
            <CreateAlias show={showCreateAliasBox} onClose={() => setShowCreateAliasBox(false)} />
        </div>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Personal));
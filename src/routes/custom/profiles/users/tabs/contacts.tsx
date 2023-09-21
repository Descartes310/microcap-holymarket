import { connect } from 'react-redux';
import UserService from 'Services/users';
import { RctCard } from 'Components/RctCard';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CreateAlias from '../components//alias';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import CreateContact from '../components/createContact';
import UpdateContact from '../components/updateContact';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import ConfirmContactCode from '../components/confirmContactCode';
import { FormGroup, Input as InputStrap, Form } from 'reactstrap';
import { getContactTypeLabel, getStatusLabel } from '../../../../../data'

const PROFILE_BANNER = 'https://reactify.theironnetwork.org/static/media/profile-bg.5573c7e7.jpg';

const Personal = (props) => {

    const [alias, setAlias] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState(null);
    const [showCreateAliasBox, setShowCreateAliasBox] = useState(false);
    const [showCreateContactBox, setShowCreateContactBox] = useState(false);
    const [showUpdateContactBox, setShowUpdateContactBox] = useState(false);
    const [showConfirmContactBox, setShowConfirmContactBox] = useState(false);

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = () => {
        UserService.getContacts().then((response) => {
            setContacts(response)
            setAlias(response.filter(c => c.type === 'ALIAS'));
        });
    }

    const sendVerifyCode = (reference) => {
        props.setRequestGlobalAction(true);
        UserService.sendContactCode(reference).then(() => {
            setShowConfirmContactBox(true);
        }).finally(() => {
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
                    <Form>
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

                        <h2>Mes contacts</h2>
                        <CustomList
                            list={contacts.filter(c => c.type !== 'ALIAS')}
                            loading={false}
                            onAddClick={() => setShowCreateContactBox(true)}
                            itemsFoundText={n => `${n} contacts trouvés`}
                            renderItem={list => (
                                <>
                                    {list && list.length === 0 ? (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucun contact trouvé
                                            </h4>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-hover table-middle mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="fw-bold">Type</th>
                                                        <th className="fw-bold">Valeur</th>
                                                        <th className="fw-bold">Status</th>
                                                        <th className="fw-bold">Editer</th>
                                                        <th className="fw-bold">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list && list.map((item, key) => (
                                                        <tr key={key} className="cursor-pointer">
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{getContactTypeLabel(item.type)}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{item.value}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{getStatusLabel(item.status)}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <Button
                                                                        color="primary"
                                                                        variant="contained"
                                                                        className="text-white font-weight-bold"
                                                                        onClick={() => {
                                                                            setShowUpdateContactBox(true);
                                                                            setContact(item);
                                                                        }}
                                                                    >
                                                                        Editer
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                { item.status !== 'VERIFIED' && (
                                                                    <div className="media">
                                                                        <Button
                                                                            color="primary"
                                                                            variant="contained"
                                                                            className="text-white font-weight-bold"
                                                                            onClick={() => sendVerifyCode(item.id)}
                                                                        >
                                                                            Vérifier
                                                                        </Button>
                                                                    </div>
                                                                )}
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
                    </Form>
                </div>
            </RctCard>
            <CreateAlias show={showCreateAliasBox} onClose={() => setShowCreateAliasBox(false)} />
            <CreateContact show={showCreateContactBox} onClose={(reload = false) => {
                    setShowCreateContactBox(false);
                    if(reload)
                        getContacts();
                }
            } />
            {showUpdateContactBox && contact && (
                <UpdateContact 
                    show={showUpdateContactBox} 
                    contact={contact}
                    onClose={(reload = false) => {
                        setShowUpdateContactBox(false);
                        setContact(null);
                        if(reload) {
                            getContacts();
                        }
                    }} 
                />
            )}
            <ConfirmContactCode show={showConfirmContactBox} onClose={(reload = false) => {
                    setShowConfirmContactBox(false);
                    if(reload)
                        getContacts();
                }
            } />
        </div>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Personal));
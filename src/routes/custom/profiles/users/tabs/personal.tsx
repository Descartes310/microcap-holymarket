import { connect } from 'react-redux';
import { RctCard } from 'Components/RctCard';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import { getReferralTypeLabel } from 'Helpers/helpers';
import UpdateProfile from '../components/updateProfile';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import UserService from 'Services/users';

const PROFILE_BANNER = 'https://reactify.theironnetwork.org/static/media/profile-bg.5573c7e7.jpg';

const Personal = (props) => {

    const [showUpdateBox, setShowUpdateBox] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        UserService.userKYC().then((response) => {
            setUser(response)
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
                                <div>
                                    <h2>{user?.userName}</h2>
                                    <p>{user?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-50">
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Nom utilisateur
                        </InputLabel>
                        <InputStrap
                            disabled
                            className="input-lg"
                            value={user?.userName}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Email utilisateur
                        </InputLabel>
                        <InputStrap
                            disabled
                            className="input-lg"
                            value={user?.email}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Reference utilisateur
                        </InputLabel>
                        <InputStrap
                            disabled
                            className="input-lg"
                            value={user?.referralId}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Type de profile
                        </InputLabel>
                        <InputStrap
                            disabled
                            className="input-lg"
                            value={getReferralTypeLabel(user?.referralType)}
                        />
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Adresse de notification
                        </InputLabel>
                        <InputStrap
                            disabled
                            className="input-lg"
                            value={user?.notificationAddress}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            className="ml-0 text-white float-right"
                            onClick={() => {
                                setShowUpdateBox(true);
                            }}
                        >
                            Editer mes informations
                        </Button>
                    </FormGroup>
                </div>
            </RctCard>
            { user && (
                <UpdateProfile 
                    user={user} 
                    show={showUpdateBox} 
                    onClose={() => {
                        setShowUpdateBox(false);
                    }}
                />
            )}
        </div>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Personal));
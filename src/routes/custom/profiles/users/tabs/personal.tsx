import { connect } from 'react-redux';
import { RctCard } from 'Components/RctCard';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import { getReferralTypeLabel } from 'Helpers/helpers';
import UpdateProfile from '../components/updateProfile';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const PROFILE_BANNER = 'https://reactify.theironnetwork.org/static/media/profile-bg.5573c7e7.jpg';

const Personal = (props) => {

    const [showUpdateBox, setShowUpdateBox] = useState(false);

    useEffect(() => {
    }, []);

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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Nom utilisateur
                        </InputLabel>
                        <InputStrap
                            disabled
                            className="input-lg"
                            value={props.authUser.userName}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Email utilisateur
                        </InputLabel>
                        <InputStrap
                            disabled
                            className="input-lg"
                            value={props.authUser.email}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Reference utilisateur
                        </InputLabel>
                        <InputStrap
                            disabled
                            className="input-lg"
                            value={props.authUser.referralId}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Type de profile
                        </InputLabel>
                        <InputStrap
                            disabled
                            className="input-lg"
                            value={getReferralTypeLabel(props.authUser.referralType)}
                        />
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Adresse de notification
                        </InputLabel>
                        <InputStrap
                            disabled
                            className="input-lg"
                            value={props.authUser.notificationAddress}
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
            <UpdateProfile show={showUpdateBox} onClose={() => {
                    setShowUpdateBox(false);
                }
            } />
        </div>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Personal));
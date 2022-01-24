import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { RctCard } from 'Components/RctCard';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { getReferralTypeLabel } from 'Helpers/helpers';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const PROFILE_BANNER = 'https://reactify.theironnetwork.org/static/media/profile-bg.5573c7e7.jpg';

const Personal = (props) => {

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
                </div>
            </RctCard>
        </div>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Personal));
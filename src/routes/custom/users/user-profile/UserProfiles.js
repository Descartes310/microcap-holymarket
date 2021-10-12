import _ from 'lodash';
import React from 'react';
import {setAuthUser} from 'Actions';
import { Button } from "reactstrap";
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { updateUserProfile } from "Actions/independentActions";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

const UserCurrency = props => {

    const changeProfile = (id) => {
        setRequestGlobalAction(true);
        updateUserProfile(id).then(data => {
            props.setAuthUser()
        }).catch(err => {
            console.log(err)
        }).finall(() => {
            setRequestGlobalAction(false);
        })
    }
    
    return (
        <>
            <table className="table table-hover table-middle mb-0 text-center">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.authUser.user.profiles.map(p => (
                            <tr>
                                <td>{p.label}</td>
                                <td style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <div className="user-status-pending" style={{ position: 'relative' }}>
                                        <div className={`user-status-pending-circle rct-notify`} style={{
                                            background: props.authUser.user.profile.id === p.id ? 'green' : 'red'
                                        }} />
                                    </div>
                                </td>
                                <td>
                                    <Button
                                        size="small"
                                        color="primary"
                                        variant="contained"
                                        className={"text-white font-weight-bold mr-3 bg-blue"}
                                        onClick={() => changeProfile(p.id)}
                                    >
                                        Sélectionner
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );

}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, settings }) => {
    return { loading: requestGlobalLoader, authUser: authUser.data, currencies: settings.currencies }
};

export default withRouter(connect(mapStateToProps, { setRequestGlobalAction, setAuthUser })(injectIntl(UserCurrency)));

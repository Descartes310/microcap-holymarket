import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";
import { updateUserCurrency } from "Actions/independentActions";
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import { Button } from "reactstrap";
import {setAuthUser} from 'Actions';

const UserCurrency = props => {

    const changeCurrency = (id) => {
        setRequestGlobalAction(true);
        updateUserCurrency(id).then(data => {
            props.setAuthUser()
        }).catch(err => {

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
                        <th>Code</th>
                        <th>status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.currencies.map(c => (
                            <tr>
                                <td>{c.name}</td>
                                <td>{c.code}</td>
                                <td style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <div className="user-status-pending" style={{ position: 'relative' }}>
                                        <div className={`user-status-pending-circle rct-notify`} style={{
                                            background: props.authUser.user.currency ? c.code == props.authUser.user.currency.code ? 'green' : 'red' : c.code == 'EUR' ? 'green' : 'red'
                                        }} />
                                    </div>
                                </td>
                                <td>
                                    <Button
                                        size="small"
                                        color="primary"
                                        variant="contained"
                                        className={"text-white font-weight-bold mr-3 bg-blue"}
                                        onClick={() => changeCurrency(c.id)}
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

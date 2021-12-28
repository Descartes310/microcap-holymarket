import _ from 'lodash';
import {setAuthUser} from 'Actions';
import { Button } from "reactstrap";
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { changeUserToOrganisation, getUserOrganisations } from "Actions/independentActions";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";

const UserOrganisations = props => {

    const [organisations, setOrganisations] = useState([]);

    useEffect(() => {
        getOrganisations();
    }, [])

    const changeProfile = (id, comeIn) => {
        setRequestGlobalAction(true);
        changeUserToOrganisation(id, comeIn).then(() => {
            window.location.reload();
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setRequestGlobalAction(false);
        })
    }

    const getOrganisations = () => {
        setRequestGlobalAction(true);
        getUserOrganisations().then(organisations => {
            setOrganisations(organisations)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setRequestGlobalAction(false);
        })
    }
    
    return (
        <>
            <table className="table table-hover table-middle mb-0 text-center">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Immatriculation</th>
                        <th>Forme légale</th>
                        <th>Rejoindre</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        organisations.map(organisation => (
                            <tr>
                                <td>{organisation.commercialName}</td>
                                <td>{organisation.immatriculationValue}</td>
                                <td>{organisation.legalForm}</td>
                                <td>
                                    <Button
                                        size="small"
                                        color="primary"
                                        variant="contained"
                                        className={"text-white font-weight-bold mr-3 bg-blue"}
                                        onClick={() => changeProfile(organisation.id, organisation.id !== props.authUser.id || props.authUser.user.userType !== 'ORGANISATION')}
                                    >
                                        { organisation.id === props.authUser.id && props.authUser.user.userType === 'ORGANISATION' ? 'Quitter' : 'Rejoindre' }
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
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { loading: requestGlobalLoader, authUser: authUser.data }
};

export default withRouter(connect(mapStateToProps, { setRequestGlobalAction, setAuthUser })(injectIntl(UserOrganisations)));

import { Button } from "reactstrap";
import { connect } from 'react-redux';
import UserService from 'Services/users';
import { setSession } from 'Helpers/tokens';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ListRoles from '../components/listRoles';
import React, { useState, useEffect } from 'react';
import CreateAccessBox from '../components/createAccessBox';
import ChangeAccessCredentials from 'Components/ChangeAccessCredentials';

const Access = (props) => {

    const [access, setAccess] = useState([]);
    const [selectedAccess, setSelectedAccess] = useState(null);
    const [showListRolesBox, setShowListRolesBox] = useState(false);
    const [showCredentialBox, setShowCredentialBox] = useState(false);
    const [showCreateAccessBox, setShowCreateAccessBox] = useState(false);

    useEffect(() => {
        getAccess();
    }, []);

    const getAccess = () => {
        props.setRequestGlobalAction(true),
        UserService.getUserAccess()
        .then(response => setAccess(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeAccess = (id) => {
        props.setRequestGlobalAction(true),
        UserService.changeUserAccess(id)
        .then(response => {
            setSession(response);
            window.location.reload();
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <CustomList
                list={access}
                loading={false}
                showSearch={false}
                itemsFoundText={n => `${n} accès.s trouvé.s`}
                onAddClick={() => setShowCreateAccessBox(true)}
                rightComponent={() => (
                    <div className="col-md-12 col-sm-12 d-flex has-wrapper">
                        <Button
                            color="primary"
                            className="text-white mr-2 ml-10"
                            onClick={() => {
                                setShowListRolesBox(true);
                            }}
                        >
                            Procurations
                        </Button>
                    </div>
                )}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun accès.s trouvé.s
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Nom de l'accès</th>
                                            <th className="fw-bold">Type</th>
                                            <th className="fw-bold">Catégorie</th>
                                            <th className="fw-bold">Réference</th>
                                            <th className="fw-bold">Login</th>
                                            <th className="fw-bold">Status</th>
                                            <th className="fw-bold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.userName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                {item.type}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                {item.category}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.referralId}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                {item.login}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="d-flex align-items-center pt-25 pl-10">
                                                    <div className="media">
                                                        <div className="user-status-pending" style={{ position: 'relative' }}>
                                                            <div className={`user-status-pending-circle rct-notify`} style={{
                                                                background: item.reference == props.authUser.access ? 'green' : 'red'
                                                            }} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        size="small"
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => changeAccess(item.id)}
                                                        className={"text-white font-weight-bold mr-3"}
                                                        disabled={item.reference == props.authUser.access}
                                                    >
                                                        Connecter
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setSelectedAccess(item);
                                                            setShowCredentialBox(true);
                                                        }}
                                                        className={"text-white font-weight-bold mr-3"}
                                                    >
                                                        Editer
                                                    </Button>
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
            <ChangeAccessCredentials 
                access={selectedAccess}
                show={selectedAccess && showCredentialBox}
                onClose={() => {
                    setShowCredentialBox(false);
                    setSelectedAccess(false);
                }}
            />    
            <ListRoles 
                show={showListRolesBox} 
                onClose={() => {
                    setShowListRolesBox(false);
                }} 
            />        
            <CreateAccessBox show={showCreateAccessBox} onClose={(reload = false) => {
                setShowCreateAccessBox(false);
                if(reload)
                    getAccess();
                }} 
            />
        </>
    );
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Access));

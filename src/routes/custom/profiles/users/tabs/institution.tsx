import { connect } from 'react-redux';
import UserService from 'Services/users';
import { Button } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import CreateInstitution from 'Components/CreateInstitution';
import ListInstitutionMembers from "../components/listInstitutionMembers";

const Institutions = (props) => {

    const [agencies, setAgencies] = useState([]);
    const [showAddBox, setShowAddBox] = useState(false);
    const [showListBox, setShowListBox] = useState(false);
    const [selectedAgency, setSelectedAgency] = useState(null);

    useEffect(() => {
        getAgencies();
    }, []);

    const getAgencies = () => {
        props.setRequestGlobalAction(true),
        UserService.getInstitutions({type: 'BANK_AGENCY'})
        .then(response => setAgencies(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <CustomList
                loading={false}
                list={agencies}
                onAddClick={() => setShowAddBox(true)}
                itemsFoundText={n => `${n} agences trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun agences trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Nom</th>
                                            <th className="fw-bold">Code</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Membres</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                {item.code}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0">
                                                                {item.description}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => {
                                                            setSelectedAgency(item);
                                                            setShowListBox(true);
                                                        }}
                                                    >
                                                        Membres
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
            <CreateInstitution 
                type="BANK_AGENCY"
                show={showAddBox}
                onClose={() => {
                    setShowAddBox(false);
                    getAgencies();
                }}
                title="Création d'une nouvelle agence"
            />

            { showListBox && selectedAgency && (
                <ListInstitutionMembers 
                    show={showListBox}
                    onClose={() => {
                        setShowListBox(false);
                    }}
                    id={selectedAgency.id}
                />
            )}
        </>
    );
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Institutions));

import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import AddPrestationModal from '../../participants/mandates/addPrestation';

const List = (props) => {

    const [mandate, setMandate] = useState(null);
    const [mandates, setMandates] = useState([]);
    const [showAddPrestationBox, setShowAddPrestationBox] = useState(false);

    useEffect(() => {
        getParties();
    }, []);

    const getParties = () => {
        props.setRequestGlobalAction(true);
        if(props.authUser.referralTypes.includes('PROVIDER_SUPER_AGENT')) {
            BankService.getSubAgentMandates()
            .then(response => setMandates(response))
            .finally(() => props.setRequestGlobalAction(false))
        } else {
            BankService.getSuperAgentMandates()
            .then(response => setMandates(response))
            .finally(() => props.setRequestGlobalAction(false))
        }
    }

    const goToCreate = () => {
        props.history.push(BANK.PARTY.SUPER_AGENT.CREATE);
    }

    return (
        <>
            <CustomList
                list={mandates}
                loading={false}
                onAddClick={() => goToCreate()}
                itemsFoundText={n => `${n} réseau`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun réseau trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Reference</th>
                                            <th className="fw-bold">Responsable</th>
                                            <th className="fw-bold">Email</th>
                                            <th className="fw-bold">Prestations</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.name}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.referralCode}</h4>
                                                        </div>
                                                    </div>
                                                </td>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.email}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            setMandate(item);
                                                            setShowAddPrestationBox(true);
                                                        }}
                                                        className="text-white font-weight-bold"
                                                    >
                                                        Prestations
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

            { showAddPrestationBox && mandate && (
                <AddPrestationModal
                    show={showAddPrestationBox}
                    onClose={() => {
                        setShowAddPrestationBox(false);
                    }}
                    mandateReference={mandate.reference}
                    title={"Ajouter une prestation"}
                />
            )}
        </>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(List));

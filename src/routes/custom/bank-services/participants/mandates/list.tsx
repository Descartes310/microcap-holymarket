import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import AddPrestationModal from './addPrestation';
import React, { useState, useEffect } from 'react';
import CreateCreditModal from './creditCompensation';

const List = (props) => {

    const [parties, setParties] = useState([]);
    const [mandate, setMandate] = useState(null);
    const [referralCode, setReferralCode] = useState(null);
    const [showCreditBox, setShowCreditBox] = useState(false);
    const [showAddPrestationBox, setShowAddPrestationBox] = useState(false);

    useEffect(() => {
        getParties();
    }, []);

    const getParties = () => {
        setReferralCode(null);
        props.setRequestGlobalAction(true),
        BankService.getIntermediateParty()
        .then(response => setParties(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        props.history.push(BANK.ADMIN.MANDATE.CREATE);
    }

    return (
        <>
            <CustomList
                list={parties}
                loading={false}
                onAddClick={() => goToCreate()}
                itemsFoundText={n => `${n} intermédiaires trouvés`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun intermédiaires trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Nom commercial</th>
                                            <th className="fw-bold">Reference</th>
                                            <th className="fw-bold">Prestations</th>
                                            <th className="fw-bold">Prestations</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.commercialName}</h4>
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
                                                            <h4 className="m-0 fw-bold text-dark">{ item.prestations.join(", ")}</h4>
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
            { showCreditBox && referralCode && (
                <CreateCreditModal
                    show={showCreditBox}
                    onClose={() => {
                        setShowCreditBox(false);
                        getParties();
                    }}
                    referralCode={referralCode}
                    title={"Création d'un nouveau crédit"}
                />
            )}
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));

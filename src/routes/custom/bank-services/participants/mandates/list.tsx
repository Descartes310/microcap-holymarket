import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import CreateCreditModal from './creditCompensation';

const List = (props) => {

    const [parties, setParties] = useState([]);
    const [referralCode, setReferralCode] = useState(null);
    const [showCreditBox, setShowCreditBox] = useState(false);

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
                                            <th className="fw-bold">Solde d'exploitation</th>
                                            <th className="fw-bold">Solde de compensation</th>
                                            <th className="fw-bold">Créditer</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{ item.exploitationBalance ? item.exploitationBalance+' EUR' : '-' }</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{ item.compensation ? item.compensation.balance+' EUR' : '-' }</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td> 
                                                    { item.compensation && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                setShowCreditBox(true);
                                                                setReferralCode(item.referralCode);
                                                            }}
                                                            className="text-white font-weight-bold"
                                                        >
                                                            Créditer le compte
                                                        </Button>
                                                    )}
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
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));

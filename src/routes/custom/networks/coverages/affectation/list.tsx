import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TerritoryService from 'Services/territories';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import CreateCTOPartnershipModal from './createCTOPartnership';
import PartnershipService from 'Services/partnerships';

const List = (props) => {

    const [datas, setDatas] = useState([]);
    const [showPartnerShipModal, setShowPartnerShipModal] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        props.setRequestGlobalAction(true);
        PartnershipService.getAttachedCounters()
        .then(response => {
            setDatas(response);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Centre de traitement"}
            />
            <CustomList
                list={datas}
                loading={false}
                itemsFoundText={n => `${n} opérateurs trouvées`}
                onAddClick={() => setShowPartnerShipModal(true)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucunes opérateurs trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Guichet</th>
                                            <th className="fw-bold">CTO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.counterName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.partnerName}</h4>
                                                        </div>
                                                    </div>
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
            { showPartnerShipModal && (
                <CreateCTOPartnershipModal
                    type={'CTO'}
                    show={showPartnerShipModal}
                    onClose={() => {
                        setShowPartnerShipModal(false);
                    }}
                    title={"Affectation CTO MCM"}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
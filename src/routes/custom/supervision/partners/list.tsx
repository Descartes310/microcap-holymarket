import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import { getStatusLabel } from '../../../../data';
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from 'Components/TimeFromMoment';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const Partners = (props) => {

    const [datas, setDatas] = useState([]);
    const [status, setStatus] = useState('REJECT');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        props.setRequestGlobalAction(true);
        GroupService.getGroupRequests({types: ['VISIBILITY'], itemType: 'GROUP', status: 'PENDING'})
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

    const treatRequest = () => {
        if(selectedItem) {
            props.setRequestGlobalAction(true);
            GroupService.treatGroupRequest(selectedItem.reference, {status: status === 'ACCEPT'})
            .then(() => {
                getDatas();
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                props.setRequestGlobalAction(false);
                setSelectedItem(null);
                setShowConfirmBox(false);
                setStatus('REJECT');
            })
        }
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des requêtes"}
            />
            <CustomList
                list={datas}
                loading={false}
                itemsFoundText={n => `${n} requêtes trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune requête trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Partenaire</th>
                                            <th className="fw-bold">Requête</th>
                                            <th className="fw-bold">Date de demande</th>
                                            <th className="fw-bold">Status</th>
                                            <th className="fw-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.itemName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.requestName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 fw-bold text-dark"><TimeFromMoment time={item.createdAt} showFullDate /></p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 fw-bold text-dark">{getStatusLabel(item.status)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    { item.status === 'PENDING' && (
                                                        <>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                className="text-white font-weight-bold"
                                                                onClick={() => {
                                                                    setSelectedItem(item);
                                                                    setStatus('ACCEPT');
                                                                    setShowConfirmBox(true);
                                                                }}
                                                            >
                                                                Accepter
                                                            </Button>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                className="text-white btn-danger font-weight-bold ml-5"
                                                                onClick={() => {
                                                                    setSelectedItem(item);
                                                                    setStatus('REJECT');
                                                                    setShowConfirmBox(true);
                                                                }}
                                                            >
                                                                Rejetter
                                                            </Button>
                                                        </>
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

            <ConfirmBox
                show={showConfirmBox}
                rightButtonOnClick={() => {
                    treatRequest();
                }}
                leftButtonOnClick={() => {
                    setShowConfirmBox(false)
                }}
                message={`Etes vous sure de vouloir ${status === 'ACCEPT' ? 'Accepter' : 'Rejetter'} la requête ?`}
            />
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Partners));
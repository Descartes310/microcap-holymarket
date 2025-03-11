import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import {getStatusLabel } from "../../../../data";
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import {NotificationManager} from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const Users = (props) => {

    const [datas, setDatas] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    useEffect(() => {
        getCampaigns();
    }, []);

    const getCampaigns = () => {
        props.setRequestGlobalAction(true);
        GroupService.getSupervisedStructures()
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

    const changeProgression = (item) => {
        props.setRequestGlobalAction(true),
        GroupService.changeFinancialStructureProgression(item.reference, {})
        .then(() => {
            window.location.reload()
        })
        .catch((err) => {
            NotificationManager.error("Une erreur est survenue, veuillez reéssayer plus tard.");
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des campagnes"}
            />
            <CustomList
                list={datas}
                loading={false}
                itemsFoundText={n => `${n} campagnes trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune campagne trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Intitulé</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item?.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getStatusLabel(item.progression)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    { item.progression == 'PENDING' && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                setSelectedData(item);
                                                                setShowConfirmBox(true);
                                                            }}
                                                            className="text-white font-weight-bold"
                                                        >
                                                            Vérifier
                                                        </Button>
                                                    )}

                                                    { item.progression == 'VERIFIED' && (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                setSelectedData(item);
                                                                setShowConfirmBox(true);
                                                            }}
                                                            className="text-white font-weight-bold"
                                                        >
                                                            Approuver
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
            { selectedData && showConfirmBox && (
                <ConfirmBox
                    show={showConfirmBox}
                    rightButtonOnClick={() => {
                        changeProgression(selectedData);
                    }}
                    leftButtonOnClick={() => {
                        setSelectedData(null);
                        setShowConfirmBox(false);
                    }}
                    message={'Etes vous sure de vouloir confirmer cette action ?'}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Users));
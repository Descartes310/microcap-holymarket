import { connect } from 'react-redux';
import AssetService from 'Services/assets';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";
import { getPriceWithCurrency } from 'Helpers/helpers';
import { ASSETS, joinUrlWithParams } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import ManageAssetItemModal from '../components/manageAssetItemModal';

const Assets = (props) => {

    const [datas, setDatas] = useState([]);
    const [asset, setAsset] = useState(null);
    const [parent, setParent] = useState(null);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [showManagementBox, setShowManagementBox] = useState(false);

    useEffect(() => {
        loadDatas();
    }, [props.match.params.id, props.match.params.ref]);

    const loadDatas = () => {
        if(props.match.params.ref) {
            getSubChilds();
            findAsset();
        } else {
            getChilds();
        }
        findParent();
    }

    const getChilds = () => {
        props.setRequestGlobalAction(true);
        AssetService.getParentItems(props.match.params.id, {level: 1})
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

    const findParent = () => {
        props.setRequestGlobalAction(true);
        AssetService.findParent(props.match.params.id)
        .then(response => {
            setParent(response);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const findAsset = () => {
        props.setRequestGlobalAction(true);
        AssetService.findAsset(props.match.params.ref)
        .then(response => {
            setAsset(response);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getSubChilds = () => {
        props.setRequestGlobalAction(true);
        AssetService.getAssetItems(props.match.params.ref)
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
                title={"Démembrements ("+(asset ? asset.label : parent ? parent.label : "-")+")"}
            />
            <CustomList
                list={datas}
                loading={false}
                showAddIcon={false}
                itemsFoundText={n => `${n} démembrements trouvés`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun démembrement trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Valeur Ref.</th>
                                            <th className="fw-bold">Date emission</th>
                                            <th className="fw-bold">Date fin</th>
                                            <th className="fw-bold">Gestion</th>
                                            <th className="fw-bold">Actions</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.series.referenceWorth, item.parent.currency)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <TimeFromMoment time={item.series.startDate} showFullDate />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <TimeFromMoment time={item.series.endDate} showFullDate />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => {
                                                            setShowManagementBox(true);
                                                            setSelectedAsset(item);
                                                        }}
                                                    >
                                                        Gestion
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => {
                                                            props.history.push(joinUrlWithParams(ASSETS.ITEM.MINE_SUB_CHILD, [{param: 'id', value: props.match.params.id}, {param: 'ref', value: item.reference}]))
                                                        }}
                                                    >
                                                        Démembrements
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

            { (selectedAsset && showManagementBox) && (
                <ManageAssetItemModal
                    asset={selectedAsset}
                    show={showManagementBox}
                    title={"Gestion de l'actif"}
                    onClose={() => {
                        setShowManagementBox(false);
                        setSelectedAsset(null);
                    }}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Assets));
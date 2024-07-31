import { connect } from 'react-redux';
import AssetService from 'Services/assets';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { getPriceWithCurrency } from 'Helpers/helpers';
import { NotificationManager } from 'react-notifications';
import { getAssetSeriesTypeLabel } from 'Helpers/helpers';
import { ASSETS, joinUrlWithParams } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import CreateAssetItemModal from '../components/createAssetItemModal';
import ManageAssetItemModal from '../components/manageAssetItemModal';
import AssetMultiActionButton from '../components/assetMultiActionButton';

const Assets = (props) => {

    const [datas, setDatas] = useState([]);
    const [asset, setAsset] = useState(null);
    const [parent, setParent] = useState(null);
    const [showAddBox, setShowAddBox] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [showManagementBox, setShowManagementBox] = useState(false);

    useEffect(() => {
        loadDatas();
    }, [props.match.params.id, props.match.params.ref]);

    const loadDatas = () => {
        getSubChilds();
        findAsset();
        findParent();
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

    const onSubmit = (data) => {
        if(props.match.params.ref) {
            data = {...data, asset_reference: props.match.params.ref}
        }
        props.setRequestGlobalAction(true);
        AssetService.createItem(data)
        .then(() => {
            NotificationManager.success("La création est terminée");
            setShowAddBox(false);
            loadDatas();
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Démembrements ("+(asset ? asset.label : parent ? parent.label : "-")+")"} onBackClick={() => props.history.push(ASSETS.ITEM.LIST)}
            />
            <CustomList
                list={datas}
                loading={false}
                showAddIcon={false}
                addText={'Démembrer'}
                onAddClick={() => {
                    setShowAddBox(true);
                }}
                addingButton={datas.length > 0 && props.mine}
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
                                            <th className="fw-bold">Type</th>
                                            <th className="fw-bold">Valeur Ref.</th>
                                            <th className="fw-bold">Valeur résiduelle</th>
                                            <th className="fw-bold">Gestion</th>
                                            <th className="fw-bold">Démembrements</th>
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
                                                            <p className="m-0 fw-bold text-dark">{getAssetSeriesTypeLabel(item.type)}</p>
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
                                                            <p className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.residualWorth, item.currency)}</p>
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
                                                            props.history.push(joinUrlWithParams(ASSETS.ITEM.SUB_CHILD, [{param: 'id', value: props.match.params.id}, {param: 'ref', value: item.reference}]))
                                                        }}
                                                    >
                                                        Démembrements
                                                    </Button>
                                                </td>
                                                <td>
                                                    <AssetMultiActionButton position={key} asset={item} />
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
            <CreateAssetItemModal
                parent={parent}
                show={showAddBox}
                asset={asset}
                title={'Créer un démembrement'}
                onClose={() => {
                    setShowAddBox(false);
                }}
                onSubmit={onSubmit}
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
import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { getGeneralStatus, getPriceWithCurrency } from 'Helpers/helpers';
import ConfirmBox from "Components/dialog/ConfirmBox";
import {NotificationManager} from 'react-notifications';
import { GROUP, joinUrlWithParamsId } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const List = (props) => {    
    
    const [datas, setDatas] = useState([]);
    const [campaign, setCampaign] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [showConfirmClosing, setShowConfirmClosing] = useState(false);
    const [showConfirmActivation, setShowConfirmActivation] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const onToggleButton = (key) => {
        let currentArray = dropdownOpen;
        currentArray[key] = !currentArray[key];
        setDropdownOpen([...currentArray]);
    }

    const getDatas = () => {
        props.setRequestGlobalAction(true);
        GroupService.getCampaigns({reference: props.match.params.id}).then(response => {
            setDatas(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeCampaignStatus = () => {
        props.setRequestGlobalAction(true);
        GroupService.changeCampaignStatus(campaign.reference).then(() => {
            getDatas();
            setShowConfirmActivation(false);
            setShowConfirmClosing(false);
            setCampaign(null);
            NotificationManager.success("Opération effectuée avec succès");
        })
        .catch(() => {
            NotificationManager.error("Une erreur est survenue lors de l'element");
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Campagnes de financement"}
            />
            <CustomList
                list={datas}
                loading={false}
                itemsFoundText={n => `${n} données trouvées`}
                onAddClick={() => props.history.push(joinUrlWithParamsId(GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.CAMPAIGN_CREATE, props.match.params.id))}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun projets trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Montant</th>
                                            <th className="fw-bold">Date de debut</th>
                                            <th className="fw-bold">Date de fin</th>
                                            <th className="fw-bold">Status</th>
                                            <th className="fw-bold">Activer</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item?.amount, item?.currency)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.startDate}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.endDate}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getGeneralStatus().find(s => s.value == item.status)?.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <ButtonDropdown isOpen={dropdownOpen[key]} toggle={() => onToggleButton(key)} className="mr-3">
                                                        <DropdownToggle caret color='primary' style={{ color: 'white', fontSize: '0.9rem' }}>
                                                            Actions
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            { item.status == 'PENDING' && (
                                                                <DropdownItem style={{ color: 'black' }}
                                                                    onClick={() => {
                                                                        setCampaign(item);
                                                                        setShowConfirmClosing(false);
                                                                        setShowConfirmActivation(true);
                                                                    }}
                                                                >
                                                                    Activer
                                                                </DropdownItem>
                                                            )}
                                                            { item.status == 'ONGOING' && (
                                                                <DropdownItem style={{ color: 'black' }}
                                                                    onClick={() => {
                                                                        setCampaign(item);
                                                                        setShowConfirmActivation(false);
                                                                        setShowConfirmClosing(true);
                                                                    }}
                                                                >
                                                                    Cloturer
                                                                </DropdownItem>
                                                            )}
                                                        </DropdownMenu>
                                                    </ButtonDropdown>
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
            { showConfirmActivation && campaign && (
                <ConfirmBox
                    show={showConfirmActivation}
                    rightButtonOnClick={() => {
                        changeCampaignStatus();
                    }}
                    leftButtonOnClick={() => {
                        setShowConfirmActivation(false);
                        setCampaign(null);
                    }}
                    message={'Etes vous sure de vouloir activer cette campagne ?'}
                />
            )}
            { showConfirmClosing && campaign && (
                <ConfirmBox
                    show={showConfirmClosing}
                    rightButtonOnClick={() => {
                        changeCampaignStatus();
                    }}
                    leftButtonOnClick={() => {
                        setShowConfirmClosing(false);
                        setCampaign(null);
                    }}
                    message={'Etes vous sure de vouloir cloturer cette campagne ?'}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
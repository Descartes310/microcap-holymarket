import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import {NotificationManager} from 'react-notifications';
import { GROUP, joinUrlWithParamsId } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FinancialStructureSupports from "../configurations/_components/financialStructureSupports";

const List = (props) => {    
    
    const [datas, setDatas] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [showSupports, setShowSuppors] = useState(false);
    const [financialStructure, setFinancialStructure] = useState(null);

    useEffect(() => {
        getFinancialStructures();
    }, []);    
    
    const onToggleButton = (key) => {
        let currentArray = dropdownOpen;
        currentArray[key] = !currentArray[key];
        setDropdownOpen([...currentArray]);
    }

    const getFinancialStructures = () => {
        props.setRequestGlobalAction(true);
        let data: any = {type: props.type ?? 'PROJECT'};
        if(props.reference) {
            data.reference = props.reference;
        }
        GroupService.getFinancialStructures(data).then(response => {
            setDatas(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeStatus = (item) => {
        props.setRequestGlobalAction(true),
        GroupService.changeFinancialStructureStatus(item.reference)
        .then(() => {
            getFinancialStructures();
        })
        .catch((err) => {
            NotificationManager.error("Une erreur est survenue, veuillez reéssayer plus tard.");
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeFinancable = (item) => {
        props.setRequestGlobalAction(true),
        GroupService.changeFinancialStructureFinancable(item.reference)
        .then(() => {
            getFinancialStructures();
        })
        .catch((err) => {
            NotificationManager.error("Une erreur est survenue, veuillez reéssayer plus tard.");
        })
        .finally(() => props.setRequestGlobalAction(false))
    }
    
    return (
        <>
            { props.type === 'PROJECT' && (
                <PageTitleBar
                    title={"Structures financieres"}
                />
            )}
            <CustomList
                list={datas}
                loading={false}
                itemsFoundText={n => `${n} élements trouvés`}
                onAddClick={() => props.history.push(`${GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.CREATE}?type=${props.type ?? 'PROJECT'}${props.reference ? '&reference='+props.reference : ''}`)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun élement trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Intitulé</th>
                                            <th className="fw-bold">Status</th>
                                            <th className="fw-bold">Financable</th>
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
                                                    <Switch
                                                        aria-label="Par défaut"
                                                        checked={item.status}
                                                        onChange={() => { changeStatus(item) }}
                                                    />
                                                </td>
                                                <td>
                                                    <Switch
                                                        aria-label="Par défaut"
                                                        checked={item.financable}
                                                        onChange={() => { changeFinancable(item) }}
                                                    />
                                                </td>
                                                <td>
                                                    <ButtonDropdown isOpen={dropdownOpen[key]} toggle={() => onToggleButton(key)} className="mr-3">
                                                        <DropdownToggle caret color='primary' style={{ color: 'white', fontSize: '0.9rem' }}>
                                                            Actions
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            { item.progression === 'CONFIRMED' && (
                                                                <DropdownItem style={{ color: 'black' }}
                                                                    onClick={() => {
                                                                        props.history.push(joinUrlWithParamsId(GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.CAMPAIGN_LIST, item.reference))
                                                                    }}
                                                                >
                                                                    Campagnes
                                                                </DropdownItem>
                                                            )}
                                                            <DropdownItem style={{ color: 'black' }}
                                                                onClick={() => {
                                                                    setFinancialStructure(item);
                                                                    setShowSuppors(true);
                                                                }}
                                                            >
                                                                Supports
                                                            </DropdownItem>
                                                            <DropdownItem style={{ color: 'black' }}
                                                                onClick={() => {
                                                                }}
                                                            >
                                                                Détails
                                                            </DropdownItem>
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
            { financialStructure && showSupports && (
                <FinancialStructureSupports
                    show={showSupports}
                    onClose={() => {
                        setShowSuppors(false);
                    }}
                    financialStructure={financialStructure}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));


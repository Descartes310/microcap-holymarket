import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import { getOrderTypes } from 'Helpers/datas';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getOrderStatusItem } from 'Helpers/helpers';
import TimeFromMoment from 'Components/TimeFromMoment';
import OrderDetails from '../../_components/orderDetails';
import AccountAgreement from 'Components/AccountAgreement';
import PaymentRequest from '../../_components/paymentRequest';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const List = (props) => {

    const [purchases, setPurchases] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showPaymentRequest, setShowPaymentRequest] = useState(false);
    const [showAccountAgreementBox, setShowAccountAgreementBox] = useState(false);

    const onToggleButton = (key) => {
        let currentArray = dropdownOpen;
        currentArray[key] = !currentArray[key];
        setDropdownOpen([...currentArray]);
    }

    useEffect(() => {
        getPurchases();
    }, []);

    const getPurchases = () => {
        props.setRequestGlobalAction(true);
        OrderService.getPurchases()
        .then(response => setPurchases(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar title={'Mes ventes'} />
            <CustomList
                list={purchases}
                loading={false}
                itemsFoundText={n => `${n} ventes trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune vente trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Client</th>
                                            <th className="fw-bold">Telephone</th>
                                            <th className="fw-bold">Date</th>
                                            <th className="fw-bold">Status</th>
                                            <th className="fw-bold">Type</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.userName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.telephone}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                <TimeFromMoment time={item.createdAt} showFullDate />
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                    alignItems: 'center'
                                                }}>
                                                    <div className="media">
                                                        {getOrderStatusItem(item.status) ?
                                                            <span style={{ backgroundColor: `${getOrderStatusItem(item.status).color}`, border: 5, padding: 10, borderRadius: 5, color: 'white' }}>
                                                                { getOrderStatusItem(item.status).label }
                                                            </span>
                                                            : '-'
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getOrderTypes().find(ot => ot.value == item.orderType)?.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <ButtonDropdown isOpen={dropdownOpen[key]} toggle={() => onToggleButton(key)} className="mr-3">
                                                        <DropdownToggle caret color='primary' style={{ color: 'white', fontSize: '0.9rem' }}>
                                                            Actions
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            { item.status != 'PAID' && (
                                                                <DropdownItem style={{ color: 'black' }}
                                                                    onClick={() => {
                                                                        setSelectedItem(item);
                                                                        setShowAccountAgreementBox(false);
                                                                        setShowDetails(false); 
                                                                        setShowPaymentRequest(true);
                                                                    }}
                                                                >
                                                                    Encaissement
                                                                </DropdownItem>
                                                            )}
                                                            { ((item.mirrorAccount || item.account) && item.externalReference)  && (
                                                                <DropdownItem style={{ color: 'black' }} onClick={() => {
                                                                    setSelectedItem(item);
                                                                    setShowDetails(false);
                                                                    setShowPaymentRequest(false);
                                                                    setShowAccountAgreementBox(true);
                                                                }}>
                                                                    Convention
                                                                </DropdownItem>
                                                            )}
                                                            <DropdownItem style={{ color: 'black' }} onClick={() => {
                                                                setSelectedItem(item);
                                                                setShowPaymentRequest(false);
                                                                setShowAccountAgreementBox(false);
                                                                setShowDetails(true);
                                                            }}>
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
                        { showAccountAgreementBox && selectedItem && (
                            <AccountAgreement 
                                show={showAccountAgreementBox}
                                title={'Convention de compte'}
                                onClose={() => setShowAccountAgreementBox(false)}
                                accountReference={selectedItem?.externalReference}
                            />
                        )}
                        { showDetails && selectedItem && (
                            <OrderDetails 
                                show={showDetails}
                                reference={selectedItem?.reference}
                                onClose={() => setShowDetails(false)}
                            />
                        )}

                        { showPaymentRequest && selectedItem && (
                            <PaymentRequest 
                                show={showPaymentRequest}
                                defaultType={selectedItem?.orderType}
                                defaultReference={selectedItem?.reference}
                                onClose={() => setShowPaymentRequest(false)}
                            />
                        )}
                    </>
                )}
            />
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));
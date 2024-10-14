import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import { getOrderTypes } from 'Helpers/datas';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getOrderStatusItem } from 'Helpers/helpers';
import TimeFromMoment from 'Components/TimeFromMoment';
import {NotificationManager} from 'react-notifications';
import OrderDetails from '../../_components/orderDetails';
import AccountAgreement from 'Components/AccountAgreement';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import PaymentRequestModal from '../../_components/paymentRequestModal';
import AccountInformationModal from '../components/accountInformations';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FundingService from 'Services/funding';

const List = (props) => {

    const [purchases, setPurchases] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [showPaymentRequest, setShowPaymentRequest] = useState(false);
    const [showAccountInfoModal, setShowAccountInfoModal] = useState(false);
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

    const sendPaymentRequest = (item: any) => {
        props.setRequestGlobalAction(true)
        OrderService.initiatePayment(item.reference, {})
         .then(() => {
            NotificationManager.success("La demande de paiement a été envoyée");
            setShowPaymentRequest(false);
            setSelectedItem(null);
         })
         .catch((err) => {
            NotificationManager.error("Une erreur est survenue");
         })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const activateAccount = (externalReference) => {

        let data = {
            use_domiciliation_datas: false
        };

        props.setRequestGlobalAction(true);
        FundingService.activateAccount(externalReference, data)
        .then(() => {
            NotificationManager.success('Opération déroulée avec succès');
            window.location.reload();
        })
        .catch(err => {
            if(err?.response?.status == 409) {
                NotificationManager.error('Ce numéro de compte existe déjà');
            } else {
                NotificationManager.error('Ce compte n\'est pas prêt pour activation');
            }
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        });
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
                                                                        // setShowConfirmBox(true);
                                                                    }}
                                                                >
                                                                    Encaissement
                                                                </DropdownItem>
                                                            )}
                                                            { ((item.mirrorAccount || item.account) && item.externalReference && !item.accountActivated) && (
                                                                <DropdownItem style={{ color: 'black' }} onClick={() => {
                                                                    setSelectedItem(item);
                                                                    setShowDetails(false);
                                                                    setShowPaymentRequest(false);
                                                                    setShowAccountAgreementBox(true);
                                                                }}>
                                                                    Convention
                                                                </DropdownItem>
                                                            )}
                                                            { ((item.mirrorAccount || item.account) && item.externalReference && !item.accountActivated && item.agreementSent) && (
                                                                <DropdownItem style={{ color: 'black' }} onClick={() => {
                                                                    setShowDetails(false);
                                                                    setShowPaymentRequest(false);
                                                                    setShowAccountAgreementBox(false);
                                                                    if(item.mirrorAccount) {
                                                                        setSelectedItem(item);
                                                                        setShowAccountInfoModal(true);
                                                                    } else {
                                                                        activateAccount(item.externalReference);
                                                                    }
                                                                }}>
                                                                    { item.mirrorAccount ? 'Configurer et activer' : 'Activer le compte' }
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
                            <PaymentRequestModal
                                disabled={true}
                                show={showPaymentRequest}
                                defaultType={selectedItem?.orderType}
                                defaultReference={selectedItem?.reference}
                                onClose={() => setShowPaymentRequest(false)}
                                sendPaymentData={(paymentData) => {
                                    sendPaymentRequest(paymentData)
                                }}
                            />
                        )}
                        { showAccountInfoModal && (
                            <AccountInformationModal
                                order={selectedItem}
                                show={showAccountInfoModal}
                                onClose={() => {
                                    setShowAccountInfoModal(false);
                                }}
                                title={"Informations du compte"}
                            />
                        )}

                        {/* { selectedItem && showConfirmBox && (
                            <ConfirmBox
                                show={showConfirmBox}
                                rightButtonOnClick={() => {
                                    setShowConfirmBox(false);
                                    setShowPaymentRequest(true);
                                }}
                                leftButtonOnClick={() => {
                                    setSelectedItem(null);
                                    setShowConfirmBox(false);
                                }}
                                message={'Etes-vous sure de vouloir relancer la demande d\'encaissement ?'}
                            />
                        )} */}
                    </>
                )}
            />
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));
import { connect } from 'react-redux';
import { getStatusLabel } from 'Data';
import DetailsSubscription from './details';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProjectService from 'Services/projects';
import React, { useEffect, useState } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import TimeFromMoment from "Components/TimeFromMoment";
import {NotificationManager} from 'react-notifications';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const List = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const [showDetailsSubscription, setShowDetailsSubscription] = useState(false);
    const [showRejectSubscriptionBox, setShowRejectSubscriptionBox] = useState(false);
    const [showValidateSubscriptionBox, setShowValidateSubscriptionBox] = useState(false);

    const onToggleButton = (key) => {
        let currentArray = dropdownOpen;
        currentArray[key] = !currentArray[key];
        setDropdownOpen([...currentArray]);
    }
    
    useEffect(() => {
        getProjectSubscriptions();
    }, []);

    const getProjectSubscriptions = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getAllProjectSubscriptions().then(response => {
            setSubscriptions(response);
        })
        .finally(() => props.setRequestGlobalAction(false));
    }

    const valdiateProjectSubscription = (status) => {
        props.setRequestGlobalAction(true);
        ProjectService.getValidateProjectSubscription(subscription.reference, {status}).then(response => {
            NotificationManager.success('Souscription traitée avec succès');
            getProjectSubscriptions();
        })
        .catch(() => {
            NotificationManager.error('Une erreur est survenue')
        })
        .finally(() => {
            setSubscription(null);
            props.setRequestGlobalAction(false);
        });
    }

    return (
        <>
            <CustomList
                list={subscriptions}
                loading={false}
                itemsFoundText={n => `${n} souscriptions trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune souscription trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Intitulé</th>
                                            <th className="fw-bold">Date de création</th>
                                            <th className="fw-bold">Membre</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark"><TimeFromMoment time={item.createdAt} /></h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.fullName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="user-status-pending d-flex flex-row align-items-center" style={{ position: 'relative' }}>
                                                            <div className={`user-status-pending-circle rct-notify mr-10`} style={{
                                                                    background: item?.status == 'APPROVED' ? 'green' : item?.status == 'PENDING' ? 'orange' : 'red'
                                                            }} />
                                                            {getStatusLabel(item.status)}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <ButtonDropdown isOpen={dropdownOpen[key]} toggle={() => onToggleButton(key)} className="mr-3" positionFixed={true}>
                                                        <DropdownToggle caret color='primary' style={{ color: 'white', fontSize: '0.9rem' }}>
                                                            Actions
                                                        </DropdownToggle>
                                                        <DropdownMenu  container={'body'}>
                                                            <DropdownItem style={{ color: 'black' }}
                                                                onClick={() => {
                                                                    setSubscription(item);
                                                                    setShowDetailsSubscription(true);
                                                                }}
                                                            >
                                                                Détails
                                                            </DropdownItem>
                                                            { item.status === 'PENDING' && (
                                                                <DropdownItem style={{ color: 'black' }}
                                                                    onClick={() => {
                                                                        setSubscription(item);
                                                                        setShowValidateSubscriptionBox(true);
                                                                    }}
                                                                >
                                                                    Approuver
                                                                </DropdownItem>
                                                            )}
                                                            { item.status === 'PENDING' && (
                                                                <DropdownItem style={{ color: 'black' }} onClick={() => {
                                                                        setSubscription(item);
                                                                        setShowRejectSubscriptionBox(true);
                                                                    }}
                                                                >
                                                                    Rejeter
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
            { showDetailsSubscription && subscription && (
                <DetailsSubscription
                    show={showDetailsSubscription}
                    onClose={() => {
                        setShowDetailsSubscription(false);
                    }}
                    subscription={subscription}
                />
            )}

            { showValidateSubscriptionBox && subscription && (
                <ConfirmBox
                    show={showValidateSubscriptionBox}
                    rightButtonOnClick={() => valdiateProjectSubscription(true)}
                    leftButtonOnClick={() => {
                        setShowValidateSubscriptionBox(false);
                        setSubscription(null);
                    }}
                    message={'Etes vous sure de valider cette souscription ?'}
                />
            )}
            { showRejectSubscriptionBox && subscription && (
                <ConfirmBox
                    show={showRejectSubscriptionBox}
                    rightButtonOnClick={() => valdiateProjectSubscription(false)}
                    leftButtonOnClick={() => {
                        setShowRejectSubscriptionBox(false);
                        setSubscription(null);
                    }}
                    message={'Etes vous sure de rejetter cette souscription ?'}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));

import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AccountService from 'Services/accounts';
import CustomList from "Components/CustomList";
import AccountProfile from './accountProfile';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import { getPriceWithCurrency } from 'Helpers/helpers';
import { NotificationManager } from 'react-notifications';
import { FUNDING, joinUrlWithParamsId } from 'Url/frontendUrl';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import CodevStep1 from 'Routes/custom/marketplace/shop/components/codev/step1';
import CodevStep2 from 'Routes/custom/marketplace/shop/components/codev/step2';
import CodevStep3 from 'Routes/custom/marketplace/shop/components/codev/step3';
import CodevStep4 from 'Routes/custom/marketplace/shop/components/codev/step4';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import OrderService from 'Services/orders';

const List = (props) => {

    const [accounts, setAccounts] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [showProfiles, setShowProfiles] = useState(false);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const [codevData, setCodevData] = useState(null);
    const [showCodevStep1, setShowCodevStep1] = useState(false);
    const [showCodevStep2, setShowCodevStep2] = useState(false);
    const [showCodevStep3, setShowCodevStep3] = useState(false);
    const [showCodevStep4, setShowCodevStep4] = useState(false);

    useEffect(() => {
        getAccounts();
    }, []);

    const onToggleButton = (key) => {
        let currentArray = dropdownOpen;
        currentArray[key] = !currentArray[key];
        setDropdownOpen([...currentArray]);
    }

    const getAccounts = () => {
        props.setRequestGlobalAction(true),
        AccountService.getAccountProfiles()
                .then(response => setAccounts(response))
                .finally(() => props.setRequestGlobalAction(false))
    }

    const createExternalAccount = () => {

        if(!selectedAccount) {
            return;
        }

        let data = {
            account_reference: selectedAccount.reference, type: 'BANK'
        };

        props.setRequestGlobalAction(true);

        AccountService.createExternalAccount(data).then(() => {
            NotificationManager.success('Le compte a été enregistré');
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
            setSelectedAccount(null);
            setShowConfirmBox(false);
            getAccounts();
        });
    }

    const configureProduct = (formData) => {
    
        let data: any = {};

        data.lineCount = formData.lineCount;
        data.tirageArray = JSON.stringify(formData.tirages);
        data.subscriptionType = formData.subscriptionType.value;
                    
        if(formData.alias != null)
            data.alias = formData.alias.value;

        if(formData.projectReference != null)
            data.projectReference = formData.projectReference;

        if(formData.distribution != null)
            data.distribution = formData.distribution;
            
        if(formData.indivision) {
            if(formData.tickets) {
                data.tickets = formData.tickets.join(',');
            } else {
                data.unit_amount = formData.indivision.unitAmount;
                data.distribution = formData.indivision.distribution;
                data.denomination = formData.indivision.denomination;
            }
        }

        props.setRequestGlobalAction(true),
        OrderService.subscribeNewLine(selectedAccount.reference, data)
            .then(() => {
                setSelectedAccount(null);
                setShowCodevStep4(false)
                NotificationManager.success("La configuration a été effectuée");
            })
            .catch(err => {
                console.log(err);
                setSelectedAccount(null);
                NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard");
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar title={'Mes comptes'} />
            <CustomList
                list={accounts}
                loading={false}
                itemsFoundText={n => `${n} comptes`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun comptes
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">#Reference</th>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Type de compte</th>
                                            <th className="fw-bold">Solde</th>
                                            <th className="fw-bold">Détails</th>
                                            <th className="fw-bold">Profile</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">#{item.reference.split('_').pop().toUpperCase()}</h4>
                                                        </div>
                                                    </div>
                                                </td>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.accountType.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.balance, item.currencyCode)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(FUNDING.ACCOUNT.DETAILS, item.id))}
                                                    >
                                                        Détails
                                                    </Button>
                                                </td>
                                                <td>
                                                    { item.owner && (

                                                        <ButtonDropdown isOpen={dropdownOpen[key]} toggle={() => onToggleButton(key)} className="mr-3" positionFixed={true}>
                                                            <DropdownToggle caret color='primary' style={{ color: 'white', fontSize: '0.9rem' }}>
                                                                Actions
                                                            </DropdownToggle>
                                                            <DropdownMenu  container={'body'}>
                                                                <DropdownItem style={{ color: 'black' }}
                                                                    onClick={() => {
                                                                        setSelectedAccount(item);
                                                                        setShowProfiles(true);
                                                                    }}
                                                                >
                                                                    Profile
                                                                </DropdownItem>
                                                                { !item.externalAccountReference && (
                                                                    <DropdownItem style={{ color: 'black' }}
                                                                        onClick={() => {
                                                                            setSelectedAccount(item);
                                                                            setShowConfirmBox(true);
                                                                        }}
                                                                    >
                                                                        Créer le compte externe
                                                                    </DropdownItem>
                                                                )}
                                                                { item.codevAccount && item.hasPaymentAccount && item.subscriptionType && (
                                                                    <DropdownItem style={{ color: 'black' }}
                                                                        onClick={() => {
                                                                            setSelectedAccount(item);
                                                                            setShowCodevStep1(true);
                                                                        }}
                                                                    >
                                                                        Souscrire à une ligne
                                                                    </DropdownItem>
                                                                )}
                                                            </DropdownMenu>
                                                        </ButtonDropdown>
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
            { showProfiles && selectedAccount && (
                <AccountProfile
                    reference={selectedAccount.reference}
                    show={showProfiles && selectedAccount}
                    title='Liste des profiles'
                    onClose={() => {
                        setShowProfiles(false);
                        setSelectedAccount(null);
                    }}
                />
            )}

            { showConfirmBox && selectedAccount && (
                <ConfirmBox
                    show={showConfirmBox}
                    rightButtonOnClick={() => {
                        createExternalAccount();
                    }}
                    leftButtonOnClick={() => {
                        setShowConfirmBox(false);
                        setSelectedAccount(null);
                    }}
                    message={`Etes vous sure de vouloir créer un compte externe associé ?`}
                />
            )}

            { showCodevStep1 && selectedAccount && (
                <CodevStep1 
                    product={{reference: selectedAccount.baseProductReference}}
                    show={showCodevStep1}
                    referralCode={selectedAccount.referralCode}
                    subscriptionType={selectedAccount.subscriptionType}
                    onClose={() => setShowCodevStep1(false)}
                    onSubmit={(data) => {
                        if(data?.subscriptionType.value == 'INDIVISION') {
                            setCodevData(data);
                            setShowCodevStep1(false);
                            setShowCodevStep2(false);
                            setShowCodevStep3(data.indivision.reference ? true : false);
                            setShowCodevStep4(data.indivision.reference ? false : true);
                        } else {
                            setCodevData(data);
                            setShowCodevStep1(false);
                            setShowCodevStep2(false);
                            setShowCodevStep3(false);
                            setShowCodevStep4(true);
                        }
                    }}
                />
            )}
            { showCodevStep2 && selectedAccount && (
                <CodevStep2 
                    data={codevData}
                    product={selectedAccount}
                    show={showCodevStep2}
                    referralCode={selectedAccount.referralCode}
                    onClose={() => setShowCodevStep2(false)}						
                    onSubmit={(data) => {
                        setCodevData(data);
                        setShowCodevStep1(false);
                        setShowCodevStep2(false);
                        setShowCodevStep3(data.newIndivision);
                        setShowCodevStep4(!data.newIndivision);
                    }}
                />
            )}
            { showCodevStep3 && selectedAccount && (
                <CodevStep3 
                    data={codevData}
                    product={selectedAccount}
                    show={showCodevStep3}
                    referralCode={selectedAccount.referralCode}
                    onClose={() => setShowCodevStep3(false)}
                    onSubmit={(data) => {
                        setCodevData(data);
                        setShowCodevStep1(false);
                        setShowCodevStep2(false);
                        setShowCodevStep3(false);
                        setShowCodevStep4(true);
                    }}
                />
            )}
            { showCodevStep4 && selectedAccount && (
                <CodevStep4
                    data={codevData}
                    product={{reference: selectedAccount.baseProductReference}}
                    show={showCodevStep4}
                    referralCode={selectedAccount.referralCode}
                    onClose={() => setShowCodevStep4(false)}
                    onSubmit={(data) => {
                        configureProduct(data);
                        setShowCodevStep1(false);
                        setShowCodevStep2(false);
                        setShowCodevStep3(false);
                        setShowCodevStep4(false);
                    }}
                />
            )}
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));
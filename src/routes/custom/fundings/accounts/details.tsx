import '../resources/index.css';
import { connect } from 'react-redux';
import CreateTicket from './createTicket';
import AccountDeals from './accountDeals';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import AccountService from 'Services/accounts';
import CodevPrevisions from './codevPrevisions';
import { Input as InputStrap } from 'reactstrap';
import { setRequestGlobalAction } from 'Actions';
import CodevChildTicket from './codevChildTickets';
import DebitAccount from 'Components/DebitAccount';
import React, { useState, useEffect } from 'react';
import { ACCOUNT_PERIOD_LIMIT } from 'Helpers/datas';
import ConfirmBox from "Components/dialog/ConfirmBox";
import Provisioning from '../components/Provisioning';
import Cantonnement from '../components/Cantonnement';
import { Card, CardBody, CardTitle } from 'reactstrap';
import TimeFromMoment from 'Components/TimeFromMoment';
import { NotificationManager } from 'react-notifications';
import { FUNDING, joinUrlWithParamsId } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { getPriceWithCurrency, convertDate } from 'Helpers/helpers';
import CodevParticipants from "Routes/custom/marketplace/orders/Participants";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Details = (props) => {

    const today = new Date();
    const previousDate = new Date();
    const [account, setAccount] = useState(null);
    const [mouvements, setMouvements] = useState([]);
    const [provisions, setProvisions] = useState([]);
    const [showDealBox, setShowDealBox] = useState(false);
    const [provisionData, setProvisionData] = useState(null);
    const [showTicketBox, setShowTicketBox] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);
    previousDate.setDate(previousDate.getDate() - ACCOUNT_PERIOD_LIMIT);
    const [showChildTicketBox, setShowChildTicketBox] = useState(false);
    const [showDebitAccountBox, setShowDebitAccountBox] = useState(false);
    const [showCantonnementBox, setShowCantonnementBox] = useState(false);
    const [showProvisioningBox, setShowProvisioningBox] = useState(false);
    const [endDate, setEndDate] = useState(convertDate(today, 'YYYY-MM-DD'));
    const [showCreateChildTicketBox, setShowCreateChildTicketBox] = useState(false);
    const [startDate, setStartDate] = useState(convertDate(previousDate, 'YYYY-MM-DD'));

    useEffect(() => {
        findAccount();
    }, []); 
    
    useEffect(() => {
        if(account) {
            getMouvements();
        }
    }, [account, startDate, endDate]); 
    
    useEffect(() => {
        if(account) {
            getMouvements();
            getProvisions();
        }
    }, [account]);

    const findAccount = () => {
        props.setRequestGlobalAction(true);
        AccountService.getAccount(props.match.params.id).then(response => {
            setAccount(response);
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getMouvements = () => {
        props.setRequestGlobalAction(true);
        AccountService.getAccountMouvements(account.id, {types: ['POSITION', 'SYNCRONISATION'], startDate, endDate}).then(response => {
            setMouvements(response);
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getProvisions = () => {
        props.setRequestGlobalAction(true);
        AccountService.getAccountMouvements(account.id, {types: ['PROVISION', 'FREEZE']}).then(response => {
            setProvisions(response);
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getDetails = (keys) => {
        const details = account?.details?.find(d => keys.includes(d.type));
        return details ? details.value : null
    }

    const onProvisioning = (paymentAccount, amount, currency, use_reserve = false) => {

        if(amount <= 0 || !paymentAccount || !currency) {
            return;
        }

        props.setRequestGlobalAction(true);

        let data: any = {amount, currency, use_reserve};

        data.paymentAccountReference = paymentAccount.reference;
       
        AccountService.provisioning(account.reference, data).then(() => {
            findAccount();
            getMouvements();
            setShowProvisioningBox(false);
            setProvisionData(null);
            setShowConfirmBox(false);
        })
        .catch((err) => {
            if(err?.response?.status === 412) {
                NotificationManager.error("Le solde du compte de paiement est insuffisant");
                setShowConfirmBox(false);
            } else if(err?.response?.status === 426) {
                setProvisionData(data);
                setShowConfirmBox(true);
                console.log("ICI => ", data)
            } else {
                NotificationManager.error("Une erreur est survenue, veuillez réessayer plus tard.");
                setShowConfirmBox(false);
            }
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onCantonnement = (amount, currency, receiverAccount, dueDate, reason) => {

        if(amount <= 0 || !receiverAccount || !currency || !dueDate || !reason) {
            return;
        }

        props.setRequestGlobalAction(true);

        let data: any = {amount, currency, account_reference: receiverAccount.reference, dueDate, reason};

        AccountService.cantonnatedAccount(account.reference, data).then(() => {
            findAccount();
            getMouvements();
            setShowCantonnementBox(false);
        })
        .catch(() => {
            NotificationManager.error("Une erreur est survenue, veuillez réessayer plus tard.");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onDebit = (amount, reason) => {

        if(amount <= 0)
            return;

        props.setRequestGlobalAction(true);

        let data: any = {};

        data.amount = amount;
        data.reason = reason;
       
        AccountService.debitAccount(account.id, data).then(() => {
            findAccount();
            getMouvements();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
            setShowDebitAccountBox(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Détails du compte"}
            />
            <RctCollapsibleCard>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 mb-30">
                        <Card style={{ border: 0 }}>
                            <CardBody>
                                <CardTitle className="d-flex justify-content-between">
                                    <div style={{ flex: 1 }}>
                                        { getDetails(['IBAN', 'BIC']) && (
                                            <>
                                                <h2 className='fw-bold mt-10'>Reference</h2>
                                                { getDetails(['IBAN']) && <p>IBAN: {getDetails(['IBAN'])}</p> }
                                                { getDetails(['BIC']) && <p>BIC: {getDetails(['BIC'])}</p> }
                                            </>
                                        )}
                                        { getDetails(['BANK_NAME', 'AGENCY_NAME']) && (
                                            <>
                                                <h2 className='fw-bold mt-10'>Domiciliation</h2>
                                                { getDetails(['BANK_NAME']) && <p>Etablissement: {getDetails(['BANK_NAME'])}</p> }
                                                { getDetails(['AGENCY_NAME']) && <p>Agence: {getDetails(['AGENCY_NAME'])}</p> }
                                            </>
                                        )}
                                        { getDetails(['ADVISOR_NAME', 'ADVISOR_PHONE', 'ADVISOR_EMAIL']) && (
                                            <>
                                                <h2 className='fw-bold mt-10'>Conseiller</h2>
                                                { getDetails(['ADVISOR_NAME']) && <p>Noms: {getDetails(['ADVISOR_NAME'])}</p> }
                                                { getDetails(['ADVISOR_PHONE']) && <p>Télephone: {getDetails(['ADVISOR_PHONE'])}</p> }
                                                { getDetails(['ADVISOR_EMAIL']) && <p>Adresse email: {getDetails(['ADVISOR_EMAIL'])}</p> }
                                            </>
                                        )}
                                    </div>
                                    <div className='d-flex flex-column align-items-end' style={{ flex: 1 }}>
                                        <div>
                                            { account?.hasDeals &&  (
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => setShowDealBox(true)}
                                                    className="text-white font-weight-bold ml-10"
                                                >
                                                    Deals
                                                </Button>
                                            )}
                                            { account?.hasPrevision && (
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => setShowTicketBox(true)}
                                                    className="text-white font-weight-bold ml-10"
                                                >
                                                    Echéancier
                                                </Button>
                                            )}

                                            { account?.distributable && (
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => setShowParticipants(true)}
                                                    className="text-white font-weight-bold ml-10"
                                                >
                                                    Distributions
                                                </Button>
                                            )}
                                            { account?.consolidation && !account?.subAccount && (
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    className="text-white font-weight-bold"
                                                    onClick={() => {
                                                        props.history.push(joinUrlWithParamsId(FUNDING.ACCOUNT.JOURNALS, account?.id))
                                                    }}
                                                >
                                                    Journaux
                                                </Button>
                                            )}
                                            { ['CANTO'].includes(account?.order?.type) && (
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    className="text-white font-weight-bold mr-5"
                                                    onClick={() => {
                                                        setShowProvisioningBox(true);
                                                    }}
                                                >
                                                    Provisionner
                                                </Button>
                                            )}
                                            { account?.order?.type === 'CANTO' && (
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    className="text-white font-weight-bold"
                                                    onClick={() => {
                                                        setShowCantonnementBox(true);
                                                    }}
                                                >
                                                    Cantonnement
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardTitle>
                                <CardBody>
                                    <div className='row align-items-end' style={{ marginTop: '2em' }}>
                                        <div className="col-md-4 col-sm-12 has-wrapper">
                                            <InputLabel className="text-left" htmlFor="startDate">
                                                Du
                                            </InputLabel>
                                            <InputStrap
                                                required
                                                id="startDate"
                                                type="date"
                                                name='startDate'
                                                className="input-lg"
                                                value={startDate}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setStartDate(e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-4 col-sm-12 has-wrapper">
                                            <InputLabel className="text-left" htmlFor="endDate">
                                                Au
                                            </InputLabel>
                                            <InputStrap
                                                required
                                                id="endDate"
                                                type="date"
                                                name='endDate'
                                                value={endDate}
                                                className="input-lg"
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />

                                        </div>
                                        <div className="col-md-4 col-sm-12 has-wrapper balance-details">
                                            <p>Solde</p>
                                            <p className='fw-bold mt-10' style={{ fontSize: '2.5rem' }}>{getPriceWithCurrency(account?.balanceGlobal, account?.currencyCode)}</p>
                                            <p className='fw-bold mt-10' style={{ fontSize: '1.5rem', opacity: 0.3 }}>{getPriceWithCurrency(account?.balance, account?.currencyCode)}</p>
                                        </div>

                                    </div>
                                    <div style={{ marginTop: '3em' }}>
                                        <div>
                                            <h2 className='fw-bold'>Historique des transactions</h2>
                                            <table className="table table-hover table-middle mb-60 mt-20">
                                                <thead>
                                                    <tr>
                                                        <th>Libellé</th>
                                                        <th>Date opération</th>
                                                        <th>Date valeur</th>
                                                        <th>Crédit</th>
                                                        <th>Débit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        mouvements.map((mouvement, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark">{mouvement.reason}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark"><TimeFromMoment time={mouvement.createdAt} showFullDate /></h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark"><TimeFromMoment time={mouvement.valueDate ? mouvement.valueDate : mouvement.createdAt} showFullDate /></h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark">{ mouvement.direction === 'CASH_IN' ? getPriceWithCurrency(mouvement.amount, mouvement.currency) : '-'}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark">{ mouvement.direction === 'CASH_OUT' ? getPriceWithCurrency(mouvement.amount, mouvement.currency) : '-'}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '3em', opacity: 0.6 }}>
                                        <div>
                                            <h2 className='fw-bold'>Opérations non comptabilisées</h2>
                                            <table className="table table-hover table-middle mb-60 mt-20">
                                                <thead>
                                                    <tr>
                                                        <th>Libellé</th>
                                                        <th>Date opération</th>
                                                        <th>Date valeur</th>
                                                        <th>Crédit</th>
                                                        <th>Débit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        provisions.map((mouvement, index) => (
                                                            <tr key={index} style={{ background: mouvement.type === 'FREEZE' ? '#ff000026' : 'white' }}>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark">{mouvement.reason}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark"><TimeFromMoment time={mouvement.createdAt} showFullDate /></h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark"><TimeFromMoment time={mouvement.valueDate ? mouvement.valueDate : mouvement.createdAt} showFullDate /></h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark">{ mouvement.direction === 'CASH_IN' ? getPriceWithCurrency(mouvement.amount, mouvement.currency) : '-'}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body">
                                                                            <h4 className="m-0 text-dark">{ mouvement.direction === 'CASH_OUT' ? getPriceWithCurrency(mouvement.amount, mouvement.currency) : '-'}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
								</CardBody>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                { account && showProvisioningBox && (
                    <Provisioning
                        title='Approvisionner le compte'
                        onSubmit={onProvisioning}
                        account={account}
                        show={showProvisioningBox}
                        onClose={() => setShowProvisioningBox(false)}
                    />
                )}
                <DebitAccount
                    title='Décaisser le compte'
                    onSubmit={onDebit}
                    show={showDebitAccountBox}
                    onClose={() => setShowDebitAccountBox(false)}
                />
                { account && showCantonnementBox && (
                    <Cantonnement
                        title='Faire un cantonnement'
                        onSubmit={onCantonnement}
                        account={account}
                        show={showCantonnementBox}
                        onClose={() => setShowCantonnementBox(false)}
                    />
                )}
                { showTicketBox && account && (
                    <CodevPrevisions
                        show={showTicketBox}
                        reference={account?.reference}
                        title='Echéancier'
                        onClose={() => setShowTicketBox(false)}
                        openTicket={(ticket) => {
                            setShowTicketBox(false);
                            setSelectedTicket(ticket);
                            setShowChildTicketBox(true);
                        }}
                    />
                )}
                { showDealBox && account && (
                    <AccountDeals
                        title='Deals'
                        show={showDealBox}
                        reference={account?.reference}
                        onClose={() => setShowDealBox(false)}
                    />
                )}
                { showChildTicketBox && selectedTicket && (
                    <CodevChildTicket
                        ticket={selectedTicket}
                        show={showChildTicketBox}
                        title='Versement complementaire'
                        onClose={() => setShowChildTicketBox(false)}
                        onCreate={() => {
                            setShowChildTicketBox(false);
                            setShowCreateChildTicketBox(true);
                        }}
                    />
                )}
                { showCreateChildTicketBox && selectedTicket && (
                    <CreateTicket
                        ticket={selectedTicket}
                        show={showCreateChildTicketBox}
                        title='Versement complementaire'
                        onClose={() => setShowCreateChildTicketBox(false)}
                    />
                )}
                { account  && showParticipants && (
                    <CodevParticipants
                        order={account.order}
                        show={showParticipants}
                        onClose={() => {
                            setShowParticipants(false);
                        }}
                        referralCode={account.referralCode}
                        type={account.codevSubscriptionType}
                        isPrivate={account.codevDistribution == 'PRIVATE'}
                    />
                )}
                { provisionData && showConfirmBox && (
                    <ConfirmBox
                        show={showConfirmBox}
                        rightButtonOnClick={() => {
                            onProvisioning({reference: provisionData.paymentAccountReference}, provisionData.amount, provisionData.currency, true);
                        }}
                        leftButtonOnClick={() => {
                            setShowConfirmBox(false)
                        }}
                        message={'Souhaitez vous utiliser votre reserve ?'}
                    />
                )}
            </RctCollapsibleCard>
        </>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Details));
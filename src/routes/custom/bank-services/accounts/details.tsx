import './index.css';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { withRouter } from "react-router-dom";
import AccountService from 'Services/accounts';
import { Input as InputStrap } from 'reactstrap';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { ACCOUNT_PERIOD_LIMIT } from 'Helpers/datas';
import TimeFromMoment from 'Components/TimeFromMoment';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { getPriceWithCurrency, convertDate } from 'Helpers/helpers';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Details = (props) => {

    const today = new Date();
    const previousDate = new Date();
    const [account, setAccount] = useState(null);
    const [mouvements, setMouvements] = useState([]);
    const [provisions, setProvisions] = useState([]);
    previousDate.setDate(previousDate.getDate() - ACCOUNT_PERIOD_LIMIT);
    const [endDate, setEndDate] = useState(convertDate(today, 'YYYY-MM-DD'));
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
        AccountService.getAccountMouvements(account.id, {types: ['PROVISION']}).then(response => {
            setProvisions(response);
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
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
                                            <p className='fw-bold mt-10' style={{ fontSize: '2.5rem' }}>{getPriceWithCurrency(account?.balance, account?.currencyCode)}</p>
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
                                                                            <h4 className="m-0 text-dark"><TimeFromMoment time={mouvement.createdAt} showFullDate /></h4>
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

                                    <div style={{ marginTop: '3em', opacity: 0.3 }}>
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
                                                                            <h4 className="m-0 text-dark"><TimeFromMoment time={mouvement.createdAt} showFullDate /></h4>
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
            </RctCollapsibleCard>
        </>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Details));
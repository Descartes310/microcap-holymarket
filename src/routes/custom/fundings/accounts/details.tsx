import { connect } from 'react-redux';
import { HOME } from 'Url/frontendUrl';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import AccountService from 'Services/accounts';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import CreditAccount from 'Components/CreditAccount';
import { getPriceWithCurrency } from 'Helpers/helpers';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Details = (props) => {

    const [account, setAccount] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [mouvements, setMouvements] = useState([]);
    const [showCreditAccountBox, setShowCreditAccountBox] = useState(false);

    useEffect(() => {
        findAccount();
        getMouvements();
    }, []);

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
        AccountService.getAccountMouvements(props.match.params.id).then(response => {
            setMouvements(response);
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onStripeSubmit = (token, amount) => {

        if(amount <= 0)
            return;

        props.setRequestGlobalAction(true);

        let data: any = {};

        data.amount = amount;
        data.token = token;
        data.PaymentMethod = 'STRIPE';
       
        AccountService.creditAccount(props.match.params.id, data).then((response) => {
            findAccount();
            getMouvements();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
            setShowCreditAccountBox(false);
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
                                    <div>
                                        <h1 className='fw-bold mt-10' style={{ fontSize: '2.5rem' }}>{account?.label}</h1>
                                        <h3>{account?.userName}</h3>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <div>
                                            <h3>Solde</h3>
                                            <h1 className='fw-bold mt-10' style={{ fontSize: '2.5rem' }}>{getPriceWithCurrency(account?.balance, account?.currencyCode)}</h1>
                                        </div>
                                        <div>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                className="text-white font-weight-bold"
                                                onClick={() => setShowCreditAccountBox(true)}
                                            >
                                                Créditer
                                            </Button>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                className="text-white font-weight-bold ml-10"
                                            >
                                                Imprimer
                                            </Button>
                                        </div>
                                    </div>
                                </CardTitle>
                                <CardBody>
                                    <div className='row align-items-end' style={{ marginTop: '5em' }}>
                                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                            <InputLabel className="text-left" htmlFor="startDate">
                                                Date de début
                                            </InputLabel>
                                            <InputStrap
                                                required
                                                id="startDate"
                                                type="date"
                                                name='startDate'
                                                className="input-lg"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                            <InputLabel className="text-left" htmlFor="endDate">
                                                Date de fin
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
                                        </FormGroup>
                                    </div>
                                    <div style={{ marginTop: '3em' }}>
                                        <div>
                                            <h2 className='fw-bold'>Historique des transactions</h2>
                                            <table className="table table-hover table-middle mb-60 mt-20">
                                                <thead>
                                                    <tr>
                                                        <th>Libellé</th>
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
                <CreditAccount
                    title='Créditer le compte'
                    onSubmit={onStripeSubmit}
                    show={showCreditAccountBox}
                    onClose={() => setShowCreditAccountBox(false)}
                />
            </RctCollapsibleCard>
        </>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Details));
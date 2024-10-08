import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import AccountService from 'Services/accounts';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import AddJournal from '../components/addJournal';
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import { NotificationManager } from 'react-notifications';
import { FUNDING, joinUrlWithParamsId } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { getPriceWithCurrency } from 'Helpers/helpers';

const Journal = (props) => {

    const [account, setAccount] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [showAddBox, setShowAddBox] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    useEffect(() => {
        findAccount();
    }, []);    
    
    useEffect(() => {
        if(account) {
            getjournals();
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

    const getjournals = () => {
        props.setRequestGlobalAction(true);
        AccountService.getSynchronisations(account.reference).then(response => {
            setAccounts(response);
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
                title={"Journaux du carnet"}
            />
            <CustomList
                list={accounts}
                loading={false}
                itemsFoundText={n => `${n} journaux`}
                onAddClick={() => setShowAddBox(true)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun journal
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Ndjangui</th>
                                            <th className="fw-bold">Solde</th>
                                            <th className="fw-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.synchronised.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.codev.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{ getPriceWithCurrency(item.synchronised.balance, item.currencyCode) }</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => {
                                                            props.history.push(joinUrlWithParamsId(FUNDING.ACCOUNT.DETAILS, item.synchronised.id))
                                                        }}
                                                    >
                                                        Détails
                                                    </Button>
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
            { account && (
                <AddJournal
                    show={showAddBox}
                    onClose={() => {
                        setShowAddBox(false);
                        getjournals();
                    }}
                    currentAccount={account}
                />
            )}
        </>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Journal));
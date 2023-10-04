import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import AccountService from 'Services/accounts';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import { NotificationManager } from 'react-notifications';
import AddConsolidation from '../components/addConsolidation';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const Consolidation = (props) => {

    const [account, setAccount] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [showAddBox, setShowAddBox] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showDeleteConfirmationBox, setShowDeleteConfirmationBox] = useState(false);

    useEffect(() => {
        findAccount();
    }, []);    
    
    useEffect(() => {
        if(account) {
            getConsolidations();
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

    const getConsolidations = () => {
        props.setRequestGlobalAction(true);
        AccountService.getConsolidations(account.reference).then(response => {
            setAccounts(response.map(c => c.consolidated));
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const deleteAccount = () => {        
        if(!selectedAccount) {
            NotificationManager.error('Selectionnez le compte aà rétirer')
            return;
        }
        props.setRequestGlobalAction(true);
        AccountService.deleteConsolidation(account?.reference, selectedAccount?.reference)
        .then((response) => {
            setShowDeleteConfirmationBox(false);
            getConsolidations();
        })
        .finally(() => {
            setSelectedAccount(null);
            props.setRequestGlobalAction(false);
        });
    }

    return (
        <>
            <PageTitleBar
                title={"Consolidations du compte"}
            />
            <CustomList
                list={accounts}
                loading={false}
                itemsFoundText={n => `${n} comptes`}
                onAddClick={() => setShowAddBox(true)}
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
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Type de compte</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.balance} {item.currencyCode}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => {
                                                            setSelectedAccount(item);
                                                            setShowDeleteConfirmationBox(true);
                                                        }}
                                                    >
                                                        Rétirer
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
            <ConfirmBox
                show={showDeleteConfirmationBox}
                rightButtonOnClick={() => {
                    deleteAccount();
                }}
                leftButtonOnClick={() => {
                    setShowDeleteConfirmationBox(false)
                }}
                message={"Souhaitez-vous rétirer ce compte de la consolidation?"}
            />
            { account && (
                <AddConsolidation
                    show={showAddBox}
                    onClose={() => {
                        setShowAddBox(false);
                        getConsolidations();
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Consolidation));
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import UpdateAccountVentilation from './UpdateAccountVentilation';


const AccountVentilation = (props) => {

    const [showUpdateBox, setShowUpdateBox] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    return (
        <>
            <CustomList
                loading={false}
                list={props.accounts}
                itemsFoundText={n => `${n} comptes trouvés`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun compte trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Ventilation</th>
                                            {props.editable && (
                                                <th className="fw-bold">Action</th>
                                            )}
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.percentage} %</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                {props.editable && (
                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                setSelectedAccount(item);
                                                                setShowUpdateBox(true);
                                                            }}
                                                            className="text-white font-weight-bold"
                                                        >
                                                            Editer
                                                        </Button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            />

            { showUpdateBox && selectedAccount && (
                <UpdateAccountVentilation
                    item={selectedAccount}
                    onSubmit={(item) => {
                        props.onSubmit(item);
                    }}
                    show={showUpdateBox}
                    onClose={() => {
                        setShowUpdateBox(false);
                        setSelectedAccount(null);
                    }}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(AccountVentilation));

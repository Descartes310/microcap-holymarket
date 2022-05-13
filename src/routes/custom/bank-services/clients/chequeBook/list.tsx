import { Button } from "reactstrap";
import { connect } from 'react-redux';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { BANK, joinUrlWithParamsId } from "Url/frontendUrl";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const List = (props) => {

    const [checkbooks, setCheckBooks] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getCheckBooks();
    }, []);

    const getCheckBooks = () => {
        props.setRequestGlobalAction(true),
        BankService.getClientCheckBooks(props.match.params.id)
        .then(response => {
            setCheckBooks(response.checkBooks);
            setUser(response.user);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Chequiers de "+user?.userName}
            />
            <CustomList
                list={checkbooks}
                loading={false}
                itemsFoundText={n => `${n} chequiers trouvés`}
                onAddClick={() => props.history.push(joinUrlWithParamsId(BANK.CLIENT.CHECKBOOK.CREATE, props.match.params.id))}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun chequiers trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Numéro de la premiere page</th>
                                            <th className="fw-bold">Numéro de la derniere page</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.startNumber}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.endNumber}</h4>
                                                        </div>
                                                    </div>
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
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
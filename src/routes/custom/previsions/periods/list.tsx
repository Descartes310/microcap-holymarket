import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import PrevisionService from 'Services/previsions';
import { MIPRO, joinUrlWithParamsId } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const List = (props) => {

    const [periods, setPeriods] = useState([]);

    useEffect(() => {
        getPeriods();
    }, []);

    const getPeriods = () => {
        props.setRequestGlobalAction(true);
        PrevisionService.getPeriods(props.match.params.id)
        .then((response) => setPeriods(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des périodes"}
            />
            <CustomList
                list={periods}
                loading={false}
                itemsFoundText={n => `${n} périodes trouvées`}
                onAddClick={() => props.history.push(joinUrlWithParamsId(MIPRO.PERIOD.CREATE, props.match.params.id))}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun périodes trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Date de début</th>
                                            <th className="fw-bold">Date de fin</th>
                                            <th className="fw-bold">Montant</th>
                                            {/* <th className="fw-bold">Actions</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.startDate}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.endDate}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.amount}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                {/* <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            //props.history.push(joinUrlWithParamsId(MIPRO.PERIOD.LIST, item.id))
                                                        }}
                                                        className="text-white font-weight-bold"
                                                    >
                                                        Abondements
                                                    </Button>
                                                </td> */}
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));
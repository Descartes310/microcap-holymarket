import { connect } from 'react-redux';
import UnitService from 'Services/units';
import { SETTING } from 'Url/frontendUrl';
import Switch from "@material-ui/core/Switch";
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';

const List = (props) => {

    const [units, setUnits] = useState([]);

    useEffect(() => {
        getUnits();
    }, []);

    const getUnits = () => {
        props.setRequestGlobalAction(false);
        UnitService.getUnits({include_currency: false})
        .then((response) => setUnits(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <CustomList
            list={units}
            loading={false}
            itemsFoundText={n => `${n} unités trouvées`}
            onAddClick={() => props.history.push(SETTING.UNIT.CREATE)}
            renderItem={list => (
                <>
                    {list && list.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>
                                Aucun unités trouvées
                            </h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">Désignation</th>
                                        <th className="fw-bold">code</th>
                                        <th className="fw-bold">Description</th>
                                        <th className="fw-bold">Type</th>
                                        {/* <th className="fw-bold">Status</th> */}
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
                                                        <h4 className="m-0 fw-bold text-dark">{item.code}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <p className="m-0 text-dark">{item.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <p className="m-0 text-dark">{item.type.label}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* <td>
                                                <Switch
                                                    aria-label="Par défaut"
                                                    checked={item.status}
                                                    onChange={() => { changeStatus(item) }}
                                                />
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
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));
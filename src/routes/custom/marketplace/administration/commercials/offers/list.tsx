import { connect } from 'react-redux';
import { MARKETPLACE } from 'Url/frontendUrl';
import Switch from "@material-ui/core/Switch";
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import CommercialService from 'Services/commercials';
import TimeFromMoment from "Components/TimeFromMoment";

const List = (props) => {

    const [commercialOffers, setCommercialOffers] = useState([]);

    useEffect(() => {
        getCommercialOffers();
    }, []);

    const changeStatus = (catalog) => {
        props.setRequestGlobalAction(true),
            CommercialService.changeCommercialOfferStatus(catalog.id)
                .then(() => getCommercialOffers())
                .finally(() => props.setRequestGlobalAction(false))
    }

    const getCommercialOffers = () => {
        props.setRequestGlobalAction(true);
        CommercialService.getCommercialOffers()
            .then((response) => setCommercialOffers(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    return (
        <CustomList
            list={commercialOffers}
            loading={false}
            itemsFoundText={n => `${n} offres trouvées`}
            onAddClick={() => props.history.push(MARKETPLACE.COMMERCIAL.OFFER.CREATE)}
            renderItem={list => (
                <>
                    {list && list.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>
                                Aucune offres trouvées
                            </h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">Désignation</th>
                                        <th className="fw-bold">Description</th>
                                        <th className="fw-bold">Date début</th>
                                        <th className="fw-bold">Date fin</th>
                                        <th className="fw-bold">Status</th>
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
                                                        <p className="m-0 text-dark">{item.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <p className="m-0 text-dark">
                                                            <TimeFromMoment time={item.startDate} showFullDate />
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        <p className="m-0 text-dark">
                                                            <TimeFromMoment time={item.endDate} showFullDate />
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Switch
                                                    aria-label="Par défaut"
                                                    checked={item.status}
                                                    onChange={() => { changeStatus(item) }}
                                                />
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
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));
import { connect } from 'react-redux';
import { SETTING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import SettingService from 'Services/settings';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const List = (props) => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = () => {
        props.setRequestGlobalAction(true);
        SettingService.getEvents()
        .then((response) => setEvents(response))
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
                title={"Liste des évènements"}
            />
            <CustomList
                list={events}
                loading={false}
                itemsFoundText={n => `${n} évènements trouvés`}
                onAddClick={() => props.history.push(SETTING.EVENT.CREATE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun évènements trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Titre</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Date de début</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.startDate}</h4>
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));
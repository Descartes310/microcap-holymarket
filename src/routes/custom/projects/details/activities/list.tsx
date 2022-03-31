import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import ProjectService from 'Services/projects';
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import { joinUrlWithParamsId, PROJECT } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const List = (props) => {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        getActivities();
    }, []);

    const getActivities = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectActivities(props.match.params.id, {}).then(response => {
            setActivities(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des activités projets"}
            />
            <CustomList
                list={activities}
                loading={false}
                itemsFoundText={n => `${n} activités trouvées`}
                onAddClick={() => props.history.push(joinUrlWithParamsId(PROJECT.DETAILS.ACTIVITY.CREATE, props.match.params.id))}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun activités trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Description</th>
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
                                                            <p className="m-0 text-dark">{item.value}</p>
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

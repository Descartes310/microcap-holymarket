import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProjectService from 'Services/projects';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import { getInitializationTypeLabel } from 'Helpers/helpers';
import { joinUrlWithParams, joinUrlWithParamsId, PROJECT } from 'Url/frontendUrl';

const List = (props) => {

    const [initializations, setInitializations] = useState([]);

    useEffect(() => {
        getInitializations();
    }, [props.match.params.type]);

    const getInitializations = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectInitializations({ type: getInitializationTypeLabel(props.match.params.type) })
            .then((response) => setInitializations(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    return (
        <CustomList
            loading={false}
            list={initializations}
            itemsFoundText={n => `${n} initialisations trouvés`}
            onAddClick={() => props.history.push(joinUrlWithParams(PROJECT.INITIALIZATION.CREATE, [{ param: 'type', value: props.match.params.type }]))}
            renderItem={list => (
                <>
                    {list && list.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>
                                Aucun initialisations trouvés
                            </h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">Désignation</th>
                                        <th className="fw-bold">Description</th>
                                        <th className="fw-bold">Ouvrages</th>
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
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    className="text-white font-weight-bold"
                                                    onClick={() => props.history.push(joinUrlWithParamsId(PROJECT.INITIALIZATION.ITEMS, item.id))}
                                                >
                                                    Ouvrages
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
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));
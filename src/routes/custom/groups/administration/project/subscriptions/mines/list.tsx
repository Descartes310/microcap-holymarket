import { connect } from 'react-redux';
import CreateSubscription from './create';
import DetailsSubscription from './details';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProjectService from 'Services/projects';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";

const List = (props) => {

    const [subscriptions, setSubscriptions] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const [showCreateSubscription, setShowCreateSubscription] = useState(false);    
    const [showDetailsSubscription, setShowDetailsSubscription] = useState(false);    
    
    useEffect(() => {
        getProjectSubscriptions();
    }, []);

    const getProjectSubscriptions = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectSubscriptions().then(response => {
            setSubscriptions(response);
        })
        .finally(() => props.setRequestGlobalAction(false));
    }

    return (
        <>
            <CustomList
                list={subscriptions}
                loading={false}
                itemsFoundText={n => `${n} souscriptions trouvées`}
                onAddClick={() => {
                    setShowCreateSubscription(true);
                }}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune souscription trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Intitulé</th>
                                            <th className="fw-bold">Date de création</th>
                                            <th className="fw-bold">Status</th>
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
                                                            <h4 className="m-0 fw-bold text-dark"><TimeFromMoment time={item.createdAt} /></h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">En attente</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => {
                                                            setSubscription(item);
                                                            setShowDetailsSubscription(true);
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
            { showCreateSubscription && (
                <CreateSubscription
                    show={showCreateSubscription}
                    onClose={() => {
                        setShowCreateSubscription(false);
                    }}
                />
            )}
            { showDetailsSubscription && subscription && (
                <DetailsSubscription
                    show={showDetailsSubscription}
                    onClose={() => {
                        setShowDetailsSubscription(false);
                    }}
                    subscription={subscription}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));

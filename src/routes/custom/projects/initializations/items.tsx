import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import AddItemToInitialization from './components/AddItemToInitialization';

const Items = (props) => {

    const [showAddBox, setShowAddBox] = useState(false);
    const [initializationItems, setInitializationItems] = useState([]);

    useEffect(() => {
        getInitializationItems();
    }, []);

    const getInitializationItems = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectInitializationItems(props.match.params.id)
            .then((response) => setInitializationItems(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const createItem = (data) => {
        props.setRequestGlobalAction(true);
        ProjectService.createProjectInitializationItem(props.match.params.id, data)
            .then((response) => getInitializationItems())
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
                setShowAddBox(false);
            })
    }

    return (
        <>
            <CustomList
                loading={false}
                list={initializationItems}
                itemsFoundText={n => `${n} ouvrages trouvés`}
                onAddClick={() => setShowAddBox(true)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun ouvrages trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Etiquette</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Nombre max. d'occurence</th>
                                            <th className="fw-bold">Obligatoire</th>
                                            <th className="fw-bold">Editable</th>
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
                                                            <p className="m-0 text-dark">{item.maximumOccurence}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.mandatory ? 'OUI' : 'NON'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.editable ? 'OUI' : 'NON'}</p>
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
            <AddItemToInitialization
                show={showAddBox}
                onSave={createItem}
                onClose={() => setShowAddBox(false)}
            />
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Items));
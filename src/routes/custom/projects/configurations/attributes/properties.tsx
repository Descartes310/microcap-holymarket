import { connect } from 'react-redux';
import { PROJECT } from 'Url/frontendUrl';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProjectService from 'Services/projects';
import React, { useEffect, useState } from 'react';
import { getPropertyTypeLabel } from 'Helpers/helpers';
import TimeFromMoment from "Components/TimeFromMoment";
import CreateProperty from '../_components/createProperty';

const Properties = (props) => {

    const [attribute, setAttribute] = useState(null);
    const [properties, setProperties] = useState([]);
    const [showAddBox, setShowAddBox] = useState(false);

    useEffect(() => {
        getAttributes();
        findAttribute();
    }, []);

    const findAttribute = () => {
        props.setRequestGlobalAction(true);
        ProjectService.findAttribute(props.match.params.id)
        .then((response) => {
            setAttribute(response);
        }).catch(() => {
            props.history.push(PROJECT.CONFIGURATION.ATTRIBUTE.LIST);
        }).finally(() => props.setRequestGlobalAction(false))
    }

    const getAttributes = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getAttributeProperties({ attribute_reference: props.match.params.id }).then(response => {
            setProperties(response);
        }).catch((error) => {
            console.log(error);
            props.history.push(PROJECT.CONFIGURATION.ATTRIBUTE.LIST);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <CustomList
                list={properties}
                loading={false}
                itemsFoundText={n => `${n} propriétés trouvées`}
                onAddClick={() => {
                    setShowAddBox(true);
                }}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune propriété trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Type</th>
                                            <th className="fw-bold">Valeur</th>
                                            <th className="fw-bold">Date création</th>
                                            <th className="fw-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getPropertyTypeLabel(item.type)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.value}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark"><TimeFromMoment time={item.createdAt} showFullDate /></p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => {

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
            { attribute && (
                <CreateProperty
                    show={showAddBox}
                    attribute={attribute}
                    onClose={() => {
                        setShowAddBox(false)
                    }}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Properties));

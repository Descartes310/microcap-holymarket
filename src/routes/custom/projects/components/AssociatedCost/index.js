import { connect } from 'react-redux';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import UpdateAssociatedCost from './UpdateAssociatedCost';


const AssociatedCost = (props) => {

    const [showUpdateBox, setShowUpdateBox] = useState(false);
    const [selectedCost, setSelectedCost] = useState(null);

    return (
        <>
            <CustomList
                loading={false}
                list={props.costs}
                onAddClick={() => {
                    setSelectedCost(null);
                    setShowUpdateBox(true);
                }}
                itemsFoundText={n => `${n} coûts trouvés`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun coût trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Poste</th>
                                            <th className="fw-bold">Coût</th>
                                            <th className="fw-bold">Quantité</th>
                                            <th className="fw-bold">Coût total</th>
                                            {props.editable && (
                                                <th className="fw-bold">Action</th>
                                            )}
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.amount}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.quantity}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.quantity * item.amount}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                {props.editable && (
                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                setSelectedCost(item);
                                                                setShowUpdateBox(true);
                                                            }}
                                                            className="text-white font-weight-bold"
                                                        >
                                                            Editer
                                                        </Button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            />

            { showUpdateBox && (
                <UpdateAssociatedCost
                    item={selectedCost}
                    onSubmit={(item) => {
                        props.onSubmit(item, selectedCost !== null);
                        setSelectedCost(null);
                    }}
                    show={showUpdateBox}
                    onClose={() => {
                        setShowUpdateBox(false);
                        setSelectedCost(null);
                    }}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(AssociatedCost));

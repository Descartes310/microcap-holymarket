import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getPriceWithCurrency } from 'Helpers/helpers';
import DialogComponent from "Components/dialog/DialogComponent";

const FundingOptions = (props) => {

    const {show, onClose, onCreate} = props;
    
    const [options, setOptions] = useState([]);

    useEffect(() => {
        getOptions();
    }, [])

    const getOptions = () => {
		props.setRequestGlobalAction(true);
		GroupService.getFundingOptions()
		.then(response => setOptions(response))
		.finally(() => props.setRequestGlobalAction(false))
	}
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="lg"
            title={(
                <h3 className="fw-bold">
                    Structure financiere
                </h3>
            )}
        >
            <CustomList
                list={options}
                loading={false}
                itemsFoundText={n => `${n} élements trouvés`}
                onAddClick={() => onCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun élement trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Support</th>
                                            <th className="fw-bold">Valeur</th>
                                            <th className="fw-bold">Estimation</th>
                                            <th className="fw-bold">Souscription</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item?.supportType?.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.nominalAmount, item.currency)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item?.quantity}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark"></h4>
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
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(FundingOptions));
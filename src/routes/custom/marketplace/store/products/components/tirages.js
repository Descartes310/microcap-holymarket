import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";

const GenerateTirage = (props) => {

    const {show, onClose, product} = props;

    const [configs, setConfigs] = useState(null);

    useEffect(() => {
        getCodevConfigOptions();
    }, [product]);

    const getCodevConfigOptions = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCodevConfigOptions({product_reference: product.reference}).then(response => {
            setConfigs(response.map(co => { return {...co, label: co.option.label}}));
        })
        .finally(() => props.setRequestGlobalAction(false));
    }

    const generate = (reference) => {
        props.setRequestGlobalAction(true);
        ProductService.generateCodevTirage({reference: product.reference, option_reference: reference}).then(() => {
            NotificationManager.success('Les tirages ont été générés');
        })
        .catch((err) => {
            if(err?.response?.status == 409) {
                NotificationManager.error('Les tirages ont déjà été générés');
            } else {
                NotificationManager.error('La configuration du plan est obligatoire');
            }
        })
        .finally(() => props.setRequestGlobalAction(false));
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Liste des options
                </h3>
            )}
        >
            <CustomList
                list={configs}
                loading={false}
                itemsFoundText={n => `${n} config. trouvées`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune config trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Option</th>
                                            <th className="fw-bold">Option de titre</th>
                                            <th className="fw-bold">Support d'option</th>
                                            <th className="fw-bold">Tirage</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item?.title.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.support?.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => generate(item.reference)}
                                                        className="text-white font-weight-bold mr-3"
                                                    >
                                                        Générer le tirage
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
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(GenerateTirage));
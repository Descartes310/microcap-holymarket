import { connect } from 'react-redux';
import Switch from "@material-ui/core/Switch";
import { MARKETPLACE } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import CatalogService from 'Services/catalogs';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';

const List = (props) => {

    const [catalogs, setCatalogs] = useState([]);

    useEffect(() => {
        getCatalogs();
    }, []);

    const getCatalogs = () => {
        props.setRequestGlobalAction(true);
        CatalogService.getCatalogs({ type: 'SALE' })
        .then((response) => setCatalogs(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const changeStatus = (catalog) => {
        props.setRequestGlobalAction(true),
        CatalogService.changeCatalogStatus(catalog.id)
        .then(() => getCatalogs())
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <CustomList
            list={catalogs}
            loading={false}
            itemsFoundText={n => `${n} catalogues trouvés`}
            onAddClick={() => props.history.push(MARKETPLACE.CATAlOG.SALE.CREATE)}
            renderItem={list => (
                <>
                    {list && list.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center py-50">
                            <h4>
                                Aucun catalogues trouvés
                            </h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">Label</th>
                                        <th className="fw-bold">Description</th>
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
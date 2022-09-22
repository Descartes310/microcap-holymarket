import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { MARKETPLACE } from 'Url/frontendUrl';
import ProductService from 'Services/products';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import CreateOptionDetailsModal from 'Components/createOptionDetails';

const List = (props) => {

    const [option, setOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [showCreateDetailsBox, setShowCreateDetailsBox] = useState(false);

    useEffect(() => {
        getOptions();
    }, []);

    const getOptions = () => {
        props.setRequestGlobalAction(true),
        ProductService.getCodevOptions()
        .then(response => setOptions(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        props.history.push(MARKETPLACE.STORE.OPTION.ITEM.CREATE);
    }

    return (
        <>
            <CustomList
                loading={false}
                list={options}
                itemsFoundText={n => `${n} options trouvées`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucunes options trouvées
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0 w-auto">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Réference</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Détails</th>
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
                                                            <p className="m-0 text-dark">{item.reference}</p>
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
                                                        onClick={() => {
                                                            setOption(item);
                                                            setShowCreateDetailsBox(true);
                                                        }}
                                                        className="text-white font-weight-bold"
                                                    >
                                                        Détails de l'option
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

            { showCreateDetailsBox && option && (
                <CreateOptionDetailsModal
                    option={option}
                    show={showCreateDetailsBox}
                    onClose={() => {
                        setShowCreateDetailsBox(false);
                        setOption(null);
                    }}
                    title={"Ajouter une option"}
                />
            )}
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));
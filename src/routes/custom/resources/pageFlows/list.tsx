import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import PageFlowService from 'Services/page-flows';
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RESOURCES, joinUrlWithParamsId } from 'Url/frontendUrl';

const List = (props) => {

    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    useEffect(() => {
        getPages();
    }, []);

    const getPages = () => {
        props.setRequestGlobalAction(true);
        PageFlowService.getBasePageFlows({})
        .then(response => {
            setPages(response);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const deletePage = () => {
        props.setRequestGlobalAction(true);
        PageFlowService.delete(page.reference)
        .then(response => {
            setPage(null);
            setShowConfirmBox(false);
            getPages();
            NotificationManager.success("L'opération s'est déroulée avec succès");
        })
        .catch(err => {
            NotificationManager.error("Une erreur s'est produite");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des pages"}
                showBackBtn={false}
            />
            <CustomList
                list={pages}
                loading={false}
                itemsFoundText={n => `${n} pages trouvées`}
                onAddClick={() => props.history.push(RESOURCES.PAGE_FLOWS.CREATE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune page trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
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
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(RESOURCES.PAGE_FLOWS.CHILD.LIST, item.reference))}
                                                    >
                                                        Pages
                                                    </Button>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold ml-5"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(RESOURCES.PAGE_FLOWS.UPDATE, item.reference))}
                                                    >
                                                        Editer
                                                    </Button>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white btn-danger font-weight-bold ml-5"
                                                        onClick={() => {
                                                            setPage(item);
                                                            setShowConfirmBox(true);
                                                        }}
                                                    >
                                                        Supprimer
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
            { page && showConfirmBox && (
                <ConfirmBox
                    show={showConfirmBox}
                    rightButtonOnClick={() => deletePage()}
                    leftButtonOnClick={() => {
                        setPage(null);
                        setShowConfirmBox(false);
                    }}
                    message={'Etes vous sure de vouloir supprimer cette page ?'}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
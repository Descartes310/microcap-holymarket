import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProjectService from 'Services/projects';
import React, { useState, useEffect } from 'react';
import { getPriceWithCurrency } from 'Helpers/helpers';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { joinUrlWithParamsId, PROJECT, GROUP } from 'Url/frontendUrl';

const List = (props) => {    
    
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjects().then(response => {
            setProjects(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Mes projets"}
            />
            <CustomList
                list={projects}
                loading={false}
                itemsFoundText={n => `${n} projets trouvés`}
                onAddClick={() => props.history.push(PROJECT.MINE.FOLDER.CREATE)}
                rightComponent={() => (
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            props.history.push(`${GROUP.COMMUNITY.SPACE.ALL}?type=PROJECT`);
                        }}
                        className="text-white font-weight-bold"
                    >
                        Rejoindre un projet
                    </Button>
                )}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun projets trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Besoin estimé</th>
                                            <th className="fw-bold">Fiche</th>
                                            <th className="fw-bold">Activités</th>
                                            <th className="fw-bold">Galérie</th>
                                            <th className="fw-bold">Edition</th>
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
                                                            <p className="m-0 text-dark">{getPriceWithCurrency(item.budget, item.currency)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold mr-15"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(PROJECT.DETAILS.SHOW, item.id))}
                                                    >
                                                        Fiche projet
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold mr-15"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(PROJECT.DETAILS.ACTIVITY.LIST, item.id))}
                                                    >
                                                        Activités
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(PROJECT.DETAILS.GALLERY, item.id))}
                                                    >
                                                        Galérie
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(PROJECT.MINE.FOLDER.UPDATE, item.id))}
                                                    >
                                                        Editer
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
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProjectService from 'Services/projects';
import React, { useState, useEffect } from 'react';
import ConfirmBox from "Components/dialog/ConfirmBox";
import { getPriceWithCurrency } from 'Helpers/helpers';
import { joinUrlWithParamsId, PROJECT } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const Users = (props) => {

    const [projects, setProjects] = useState([]);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        getPorjects();
    }, []);

    const getPorjects = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getAllProjects()
            .then(response => {
                setProjects(response);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des projets"}
            />
            <CustomList
                list={projects}
                loading={false}
                itemsFoundText={n => `${n} projets trouvés`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun projet trouvé
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
                                                        onClick={() => {
                                                            setSelectedProject(item);
                                                            setShowConfirmBox(true);
                                                        }}
                                                    >
                                                        Publier
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

            { selectedProject && showConfirmBox && (
                <ConfirmBox
                    show={showConfirmBox}
                    rightButtonOnClick={() => {
                        
                    }}
                    leftButtonOnClick={() => {
                        setSelectedProject(null);
                        setShowConfirmBox(false);
                    }}
                    message={'Etes vous sure de vouloir ajouter ce projet à la bourse de financement ?'}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Users));
import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProjectService from 'Services/projects';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";
import { getPriceWithCurrency } from 'Helpers/helpers';

const List = (props) => {

    const [project, setProject] = useState(null);
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        getProject();
    }, [])

    const getProject = () => {
        props.setRequestGlobalAction(false);
        ProjectService.getGroupProjects()
        .then((response) => setProject(response[0]))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    useEffect(() => {
        if(project) {
            getProjectInvestments();
        }
    }, [project])

    const getProjectInvestments = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectInvestments({ reference: project.reference })
        .then(response => setInvestments(response))
        .finally(() => props.setRequestGlobalAction(false))
    }


    const goToCreate = () => {
        props.history.push(GROUP.ADMINISTRATION.PROJECT.CONFIGURATION.FINANCEMENT.CREATE);
    }

    return (
        <>
            <CustomList
                list={investments}
                loading={false}
                itemsFoundText={n => `${n} investissements trouvés`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun investissement trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Montant de l'investissement</th>
                                            <th className="fw-bold">Date de création</th>
                                            {/* <th className="fw-bold">Actions</th> */}
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
                                                            <p className="m-0 text-dark">{getPriceWithCurrency(item.totalCost, item.currency)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <TimeFromMoment time={item.createdAt} showFullDate />
                                                        </div>
                                                    </div>
                                                </td>
                                                {/* <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => {
                                                            
                                                        }}
                                                    >
                                                        Editer
                                                    </Button>
                                                </td> */}
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

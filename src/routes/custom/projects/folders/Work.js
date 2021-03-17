import { projects } from "Data/index";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from 'react';
import SingleTitleText from "Components/SingleTitleText";
import { getOneProjectFolder } from "Actions/independentActions";
import FetchFailedComponent from "Components/FetchFailedComponent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import CustomList from "Components/CustomList";
import TimeFromMoment from "Components/TimeFromMoment";

const Show = ({ match, history }) => {
    const folderId = match.params.id;

    if (folderId === '' || folderId === undefined) {
        return (
            <SingleTitleText
                text={"Projet non trouvés"}
            />
        )
    }

    const [projectFolder, setProjectFolder] = useState({
        data: null,
        mine: false,
        loading: true
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setProjectFolder({
            data: null,
            loading: true
        });
        getOneProjectFolder(folderId)
            .then(result => {
                setProjectFolder({
                    data: result.project,
                    mine: result.mine,
                    loading: false
                });
            })
            .catch(() => {
                setProjectFolder({
                    data: null,
                    loading: false
                });
            })
    };

    if (projectFolder.loading) {
        return (<RctSectionLoader />)
    }

    if (!projectFolder) {
        return (
            <FetchFailedComponent _onRetryClick={loadData} />
        )
    }

    return (
        <>
           <CustomList
                    list={projectFolder.data.works}
                    loading={false}
                    titleList={"Ouvrage du projet"}
                    itemsFoundText={n => `${n} ouvrage.s trouvé.s`}
                    // onAddClick={() => history.push(this.baseUrl.CREATE)}
                    /*addPermissions={{
                        permissions: [Permission.roles.createOne.name],
                    }}*/
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun ouvrages trouvés
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>Titre du type d'ouvrage</th>
                                                <th>Type d'Ouvrage Parent</th>
                                                <th>Date de création</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {list && list.map((item, key) => (
                                            <tr
                                                key={key}
                                                className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.book.title}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            {item.parent ? (
                                                                <h4 className="m-0 fw-bold text-dark">{ item.book.parent.title}</h4>
                                                            ) : (
                                                                <h4 className="m-0 fw-bold text-dark">&#x0005F;</h4>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <TimeFromMoment time={item.book.createdAt} />
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
        </>
    );
};

export default withRouter(Show);

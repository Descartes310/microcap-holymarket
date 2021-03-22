import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { projects } from "Data/index";
import { COMMUNITY } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import React, { useEffect, useState } from 'react';
import { getAllProjectReaction } from "Actions/independentActions";
import FetchFailedComponent from "Components/FetchFailedComponent";
import { getOneProjectFolderByGroup } from "Actions/independentActions";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";

const Gallery = ({ history, communitySpace }) => {
    const baseUrl = COMMUNITY.PROJECTS;

    const [projectFolder, setProjectFolder] = useState({
        data: null,
        mine: false,
        loading: true
    });

    const [reactions, setReactions] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setProjectFolder({
            data: null,
            loading: true
        });
        getOneProjectFolderByGroup(communitySpace)
            .then(result => {
                setProjectFolder({
                    data: result.project,
                    mine: result.mine,
                    loading: false
                });
                if (result.group != null)
                    loadFiles(result.group)
            })
            .catch(() => {
                setProjectFolder({
                    data: null,
                    loading: false
                });
            })
    };

    const loadFiles = (id) => {
        getAllProjectReaction(id)
            .then(result => {
                setReactions(result);
            })
            .catch(() => {
                setReactions([]);
            })
    };

    const getTypeLabel = (type) => {
        const item = projects.initialisationOptions.find(i => i.value === type);
        return item ? item.name : 'Idée personnelle';
    };

    if (projectFolder.loading) {
        return (<RctSectionLoader />)
    }

    if (!projectFolder) {
        return (
            <FetchFailedComponent _onRetryClick={loadData} />
        )
    }

    const details = projectFolder.data;

    return (
        <div className="event-show" style={{ marginTop: '7rem' }}>
            {/*<PageTitleBar
                title={"Fiche techinque du project " + details.title}
            />*/}
            <div className="banner" style={{ height: 200 }} />
            <div className="event-show-header mb-70">
                <div>
                    <h3 className="text-white event-title">
                        Gallerie du projet <strong>{details.title}</strong>
                    </h3>
                </div>
                <h5 className="text-white">
                    <i className="ti-package mr-2" />
                    <span>{getTypeLabel(details.type)}</span>
                </h5>
            </div>
            <div>
                <CustomList
                    list={reactions.filter(r => r.type == 'ILLUSTRATION')}
                    loading={false}
                    itemsFoundText={() => 'Fichier.s trouvé.s'}
                    renderItem={reactions => (
                        <>
                            {reactions && reactions.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Fichier.s trouvé.s
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Titre</th>
                                                    <th>Description</th>
                                                    <th>Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reactions && reactions.map((item, key) => (
                                                    <tr
                                                        key={key}
                                                        className="cursor-pointer"
                                                    >
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.title}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.content}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                className="text-white font-weight-bold mr-3"
                                                                href={item.file}
                                                                target="_blank"
                                                                download
                                                            >
                                                                Consulter
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
            </div>
            <div className="row d-flex flex-row">
                <Button
                    // type="submit"
                    color="primary"
                    variant="contained"
                    className="text-white font-weight-bold mr-3"
                    onClick={() => history.push(baseUrl.SHOW)}
                >
                    Voir la fiche
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        communitySpace: communitySpace.data
    }
};

export default connect(mapStateToProps, {})(withRouter((injectIntl(Gallery))));

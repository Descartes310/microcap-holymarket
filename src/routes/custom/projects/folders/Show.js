import { projects } from "Data/index";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from 'react';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import SingleTitleText from "Components/SingleTitleText";
import FieldsetComponent from "Components/FieldsetComponent";
import { joinUrlWithParamsId, PROJECTS } from "Url/frontendUrl";
import { getOneProjectFolder } from "Actions/independentActions";
import FetchFailedComponent from "Components/FetchFailedComponent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";

const Show = ({ match, history }) => {
    const folderId = match.params.id;
    const baseUrl = PROJECTS.FOLDERS;

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

    const getTypeLabel = (type) => {
        const item = projects.initialisationOptions.find(i => i.value === type);
        return item ? item.name : '';
    };

    if (projectFolder.loading) {
        return (<RctSectionLoader />)
    }

    if (!projectFolder) {
        return (
            <FetchFailedComponent _onRetryClick={loadData} />
        )
    }

    const isRequired = (id) => {
        let data = projectFolder.data.initializationOption.works.filter(w => w.book.id == id)[0];
        if (data) {
            return data.required;
        } else {
            return false
        }
    }

    const details = projectFolder.data;

    return (
        <div className="event-show">
            {/*<PageTitleBar
                title={"Fiche techinque du project " + details.title}
            />*/}
            <div className="banner" />
            <div className="event-show-header mb-70">
                <h3 className="text-white event-title">
                    Fiche technique du projet <strong>{details.title}</strong>
                </h3>
                <h5 className="text-white">
                    <i className="ti-package mr-2" />
                    <span>{getTypeLabel(details.type)}</span>
                </h5>
            </div>
            <div>
                {details.works.map((work, index) => (
                    <>
                        {work.required || isRequired(work.book.id) ?
                            <div key={index} className="row mb-20">
                                <div className="col-sm-12">
                                    <FieldsetComponent title={(
                                        <Tooltip id={"tooltip-icon" + index} title={work.book.content}>
                                            <strong>{work.book.title}</strong>
                                        </Tooltip>
                                    )}>
                                        <span dangerouslySetInnerHTML={{
                                            __html: work.content
                                        }}></span>
                                    </FieldsetComponent>
                                </div>
                            </div> : null}
                    </>
                ))}
            </div>
            {
                projectFolder.mine ?

                    <div className="row">
                        <Button
                            // type="submit"
                            color="primary"
                            variant="contained"
                            className="text-white font-weight-bold mr-3 col-sm-12"
                            onClick={() => history.push(joinUrlWithParamsId(baseUrl.UPDATE, folderId))}
                        >
                            Modifier
                </Button>
                    </div>
                    : null}
        </div>
    );
};

export default withRouter(Show);

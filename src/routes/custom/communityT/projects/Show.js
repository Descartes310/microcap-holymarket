import {connect} from "react-redux";
import { projects } from "Data/index";
import {injectIntl} from "react-intl";
import { COMMUNITY } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from 'react';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import SingleTitleText from "Components/SingleTitleText";
import FieldsetComponent from "Components/FieldsetComponent";
import FetchFailedComponent from "Components/FetchFailedComponent";
import { getOneProjectFolderByGroup } from "Actions/independentActions";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";

const Show = (props) => {

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
        getOneProjectFolderByGroup(props.communitySpace)
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
        <div className="event-show" style={{ marginTop: '7rem' }}>
            {/*<PageTitleBar
                title={"Fiche techinque du project " + details.title}
            />*/}
            <div className="banner" style={{ height: 200 }} />
            <div className="event-show-header mb-70">
                <h3 className="text-white event-title">
                    Fiche technique du projet <strong>{details ? details.title : ''}</strong>
                </h3>
                <h5 className="text-white">
                    <i className="ti-package mr-2" />
                    <span>{getTypeLabel(details ? details.type : '')}</span>
                </h5>
            </div>
            <div>
                {details.works.sort((a, b) => a.index < b.index ? -1 : 1).map((work, index) => (
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
            <div className="row d-flex flex-row">
                <Button
                    // type="submit"
                    color="primary"
                    variant="contained"
                    className="text-white font-weight-bold mr-3"
                    onClick={() => props.history.push(COMMUNITY.PROJECTS.GALLERY)}
                >
                    Voir la gallerie
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

export default connect(mapStateToProps, {})(withRouter((injectIntl(Show))));

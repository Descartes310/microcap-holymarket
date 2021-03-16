import AddWork from "./CreateItem";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { projects } from "Data/index";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import React, { useEffect, useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import SingleTitleText from "Components/SingleTitleText";
import FieldsetComponent from "Components/FieldsetComponent";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FetchFailedComponent from "Components/FetchFailedComponent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { getOneProjectFolder, getUsersBooks, updateFolder, updateBook, setRequestGlobalAction } from "Actions";

const Update = ({ match, setRequestGlobalAction }) => {
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

    const [allData, setAllData] = useState([]);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [works, setWorks] = useState([]);

    useEffect(() => {
        loadData();
        loadWorks();
    }, []);

    const loadData = () => {
        setProjectFolder({
            data: null,
            loading: true
        });
        getOneProjectFolder(folderId)
            .then(result => {
                console.log(result.project.works)
                setAllData(result.project.works)
                setData(result.project.works)
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

    const loadWorks = () => {
        getUsersBooks().then(data => {
            setWorks(data);
        })
    };

    const getTypeLabel = (type) => {
        const item = projects.initialisationOptions.find(i => i.value === type);
        return item ? item.name : '';
    };

    const onAddWork = (work) => {
        updateFolder(folderId, { works: JSON.stringify([work].map(i => ({ id: Number(i.id), content: i.content, required: i.required, max: i.max }))) }, {}).then(
            data => {
                loadData()
            }
        ).catch(err => {

        }).finally(() => {
            setShowModal(false)
        })
    }

    const changeProject = (work) => {
        setRequestGlobalAction(true)
        updateBook(work.id).then((id) => {
            loadData()
        }).finally(() => {
            setRequestGlobalAction(false);
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

    const details = projectFolder.data;

    const isRequired = (id) => {
        let data = projectFolder.data.initializationOption.works.filter(w => w.book.id == id)[0];
        if (data) {
            return data.required;
        } else {
            return false
        }
    }

    return (
        <div className="event-show">
            {/*<PageTitleBar
                title={"Fiche techinque du project " + details.title}
            />*/}
            <div className="banner" />
            <div className="event-show-header mb-70">
                <h3 className="text-white event-title">
                    Fiche technique du projet <strong>{details ? details.title : ''}</strong>
                </h3>
                <h5 className="text-white">
                    <i className="ti-package mr-2" />
                    <span>{getTypeLabel(details ? details.type : '')}</span>
                </h5>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-9 col-xl-9">
                    {details ? details.works.map((work, index) => {
                        return (
                            <>
                                {work.required || isRequired(work.book.id)?
                                    <div key={index} className="row mb-20">
                                        <div className="col-sm-12">
                                            <FieldsetComponent title={(
                                                <Tooltip id={"tooltip-icon" + index} title={work.book.content}>
                                                    <strong>{work.book.title}</strong>
                                                </Tooltip>
                                            )}>
                                                <span>{work.content}</span>
                                            </FieldsetComponent>
                                        </div>
                                    </div>
                                    : null}
                            </>
                        )
                    }) : null}
                </div>
                <div className="col-sm-12 col-md-3 col-xl-3">
                    <h2>Type d'ouvrage</h2>
                    {details ? details.works.map((work, index) => (
                        <div key={index} className="row mb-20">
                            <div className="col-sm-12">
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox disabled={isRequired(work.book.id)} color="primary" defaultChecked={isRequired(work.book.id) ? true : work.required} value="checkedJ" onChange={(e) => changeProject(work, e.target.checked, index)} />
                                        } label={work.book.title}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    )) : null}
                    { projectFolder.data.type == 'IDEA' ?
                    <Button
                        // type="submit"
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold mr-3 col-sm-12"
                        onClick={() => setShowModal(true)}
                    >
                        Type d'ouvrage personnalisé
                    </Button> : null }
                </div>
                { projectFolder.data.type == 'IDEA' ?
                <AddWork
                    onSave={onAddWork}
                    works={works}
                    show={showModal}
                    onClose={() => setShowModal(false)}
                /> : null }
            </div>
        </div>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter((injectIntl(Update))));

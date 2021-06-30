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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { getOneProjectFolder, getUsersBooks, updateFolder, updateBook, setRequestGlobalAction, sortBook } from "Actions";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
// const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
});
const getListStyle = isDraggingOver => ({

});

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
        setRequestGlobalAction(true)
        setProjectFolder({
            data: null,
            loading: true
        });
        getOneProjectFolder(folderId)
            .then(result => {
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
            .finally(() => {
                setRequestGlobalAction(false)
            })
    };

    const loadWorks = () => {
        getUsersBooks().then(data => {
            setWorks(data);
        })
    };

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            projectFolder.data.works,
            result.source.index,
            result.destination.index
        );

        console.log(items.map((item, index) => {
            return { id: item.id, index: index + 1 }
        }));

        sortBook(folderId, {
            works: JSON.stringify(items.map((item, index) => {
                return { id: item.id, index: index + 1 }
            }))
        }).then(result => {
            loadData();
        })

        setProjectFolder({
            data: { ...projectFolder.data, works: items }
        });
    }

    const getTypeLabel = (type) => {
        const item = projects.initialisationOptions.find(i => i.value === type);
        return item ? item.name : 'Idée personnelle';
    };

    const onAddWork = (work) => {
        updateFolder(folderId, { works: JSON.stringify([work].map(i => ({ id: Number(i.id), content: i.content, required: i.required, description: i.description, max: i.max }))) }, {}).then(
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
                    Fiche technique du projet <strong>{projectFolder.data ? projectFolder.data.title : ''}</strong>
                </h3>
                <h5 className="text-white">
                    <i className="ti-package mr-2" />
                    <span>{getTypeLabel(projectFolder.data ? projectFolder.data.type : '')}</span>
                </h5>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-9 col-xl-9 d-block">
                    {projectFolder.data ? projectFolder.data.works.sort((a, b) => a.index < b.index ? -1 : 1).map((work, index) => {
                        return (
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
                                    </div>
                                    : null}
                            </>
                        )
                    }) : null}
                </div>
                <div className="col-sm-12 col-md-3 col-xl-3 d-block">
                    <h2>Type d'ouvrage</h2>
                    <p>Faites glisser les types d'ouvrages pour les réorganiser</p>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div className=" drag-list-wrapper" ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                    {projectFolder.data ? projectFolder.data.works.sort((a, b) => a.index < b.index ? -1 : 1).map((work, index) => (
                                        <Draggable key={index} draggableId={work.book.id + "id"} index={index}>
                                            {(provided, snapshot) => (
                                                <div className="row mb-20">
                                                    <div className="col-sm-12">
                                                        <FormGroup
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="drag-list">
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox disabled={isRequired(work.book.id)} color="primary" defaultChecked={isRequired(work.book.id) ? true : work.required} value="checkedJ" onChange={(e) => changeProject(work, e.target.checked, index)} />
                                                                } label={work.book.title}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    )) : null}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <Button
                        // type="submit"
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold mr-3 col-sm-12"
                        onClick={() => setShowModal(true)}
                    >
                        Ajouter une section
                    </Button>
                </div>
                <AddWork
                    onSave={onAddWork}
                    works={works}
                    show={showModal}
                    onClose={() => setShowModal(false)}
                />
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

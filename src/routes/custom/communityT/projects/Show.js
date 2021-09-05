import { connect } from "react-redux";
import { projects } from "Data/index";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import React, { useEffect, useState } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import AmountCurrency from "Components/AmountCurrency";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import FieldsetComponent from "Components/FieldsetComponent";
import {COMMUNITY, joinUrlWithParamsId} from "Url/frontendUrl";
import FetchFailedComponent from "Components/FetchFailedComponent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { getOneProjectFolderByGroup, getAllProjectReaction } from "Actions/independentActions";

const Show = (props) => {
    const communitySpaceId = match.params.id;
    const [projectFolder, setProjectFolder] = useState({
        data: null,
        mine: false,
        loading: true
    });
    const [reactions, setReactions] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [showBox, setShowBox] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadActivities = (id) => {
        getAllProjectReaction(id)
            .then(result => {
                setReactions(result);
            })
            .catch(() => {
                setReactions([]);
            });
    };

    const loadData = () => {
        setProjectFolder({
            data: {},
            loading: true
        });
        getOneProjectFolderByGroup(props.communitySpace)
            .then(result => {
                setProjectFolder({
                    data: result.project,
                    mine: result.mine,
                    loading: false
                });
                if (result.group != null)
                    loadActivities(result.group)
            })
            .catch(() => {
                setProjectFolder({
                    data: {},
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
    };

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
                <div className="row mb-20">
                    <div className="col-sm-12">
                        <FieldsetComponent title={(
                            <Tooltip title={details.title}>
                                <strong>Besoin estimé</strong>
                            </Tooltip>
                        )}>
                            <span>
                                <AmountCurrency amount={details.amount ? details.amount : 0} from={details.currency ? details.currency : 'EUR'} />
                            </span>
                        </FieldsetComponent>
                    </div>
                </div>
                {details.works && details.works.sort((a, b) => a.index < b.index ? -1 : 1).map((work, index) => (
                    <>
                        {work.required || isRequired(work.book.id) ?
                            <div key={index} className="row mb-20">
                                <div className="col-sm-12">
                                    <FieldsetComponent title={(
                                        <Tooltip id={"tooltip-icon" + index} title={work.book.content}>
                                            <strong>{work.book.title}</strong>
                                        </Tooltip>
                                    )}>
                                        { work.libelle ? <span>{work.libelle} </span> :
                                                <span dangerouslySetInnerHTML={{
                                                    __html: work.content
                                                }}></span> }
                                    </FieldsetComponent>
                                </div>
                            </div> : null}
                    </>
                ))}
            </div>
            <CustomList
                list={reactions.filter(r => r.type != 'ILLUSTRATION')}
                loading={false}
                titleList={"Activités sur le projet"}
                itemsFoundText={() => 'Activités trouvé.e.s'}
                renderItem={reactions => (
                    <>
                        {reactions && reactions.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Activités trouvé.e.s
                                </h4>
                            </div>
                        ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>Titre</th>
                                                <th>Type</th>
                                                <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reactions && reactions.map((item, key) => (
                                                <tr
                                                    key={key}
                                                    className="cursor-pointer"
                                                    onClick={() => this.onItemClick(item.id)}
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
                                                                <h4 className="m-0 fw-bold text-dark">{item.type}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold bg-blue"
                                                            style={{ marginRight: 10 }}
                                                            onClick={() => { setShowBox(true), setSelectedItem(item) }}
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
            <Dialog
                open={showBox}
                onClose={() => setShowBox(false)}
                aria-labelledby="responsive-dialog-title"
                maxWidth={'md'}
                fullWidth
            >
                <DialogTitle id="form-dialog-title">
                    <div className="row justify-content-between align-items-center">
                        Contenu de l'activité
                        <IconButton
                            color="primary"
                            aria-label="close"
                            className="text-danger"
                            onClick={() => setShowBox(false)}>
                            <CancelIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <span dangerouslySetInnerHTML={{
                        __html: selectedItem.content
                    }}></span>
                </DialogContent>
            </Dialog>

            <div className="row d-flex flex-row">
                <Button
                    // type="submit"
                    color="primary"
                    variant="contained"
                    className="text-white font-weight-bold mr-3"
                    onClick={() => props.history.push(joinUrlWithParamsId(COMMUNITY.PROJECTS.GALLERY, communitySpaceId))}
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

import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import CreateModel from './CreateModel';
import {PROJECTS} from "Url/frontendUrl";
import React, { Component } from 'react';
import {ERROR_500} from "Constants/errors";
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from "Actions";
import {NotificationManager} from "react-notifications";
import {getProjectWorks, getProjectStandardModel, removeProjectStandardModel, getOneProjectStandard} from "Actions";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import FetchFailedComponent from "Components/FetchFailedComponent";

const detailsLevel = [
    { name: 'Titre', value: 'TITLE'},
    { name: 'Sous-titre', value: 'SUBTITLE'},
    { name: 'Paragraphe', value: 'PARAGRAPH'},
    { name: 'Sous-paragraphe', value: 'SUBPARAGRAPH'},
    { name: 'Image', value: 'IMAGE'},
    { name: 'Table', value: 'TABLE'},
];

const chosenTitle = [
    { name: 'Utiliser le titre de niveau', value: 'MODEL' },
    { name: 'Utiliser le titre de l\'ouvrage', value: 'OUVRAGE' },
];

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = PROJECTS.CONFIGURATION.STANDARD;

    constructor(props) {
        super(props);
        this.projectStandardId = this.props.match.params.id;

        this.state = {
            showCreate: false,
            loading: true,
            models: null,
            loadingProjectStandard: true,
            projectStandard: null,
        }
    }

    componentDidMount() {
        this.loadData();
        this.loadProjectWorks();
        this.loadProjectStandard();
    }

    loadProjectStandard = () => {
        this.setState({ loadingProjectStandard: true });
        getOneProjectStandard(this.projectStandardId)
            .then(result => {
                this.setState({ projectStandard: result });
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ loadingProjectStandard: false }));
    };

    loadProjectWorks = () => {
        this.props.getItems(this.props.authUser.branchId);
    };

    loadData = () => {
        this.setState({ loading: true });
        getProjectStandardModel(this.projectStandardId)
            .then(result => {
                this.setState({ models: result });
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ loading: false }));
    };

    onRemoveModel = (itemId) => {
        this.props.setRequestGlobalAction(true);
        removeProjectStandardModel(itemId)
            .then(() => {
                NotificationManager.success("Model retiré avec succès");
                this.loadData();
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    getDetailLevel = () => {
        const projectStandard = this.state.projectStandard;
        const _detailsLevel = [];

        if (projectStandard.hasTitle) _detailsLevel.push({ name: 'Titre', value: 'TITLE'});
        if (projectStandard.hasSubTitle) _detailsLevel.push({ name: 'Sous-titre', value: 'SUBTITLE'});
        if (projectStandard.hasParagraph) _detailsLevel.push({ name: 'Paragraphe', value: 'PARAGRAPH'});
        if (projectStandard.hasSubParagraph) _detailsLevel.push({ name: 'Sous-paragraphe', value: 'SUBPARAGRAPH'});
        if (projectStandard.hasImage) _detailsLevel.push({ name: 'Image', value: 'IMAGE'});
        if (projectStandard.hasTable) _detailsLevel.push({ name: 'Table', value: 'TABLE'});

        return _detailsLevel;
    };

    onBackClick = () => {
        this.props.history.push(PROJECTS.CONFIGURATION.STANDARD.LIST);
    };

    render() {
        const { error, intl, history, projectWorks, authUser, setRequestGlobalAction} = this.props;
        const { models, loading, showCreate, loadingProjectStandard, projectStandard } = this.state;

        if (loadingProjectStandard) {
            return (<RctSectionLoader/>);
        }

        if (!projectStandard) {
            return (<FetchFailedComponent _onRetryClick={this.loadProjectStandard} />);
        }

        return (
            <>
                {showCreate && (
                    <CreateModel
                        show={showCreate}
                        loadData={this.loadData}
                        chosenTitle={chosenTitle}
                        projectWorks={projectWorks}
                        branchId={authUser.branchId}
                        projectStandard={projectStandard}
                        detailsLevel={this.getDetailLevel()}
                        getProjectWorks={this.loadProjectWorks}
                        projectStandardId={this.projectStandardId}
                        setRequestGlobalAction={setRequestGlobalAction}
                        onClose={() => this.setState({ showCreate: false })}
                    />
                )}
                <div className="my-3 pl-3 page-title m-0">
                    <i onClick={this.onBackClick} className="ti-angle-left cursor-pointer mr-2 icon-hover d-inline-flex"/>
                    <h3 className="font-lg d-inline-flex">
                        Configuration d'un standard
                    </h3>
                </div>
                <CustomList
                    list={models}
                    loading={loading}
                    // titleList={"Configuration d'un standard"}
                    itemsFoundText={n => intl.formatMessage({id: "projects.configuration.standard.model.found"}, {count: n})}
                    onAddClick={() => this.setState({ showCreate: true })}
                    /*addPermissions={{
                        permissions: [Permission.roles.createOne.name],
                    }}*/
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        <IntlMessages id="projects.configuration.standard.found" values={{count: 0}} />
                                    </h4>
                                </div>
                            ) : (
                                <>
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Titre</th>
                                                    <th>Afficher ?</th>
                                                    <th>Ouvrage</th>
                                                    <th>Action</th>
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
                                                                <h4 className="m-0 fw-bold text-dark">{item.title}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                {item.show ? (
                                                                    <h4 className="m-0 fw-bold text-success">
                                                                        <i className="ti-check"/> Oui
                                                                    </h4>
                                                                ) : (
                                                                    <h4 className="m-0 fw-bold text-danger">
                                                                        <i className="ti-close"/> Non
                                                                    </h4>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.book.title}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="center-hor-ver">
                                                        <div className="media">
                                                            <button
                                                                type="button"
                                                                className="rct-link-btn btn-xs btn btn-danger text-white"
                                                                onClick={() => this.onRemoveModel(item.id)}>
                                                                Rerirer
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                />
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, projectWorks, authUser  }) => {
    return {
        projectWorks,
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, {getItems: getProjectWorks, setRequestGlobalAction})(withRouter(injectIntl(List)));

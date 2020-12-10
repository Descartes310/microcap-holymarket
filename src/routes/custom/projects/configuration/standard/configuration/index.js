import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import {ERROR_500} from "Constants/errors";
import CreateModel from './CreateModel';
import {PROJECTS} from "Url/frontendUrl";
import {setRequestGlobalAction, getProjectStandard} from "Actions";
import {NotificationManager} from "react-notifications";
import {getProjectStandardModel, removeProjectStandardModel} from "Actions/independentActions";
import {getProjectWorks} from "Actions/GeneralActions";

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
        console.log("projectStandardId=> ", this.projectStandardId);

        this.state = {
            showCreate: false,
            loading: true,
            models: null,
        }
    }

    componentDidMount() {
        this.loadData();
        this.loadProjectWorks();
    }

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

    render() {
        const { error, intl, history, projectWorks, authUser, setRequestGlobalAction} = this.props;
        const { models, loading, showCreate } = this.state;

        return (
            <>
                {showCreate && (
                    <CreateModel
                        show={showCreate}
                        loadData={this.loadData}
                        chosenTitle={chosenTitle}
                        detailsLevel={detailsLevel}
                        projectWorks={projectWorks}
                        branchId={authUser.branchId}
                        getProjectWorks={this.loadProjectWorks}
                        projectStandardId={this.projectStandardId}
                        setRequestGlobalAction={setRequestGlobalAction}
                        onClose={() => this.setState({ showCreate: false })}
                    />
                )}
                <CustomList
                    list={models}
                    error={error}
                    loading={loading}
                    titleList={"Configuration d'un standard"}
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
                                                    <td>
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
const mapStateToProps = ({ requestGlobalLoader, projectStandard, projectWorks, authUser  }) => {
    const list = projectStandard;
    return {
        projectWorks,
        requestGlobalLoader,
        authUser: authUser.data,
        loading: list.loading,
        list: list.data,
        error: list.error
    }
};

export default connect(mapStateToProps, {getItems: getProjectWorks, setRequestGlobalAction})(withRouter(injectIntl(List)));

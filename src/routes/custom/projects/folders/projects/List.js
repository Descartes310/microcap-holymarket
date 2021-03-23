import { projects } from "Data";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import IntlMessages from 'Util/IntlMessages';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { AbilityContext } from "Permissions/Can";
import { setRequestGlobalAction, getFolders } from "Actions";
import { joinUrlWithParamsId, PROJECTS } from "Url/frontendUrl";

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = PROJECTS.FOLDERS;

    componentDidMount() {
        this.props.getItems(this.props.authUser.user.id);
    }

    getTypeLabel = (type) => {
        const item = projects.initialisationOptions.find(i => i.value === type);
        return item ? item.name : 'Idée personnelle';
    };

    onItemClick = (projectId) => {
        this.props.history.push(joinUrlWithParamsId(this.baseUrl.SHOW, projectId));
    };

    goToWork = (projectId) => {
        this.props.history.push(joinUrlWithParamsId(this.baseUrl.WORK, projectId));
    };

    render() {
        const { list, loading, error, intl, history } = this.props;

        return (
            <>
                <CustomList
                    list={list}
                    error={error}
                    loading={loading}
                    // titleList={"Mes projets"}
                    itemsFoundText={n => intl.formatMessage({ id: "projects.found" }, { count: n })}
                    onAddClick={() => history.push(this.baseUrl.CREATE)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        <IntlMessages id="projects.found" values={{ count: 0 }} />
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Titre</th>
                                                    <th>Type</th>
                                                    <th>Option d'initialisation</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr
                                                        key={key}
                                                        className="cursor-pointer"
                                                    >
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{item.title}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{this.getTypeLabel(item.type)}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{item.initializationOption ? item.initializationOption.name : item.idea.title}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <Button
                                                                        color="primary"
                                                                        variant="contained"
                                                                        className="text-white font-weight-bold"
                                                                        style={{ marginRight: 10 }}
                                                                        onClick={() => this.onItemClick(item.id)}
                                                                    >
                                                                        Voir le projet
                                                                    </Button>
                                                                    <Button
                                                                        color="primary"
                                                                        variant="contained"
                                                                        className="text-white font-weight-bold bg-blue"
                                                                        style={{ marginRight: 10 }}
                                                                        onClick={() => this.goToWork(item.id)}
                                                                    >
                                                                        Consulter les ouvrages
                                                                    </Button>
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
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, folders, authUser }) => {
    const list = folders;
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: list.loading,
        list: list.data,
        error: list.error
    }
};

export default connect(mapStateToProps, { getItems: getFolders, setRequestGlobalAction })(withRouter(injectIntl(List)));

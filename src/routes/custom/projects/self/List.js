import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import {PROJECTS} from "Url/frontendUrl";
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction, getProjects} from "Actions";

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = PROJECTS.PROJECTS;

    componentDidMount() {
        this.props.getProjects(this.props.authUser.branchId);
    }

    render() {
        const { list, loading, error, intl, history } = this.props;
        return (
            <>
                <CustomList
                    list={list}
                    error={error}
                    loading={loading}
                    titleList={"Projets"}
                    itemsFoundText={n => intl.formatMessage({id: "projects.found"}, {count: n})}
                    onAddClick={() => history.push(this.baseUrl.CREATE)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        <IntlMessages id="projects.found" values={{count: 0}} />
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>Désignation</th>
                                                <th>Nom de la présentation</th>
                                                <th>Nombre d'ouvrages</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.name}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.presentationProject.name}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{ item.works.length}</h4>
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
const mapStateToProps = ({ requestGlobalLoader, projects, authUser  }) => {
    const list = projects;
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: list.loading,
        list: list.data,
        error: list.error
    }
};

export default connect(mapStateToProps, {getProjects, setRequestGlobalAction})(withRouter(injectIntl(List)));
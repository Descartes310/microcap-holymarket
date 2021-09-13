import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import Button from "@material-ui/core/Button";
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import TimeFromMoment from "Components/TimeFromMoment";
import { PROJECTS, joinUrlWithParamsId } from "Url/frontendUrl";
import { setRequestGlobalAction, getProjectWorks } from "Actions";

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = PROJECTS.CONFIGURATION.WORKS.SIMPLE;

    componentDidMount() {
        this.props.getItems(this.props.authUser.branchId, 'SIMPLE');
    }

    onUpdate(id) {
        this.props.history.push(joinUrlWithParamsId(PROJECTS.CONFIGURATION.WORKS.SIMPLE.UPDATE, id))
    }

    render() {
        const { list, loading, error, intl, history } = this.props;

        return (
            <>
                <CustomList
                    list={list}
                    error={error}
                    loading={loading}
                    itemsFoundText={n => intl.formatMessage({ id: "projects.configuration.works.found" }, { count: n })}
                    onAddClick={() => { history.push(this.baseUrl.CREATE) }}
                    /*addPermissions={{
                        permissions: [Permission.roles.createOne.name],
                    }}*/
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        <IntlMessages id="projects.configuration.works.found" values={{ count: 0 }} />
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Titre</th>
                                                {/*<th>Contenu</th>*/}
                                                <th>Ouvrage Parent</th>
                                                <th>Date de création</th>
                                                <th>Actions</th>
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
                                                                {item.parent ? (
                                                                    <h4 className="m-0 fw-bold text-dark">{item.parent.title}</h4>
                                                                ) : (
                                                                    <h4 className="m-0 fw-bold text-dark">&#x0005F;</h4>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <TimeFromMoment time={item.createdAt} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            size="small"
                                                            color="primary"
                                                            variant="contained"
                                                            className={"text-white font-weight-bold mr-3 bg-blue"}
                                                            onClick={() => this.onUpdate(item.id)}
                                                        >
                                                            Editer
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
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, projectWorks, authUser }) => {
    const list = projectWorks;
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: list.loading,
        list: list.data,
        error: list.error
    }
};

export default connect(mapStateToProps, { getItems: getProjectWorks, setRequestGlobalAction })(withRouter(injectIntl(List)));

import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import {getSampleBranches, setRequestGlobalAction} from "Actions";
import {getTasks} from "Actions/GeneralActions";
import {joinUrlWithParamsId, NETWORK} from "Url/frontendUrl";
import TimeFromMoment from "Components/TimeFromMoment";

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = NETWORK;
    baseText = 'branch';

    componentDidMount() {
        this.props.getItems();
    }

    onShowItem = (itemId) => {
        this.props.history.push(NETWORK.CREATE + `?q=${itemId}`);
    };

    render() {
        const { list, loading, error, intl, history } = this.props;

        return (
            <>
                <CustomList
                    list={list}
                    error={error}
                    loading={loading}
                    onRetryClick={this.props.getItems}
                    titleList={"Branches en cours de création"}
                    itemsFoundText={n =>  intl.formatMessage({id: `${this.baseText}.found`}, {count: n})}
                    /*addPermissions={{
                        permissions: [Permission.roles.createOne.name],
                    }}*/
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        <IntlMessages id={`${this.baseText}.found`} values={{count: 0}} />
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                        <tr>
                                            <th><IntlMessages id="components.name" /></th>
                                            <th>Crée le</th>
                                            <th>Dernière mise à jour</th>
                                            <th><IntlMessages id="widgets.action" /></th>
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
                                                            <TimeFromMoment time={item.createdAt} />
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
                                                <td className="list-action">
                                                    <button
                                                        type="button"
                                                        className="rct-link-btn"
                                                        onClick={() => this.onShowItem(item.id)}>
                                                        <i className="ti-eye" />
                                                    </button>
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
const mapStateToProps = ({ requestGlobalLoader, sampleBranches, authUser  }) => {
    const list = sampleBranches;
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: list.loading,
        list: list.data,
        error: list.error
    }
};

export default connect(mapStateToProps, {getItems: getSampleBranches, setRequestGlobalAction})(withRouter(injectIntl(List)));

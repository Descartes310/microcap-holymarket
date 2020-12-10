import {Card} from "reactstrap";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import ListItem from "@material-ui/core/ListItem";
import {List as ListMaterial} from '@material-ui/core';
import {joinUrlWithParamsId, PROJECTS} from "Url/frontendUrl";
import {setRequestGlobalAction, getProjectStandard} from "Actions";

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = PROJECTS.CONFIGURATION.STANDARD;

    componentDidMount() {
        this.props.getItems(this.props.authUser.branchId);
    }

    onConfigureClick = (standardId) => {
        this.props.history.push(joinUrlWithParamsId(this.baseUrl.CONFIGURATION, standardId));
    };

    render() {
        const { list, loading, error, intl, history } = this.props;

        return (
            <>
                <CustomList
                    list={list}
                    error={error}
                    loading={loading}
                    titleList={"Standard de présentation"}
                    itemsFoundText={n => intl.formatMessage({id: "projects.configuration.standard.found"}, {count: n})}
                    onAddClick={() => history.push(this.baseUrl.CREATE)}
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
                                    <Card className="rct-block">
                                        <ListMaterial className="p-0 fs-14">
                                            {list.map((item, index) => (
                                                <ListItem key={index} className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                                    <h4>
                                                        {item.title}
                                                    </h4>
                                                    <button
                                                        type="button"
                                                        className="rct-link-btn btn-xs btn bg-blue text-white"
                                                        onClick={() => this.onConfigureClick(item.id)}>
                                                        Configurer
                                                    </button>
                                                </ListItem>
                                            ))}
                                        </ListMaterial>
                                    </Card>
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
const mapStateToProps = ({ requestGlobalLoader, projectStandard, authUser  }) => {
    const list = projectStandard;
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: list.loading,
        list: list.data,
        error: list.error
    }
};

export default connect(mapStateToProps, {getItems: getProjectStandard, setRequestGlobalAction})(withRouter(injectIntl(List)));

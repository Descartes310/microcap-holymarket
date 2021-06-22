import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import Button from "@material-ui/core/Button";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import {PROJECTS, joinUrlWithParamsId} from "Url/frontendUrl";
import {setRequestGlobalAction, getInitialisationOptions} from "Actions";

class List extends Component {
    static contextType = AbilityContext;

    constructor(props) {
        super(props);
        this.baseUrl = PROJECTS.CONFIGURATION.INITIALISATION[this.props.type];
    }

    componentDidMount() {
        this.props.getItems(this.props.type, this.props.authUser.branchId);
    }

    getData = () => {
        return this.props.type === 'IDEA'
            ? this.props.initialisationIdeas
            : this.props.type === 'PROGRAM'
                ? this.props.initialisationProgram
                : this.props.initialisationProjectsCall;
    };

    render() {
        const { intl, history, type } = this.props;

        const { data, loading, error } = this.getData();

        return (
            <>
                <CustomList
                    list={data}
                    error={error}
                    loading={loading}
                    // titleList={"Idea"}
                    itemsFoundText={n => intl.formatMessage({id: `projects.configuration.initialisation.${type.toLowerCase()}.found`}, {count: n})}
                    onAddClick={() => history.push(this.baseUrl.CREATE)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        <IntlMessages id={`projects.configuration.initialisation.${type.toLowerCase()}.found`} values={{count: 0}} />
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>Désignation</th>
                                                {/* <th>Nombres d'ouvrages</th> */}
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.name}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                {/* <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.works.length}</h4>
                                                        </div>
                                                    </div>
                                                </td> */}
                                                <td>
                                                    <Button
                                                        size="small"
                                                        color="primary"
                                                        // disabled={loading}
                                                        variant="contained"
                                                        className={"text-white font-weight-bold mr-3"}
                                                        onClick={() => history.push(joinUrlWithParamsId(PROJECTS.CONFIGURATION.INITIALISATION.UPDATE, item.id))}
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

List.propTypes = {
    type: PropTypes.string.isRequired,
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader, initialisationIdeas, initialisationProgram, initialisationProjectsCall, authUser  }) => {
    return {
        initialisationIdeas,
        initialisationProgram,
        initialisationProjectsCall,
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, {getItems: getInitialisationOptions, setRequestGlobalAction})(withRouter(injectIntl(List)));

import React, { Component } from 'react';
import {connect} from "react-redux";
import IntlMessages from 'Util/IntlMessages';
import {getComOperationType, setRequestGlobalAction} from "Actions";
import {injectIntl} from "react-intl";
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import Create from './Create';

class UserProfileList extends Component {
    static contextType = AbilityContext;

    constructor(props) {
        super(props);
        this.state = {
            catalogId: null,
            showCreateBox: false,
        }
    }

    componentDidMount() {
        this.props.getComOperationType(this.props.authUser.branchId);
    }

    render() {
        const { comOperationType, loading, error } = this.props;
        const { showCreateBox } = this.state;
        console.log("comOperationType => ", comOperationType);
        return (
            <>
                <Create
                    show={showCreateBox}
                    onClose={() => this.setState({showCreateBox: false})}
                />
                <CustomList
                    error={error}
                    loading={loading}
                    list={comOperationType}
                    titleList={"Type d'opération commerciale"}
                    onAddClick={() => this.setState({showCreateBox: true})}
                    itemsFoundText={n => `${n} type(s) d'opération commerciale trouvés`}
                    addPermissions={{
                        permissions: [],
                    }}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun types d'opération commerciale trouvés
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                        <tr>
                                            <th><IntlMessages id="components.name" /></th>
                                            <th><IntlMessages id="widgets.description" /></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.description}</h4>
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
const mapStateToProps = ({ requestGlobalLoader, comOperationType, authUser  }) => {
    return { requestGlobalLoader, authUser: authUser.data, loading: comOperationType.loading, comOperationType: comOperationType.data, error: comOperationType.error }
};

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});

export default connect(mapStateToProps, {getComOperationType, setRequestGlobalAction})
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(UserProfileList))));

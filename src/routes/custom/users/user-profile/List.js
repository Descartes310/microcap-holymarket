import React, { Component } from 'react';
import {connect} from "react-redux";
import IntlMessages from 'Util/IntlMessages';
import {getUserProfiles, setRequestGlobalAction} from "Actions";
import {injectIntl} from "react-intl";
import {withStyles} from "@material-ui/core";
import UserProfileCreate from "./Create";
import {withRouter} from "react-router-dom";
import {AbilityContext} from "Permissions/Can";
import Permission from "Enums/Permissions";
import CustomList from "Components/CustomList";

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
        this.props.getUserProfiles(this.props.authUser.user.branch.id, this.props.authUser.userType);
    }

    render() {
        const { catalogTypes, loading, error } = this.props;
        const { showCreateBox } = this.state;

        return (
            <>
                {this.context.can(Permission.userProfile.createOne.name, Permission) && (
                    <UserProfileCreate
                        show={showCreateBox}
                        onClose={() => this.setState({showCreateBox: false})}
                    />
                )}
                <CustomList
                    error={error}
                    loading={loading}
                    list={catalogTypes}
                    titleList={"Profile utilisateurs"}
                    onAddClick={() => this.setState({showCreateBox: true})}
                    itemsFoundText={n => `${n} profile d'utilisateurs trouvés`}
                    addPermissions={{
                        permissions: [Permission.userProfile.createOne.name],
                    }}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun utilisateurs trouvés
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                        <tr>
                                            <th><IntlMessages id="components.name" /></th>
                                            <th><IntlMessages id="widgets.description" /></th>
                                            <th>Nombres de permissions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {list && list.map((catalog, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-left media-middle mr-15">
                                                            {/*<img src={catalog.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                        </div>
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{catalog.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{catalog.description}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="table-action">
                                                    {catalog.permissions.length} permissions(s)
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
const mapStateToProps = ({ requestGlobalLoader, userProfile, authUser  }) => {
    return { requestGlobalLoader, authUser: authUser.data, loading: userProfile.loading, catalogTypes: userProfile.data, error: userProfile.error }
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

export default connect(mapStateToProps, {getUserProfiles, setRequestGlobalAction})
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(UserProfileList))));

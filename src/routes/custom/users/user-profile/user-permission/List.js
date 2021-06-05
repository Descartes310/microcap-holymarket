import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import UserProfileCreate from "./Create";
import React, { Component } from 'react';
import Permission from "Enums/Permissions";
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {withStyles} from "@material-ui/core";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import {getUserPermissions, setRequestGlobalAction} from "Actions";
import Button from "@material-ui/core/Button";
import AddPermissionToRole from "Routes/custom/users/AddPermissionToRole";

class UserPermissionList extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);
        this.state = {
            profileId: null,
            showAddBox: false,
            showCreateBox: false,
        }
    }

    componentDidMount() {
        this.props.getUserPermissions(this.props.authUser.user.branch.id, this.props.authUser.userType);
    }

    render() {
        const { userPermissions, loading, error, catalogTypes, setRequestGlobalAction } = this.props;
        const { showCreateBox, showAddBox, profileId } = this.state;

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
                    list={userPermissions}
                    titleList={"Permissions utilisateurs"}
                    onAddClick={() => this.setState({showCreateBox: true})}
                    itemsFoundText={n => `${n} permissions trouvés`}
                    // addPermissions={{
                    //     permissions: [Permission.userProfile.createsOne.name],
                    // }}
                    addingButton={true}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucune permissions trouvées
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th><IntlMessages id="components.name" /></th>
                                                <th><IntlMessages id="widgets.description" /></th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body media-left pt-10">
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
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        // variant={"outlined"}
                                                        className={`text-white font-weight-bold btn-primary btn-xs mr-2`}
                                                        onClick={() => this.setState({showAddBox: true, profileId: item.id})}
                                                    >
                                                        Ajouter dans un role
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
                <AddPermissionToRole
                    show={showAddBox}
                    profileId={profileId}
                    type={this.props.authUser.userType}
                    branch={this.props.authUser.user.branch.id}
                    setRequestGlobalAction={setRequestGlobalAction}
                    onClose={() => this.setState({showAddBox: false, profileId: null})}
                />
            </>
        );
    }
}

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

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, userPermissions  }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        userPermissions: userPermissions.data,
        loading: userPermissions.loading,
    }
};

export default connect(mapStateToProps, {getUserPermissions, setRequestGlobalAction})
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(UserPermissionList))));

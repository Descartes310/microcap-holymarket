import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import UserProfileCreate from "./Create";
import React, { Component } from 'react';
import Permission from "Enums/Permissions.tsx";
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {withStyles} from "@material-ui/core";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import {getUserProfiles, setRequestGlobalAction} from "Actions";
import Button from "@material-ui/core/Button";
import AddUserToRole from "Routes/custom/users/AddUserToRole";

class UserProfileList extends Component {
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
        this.props.getUserProfiles(this.props.authUser.user.branch.id, this.props.authUser.userType);
    }

    render() {
        const { catalogTypes, loading, error, setRequestGlobalAction } = this.props;
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
                    list={catalogTypes}
                    titleList={"Roles utilisateurs"}
                    onAddClick={() => this.setState({showCreateBox: true})}
                    itemsFoundText={n => `${n} roles trouvés`}
                    addPermissions={{
                        permissions: [Permission.userProfile.createOne.name],
                    }}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun roles trouvés
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
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-left media-middle mr-15">
                                                            {/*<img src={item.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                        </div>
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
                                                <td className="table-action">
                                                    {item.permissions.length} permissions(s)
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        // variant={"outlined"}
                                                        className={`text-white font-weight-bold btn-primary btn-xs mr-2`}
                                                        onClick={() => this.setState({showAddBox: true, profileId: item.id})}
                                                    >
                                                        Ajouter
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
                <AddUserToRole
                    show={showAddBox}
                    profileId={profileId}
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
const mapStateToProps = ({ requestGlobalLoader, userProfile, authUser  }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: userProfile.loading,
        catalogTypes: userProfile.data,
        error: userProfile.error
    }
};

export default connect(mapStateToProps, {getUserProfiles, setRequestGlobalAction})
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(UserProfileList))));

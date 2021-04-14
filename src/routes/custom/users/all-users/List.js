import ListItem from './ListItem';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomList from "Components/CustomList";
import UserAvatar from "Components/UserAvatar";
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import TimeFromMoment from "Components/TimeFromMoment";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { getBranchUsers, setRequestGlobalAction, getUser } from "Actions";
import { getFilePath } from "Helpers/helpers";

class UsersAccountsList extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);
        this.state = {
            profileId: null,
            showAddBox: false,
            selectedBranch: this.props.authUser.isManager() ? null : this.props.authUser.branchId,
            branches: {
                data: null,
                loading: true
            }
        }
    }

    getUserDetails = (id) => {
        getUser(id).then(data => {
            this.setState({ user: data, showBox: true });
        })
    }

    componentDidMount() {
        this.props.getBranchUsers(this.props.authUser.branchId);
    }

    render() {
        const { branchUsers } = this.props;
        console.log(branchUsers)
        return (
            <>
                <PageTitleBar
                    title={"Liste des utilisateurs"}
                />
                <CustomList
                    loading={false}
                    list={branchUsers}
                    itemsFoundText={n => `${n} utilisateurs trouvés`}
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
                                                    <th>Avatar</th>
                                                    <th>Nom</th>
                                                    <th>Adresse email</th>
                                                    <th>Type d'utilisateur</th>
                                                    <th>Date d'inscription</th>
                                                    {/* <th>Actions</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((user, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="avatar-wrap w-10 align-self-center d-sm-r-none">
                                                                <UserAvatar
                                                                    avatar={getFilePath(user.avatar)}
                                                                    name={user.name}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-left media-middle mr-15">
                                                                    {/*<img src={item.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                                </div>
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{user.name}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{user.email}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{user.type}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">
                                                                        <TimeFromMoment
                                                                            time={user.createdAt}
                                                                            showFullDate
                                                                        />
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {/* <td>
                                                            <Button
                                                                color="primary"
                                                                // variant={"outlined"}
                                                                className={`text-white font-weight-bold btn-primary btn-xs mr-2`}
                                                            // onClick={() => this.setState({ showAddBox: true, profileId: item.id })}
                                                            >
                                                                Voir les details
                                                            </Button>
                                                        </td> */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            }
                        </>
                    )}
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
const mapStateToProps = ({ requestGlobalLoader, branchUsers, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        branchUsers: branchUsers.data
    }
};

export default connect(mapStateToProps, { getBranchUsers, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(UsersAccountsList))));

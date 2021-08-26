import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { getFilePath } from "Helpers/helpers";
import CustomList from "Components/CustomList";
import UserAvatar from "Components/UserAvatar";
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import SweetAlert from 'react-bootstrap-sweetalert';
import TimeFromMoment from "Components/TimeFromMoment";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { getBranchUsers, setRequestGlobalAction, suspendAccount, deleteAccount } from "Actions";

class UsersAccountsList extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);
        this.state = {
            profileId: null,
            showAddBox: false,
            showSuspendBox: false,
            showDeleteBox: false,
            user: null,
            selectedBranch: this.props.authUser.isManager() ? null : this.props.authUser.branchId,
            branches: {
                data: null,
                loading: true
            }
        }
    }

    suspendAccount() {
        this.props.setRequestGlobalAction(true);
        suspendAccount(this.state.user.reference).finally(() => {
            this.setState({ showSuspendBox: false, user: null });
            this.props.setRequestGlobalAction(false);
            this.props.getBranchUsers(this.props.authUser.branchId);
        })
    }

    deleteAccount() {
        this.props.setRequestGlobalAction(true);
        deleteAccount(this.state.user.reference).finally(() => {
            this.setState({ showDeleteBox: false, user: null });
            this.props.setRequestGlobalAction(false);
            this.props.getBranchUsers(this.props.authUser.branchId);
        })
    }

    componentDidMount() {
        this.props.getBranchUsers(this.props.authUser.branchId);
    }

    render() {
        const { branchUsers, loading } = this.props;
        const { showSuspendBox, showDeleteBox, user } = this.state;

        return (
            <>
                <PageTitleBar
                    title={"Liste des utilisateurs"}
                />
                <CustomList
                    loading={loading}
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
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Avatar</th>
                                                    <th>Nom</th>
                                                    <th>Adresse email</th>
                                                    <th>Type d'utilisateur</th>
                                                    <th>Date d'inscription</th>
                                                    <th>Actions</th>
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
                                                        <td>
                                                            {user.status == 'SUSPENDED' ?
                                                                <Button
                                                                    size="small"
                                                                    style={{ backgroundColor: '#ff3739' }}
                                                                    // disabled={loading}
                                                                    variant="contained"
                                                                    className={"text-white font-weight-bold mr-3"}
                                                                    onClick={() => this.setState({ showDeleteBox: true, user })}
                                                                >
                                                                    Supprimer
                                                                </Button>
                                                                :
                                                                <Button
                                                                    size="small"
                                                                    color="primary"
                                                                    // disabled={loading}
                                                                    variant="contained"
                                                                    className={"text-white font-weight-bold mr-3"}
                                                                    onClick={() => this.setState({ showSuspendBox: true, user })}
                                                                >
                                                                    Suspendre
                                                                </Button>
                                                            }
                                                        </td>
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
                {showSuspendBox && user && (
                    <SweetAlert
                        warning
                        show={showSuspendBox}
                        title={"Suspension d'un utilisateur"}
                        onConfirm={() => this.suspendAccount()}
                        confirmBtnText="Suspendre"
                        confirmBtnClass="btn-lg btn-primary btn-sm text-white"
                    >
                        <div className="row">
                            <div className="col-12">
                                <p>Voulez-vous vraiment suspendre l'utilisateur <b>{user.name}</b> ?</p>
                            </div>
                        </div>
                    </SweetAlert>
                )
                }
                {showDeleteBox && user && (
                    <SweetAlert
                        warning
                        show={showDeleteBox}
                        title={"Suppression d'un utilisateur"}
                        onConfirm={() => this.deleteAccount()}
                        confirmBtnText="Supprimer"
                        confirmBtnClass="btn-lg btn-primary btn-sm text-white"
                    >
                        <div className="row">
                            <div className="col-12">
                                <p>Voulez-vous vraiment supprimer l'utilisateur <b>{user.name}</b> ?</p>
                            </div>
                        </div>
                    </SweetAlert>
                )
                }
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
        branchUsers: branchUsers.data,
        loading: branchUsers.loading,
    }
};

export default connect(mapStateToProps, { getBranchUsers, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(UsersAccountsList))));

import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import UsersAccountsCreate from "./Create";
import React, { Component } from 'react';
import Permission from "Enums/Permissions";
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {withStyles} from "@material-ui/core";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import {getUsersAccountsByBranch, setRequestGlobalAction} from "Actions";
import InputComponent from "Components/InputComponent";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import api from "Api/index";
import {BRANCH} from "Url/backendUrl";
import {NotificationManager} from "react-notifications";
import {ERROR_500} from "Constants/errors";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import FetchFailedComponent from "Components/FetchFailedComponent";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import TimeFromMoment from "Components/TimeFromMoment";

class UsersAccountsList extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);
        this.state = {
            catalogId: null,
            showCreateBox: false,
            selectedBranch: null,
            branches: {
                data: null,
                loading: true
            }
        }
    }

    getBranches = () => {
        return  new Promise((resolve, reject) => {
            this.setState(prevState => ({ branches: {data: null, loading: true} }));
            api.get(BRANCH.GET_ALL)
                .then(response => {
                    this.setState(prevState => ({
                        branches: {data: response.data, loading: false},
                        selectedBranch: response.data[0].id
                    }), () => {
                        resolve();
                    });
                })
                .catch(error => {
                    NotificationManager.error(ERROR_500);
                    this.setState(prevState => ({ branches: {data: null, loading: false}, selectedBranch: null }), () => {
                        reject();
                    });
                });
        });
    };

    componentDidMount() {
        this.getBranches()
            .then(() => {
                this.loadUsersAccount();
            });
    }

    loadUsersAccount = () => {
        if (this.state.selectedBranch !== null) {
            this.props.getUsersAccountsByBranch(this.state.selectedBranch);
        }
    };

    handleOnBranchChange = (newBranchId) => {
        if (newBranchId !== this.state.selectedBranch) {
            this.setState({selectedBranch: newBranchId}, () => {
                this.loadUsersAccount();
            });
        }
    };

    render() {
        const { usersAccounts, loading, error } = this.props;
        const { showCreateBox, branches, selectedBranch } = this.state;

        return (
            <>
                <PageTitleBar
                    title={"Comptes utilisateurs"}
                />
                {/*{this.context.can(Permission.users.accounts.createOne.name, Permission) && (
                    <UsersAccountsCreate
                        show={showCreateBox}
                        onClose={() => this.setState({showCreateBox: false})}
                    />
                )}*/}
                <div className="row mb-3">
                    <div className="col-sm-12">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="institution-helper">
                                Branche
                            </InputLabel>
                            {branches.loading ? (
                                <RctSectionLoader/>
                            ) : branches.data ? (
                                <Select
                                    value={selectedBranch}
                                    onChange={event => this.handleOnBranchChange(event.target.value)}
                                    input={<Input name="institution" id="institution-helper" />}>
                                    {branches.data.map((item, index) => (
                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            ) : (
                                <FetchFailedComponent _onRetryClick={this.getBranches} />
                            )}
                        </FormControl>
                    </div>
                </div>
                <CustomList
                    error={error}
                    loading={loading}
                    list={usersAccounts}
                    // titleList={"Comptes utilisateurs"}
                    // onAddClick={() => this.setState({showCreateBox: true})}
                    itemsFoundText={n => `${n} comptes utilisateurs trouvés`}
                    /*addPermissions={{
                        permissions: [Permission.users.accounts.createOne.name],
                    }}*/
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun comptes utilisateurs trouvés
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th><IntlMessages id="components.name" /></th>
                                                <th>Date de création</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                {item.description}
                                                                <TimeFromMoment
                                                                    time={item.createdAt}
                                                                />
                                                            </h4>
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
const mapStateToProps = ({ requestGlobalLoader, usersAccounts, authUser  }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: usersAccounts.loading,
        usersAccounts: usersAccounts.data,
        error: usersAccounts.error
    }
};

export default connect(mapStateToProps, {getUsersAccountsByBranch, setRequestGlobalAction})
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(UsersAccountsList))));

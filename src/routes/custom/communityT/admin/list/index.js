import ListItem from './ListItem';
import { connect } from 'react-redux';
import React, { Component } from 'react'
import VoucherModal from './voucherModal';
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core";
import CustomList from "Components/CustomList";
import { AbilityContext } from "Permissions/Can";
import EmptyResult from "Components/EmptyResult";
import VoucherCreateModal from './voucherCreateModal';
import { NotificationManager } from "react-notifications";
import { readEmail, onSelectEmail, getUnitTypes, getUnitbyType } from 'Actions';
import { setRequestGlobalAction, createVoucher, getMembersOfCommunity, getVouchers } from 'Actions';

class ListMembers extends Component {
    static contextType = AbilityContext;

    state = {
        loading: true,
        showCreateVoucherBox: false,
        showVoucherBox: false,
        selectedUser: null,
        code: [],
        loadingCodes: false,
        users: [],
    };

    componentDidMount() {
        this.getMembers();
        this.fetchUnitType()
    }

    fetchUnitType = () => {
        getUnitTypes()
            .then(result => {
                this.setState({ unitTypes: result })
            });
    };

    fetchUnits = (id) => {
        getUnitbyType(id)
            .then(result => {
                this.setState({ units: result })
            });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleGenerate = value => {
        this.setState({ showCreateVoucherBox: true, selectedUser: value });
    };

    onViewVoucher = (user) => {
        this.setState({ showVoucherBox: true, loadingCodes: true });
        getVouchers(this.props.communitySpace.data, 'PAYMENT', user.id, user.type)
            .then(data => {
                this.setState({ codes: data });
            })
            .catch(err => {
                this.setState({ codes: null });
            })
            .finally(() => this.setState({ loadingCodes: false }));
    };

    getMembers = () => {
        this.setState({ loading: true });
        getMembersOfCommunity(this.props.communitySpace.data)
            .then(data => {
                this.setState({ users: data });
            })
            .finally(() => this.setState({ loading: false }));
    };

    render() {
        const { loading, users, showVoucherBox, showCreateVoucherBox, selectedUser} = this.state;
        return (
            <div className="page-list">
                <CustomList
                    list={users}
                    loading={loading}
                    titleList="Membres de la communautés"
                    itemsFoundText={n => `${n} utilisateur(s) trouvé(s)`}
                    renderItem={list => (
                        <div className="rct-tabs">
                            <ul className="list-unstyled m-0">
                                {list.length === 0 ? (
                                    <EmptyResult message="Aucun utilisateurs trouvés" />
                                ) : list.map((user, key) => (
                                    <ListItem
                                        key={key}
                                        user={user}
                                        buttonLabel="recharge"
                                        onGenerate={() => this.handleGenerate(user)}
                                        onViewVoucher={() => { this.setState({ selectedUser: user, showVoucherBox: true }) }}
                                    />
                                ))}
                            </ul>
                        </div>
                    )}
                />

                {selectedUser && (
                    <VoucherCreateModal
                        type='PAYMENT'
                        user={selectedUser}
                        show={showCreateVoucherBox && selectedUser}
                        close={() => this.setState({ showCreateVoucherBox: false })}
                    />
                )}

                {selectedUser && (
                    <VoucherModal
                        type='PAYMENT'
                        user={selectedUser}
                        show={showVoucherBox && selectedUser}
                        close={() => this.setState({ showVoucherBox: false, selectedUser: null })}
                    />
                )}
            </div>
        )
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

const mapStateToProps = ({ authUser, communitySpace, settings }) => {
    return {
        authUser: authUser.data,
        communitySpace: communitySpace,
        currencies: settings.currencies
    };
};

export default withRouter(connect(mapStateToProps, {
    readEmail,
    onSelectEmail,
    setRequestGlobalAction,
})(withStyles(useStyles, { withTheme: true })(ListMembers)));

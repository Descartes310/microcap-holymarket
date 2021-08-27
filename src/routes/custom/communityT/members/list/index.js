import ListItem from './ListItem';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SimpleProfile from './SimpleProfile';
import {withStyles} from "@material-ui/core";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import EmptyResult from "Components/EmptyResult";
import {onSelectEmail, readEmail} from 'Actions';
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import TimeFromMoment from "Components/TimeFromMoment";
import AmountCurrency from "Components/AmountCurrency";
import FetchFailedComponent from "Components/FetchFailedComponent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import {getMembersOfCommunity, getUser, getVouchers} from 'Actions/independentActions';

class ListMembers extends Component {
    static contextType = AbilityContext;

    state = {
        loading: true,
        users: [],
        codes: [],
        showVoucherBox: false,
        showBox: false,
        user: null,
        loadingCodes: false,
    };

    componentDidMount() {
        this.getMembers();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    getMembers = () => {
        getMembersOfCommunity(this.props.communitySpace.data)
            .then(data => {
                this.setState({ users: data });
            })
            .finally(() => this.setState({ loading: false }));
    };

    onViewVoucher = user => {
        this.setState({ showVoucherBox: true, loadingCodes: true });
        getVouchers(this.props.communitySpace.data, user.id, 'ALL')
            .then(data => {
                this.setState({ codes: data });
            }).catch(err => {
                this.setState({ codes: null });
            })
            .finally(() => this.setState({ loadingCodes: false }));
    };

    getUserDetails = (id) => {
        getUser(id).then(data => {
            this.setState({ user: data, showBox: true });
        })
    };

    render() {
        const { loading, users, user, showBox, codes, showVoucherBox, loadingCodes } = this.state;
        const { classes } = this.props;
        return (
            <div className="page-list mt-2">
                <CustomList
                    list={users}
                    loading={loading}
                    showBackBtn={false}
                    wrapClassName="mt-15 mx-4"
                    titleList="Membres de la communauté"
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
                                        onViewVoucher={() => this.onViewVoucher(user)}
                                        isMe={this.props.authUser.user.id === user.id}
                                        getUserDetails={() => this.getUserDetails(user.id)}
                                    />
                                ))}
                            </ul>
                        </div>
                    )}
                />
                <Dialog
                    open={showBox && user != null}
                    onClose={() => { this.setState({ showBox: false }) }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'lg'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Profile de l'utlisateur
                                                    <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => { this.setState({ showBox: false }) }}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <SimpleProfile user={user} community={this.props.communitySpace} onClose={() => this.setState({ showBox: false })} />
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={showVoucherBox}
                    onClose={() => { this.setState({ showVoucherBox: false, codes: [] }) }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'lg'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Codes de paiement actifs
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => { this.setState({ showVoucherBox: false, codes: [] }) }}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        {loadingCodes ? (
                            <RctSectionLoader/>
                        ) : !codes ? (
                            <FetchFailedComponent />
                        ) : codes.length === 0 ? (
                            <EmptyResult message="Aucun codes trouvés" />
                        ) : (
                            <table className="table table-hover table-middle mb-0 text-center">
                                <thead>
                                <tr>
                                    <th>Code de paiement</th>
                                    <th>Type</th>
                                    <th>Valeur</th>
                                    <th>Unité</th>
                                    <th>Date de création</th>
                                </tr>
                                </thead>
                                <tbody>
                                {codes.map((item, key) => (
                                    <tr key={key} className="cursor-pointer">
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark">{item.code}</h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark">{item.type}</h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark"><AmountCurrency amount={item.price} from={item.currency ? item.currency : 'EUR'} unit={item.unit} /></h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark">{item.unit ? item.unit.name : this.props.currencies.filter(c => c.code == item.currency)[0].name}</h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark"><TimeFromMoment time={item.updatedAt} /></h4>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </DialogContent>
                </Dialog>
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
})(withStyles(useStyles, { withTheme: true })(ListMembers)));

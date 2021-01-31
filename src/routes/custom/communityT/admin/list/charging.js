import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readEmail, onSelectEmail } from 'Actions';
import IntlMessages from 'Util/IntlMessages';
import { withStyles } from "@material-ui/core";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { createVoucher, getMembersOfCommunity, getVouchers } from 'Actions/independentActions';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { AbilityContext } from "Permissions/Can";
import User from "Models/User";
import SweetAlert from "react-bootstrap-sweetalert";
import { NotificationManager } from "react-notifications";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import CancelIcon from '@material-ui/icons/Cancel';
import TimeFromMoment from "Components/TimeFromMoment";

class ListMembers extends Component {

    static contextType = AbilityContext;

    state = {
        loading: true,
        showQuantityBox: false,
        showVoucherBox: false,
        selectedUser: null,
        code: [],
        users: []
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleGenerate = value => {
        this.setState({ showQuantityBox: true, selectedUser: value });
    };

    onViewVoucher = user => {
        this.setState({ showVoucherBox: true });
        getVouchers(this.props.communitySpace.data, user.id, 'CHARGING').then(data => {
            this.setState({ codes: data })
        }).catch(err => {
            console.log(err)
            this.setState({ codes: [] })
        }).finally(() => {})
    }

    onGenerate = value => {
        createVoucher(this.props.communitySpace.data, {
            user_id: this.state.selectedUser.id,
            price: value,
            type: 'CHARGING'
        }).then(data => {
            NotificationManager.success("Le code généré avec succès");
        }).catch(err => {
            NotificationManager.error("Une erreur est survenue")
        }).finally(() => this.setState({ showQuantityBox: false }))
    };

    getMembers = () => {
        getMembersOfCommunity(this.props.communitySpace.data).then(data => {
            this.setState({ users: data })
        }).finally(() => this.setState({ loading: false }))
    }

    componentDidMount() {
        this.getMembers();
    }

    render() {
        const { loading, users, showQuantityBox, showVoucherBox, codes } = this.state;
        const { classes } = this.props;
        return (

            <div className="page-list mt-40">
                <PageTitleBar title={"Membres de la communautés"} />
                {loading
                    ? (<RctSectionLoader />)
                    : (
                        <RctCollapsibleCard>
                            <div className="align-items-center mb-30 px-15 row">
                                <div className={classes.flex}>
                                    <FormControl>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <IconButton aria-label="facebook">
                                                    <i className="zmdi zmdi-search"></i>
                                                </IconButton>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="search"
                                                value={this.state.searched}
                                                placeholder={'Recherchez...'}
                                                onChange={event => this.onSearchChanged(event)}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </div>
                                <p className={classes.title}>
                                    {users.length} utilisateur(s) trouvé(s)
                                </p>
                            </div>
                            <div className="rct-tabs">
                                <ul className="list-unstyled m-0">
                                    {users.length > 0 ? users.map((user, key) => (
                                        <ListItem
                                            user={user}
                                            key={key}
                                            buttonLabel="recharge"
                                            onGenerate={() => this.handleGenerate(user)}
                                            onViewVoucher={() => this.onViewVoucher(user)}
                                        />
                                    ))
                                        :
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucun utilisateurs trouvés
                                            </h4>
                                        </div>
                                    }
                                </ul>
                            </div>
                        </RctCollapsibleCard>

                    )
                }
                <SweetAlert
                    input
                    btnSize="sm"
                    show={showQuantityBox}
                    showCancel
                    cancelBtnBsStyle="danger"
                    title="Montant"
                    placeHolder="10"
                    inputType="number"
                    onConfirm={(value) => this.onGenerate(value)}
                    onCancel={() => this.setState({ showQuantityBox: false })}
                    confirmBtnText="Générer"
                    cancelBtnText="Annuler"
                    confirmBtnCssClass="bg-primary text-white"
                >
                    Entrez le montant du code a générer
                </SweetAlert>
                <Dialog
                    open={showVoucherBox}
                    onClose={() => { this.setState({ showVoucherBox: false, codes: [] }) }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'lg'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Codes de recharge actifs
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
                        <table className="table table-hover table-middle mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Code de recharge</th>
                                    <th>Montant</th>
                                    <th>Date de création</th>
                                </tr>
                            </thead>
                            <tbody>
                                {codes && codes.map((item, key) => (
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
                                                    <h4 className="m-0 fw-bold text-dark">{item.price}</h4>
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

const mapStateToProps = ({ authUser, communitySpace }) => {
    return {
        authUser: authUser.data,
        communitySpace: communitySpace
    };
};

export default withRouter(connect(mapStateToProps, {
    readEmail,
    onSelectEmail,
})(withStyles(useStyles, { withTheme: true })(ListMembers)));

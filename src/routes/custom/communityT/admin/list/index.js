import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readEmail, onSelectEmail, getUnitTypes, getUnitbyType } from 'Actions';
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
import MenuItem from "@material-ui/core/MenuItem";
import { Form, FormGroup } from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import InputComponent from "Components/InputComponent";
import AmountCurrency from "Components/AmountCurrency";

class ListMembers extends Component {

    static contextType = AbilityContext;

    state = {
        loading: true,
        showQuantityBox: false,
        showVoucherBox: false,
        selectedUser: null,
        code: [],
        users: [],
        unitTypes: [],
        units: [],
        amount: 0,
        unit: null,
        type: null
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
        this.setState({ showQuantityBox: true, selectedUser: value });
    };

    onViewVoucher = user => {
        this.setState({ showVoucherBox: true });
        getVouchers(this.props.communitySpace.data, user.id, 'PAYMENT').then(data => {
            this.setState({ codes: data })
        }).catch(err => {
            console.log(err)
            this.setState({ codes: [] })
        }).finally(() => { })
    }

    onGenerate = () => {
        let data = {
            user_id: this.state.selectedUser.id,
            price: this.state.amount,
            type: 'PAYMENT'
        };

        if(this.state.type.id == 0) {
            data.currency = this.props.currencies.filter(c => c.id == this.state.unit.id)[0].code;
        } else {
            data.unit_id = this.state.unit.id;
        }

        createVoucher(this.props.communitySpace.data, data).then(data => {
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

    changeType = (type) => {
        if (type) {
            if (type.id != 0)
                this.fetchUnits(type.id);
            else
                this.setState({ units: this.props.currencies })
            this.setState({ type: type })
        }
    }

    componentDidMount() {
        this.getMembers();
        this.fetchUnitType()
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
                    show={false}
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
                    open={showQuantityBox}
                    onClose={() => { this.setState({ showQuantityBox: false, codes: [] }) }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'sm'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Créer un nouveau code
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => { this.setState({ showQuantityBox: false, codes: [] }) }}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="row align-items-center">
                            <div className="col-md-12 col-sm-12">
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="defaultPrice">
                                        Montant du coupon
                                    </InputLabel>
                                    <Input
                                        className="input-lg"
                                        type='number'
                                        onChange={(e) => this.setState({ amount: e.target.value })}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-md-12 col-sm-12">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="currency-helper">
                                        Type d'unité
                                    </InputLabel>
                                    <Select onChange={e => this.changeType(e.target.value)}>
                                        {[{ name: 'Devise', id: 0 }, ...this.state.unitTypes].map((item, index) => (
                                            <MenuItem key={index} value={item} className="center-hor-ver">
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row align-items-center" style={{ marginTop: '5%' }}>
                            <div className="col-md-12 col-sm-12">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="currency-helper">
                                        Unité du coupon
                                    </InputLabel>
                                    <Select onChange={e => this.setState({ unit: e.target.value })}>
                                        {this.state.units.map(item => (
                                            <MenuItem key={item.id} value={item} className="center-hor-ver">
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row align-items-center" style={{ marginTop: '5%' }}>
                            <Button
                                color="primary"
                                className="text-white"
                                style={{ width: '100%' }}
                                onClick={() => this.onGenerate()}
                            >
                                Générer le coupon
                            </Button>
                        </div>
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
                                    <th>Valeur</th>
                                    <th>Unité</th>
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

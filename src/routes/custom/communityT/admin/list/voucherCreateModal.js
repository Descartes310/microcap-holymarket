import {connect} from 'react-redux';
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import {withStyles} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import {AbilityContext} from "Permissions/Can";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from '@material-ui/icons/Cancel';
import {Button, FormGroup, Input } from "reactstrap";
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import {NotificationManager} from "react-notifications";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {getUnitbyType, getUnitTypes, onSelectEmail, readEmail} from 'Actions';
import { setRequestGlobalAction, createVoucher} from 'Actions';

class VoucherCreateModal extends Component {

    state = {
        code: [],
        unitTypes: [],
        units: [],
        amount: "0",
        unit: null,
        typeId: null,
    };

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

    validate = () => {
        const amount = Number(this.state.amount);

        if (isNaN(amount)) {
            NotificationManager.warning("Veuillez inserer un montant valide");
            return false;
        }

        if (this.state.typeId === null || isNaN(this.state.typeId)) {
            NotificationManager.warning("Veuillez selectionner un type d'unité");
            return false;
        }

        if (!this.state.unit) {
            NotificationManager.warning("Veuillez selectionner une unité de coupon");
            return false;
        }

        return true;
    };

    onGenerate = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            const data = {
                type: this.props.type,
                amount: this.state.amount,
                user_id: this.props.user.id,
                user_type: this.props.user.type,
            };

            if (this.state.typeId === 0) {
                data.currency = this.props.currencies.filter(c => c.id === this.state.unit.id)[0].code;
            } else {
                data.unit_id = this.state.unit.id;
            }

            createVoucher(this.props.communitySpace.data, data)
                .then(() => {
                    NotificationManager.success("Code généré avec succès");
                    this.props.close();
                })
                .finally(() => {
                    this.props.setRequestGlobalAction(false);
                    this.setState({ show: false });
                });
        }
    };

    changeType = (typeId) => {
        if (typeId !== 0)
            this.fetchUnits(typeId);
        else
            this.setState({ units: this.props.currencies });
        this.setState({ typeId });
    };

    componentDidMount() {
        this.fetchUnitType()
    }

    render() {

        const { amount } = this.state;
        const { show, close } = this.props;

        return (
            <div className="page-list">
                <Dialog
                    open={show}
                    onClose={() => { this.setState({ codes: [] }); close() }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'md'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Créer un nouveau codess
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => { this.setState({ codes: [] }); close() }}>
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
                                        type='number'
                                        value={amount}
                                        className="input-lg"
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
                                            <MenuItem key={index} value={item.id}>
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
                                            <MenuItem key={item.id} value={item}>
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
})(withStyles(useStyles, { withTheme: true })(VoucherCreateModal)));

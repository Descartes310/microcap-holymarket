import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import {Form, FormGroup} from 'reactstrap';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import UserSelect from 'Components/UserSelect';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class ShareBooking extends Component {

    state = {
        member: null,
        discounts: [],
        discount: null,
        hasDiscount: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.booking.nature == 'MARKETPLACE' && this.props.booking.parentReference != null) {
            this.getDiscounts();
        }
    }

    getDiscounts = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getDiscounts()
        .then((response) => this.setState({discounts: response}))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    onSubmit = () => {
        if(!this.props.booking || !this.state.member) {
            NotificationManager.error("Le formulaire n'est pas correctement renseigné");
            return;
        }

        let data = {
            referral_code: this.state.member.referralCode
        };

        this.props.setRequestGlobalAction(true);
        ProductService.shareBooking(this.props.booking.reference, data).then(() => {
            NotificationManager.success("Le code de reservation a bien été envoyé");
            this.props.onClose();
        }).catch(err => {
            NotificationManager.error("Code incorrect");
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        });
    }

    render() {
        const { onClose, show, title } = this.props;
        const { hasDiscount, discounts, discount } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <Form onSubmit={this.onSubmit}>
                    <UserSelect label={'Numéro utilisateur'} onChange={(_, user) => {
                        this.setState({ member: user });
                    }}/>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={hasDiscount}
                                onChange={() => this.setState({ hasDiscount: !hasDiscount })}
                            />
                        } label={'Associer un coupon de réduction'}
                        />
                    </FormGroup>
                    { hasDiscount && (
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Coupon de réduction
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={discount}
                                options={discounts}
                                onChange={(__, item) => {
                                    this.setState({ discount: item });
                                }}
                                getOptionLabel={(option) => `${option.label} - ${option.percentage}%`}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    )}
                    <div className="d-flex justify-content-end mt-3">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onClose()}
                            className="text-white font-weight-bold mr-20 bg-blue"
                        >
                            Annuler
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Continuer
                        </Button>
                    </div>
                </Form>
            </DialogComponent>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(ShareBooking)));
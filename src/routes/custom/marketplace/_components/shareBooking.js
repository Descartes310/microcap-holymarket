import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import UserSelect from 'Components/UserSelect';
import { setRequestGlobalAction } from 'Actions';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class ShareBooking extends Component {

    state = {
        member: null,
        useLimit: null,
        hasDiscount: false,
    }

    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        if(!this.props.booking || !this.state.member) {
            NotificationManager.error("Le formulaire n'est pas correctement renseigné");
            return;
        }

        let data = {
            usable: this.props.usable,
            referral_code: this.state.member.referralCode,
        };

        if(this.state.useLimit && this.state.useLimit > 0) {
            data.useLimit = this.state.useLimit;
        }

        this.props.setRequestGlobalAction(true);
        ProductService.shareBooking(this.props.booking.reference, data).then(() => {
            NotificationManager.success("Le code de reservation a bien été envoyé");
            this.props.onClose();
        }).catch(err => {
            NotificationManager.error("Veuillez respecter la limite d'utilisation");
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        });
    }

    render() {
        const { useLimit } = this.state;
        const { onClose, show, title } = this.props;

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
                    { !this.props.uniqueUsage && (
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="useLimit">
                                Nombre d'utilisation maximal
                            </InputLabel>
                            <InputStrap
                                required
                                id="useLimit"
                                type="number"
                                name='useLimit'
                                className="input-lg"
                                value={useLimit}
                                onChange={(e) => this.setState({ useLimit: e.target.value })}
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
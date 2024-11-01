import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import { FormGroup, Button } from 'reactstrap';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from "react-notifications";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class SetSellerModal extends Component {

    state = {
        sellers: [],
        seller: null,
     }
  
     constructor(props) {
        super(props);
     }

     componentDidMount() {
        this.getSellers();
     }

    getSellers = () => {
        OrderService.getOrderSellers(this.props.order?.reference)
        .then(sellers => {
            this.setState({ sellers });
        })
        .catch((error) => {
            this.setState({ sellers: [] });
        });
    };

    onSubmit = () => {
        if(!this.state.seller) {
            NotificationManager.error("Veuillez renseigner le commercant");
            return;
        }
        
        let data = {referral_code: this.state.seller.referralCode};
        this.props.setRequestGlobalAction(true);

        OrderService.setOrderSeller(this.props.order.reference, data)
        .then(() => {
            this.setState({ sellers: [], seller: null })
            NotificationManager.success("Le commercant a été attribué");
            this.props.onClose();
        }).catch(() => {
            NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard");
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show } = this.props;
        const { sellers, seller } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Assigner la commande à un commercant
                    </h3>
                )}
            >
                <RctCardContent>

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Commercants
                        </InputLabel>
                        <Autocomplete
                            value={seller}
                            options={sellers}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                this.setState({ seller: item });
                            }}
                            getOptionLabel={(option) => option.userName}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(SetSellerModal)));
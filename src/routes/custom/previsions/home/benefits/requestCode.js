import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';
import ProductService from 'Services/products';

class RequestCodeModal extends Component {
  
    state = {
        code: null
    }

    constructor(props) {
        super(props);
    }

    onSubmit = async () => {

        const { code } = this.state;

        if(!code) {
            NotificationManager.error("Le code de reservation est obligatoire");
            return;
        }

        this.props.setRequestGlobalAction(true);

        try {
            await ProductService.createBookingRequest(code, {});
            NotificationManager.success("Demande de code avantage envoyée avec succès");
            this.props.onClose();
        } catch (error) {
            console.error('Error creating booking request:', error);
            NotificationManager.error("Erreur lors de l'envoi de la demande");
        } finally {
            this.props.setRequestGlobalAction(false);
        }
    }

    render() {

        const { code } = this.state;
        const { onClose, show } = this.props;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Demander un code avantage
                    </h3>
                )}
            >
                <RctCardContent>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="code">
                            Code de reservation
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="code"
                            name='code'
                            value={code}
                            className="input-lg"
                            onChange={(e) => this.setState({ code: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Envoyer la demande
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(RequestCodeModal)));
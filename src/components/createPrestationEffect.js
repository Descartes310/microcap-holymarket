import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';

class CreatePrestationEffectModal extends Component {
  
    state = {
        label: null,
        description: null
    }

    constructor(props) {
        super(props);
    }

    onSubmit = () => {

        const { label, description } = this.state;

        if(!label) {
            NotificationManager.error("La désignation est obligatoire");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let data = {label, description};

        BankService.createEffect(this.props.prestation.id, data).then(() => {
            NotificationManager.success("L'effet de commerce a été créé avec succès");
        }).catch((err) => {
            NotificationManager.error("Une erreur est survenu lors de l'effet de commerce");
        }).finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { label, description } = this.state;

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
                <RctCardContent>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="label"
                            name='label'
                            value={label}
                            className="input-lg"
                            onChange={(e) => this.setState({ label: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="description"
                            name='description'
                            value={description}
                            className="input-lg"
                            onChange={(e) => this.setState({ description: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Créer l'effet
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(CreatePrestationEffectModal)));
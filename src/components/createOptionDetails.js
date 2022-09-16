import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import { productOptionDetails } from "Helpers/datas";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';

class CreateOptionDetailsModal extends Component {
  
    state = {
        type: null,
        value: null,
        description: null
    }

    constructor(props) {
        super(props);
    }

    onSubmit = () => {

        const { value, description, type } = this.state;

        if(!type || !value) {
            NotificationManager.error("La désignation est obligatoire");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let data = {type: type.value, label: type.label, value, description};

        ProductService.createCodevOptionDetails(this.props.option.reference, data).then(() => {
            NotificationManager.success("Le détails a été créé avec succès");
        }).catch((err) => {
            NotificationManager.error("Une erreur est survenu lors de la création du details");
        }).finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { type, value, description } = this.state;

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
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Type du détails
                        </InputLabel>
                        <Autocomplete
                            value={type}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                this.setState({ type: item });
                            }}
                            options={productOptionDetails}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="value">
                            Valeur
                        </InputLabel>
                        <InputStrap
                            required
                            id="value"
                            name="value"
                            value={value}
                            className="input-lg"
                            type={type ? type.inputType : "text"}
                            onChange={(e) => this.setState({ value: e.target.value })}
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
                            Créer le détails
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(CreateOptionDetailsModal)));
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';

class AddPrestationModal extends Component {
  
    state = {
        amount: null,
        prestations: [],
        selectedPrestations: []
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getPrestations();
    }
    
    getPrestations = () => {
        this.props.setRequestGlobalAction(true),
        BankService.getPrestations()
        .then(response => this.setState({ prestations: response.filter(p => p.id > 0) }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {

        const { selectedPrestations } = this.state;

        if(selectedPrestations.length <= 0) {
            NotificationManager.error("Sélectionner les prestations");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let data = {prestations: selectedPrestations.map(p => p.id)};

        BankService.addPrestation(this.props.mandateReference, data).then(() => {
            NotificationManager.success("Les prestations ont été ajoutés avec succès");
        }).catch((err) => {
            NotificationManager.error("Une erreur est survenu lors de la création de la prestation");
        }).finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { prestations, selectedPrestations } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="sm"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <RctCardContent>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Prestations
                        </InputLabel>
                        <Autocomplete
                            multiple
                            id="combo-box-demo"
                            options={prestations}
                            value={selectedPrestations}
                            onChange={(__, items) => {
                                this.setState({ selectedPrestations: items });
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(AddPrestationModal)));
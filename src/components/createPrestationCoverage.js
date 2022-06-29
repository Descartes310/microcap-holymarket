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
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class CreatePrestationCoverageModal extends Component {
  
    state = {
        label: null,
        coverage: null,
        coverages: [],
        mandatory: false,
        description: null
    }

    constructor(props) {
        super(props);
    }    

    componentDidMount() {
        this.getCoverages();
    }

    getCoverages = () => {
        this.props.setRequestGlobalAction(true),
        BankService.getAvailableCoverages(this.props.prestation.id)
        .then(response => this.setState({ coverages: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {

        const { label, description, mandatory, coverage } = this.state;

        if(!coverage) {
            NotificationManager.error("La couverture est obligatoire");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let data = {description, mandatory, coverageId: coverage.id};

        BankService.addCoverageToPrestation(this.props.prestation.id, data).then(() => {
            NotificationManager.success("La couverture a été ajoutée avec succès");
        }).catch((err) => {
            NotificationManager.error("Une erreur est survenu lors de l'ajout de la couverture");
        }).finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { coverages, description, mandatory, coverage } = this.state;

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
                            Couverture
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={coverages}
                            value={coverage}
                            onChange={(__, item) => {
                                this.setState({ coverage: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
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
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={mandatory}
                                onChange={() => this.setState({ mandatory: !mandatory })}
                            />
                        } label={'Couverture obligatoire'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Ajouter la couverture
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(CreatePrestationCoverageModal)));
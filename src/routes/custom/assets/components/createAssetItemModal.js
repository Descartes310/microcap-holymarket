import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import AssetService from 'Services/assets';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class CreateAssetItemModal extends Component {
  
    state = {
        types: [],
        type: null,
        label: null,
        worth: null,
        endDate: null,
        startDate: null,
        fluctuable: false,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getSeriesTypes();
    }

    getSeriesTypes = () => {
        this.props.setRequestGlobalAction(true);
        AssetService.getSeriesTypes()
        .then(response => {
            this.setState({ types: response });
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    onSubmit = () => {

        const { type, label, description, worth, startDate, endDate, fluctuable } = this.state;

        if(!type || !label || !worth || !startDate || !endDate) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        this.props.onSubmit({
            label, description, startDate, endDate,
            series_type_reference: type.reference, fluctuable,
            worth, asset_parent_reference: this.props.match.params.id
        })
    }

    render() {

        const { onClose, show, title, parent } = this.props;
        const { types, type, label, description, 
            worth, startDate, endDate, fluctuable } = this.state;

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
                            Désignation
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="label"
                            className="input-lg"
                            name='label'
                            value={label}
                            onChange={(e) => this.setState({ label: e.target.value })}
                        />
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="worth">
                            Valeur de reference (en {parent?.currency})
                        </InputLabel>
                        <InputStrap
                            required
                            type="number"
                            id="worth"
                            className="input-lg"
                            name='worth'
                            value={worth}
                            onChange={(e) => this.setState({ worth: e.target.value })}
                        />
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            type="textarea"
                            id="description"
                            className="input-lg"
                            name='description'
                            value={description}
                            onChange={(e) => this.setState({ description: e.target.value })}
                        />
                    </FormGroup>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Type de série
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={type}
                            options={types}
                            onChange={(__, item) => {
                                this.setState({ type: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="startDate">
                            Date d'emission
                        </InputLabel>
                        <InputStrap
                            required
                            type="date"
                            id="startDate"
                            className="input-lg"
                            name='startDate'
                            value={startDate}
                            onChange={(e) => this.setState({ startDate: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="endDate">
                            Date de fin
                        </InputLabel>
                        <InputStrap
                            required
                            type="date"
                            id="endDate"
                            className="input-lg"
                            name='endDate'
                            value={endDate}
                            onChange={(e) => this.setState({ endDate: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={fluctuable}
                                onChange={() => this.setState({fluctuable: !fluctuable})}
                            />
                        } label={"Valeur fluctante"}
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Créer le démembrement
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(CreateAssetItemModal)));
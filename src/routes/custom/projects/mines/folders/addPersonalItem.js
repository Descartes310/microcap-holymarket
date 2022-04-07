import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class AddPersonalItemModal extends Component {
  
    state = {
        item: null,
        mandatory: false,
        editable: false
    }

    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        const { item, mandatory, editable } = this.state;
        this.props.onAdd({ item, mandatory, editable });
    }

    render() {

        const { item, mandatory, editable } = this.state;
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
                <RctCardContent>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Ouvrage
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={this.props.items}
                            value={item}
                            onChange={(__, item) => {
                                this.setState({ item: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={mandatory}
                                onChange={() => this.setState({ mandatory: !mandatory })}
                            />
                        } label={'Ouvrage obligatoire'}
                        />
                    </FormGroup>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={editable}
                                onChange={() => this.setState({ editable: !editable })}
                            />
                        } label={'Ouvrage éditable'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Ajouter l'ouvrage
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default withRouter(injectIntl(AddPersonalItemModal));
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { FormGroup, Button } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class Brouillard extends Component {

    state = {
        fogs: [],
        selectedFogs: []
    }
  
    constructor(props) {
        super(props);
    }
  
    render() {

        const { selectedFogs, fogs } = this.state;
        const { onClose, show, title } = this.props;

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
                    <FormGroup tag="fieldset">
                        <div className="col-md-12 col-sm-12 d-flex has-wrapper">
                            <InputLabel className="text-left">
                                Liste des brouillards
                            </InputLabel>
                            <Autocomplete
                                multiple
                                options={fogs}
                                id="combo-box-demo"
                                value={selectedFogs}
                                onChange={(__, items) => {
                                    this.setState({ selectedFogs: items });
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <FormGroup>
                            <Button
                                color="primary"
                                onClick={() => console.log(mcm, opmcm, liquidationRef, liquidationDate)}
                                className="w-100 ml-0 mt-15 text-white"
                            >
                                Enregistrer
                            </Button>
                        </FormGroup>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default withRouter(injectIntl(Brouillard));
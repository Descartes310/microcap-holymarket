import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { FormGroup, Input as InputStrap } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class ExecuteOperationModal extends Component {

    state = {
        checked: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { onClose, show, title, executeOperation } = this.props;
        const { checked } = this.state;
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
                <FormGroup className="col-sm-12 has-wrapper">
                    <FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={checked}
                            onChange={(e) => this.setState({checked: e.target.checked})}
                        />
                    } label={'Executer cette opération'}
                    />
                </FormGroup>

                
                <div className="d-flex justify-content-end mt-3">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => executeOperation()}
                        className="text-white font-weight-bold"
                    >
                        Executer l'opération
                    </Button>
                </div>
            </DialogComponent>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(ExecuteOperationModal)));
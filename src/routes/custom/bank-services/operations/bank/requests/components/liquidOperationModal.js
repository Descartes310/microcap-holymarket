import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TimeFromMoment from "Components/TimeFromMoment";
import { FormGroup, Input as InputStrap } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class LiquidOperationModal extends Component {

    state = {
        liquidReference: ''
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { onClose, show, title, liquidOperation } = this.props;
        const { liquidReference } = this.state;
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
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="reference">
                        Reference de liquidation
                    </InputLabel>
                    <InputStrap
                        required
                        type="text"
                        id="reference"
                        name='reference'
                        value={liquidReference}
                        className="input-lg"
                        onChange={(e) => this.setState({ liquidReference: e.target.value })}
                    />
                </FormGroup>

                
                <div className="d-flex justify-content-end mt-3">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => liquidOperation(liquidReference)}
                        disabled={!liquidReference}
                        className="text-white font-weight-bold"
                    >
                        Liquider
                    </Button>
                </div>
            </DialogComponent>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(LiquidOperationModal)));
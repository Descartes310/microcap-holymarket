import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { RctCardContent } from 'Components/RctCard';
import { FormGroup, Input, Button } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class EditOperation extends Component {

    state = {
        mcm: null,
        opmcm: null,
        liquidationRef: null,
        liquidationDate: null,
    }
  
    constructor(props) {
        super(props);
    }
  
    render() {

        const { onClose, show, title } = this.props;
        const { mcm, opmcm, liquidationRef, liquidationDate } = this.state;

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

                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="mcm">
                                Numéro d'enregistrement MCM
                            </InputLabel>
                            <Input
                                required
                                id="mcm"
                                type="text"
                                name='mcm'
                                value={mcm}
                                className="input-lg"
                                onChange={(e) => this.setState({ mcm: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="opmcm">
                                Numéro d'enregistrement OPMCM
                            </InputLabel>
                            <Input
                                required
                                id="opmcm"
                                type="text"
                                name='opmcm'
                                value={opmcm}
                                className="input-lg"
                                onChange={(e) => this.setState({ opmcm: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="reference">
                                Reference de liquidation
                            </InputLabel>
                            <Input
                                required
                                type="text"
                                id="reference"
                                name='reference'
                                className="input-lg"
                                value={liquidationDate}
                                onChange={(e) => this.setState({ liquidationDate: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="date">
                                Date de liquidation
                            </InputLabel>
                            <Input
                                required
                                id="date"
                                type="date"
                                name='date'
                                className="input-lg"
                                value={liquidationDate}
                                onChange={(e) => this.setState({ liquidationDate: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Button
                                color="primary"
                                disabled={!mcm || !opmcm || !liquidationRef || !liquidationDate}
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

export default withRouter(injectIntl(EditOperation));
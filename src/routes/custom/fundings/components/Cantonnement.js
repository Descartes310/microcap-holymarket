import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { FormGroup, Input, Button } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class Cantonnement extends Component {

    state = {
        amount: 0,
        reason: ''
     }
  
     constructor(props) {
        super(props);
     }

     componentDidMount() {}
  
     onDebit = () => {
        this.props.onSubmit(this.state.amount, this.state.reason);
     }
  

    render() {

        const { onClose, show, title } = this.props;
        const { reason, amount } = this.state;

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
                            <InputLabel className="text-left" htmlFor="amount">
                                Montant à cantonner
                            </InputLabel>
                            <Input
                                required
                                id="amount"
                                type="number"
                                name='amount'
                                value={amount}
                                className="input-lg"
                                onChange={(e) => this.setState({ amount: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Raison du cantonnement
                            </InputLabel>
                            <Input
                                required
                                id="reason"
                                type="text"
                                name='reason'
                                value={reason}
                                className="input-lg"
                                onChange={(e) => this.setState({ reason: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Button
                                color="primary"
                                disabled={amount <= 0}
                                onClick={() => this.onDebit()}
                                className="w-100 ml-0 mt-15 text-white"
                            >
                                Cantonner
                            </Button>
                        </FormGroup>
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(Cantonnement)));
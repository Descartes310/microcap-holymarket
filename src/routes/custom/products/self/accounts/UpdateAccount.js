import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { PRODUCT } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { updateAccountInfos, setRequestGlobalAction } from "Actions";
import { Button, Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

class UpdateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iban: ''
        }
    }

    componentDidMount() {
        this.accountId = this.props.match.params.id;
    }

    handleOnFormChange = (field, value) => {
        this.setState({ [field]: value });
    };

    validate = () => {
        if (this.state.iban.trim().length <= 0) {
            NotificationManager.error(this.props.intl.formatMessage({ id: 'form.error.verify.name' }));
            return false;
        }

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            let data = {
                iban: this.state.iban,
            };

            updateAccountInfos(this.accountId, data)
                .then((response) => {
                    this.props.history.push(PRODUCT.UNCOMPLETE_ACCOUNTS);
                })
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    render() {
        const { match, history } = this.props;

        return (
            <>
                <PageTitleBar
                    match={match}
                    history={history}
                    title={"Edition du compte"}
                />
                <div className="full-height row">
                    <div className="col-md-12 col-sm-12 pr-md-40">
                        <RctCollapsibleCard>
                            <Form onSubmit={this.onSubmit}>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="iban">
                                            IBAN
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="iban"
                                            name={'iban'}
                                            value={this.state.iban}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('iban', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <Button
                                        color="primary"
                                        className="fw-bold btn-submit text-white"
                                        onClick={() => this.onSubmit()}
                                    >
                                        Enregistrer
                                    </Button>
                                </div>

                            </Form>
                        </RctCollapsibleCard>
                    </div>
                </div>
            </>
        );
    }
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter((injectIntl(UpdateAccount))));

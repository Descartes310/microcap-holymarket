import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import IntlMessages from "Util/IntlMessages";
import { withRouter } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { BROKER, joinUrlWithParamsId } from "Url/frontendUrl";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { createAgencyCounter, setRequestGlobalAction } from "Actions";
import { Button, Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: ''
        }
    }

    componentDidMount() {
        this.agencyId = this.props.match.params.id;
    }

    handleOnFormChange = (field, value) => {
        this.setState({ [field]: value });
    };

    validate = () => {
        if (this.state.label.trim().length <= 0) {
            NotificationManager.error(this.props.intl.formatMessage({ id: 'form.error.verify.name' }));
            return false;
        }

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            let data = {
                label: this.state.label,
                agency_id: this.agencyId
            };

            createAgencyCounter(data)
                .then((response) => {
                    NotificationManager.success("Nouveau guichet créé avec succès");
                    this.props.history.push(joinUrlWithParamsId(BROKER.COUNTERS.LIST, this.agencyId));
                })
                .catch(() => null)
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
                    title={"Création d'un nouveau guichet"}
                />
                <div className="full-height row">
                    <div className="col-md-12 col-sm-12 pr-md-40">
                        <RctCollapsibleCard>
                            <Form onSubmit={this.onSubmit}>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="label">
                                            Nom du guichet
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="label"
                                            name={'label'}
                                            value={this.state.label}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('label', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <Button
                                        color="primary"
                                        className="fw-bold btn-submit text-white"
                                        onClick={() => this.onSubmit()}
                                    >
                                        <i className="fw-bold ti-check mr-2" />
                                        <IntlMessages id="button.submit" />
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

const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter((injectIntl(Create))));

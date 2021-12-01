import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import IntlMessages from "Util/IntlMessages";
import { withRouter } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { BROKER, joinUrlWithParamsId } from "Url/frontendUrl";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { Button, Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { createAgencyCounter, setRequestGlobalAction, getOrganisationMembers } from "Actions";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            label: '',
            members: [],
            managerId: null,
        }
    }

    componentDidMount() {
        this.getMembers();
    }

    getMembers = () => {
        this.props.setRequestGlobalAction(true);
        getOrganisationMembers('BROKER_COUNTER').then(members => {
            this.setState({ members })
        }).catch(err => {
            this.setState({ members: [] })
        }).finally(() => this.props.setRequestGlobalAction(false))
    };

    handleOnFormChange = (field, value) => {
        this.setState({ [field]: value });
    };

    validate = () => {
        if (this.state.label.trim().length <= 0) {
            NotificationManager.error(this.props.intl.formatMessage({ id: 'form.error.verify.name' }));
            return false;
        }
        if (this.state.city.trim().length <= 0) {
            NotificationManager.error("La ville du guichet est obligatoire");
            return false;
        }

        if (!this.state.managerId) {
            NotificationManager.error("Le responsable est obligatoire");
            return false;
        }

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            let data = {
                city: this.state.city,
                label: this.state.label,
                manager_id: this.state.managerId,
            };

            createAgencyCounter(data)
                .then((response) => {
                    NotificationManager.success("Nouveau guichet créé avec succès");
                })
                .finally(() => {
                    this.props.setRequestGlobalAction(false);
                    this.props.history.push(BROKER.COUNTERS.LIST);
                });
        }
    };

    render() {
        const { match, history } = this.props;
        const { members } = this.state;
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

                                <h2 className="font-weight-bold mb-30">Informations sur le guichet</h2>

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
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="city">
                                            Ville d'implantation
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="city"
                                            name={'city'}
                                            value={this.state.city}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('city', event.target.value)}
                                        />
                                    </FormGroup>
                                </div>

                                <h2 className="font-weight-bold mb-30">Informations sur le responsable</h2>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="manager">
                                            Responsable
                                        </InputLabel>
                                        <select
                                            className="form-control"
                                            style={{ width: '100%', display: 'inline-block' }}
                                            onChange={(e) => this.setState({ managerId: e.target.value })}
                                        >
                                            <option value={null}>
                                                Choisissez un responsable
                                            </option>
                                            {
                                                members.map((item, index) => (
                                                    <option key={index} value={item.user.id}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
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

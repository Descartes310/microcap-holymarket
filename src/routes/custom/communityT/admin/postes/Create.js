import PropTypes from "prop-types";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import {NotificationManager} from "react-notifications";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {setRequestGlobalAction, createGroupPost} from "Actions";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {COMMUNITY_ADMIN, joinUrlWithParamsId} from "Url/frontendUrl";
import {Button, Form, FormGroup, Input as InputStrap} from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

class Create extends Component {
    constructor(props) {
        super(props);
        this.communitySpaceId = this.props.match.params.id;

        this.state = {
            label: '',
            description: '',
        }
    }

    handleOnFormChange = (field, value) => {
        this.setState({[field]: value});
    };

    validate = () => {
        if (this.state.label.length === 0) {
            NotificationManager.error("Vous devez inserer un titre");
            return false;
        }

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            const data = {
                title: this.state.label,
                description: this.state.description,
                group_id: this.props.communitySpace
            };

            createGroupPost(data)
                .then(() => {
                    NotificationManager.success("Categorie créé avec succès");
                    this.props.history.push(joinUrlWithParamsId(COMMUNITY_ADMIN.POST.LIST, this.communitySpaceId));
                })
                .catch(() => null)
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };


    onBackClick = () => {
        this.props.history.push(PROJECTS.POST_PROJETS.LIST);
    };

    render() {

        return (
            <div className="my-3">
                <PageTitleBar
                    title="Création d'une catégorie de membre"
                />
                <div className="row">
                    <div className="col-md-12 col-sm-12 pr-md-40">
                        <RctCollapsibleCard>
                            <Form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="label">
                                            Titre
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="label"
                                            name={'label'}
                                            value={this.state.label}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('label', event.target.value)}
                                        />
                                        <span className="has-icon"><i className="ti-pencil"/></span>
                                    </FormGroup>

                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="label">
                                            Description
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            type="textarea"
                                            id="description"
                                            name={'description'}
                                            value={this.state.description}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('description', event.target.value)}
                                        />
                                        <span className="has-icon"><i className="ti-pencil"/></span>
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
            </div>
        );
    }
}

Create.propTypes = {
    type: PropTypes.string.isRequired,
};

const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        communitySpace: communitySpace.data
    }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(withRouter((injectIntl(Create))));

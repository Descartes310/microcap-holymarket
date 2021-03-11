import PropTypes from "prop-types";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, {Component} from 'react';
import {SETTINGS} from "Url/frontendUrl";
import {ERROR_500} from "Constants/errors";
import {withRouter} from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import CustomList from "Components/CustomList";
import {NotificationManager} from "react-notifications";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import DeleteConfirmBox from "Components/dialog/DeleteConfirmBox";
import {getProjectStandardPresentation} from "Actions/GeneralActions";
import {Button, Form, FormGroup, Input as InputStrap} from 'reactstrap';
import {setRequestGlobalAction, createGroupPost} from "Actions";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            description: '',
        }
    }

    componentDidMount() {
    }

    handleOnFormChange = (field, value) => {
        this.setState({[field]: value});
    };

    validate = () => {
        if (this.state.label.length === 0) {
            NotificationManager.error("Vous devez inserer un titre");
            return false;
        }

        /* if (this.state.description.length === 0) {
            NotificationManager.error("Veuillez selectionner une description");
            return false;
        } */

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            const data = {
                title: this.state.label,
                description: this.state.description
            };

            createGroupPost(data)
                .then(() => {
                    NotificationManager.success("Categorie créé avec succès");
                    this.props.history.push(SETTINGS.POST.LIST);
                })
                .catch((err) => {
                    console.log(err)
                    NotificationManager.error(ERROR_500);
                })
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    render() {

        return (
            <div className="my-3">
                <div className="my-3 pl-3 page-title m-0">
                    <h3 className="font-lg d-inline-flex">
                        Création d'une catégorie native de membre
                    </h3>
                </div>
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

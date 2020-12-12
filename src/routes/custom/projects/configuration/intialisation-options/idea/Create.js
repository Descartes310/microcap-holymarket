import PropTypes from "prop-types";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, {Component} from 'react';
import {PROJECTS} from "Url/frontendUrl";
import {ERROR_500} from "Constants/errors";
import {withRouter} from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import Select from "@material-ui/core/Select/Select";
import {NotificationManager} from "react-notifications";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import {Button, Form, FormGroup, Input as InputStrap} from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {createInitialisationOption, setRequestGlobalAction, getProjectWorks} from "Actions";

class InitialisationItemCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            workId: [],
            content: '',
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.props.getProjectWorks(this.props.authUser.branchId)
            .then(result => {
                if (result) {
                    this.setState({workId: result[0] ? result[0].id : undefined});
                }
            });
    };

    handleOnFormChange = (field, value) => {
        this.setState({[field]: value});
    };

    validate = () => {
        if (this.state.label.length === 0) {
            NotificationManager.error("Vous devez inserer un titre");
            return false;
        }

        if (this.state.content.length === 0) {
            NotificationManager.error("Vous devez inserer une description");
            return false;
        }

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            const data = {
                type: this.props.type,
                name: this.state.label,
                works: JSON.stringify([{id: Number(this.state.workId), content: this.state.content}]),
                branchId: this.props.authUser.branchId,
            };

            createInitialisationOption(data)
                .then(() => {
                    NotificationManager.success("Ouvrage de projets créé avec succès");
                    this.props.history.push(PROJECTS.CONFIGURATION.INITIALISATION[this.props.type].LIST);
                })
                .catch(() => {
                    NotificationManager.error(ERROR_500);
                })
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    handleSelect = (event) => {
        const values = Array.from(event.target.selectedOptions, option => option.value);
        this.setState({ works: values })
    };

    onBackClick = () => {
        this.props.history.push(PROJECTS.CONFIGURATION.INITIALISATION[this.props.type].LIST);
    };

    getText = () => {
        return this.props.type === 'IDEA'
            ? "Création d'une idée"
            : this.props.type === 'APP'
                ? "Création d'un appel à projet"
                : "Création d'un programme"
    };

    render() {
        const { intl, match, history, projectWorks } = this.props;

        return (
            <div className="my-3">
                <div className="my-3 pl-3 page-title m-0">
                    <i onClick={this.onBackClick} className="ti-angle-left cursor-pointer mr-2 icon-hover d-inline-flex"/>
                    <h3 className="font-lg d-inline-flex">
                        {this.getText()}
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
                                        <InputLabel className="text-left" htmlFor="description">
                                            Contenu
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="description"
                                            name={'description'}
                                            value={this.state.content}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('content', event.target.value)}
                                        />
                                        <span className="has-icon"><i className="ti-pencil"/></span>
                                    </FormGroup>

                                    <CustomAsyncComponent
                                        loading={false}
                                        data={projectWorks.data}
                                        component={data => (
                                            <FormGroup className="col-sm-12 has-wrapper">
                                                <InputLabel className="text-left" htmlFor="description">
                                                    Ouvrage
                                                </InputLabel>
                                                {/*<InputStrap
                                                    type="select"
                                                    name="selectMulti"
                                                    id="SelectMulti"
                                                    value={this.state.works}
                                                    onChange={event => this.handleOnFormChange('workId', event.target.value)}>
                                                    {data.map((item, index) => (
                                                        <option key={index} value={item.id}>{item.title}</option>
                                                    ))}
                                                </InputStrap>*/}
                                                <Select
                                                    value={this.state.workId}
                                                    onChange={event => this.handleOnFormChange('workId', event.target.value)}
                                                    input={<Input name="institution" id="institution-helper" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                            {item.title}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormGroup>
                                        )}
                                    />
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

InitialisationItemCreate.propTypes = {
    type: PropTypes.string.isRequired,
};

const mapStateToProps = ({ requestGlobalLoader, authUser, projectWorks }) => {
    return {
        projectWorks,
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, {setRequestGlobalAction, getProjectWorks})(withRouter((injectIntl(InitialisationItemCreate))));

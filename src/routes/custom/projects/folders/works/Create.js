import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { PROJECTS } from "Url/frontendUrl";
import { ERROR_500 } from "Constants/errors";
import { withRouter } from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import Select from "@material-ui/core/Select/Select";
import { NotificationManager } from "react-notifications";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import { Button, Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { createProjectWork, setRequestGlobalAction, getUsersBooks, getProjectWorks } from "Actions";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            description: '',
            parentId: '-1',
            type: null,
            books: [],
            complex: [],
            model: 0
        }
    }

    componentDidMount() {
        this.loadData();
        this.props.getProjectWorks(this.props.authUser.branchId, 'COMPLEX');
    }

    loadData = () => {
        this.props.setRequestGlobalAction(true);
        getUsersBooks().then(data => {
            this.setState({ books: data })
        }).finally(() => this.props.setRequestGlobalAction(false))
    };

    handleOnFormChange = (field, value) => {
        this.setState({ [field]: value });
    };

    validate = () => {
        if (this.state.type == 'SIMPLE' && this.state.label.length === 0) {
            NotificationManager.error(this.props.intl.formatMessage({ id: 'form.error.verify.name' }));
            return false;
        }

        if (this.state.type == 'COMPLEX' && this.state.model === 0) {
            NotificationManager.error(this.props.intl.formatMessage({ id: 'form.error.verify.name' }));
            return false;
        }

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            let data = {
                title: this.state.label,
                description: this.state.description,
                branchId: this.props.authUser.branchId,
                admin: false
            };
            if (this.state.parentId !== '-1') {
                data.parentId = Number(this.state.parentId);
            }

            if (this.state.type === 'COMPLEX') {
                data.modelId = Number(this.state.model);
            }

            createProjectWork(data)
                .then(() => {
                    NotificationManager.success("Ouvrage de projets créé avec succès");
                    this.props.history.push(PROJECTS.FOLDERS.WORKS.LIST);
                })
                .catch(() => null)
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    render() {
        const { match, history } = this.props;
        const { books } = this.state;

        return (
            <>
                <PageTitleBar
                    match={match}
                    history={history}
                    title={"Création d'un type d'ouvrage personnalisé"}
                />
                <div className="full-height row">
                    <div className="col-md-12 col-sm-12 pr-md-40">
                        <RctCollapsibleCard>
                            <Form onSubmit={this.onSubmit}>

                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="type">
                                            Type d'ouvrage
                                        </InputLabel>
                                        <Select
                                            value={this.state.type}
                                            onChange={event => { this.setState({ type: event.target.value, model: 0 }) }}
                                            input={<Input name="type" id="type" />}>
                                            <MenuItem value="SIMPLE">
                                                Ouvrage personnalisé
                                            </MenuItem>
                                            <MenuItem value="COMPLEX">
                                                Modèle composé
                                            </MenuItem>
                                        </Select>
                                    </FormGroup>
                                </div>

                                {this.state.type && (
                                    this.state.type == 'SIMPLE' ?
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
                                                <span className="has-icon"><i className="ti-pencil" /></span>
                                            </FormGroup>

                                            <FormGroup className="col-sm-12 has-wrapper">
                                                <InputLabel className="text-left" htmlFor="description">
                                                    Description
                                                </InputLabel>
                                                <InputStrap
                                                    required
                                                    id="description"
                                                    name={'description'}
                                                    value={this.state.description}
                                                    className="has-input input-lg input-border"
                                                    onChange={event => this.handleOnFormChange('description', event.target.value)}
                                                />
                                                <span className="has-icon"><i className="ti-pencil" /></span>
                                            </FormGroup>

                                            <CustomAsyncComponent
                                                loading={false}
                                                data={books}
                                                component={data => (
                                                    <FormGroup className="col-sm-12 has-wrapper">
                                                        <InputLabel className="text-left" htmlFor="description">
                                                            Ouvrage parent
                                                        </InputLabel>
                                                        <Select
                                                            value={this.state.parentId}
                                                            onChange={event => this.setState({ parentId: event.target.value })}
                                                            input={<Input name="institution" id="institution-helper" />}>
                                                            <MenuItem value="-1">
                                                                Aucun
                                                            </MenuItem>
                                                            {data.map((item, index) => (
                                                                <MenuItem key={index} value={item.id}>
                                                                    {item.title}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormGroup>
                                                )}
                                            />
                                        </div> :
                                        <div className="row">
                                            <CustomAsyncComponent
                                                loading={this.props.loading}
                                                data={this.props.list}
                                                component={data => (
                                                    <FormGroup className="col-sm-12 has-wrapper">
                                                        <InputLabel className="text-left" htmlFor="model">
                                                            Modèle
                                                        </InputLabel>
                                                        <Select
                                                            value={this.state.model}
                                                            onChange={event => this.setState({ model: event.target.value })}
                                                            input={<Input name="model" id="model-helper" />}>
                                                            {data.map((item, index) => (
                                                                <MenuItem key={index} value={item.id}>
                                                                    {item.title}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormGroup>
                                                )}
                                            />
                                        </div>
                                )}

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

Create.propTypes = {

};

const mapStateToProps = ({ requestGlobalLoader, authUser, projectWorks }) => {
    const list = projectWorks;
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: list.loading,
        list: list.data,
        error: list.error
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction, getProjectWorks })(withRouter((injectIntl(Create))));

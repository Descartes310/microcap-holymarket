import PropTypes from "prop-types";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import AddWork from "./CreateItem";
import React, {Component} from 'react';
import {PROJECTS} from "Url/frontendUrl";
import {ERROR_500} from "Constants/errors";
import {withRouter} from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import CustomList from "Components/CustomList";
import {NotificationManager} from "react-notifications";
import DeleteConfirmBox from "Components/dialog/DeleteConfirmBox";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {Button, Form, FormGroup, Input as InputStrap} from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {updateInitialisationOption, setRequestGlobalAction, getInitialisationOption, getProjectWorks} from "Actions";

class UpdateInitiOption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            label: '',
            storeWorks: [],
            description: '',
            chosenWorks: [],
            showCreateBox: false,
            deleteItem: null,
            showDeleteBox: false,
            option: {}
        }
        this.optionId = this.props.match.params.id;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getInitialisationOption(this.optionId)
            .then(result => {
                this.setState({ option: result, label: result.name, chosenWorks: result.works.map(i => ({id: Number(i.book.id), title: i.book.title, content: i.content, description: i.description, required: i.required, editable: i.editable, max: i.max})) })
            })
            .catch((err) => console.log(err));
        this.props.getProjectWorks(this.props.authUser.branchId)
        .then(result => this.setState({ storeWorks: result }));
    };

    handleOnFormChange = (field, value) => {
        this.setState({[field]: value});
    };

    validate = () => {
        if (this.state.label.length === 0) {
            NotificationManager.error("Vous devez inserer un titre");
            return false;
        }

        if (this.state.chosenWorks.length === 0) {
            NotificationManager.error("Vous devez sélectionner au moins un ouvrage de projet");
            return false;
        }

        return true;
    };

    onAddWork = (work) => {
        this.setState(prevState => ({
            chosenWorks: [...prevState.chosenWorks, {...work}],
            storeWorks: prevState.storeWorks.filter(p => p.id !== work.id),
            showCreateBox: false,
        }));
    };

    onDeleteWork = () => {
        this.setState(prevState => ({
            chosenWorks: prevState.chosenWorks.filter(p => p.id !== this.state.deleteItem.id),
            storeWorks: [...prevState.storeWorks, this.state.deleteItem],
            showDeleteBox: false,
        }));
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            const data = {
                name: this.state.label,
                works: JSON.stringify(this.state.chosenWorks.map(i => ({id: Number(i.id), content: i.content, description: i.description, required: i.required, editable: i.editable, max: i.max}))),
            };

            updateInitialisationOption(this.optionId, data)
                .then(() => {
                    NotificationManager.success("Ouvrage de projets mis a jour avec succès");
                    this.props.history.push(PROJECTS.CONFIGURATION.INITIALISATION[this.state.option.type].LIST);
                })
                .catch(() => null)
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    handleSelect = (event) => {
        const values = Array.from(event.target.selectedOptions, option => option.value);
        this.setState({ works: values })
    };

    onBackClick = () => {
        this.props.history.push(PROJECTS.CONFIGURATION.INITIALISATION[this.state.option.type].LIST);
    };

    getText = () => {
        return this.state.option.type === 'IDEA'
            ? "Edition d'une idée"
            : this.state.option.type === 'PROJECTS_CALL'
                ? "Edition d'un appel à projet"
                : "Edition d'un programme"
    };

    render() {
        const { intl, match, history, projectWorks } = this.props;

        return (
            <div className="my-3">
                <div className="my-3 pl-3 page-title m-0">
                    {/* <i onClick={this.onBackClick} className="ti-angle-left cursor-pointer mr-2 icon-hover d-inline-flex"/> */}
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
                                            Titre de l'option d'initialisation
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

                                    <div className="col-sm-12">
                                        <CustomList
                                            loading={false}
                                            // showSearch={false}
                                            list={this.state.chosenWorks}
                                            onAddClick={() => this.setState({showCreateBox: true})}
                                            itemsFoundText={n => `${n} ouvrage(s) sélectionné(s)`}
                                            renderItem={list => (
                                                <>
                                                    {list && list.length === 0 ? (
                                                        <div className="d-flex justify-content-center align-items-center py-50">
                                                            <h4>
                                                                Aucun ouvrages sélectionnés
                                                            </h4>
                                                        </div>
                                                    ) : (
                                                        <div className="table-responsive">
                                                            <table className="table table-hover table-middle mb-0 text-center">
                                                                <thead>
                                                                <tr>
                                                                    <th>Titre</th>
                                                                    <th>Contenu</th>
                                                                    <th>Maximum</th>
                                                                    <th>Obligatoire</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {list && list.map((item, key) => (
                                                                    <tr key={key} className="cursor-pointer">
                                                                        <td>
                                                                            <div className="media">
                                                                                <div className="media-body pt-10">
                                                                                    <h4 className="m-0 fw-bold text-dark">{item.title}</h4>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="media">
                                                                                <div className="media-body pt-10">
                                                                                    <h4 className="m-0 font-weight-light text-dark">{item.content}</h4>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="media">
                                                                                <div className="media-body pt-10">
                                                                                    <h4 className="m-0 font-weight-light text-dark">{item.max}</h4>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="media">
                                                                                <div className="media-body pt-10">
                                                                                    <h4 className="m-0 font-weight-light text-dark">{item.required ? 'Oui' : 'Non'}</h4>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="media">
                                                                                <div className="media-body pt-10">
                                                                                    <a href="#" className="text-danger" onClick={() => this.setState({showDeleteBox: true, deleteItem: item})}>
                                                                                        <span className="material-icons mr-10">delete</span>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
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
                <DeleteConfirmBox
                    show={this.state.showDeleteBox}
                    rightButtonOnClick={this.onDeleteWork}
                    leftButtonOnClick={() => this.setState({ showDeleteBox: false })}
                    message={"Vous voulez-vous reallement supprimer cet ouvrage ?"}
                />
                <AddWork
                    onSave={this.onAddWork}
                    works={this.state.storeWorks}
                    show={this.state.showCreateBox}
                    onClose={() => this.setState({ showCreateBox: false })}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ requestGlobalLoader, authUser, projectWorks }) => {
    return {
        projectWorks,
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, {setRequestGlobalAction, getProjectWorks})(withRouter((injectIntl(UpdateInitiOption))));

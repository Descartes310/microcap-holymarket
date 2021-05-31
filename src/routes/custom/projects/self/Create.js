import PropTypes from "prop-types";
import AddWork from "./CreateItem";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, {Component} from 'react';
import {PROJECTS} from "Url/frontendUrl";
import {ERROR_500} from "Constants/errors";
import {withRouter} from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import CustomList from "Components/CustomList";
import {NotificationManager} from "react-notifications";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import DeleteConfirmBox from "Components/dialog/DeleteConfirmBox";
import {getProjectStandardPresentation} from "Actions/GeneralActions";
import {Button, Form, FormGroup, Input as InputStrap} from 'reactstrap';
import {createProject, setRequestGlobalAction, getProjectWorks} from "Actions";
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
            storeWorks: [],
            description: '',
            chosenWorks: [],
            deleteItem: null,
            presentationId: '',
            showCreateBox: false,
            showDeleteBox: false
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.props.getProjectWorks(this.props.authUser.branchId)
            .then(result => this.setState({ storeWorks: result }));
        this.props.getProjectStandardPresentation(this.props.authUser.branchId)
            .then(result => {
                if (result) {
                    this.setState({presentationId: result[0] ? result[0].id : ''});
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

        if (this.state.presentationId.length === 0) {
            NotificationManager.error("Veuillez selectionner une présentation ou en créer un d'abord");
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
                branchId: this.props.authUser.branchId,
                presentationId: this.state.presentationId,
                works: JSON.stringify(this.state.chosenWorks.map(i => ({id: Number(i.id), content: i.content}))),
            };

            createProject(data)
                .then(() => {
                    NotificationManager.success("Project créé avec succès");
                    this.props.history.push(PROJECTS.PROJECTS.LIST);
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
        this.props.history.push(PROJECTS.PROJECTS.LIST);
    };

    render() {
        const { intl, match, history, projectWorks, presentations } = this.props;

        return (
            <div className="my-3">
                <div className="my-3 pl-3 page-title m-0">
                    <i onClick={this.onBackClick} className="ti-angle-left cursor-pointer mr-2 icon-hover d-inline-flex"/>
                    <h3 className="font-lg d-inline-flex">
                        Création d'un projet
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

                                    <CustomAsyncComponent
                                        loading={false}
                                        data={presentations.data}
                                        component={data => (
                                            <FormGroup className="col-sm-12 has-wrapper">
                                                <InputLabel className="text-left" htmlFor="presentation">
                                                    Présentation
                                                </InputLabel>
                                                <Select
                                                    value={this.state.presentationId}
                                                    onChange={event => this.handleOnFormChange('presentationId', event.target.value)}
                                                    input={<Input name="presentation" id="presentation" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                            {item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormGroup>
                                        )}
                                    />

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

Create.propTypes = {
    type: PropTypes.string.isRequired,
};

const mapStateToProps = ({ requestGlobalLoader, authUser, projectWorks, projectStandardPresentation }) => {
    return {
        projectWorks,
        requestGlobalLoader,
        authUser: authUser.data,
        presentations: projectStandardPresentation,
    }
};

export default connect(mapStateToProps, {setRequestGlobalAction, getProjectWorks, getProjectStandardPresentation})(withRouter((injectIntl(Create))));

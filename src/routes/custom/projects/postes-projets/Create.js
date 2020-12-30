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
import {createPostProject, setRequestGlobalAction, getProjectWorks} from "Actions";
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

        if (this.state.description.length === 0) {
            NotificationManager.error("Veuillez selectionner une description");
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
                branchId: this.props.authUser.branchId,
            };

            createPostProject(data)
                .then(() => {
                    NotificationManager.success("Post Project créé avec succès");
                    this.props.history.push(PROJECTS.POST_PROJETS.LIST);
                })
                .catch(() => {
                    NotificationManager.error(ERROR_500);
                })
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };


    onBackClick = () => {
        this.props.history.push(PROJECTS.POST_PROJETS.LIST);
    };

    render() {
        const { intl, match, history, projectWorks, presentations } = this.props;

        return (
            <div className="my-3">
                <div className="my-3 pl-3 page-title m-0">
                    <i onClick={this.onBackClick} className="ti-angle-left cursor-pointer mr-2 icon-hover d-inline-flex"/>
                    <h3 className="font-lg d-inline-flex">
                        Création d'un poste projet
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

                                    {/* <div className="col-sm-12">
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
                                    </div> */}
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

import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { SETTINGS } from "Url/frontendUrl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Input as InputStrap } from "reactstrap";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import { getModelNotifications, setRequestGlobalAction } from "Actions";
import { getAgents, createAgent, activeAgent, getOneAgent } from "Actions/independentActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CountryManager from 'Helpers/CountryManager';
import FlagCountry from "Components/FlagCountry";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { NotificationManager } from "react-notifications";

const countryWithNameAndFlag = CountryManager.countryWithNameAndFlag();

class List extends Component {
    static contextType = AbilityContext;

    state = {
        show: false,
        data: [],
        name: '',
        email: '',
        phone: '',
        address: '',
        avatar: null,
        about: '',
        id: null,
        update: false,
        coutry: '',
        selectedNotification: {}
    };

    componentDidMount() {
        getAgents().then(data => {
            this.setState({ data })
        })
    }

    handleOnClick = item => {
        this.setState({ selectedNotification: item, show: true });
    };

    createNewAgent = () => {
        createAgent(this.state.id, {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone,
            about: this.state.about,
            country: this.state.country,
            avatar: this.state.avatar
        }, { fileData: ['avatar'], multipart: true }).then(data => {
            this.setState({ show: false })
            getAgents().then(data => {
                this.setState({
                    show: false,
                    data: [],
                    name: '',
                    email: '',
                    post: '',
                    phone: '',
                    address: '',
                    id: null,
                    about: '',
                    avatar: null,
                    update: false,
                    coutry: '',
                    data: data,
                    selectedNotification: {}
                })
            })
        });
    };

    onToggleActivationStatus = (id) => {
        activeAgent(id)
            .then(() => {
                getAgents().then(data => {
                    this.setState({ data })
                })
            })
            .catch((err) => {
                console.log(err)
                NotificationManager.error("Erreur lors de la mise a jour de l'agent");
            })
            .finally(() => this.setState({ loading: false }));
    };

    getOne = (id) => {
        getOneAgent(id)
            .then((agent) => {
                this.setState({
                    show: true,
                    name: agent.name,
                    email: agent.email,
                    phone: agent.phone,
                    address: agent.address,
                    about: agent.about,
                    coutry: agent.country,
                    id: agent.id,
                    update: true
                })
            })
            .catch((err) => {
                NotificationManager.error("Erreur lors de la recherche du pionier");
            })
            .finally(() => this.setState({ loading: false }));
    };

    render() {
        const { modelNotifications, loading, error, history } = this.props;
        const { show, selectedNotification, data } = this.state;
        return (
            <>
                <CustomList
                    list={data}
                    titleList={"Liste d'agents"}
                    onAddClick={() => this.setState({ show: true })}
                    itemsFoundText={n => `${n} agents trouvés`}
                    /*addPermissions={{
                        permissions: [Permission.userProfile.createOne.name],
                    }}*/
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun agents trouvés
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th><IntlMessages id="components.name" /></th>
                                                    <th>Email</th>
                                                    <th>Téléphone</th>
                                                    <th>Adresse</th>
                                                    <th>Activer</th>
                                                    <th>Action</th>
                                                    {/*<th>Nombres de permissions</th>*/}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr
                                                        key={key}
                                                        className="cursor-pointer"
                                                    >
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.name}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.email}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.phone}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.address}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Switch
                                                                checked={item.active}
                                                                onChange={(event) => { this.onToggleActivationStatus(item.id, event.target.checked) }}
                                                                aria-label="Activé"
                                                            />
                                                        </td>
                                                        <td>
                                                            <Button
                                                                size="small"
                                                                color="primary"
                                                                variant="contained"
                                                                className={"text-white font-weight-bold mr-3"}
                                                                onClick={() => this.getOne(item.id)}
                                                            >
                                                                Editer
                                                            </Button>
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
                <Dialog
                    open={show}
                    onClose={() => this.setState({ show: false })}
                    aria-labelledby="responsive-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth={'lg'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Nouvel agent
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => this.setState({ show: false })}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <RctCollapsibleCard>
                            <div className="row">
                                <div className="col-12 my-3">
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="name">
                                            Nom de l'agent
                                        </InputLabel>
                                        <InputStrap
                                            isRequired
                                            id="name"
                                            name={'name'}
                                            className="input-lg"
                                            onChange={(e) => this.setState({ name: e.target.value })}
                                            value={this.state.name}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-12 my-3">
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="name">
                                            Description de l'agent
                                        </InputLabel>
                                        <InputStrap
                                            isRequired
                                            id="about"
                                            name={'about'}
                                            className="input-lg"
                                            onChange={(e) => this.setState({ about: e.target.value })}
                                            value={this.state.about}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="col-12 my-3">
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="email">
                                            Adresse Email
                                        </InputLabel>
                                        <InputStrap
                                            isRequired
                                            id="email"
                                            name={'email'}
                                            className="input-lg"
                                            onChange={(e) => this.setState({ email: e.target.value })}
                                            value={this.state.email}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="col-12 my-3">
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="address">
                                            Adresse physique
                                        </InputLabel>
                                        <InputStrap
                                            isRequired
                                            id="address"
                                            name={'address'}
                                            className="input-lg"
                                            onChange={(e) => this.setState({ address: e.target.value })}
                                            value={this.state.address}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="col-12 my-3">
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="phone">
                                            Numéro de téléphone
                                        </InputLabel>
                                        <InputStrap
                                            isRequired
                                            id="phone"
                                            name={'phone'}
                                            className="input-lg"
                                            onChange={(e) => this.setState({ phone: e.target.value })}
                                            value={this.state.phone}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-12 my-3">
                                    <FormGroup>
                                        <InputLabel className="text-left pl-2" htmlFor="nationality-helper"><IntlMessages id="common.nationality" /></InputLabel>
                                        <Select onChange={(e) => this.setState({country: e.target.value}) } style={{ width: '100%' }} input={<Input name="nationality" id="nationality-helper"  style={{ width: '100%' }} />}>
                                            {countryWithNameAndFlag.map(item => (
                                                <MenuItem key={item.id} value={item.id} className="center-hor-ver" style={{ width: '100%' }}>
                                                    <FlagCountry flag={item.flag} label={item.name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormGroup>
                                </div>
                                <div className="col-12 my-3">
                                    <FormGroup>
                                        <InputLabel className="text-left">
                                            Avatar
                                        </InputLabel>
                                        <Input
                                            id="File"
                                            type="file"
                                            name="avatar"
                                            onChange={event => this.setState({ avatar: event.target.files[0] })}
                                        />
                                    </FormGroup>
                                </div>
                                <FormGroup className="mb-15">
                                    <Button
                                        // type="submit"
                                        color="primary"
                                        variant="contained"
                                        className="text-white font-weight-bold mr-3"
                                        onClick={() => this.createNewAgent()}
                                    >
                                        Enregistrer
                                    </Button>
                                </FormGroup>
                            </div>
                        </RctCollapsibleCard>
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});

// map state to props
const mapStateToProps = ({ requestGlobalLoader, modelNotifications, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: modelNotifications.loading,
        modelNotifications: modelNotifications.data,
        error: modelNotifications.error
    }
};

export default connect(mapStateToProps, { getModelNotifications, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(List))));

import {connect} from "react-redux";
import React, {Component} from 'react';
import {SETTINGS} from "Url/frontendUrl";
import {withRouter} from "react-router-dom";
import {ERROR_500} from "Constants/errors";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import Select from "@material-ui/core/Select/Select";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import {NotificationManager} from "react-notifications";
import FormControl from "@material-ui/core/FormControl";
import SingleTitleText from "Components/SingleTitleText";
import {Form, FormGroup, Input as InputStrap} from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {getNotificationType, getNotificationModel, createNotificationType, setRequestGlobalAction} from "Actions";

const START_DELIMITER = '$';
const END_DELIMITER = '$';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationsType: {
                data: null,
                loading: false,
            },
            notificationsModel: {
                data: null,
                loading: false,
            },
            selectedTypeId: NaN,
            selectedModel: NaN,
            textToSend: '',
            showParameters: false,
            parameterToInsert: {},
            name: '',
            description: '',
        }
    }

    componentDidMount() {
        this.loadNotificationType();
    }

    loadNotificationType = () => {
        this.setState(prevState => ({
            notificationsType: {
                ...prevState.notificationsType,
                loading: true,
            },
            notificationsModel: {
                ...prevState.notificationsModel,
                loading: true,
            },
        }));
        getNotificationType()
            .then((result) => {
                this.setState({
                    selectedTypeId: result[0].id,
                    notificationsType: {
                        data: result,
                        loading: false,
                    }
                }, () => {
                    this.loadNotificationModel();
                });
            })
            .catch(() => {
                this.setState(prevState => ({
                    notificationsType: {
                        ...prevState.notificationsType,
                        loading: false,
                    }
                }));
            })
    };

    handleOnSelectType = (newValue) => {
        if (this.state.selectedTypeId !== newValue) {
            this.setState({selectedTypeId: newValue}, () => {
                this.loadNotificationModel();
            })
        }
    };

    loadNotificationModel = () => {
        this.setState(prevState => ({
            notificationsModel: {
                ...prevState.notificationsModel,
                loading: true,
            },
        }));
        getNotificationModel(this.state.selectedTypeId)
            .then((notificationsModel) => {
                if (notificationsModel.length > 0) {
                    this.setState({
                        selectedModel: notificationsModel[0],
                        parameterToInsert: notificationsModel[0].parameters[0],
                        notificationsModel: {
                            data: notificationsModel,
                            loading: false,
                        },
                    });
                } else {
                    this.setState({
                        selectedModel: {},
                        notificationsModel: {
                            data: notificationsModel,
                            loading: false,
                        },
                    });
                }
            })
            .catch((e) => {
                this.setState(prevState => ({
                    notificationsModel: {
                        ...prevState.notificationsModel,
                        loading: false,
                    }
                }));
            })
    };

    handleOnSelectModel = (newValue) => {
        this.setState(prevState => ({selectedModel: prevState.notificationsModel.data.find(m => m.id === newValue)}));
    };

    handleOnTextChanged = (newValue) => {
        this.setState({textToSend: newValue}, () => {
            if (this.state.selectedModel.parameters.length > 0 && newValue[newValue.length - 1] === START_DELIMITER) {
                this.toggleParameters(true);
            }
        });
    };

    toggleParameters = (value) => this.setState({showParameters: value});

    handleOnInsertParameter = () => {
        const newValue = `${this.state.textToSend}${this.state.parameterToInsert.code}${END_DELIMITER} `;
        this.setState({textToSend: newValue, showParameters: false});
    };

    handleOnCloseInsert = () => {
        this.toggleParameters(false);
        /*let newText = this.state.textToSend.split('');
        newText.pop();
        this.setState(prevState => ({textToSend: newText.join(''), showParameters: false}));*/
    };

    handleOnSubmit = () => {
        if (this.state.textToSend.length === 0) {
            NotificationManager.error("Vous devez entrer un texte à envoyé");
            return;
        }

        if (this.state.name.length === 0) {
            NotificationManager.error("Vous devez entrer un nom à envoyé");
            return;
        }

        const data = {
            notificationTypeId: this.state.selectedModel.id,
            name: this.state.name,
            description: this.state.description,
            pattern: this.state.textToSend,
        };

        this.props.setRequestGlobalAction(true);
        createNotificationType(data, this.props.authUser.branchId)
            .then(() => {
                NotificationManager.success("Model de notifications créé avec succès");
                this.props.history.push(SETTINGS.NOTIFICATION.LIST);
            })
            .catch(() => null)
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    render() {
        const { selectedModel, selectedTypeId, notificationsModel, notificationsType, parameterToInsert, showParameters } = this.state;
        return (
            <div>
                <PageTitleBar title="Ajouter une notification" match={this.props.match}  enableBreadCrumb={false}/>
                <RctCollapsibleCard>
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-sm-12">
                            <div className="row">
                                <div className="col-12">
                                    <CustomAsyncComponent
                                        data={notificationsType.data}
                                        loading={notificationsType.loading}
                                        component={data => (
                                            <div className="form-group text-left mb-3">
                                                <FormControl fullWidth>
                                                    <InputLabel className="text-left" htmlFor="networkProfile">
                                                        Type de notifications
                                                    </InputLabel>
                                                    <Select
                                                        value={selectedTypeId}
                                                        onChange={event => this.handleOnSelectType(event.target.value)}
                                                        input={<Input name="networkProfile" id="networkProfile" />}>
                                                        {data.map((item, index) => {
                                                            return (
                                                                <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                                    {item.label}
                                                                </MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        )}
                                    />
                                </div>
                                {notificationsModel.loading ? (
                                    <RctSectionLoader/>
                                ) : (notificationsModel.data && notificationsModel.data.length > 0) ? (
                                    <>
                                        {!isNaN(selectedTypeId) && (
                                            <div className="col-12">
                                                <CustomAsyncComponent
                                                    data={notificationsModel.data}
                                                    loading={notificationsModel.loading}
                                                    component={data => (
                                                        <div className="form-group text-left mb-3">
                                                            <FormControl fullWidth>
                                                                <InputLabel className="text-left" htmlFor="notificationsModel">
                                                                    Modele de notifications
                                                                </InputLabel>
                                                                <Select
                                                                    value={selectedModel.id}
                                                                    onChange={event => this.handleOnSelectModel(event.target.value)}
                                                                    input={<Input name="notificationsModel" id="notificationsModel" />}>
                                                                    {data.map((item, index) => {
                                                                        return (
                                                                            <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                                                {item.label}
                                                                            </MenuItem>
                                                                        )
                                                                    })}
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        )}

                                        <div className="col-12 my-3">
                                            <FormGroup className="has-wrapper">
                                                <InputLabel className="text-left" htmlFor="name">
                                                    Nom
                                                </InputLabel>
                                                <InputStrap
                                                    isRequired
                                                    id="name"
                                                    name={'name'}
                                                    className="input-lg"
                                                    value={this.state.name}
                                                    onChange={event => this.setState({name: event.target.value})}
                                                />
                                                <span className="has-icon"><i className="ti-pencil"/></span>
                                            </FormGroup>
                                        </div>

                                        <div className="col-12 my-3">
                                            <FormGroup className="has-wrapper">
                                                <InputLabel className="text-left" htmlFor="description">
                                                    Description
                                                </InputLabel>
                                                <InputStrap
                                                    isRequired
                                                    id="description"
                                                    name={'description'}
                                                    className="input-lg"
                                                    value={this.state.description}
                                                    onChange={event => this.setState({description: event.target.value})}
                                                />
                                                <span className="has-icon"><i className="ti-pencil"/></span>
                                            </FormGroup>
                                        </div>

                                        <div className="col-12 mt-3 mb-2">
                                            <div className="row">
                                                <div className="col-12">
                                                    <h4>Text à inserer</h4>
                                                    {selectedModel.parameters.length > 0 && (
                                                        <>
                                                            <p><strong>Note:</strong> Vous pouvez inserér des variables en entrant un <strong>$</strong> pour sélectionner la variable à inserer</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <InputStrap
                                                name="text"
                                                type="textarea"
                                                id="exampleText"
                                                value={this.state.textToSend}
                                                style={{height: '500px'}}
                                                onChange={event => this.handleOnTextChanged(event.target.value)}
                                            />
                                        </div>

                                        <div className="col-12">
                                            <FormGroup className="mb-15">
                                                <Button
                                                    // type="submit"
                                                    color="primary"
                                                    variant="contained"
                                                    className="text-white font-weight-bold mr-3"
                                                    onClick={this.handleOnSubmit}
                                                >
                                                    Soumettre
                                                </Button>
                                            </FormGroup>
                                        </div>
                                    </>
                                ) : (
                                    <div className="col-12">
                                        <SingleTitleText
                                            text={"Aucun modele de notifications trouvées"}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {Object.values(selectedModel).length > 0 && (
                        <Dialog
                            open={showParameters}
                            onClose={this.handleOnCloseInsert}
                            // fullScreen={fullScreen}
                            aria-labelledby="responsive-dialog-title"
                            disableBackdropClick
                            disableEscapeKeyDown
                            maxWidth={'lg'}
                            fullWidth
                        >
                            <DialogTitle id="form-dialog-title">
                                <div className="row justify-content-between align-items-center">
                                    Variable à inserer
                                    <IconButton
                                        color="primary"
                                        aria-label="close"
                                        className="text-danger"
                                        onClick={this.handleOnCloseInsert}>
                                        <CancelIcon />
                                    </IconButton>
                                </div>
                            </DialogTitle>
                            <DialogContent>
                                <RctCollapsibleCard>
                                    <div className="form-group text-left mb-3">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="variable">
                                                Variable
                                            </InputLabel>
                                            <Select
                                                value={parameterToInsert.id}
                                                onChange={event => this.setState({parameterToInsert: selectedModel.parameters.find(p => p.id === event.target.value)})}
                                                input={<Input name="variable" id="variable" />}>
                                                {selectedModel.parameters.map((item, index) => {
                                                    return (
                                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                            {item.name}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <FormGroup className="mb-15">
                                        <Button
                                            // type="submit"
                                            color="primary"
                                            variant="contained"
                                            className="text-white font-weight-bold mr-3"
                                            onClick={() => this.handleOnInsertParameter()}
                                        >
                                            Ok
                                        </Button>
                                    </FormGroup>
                                </RctCollapsibleCard>
                            </DialogContent>
                        </Dialog>
                    )}
                </RctCollapsibleCard>
            </div>
        );
    }
}

export default connect(({authUser}) => ({authUser: authUser.data}), {setRequestGlobalAction})(withRouter(Create)) ;

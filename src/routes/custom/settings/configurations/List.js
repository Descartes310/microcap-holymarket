import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import {CATALOG, joinUrlWithParams, SETTINGS} from "Url/frontendUrl";
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
import TimeFromMoment from "Components/TimeFromMoment";
import { Form, FormGroup, Input as InputStrap } from "reactstrap";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import { getModelNotifications, setRequestGlobalAction } from "Actions";
import { getAllSettings, createBranchCGU } from "Actions/independentActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {getFilePath} from "Helpers/helpers";

class List extends Component {
    static contextType = AbilityContext;

    state = {
        show: false,
        loading: true,
        showUpdate: false,
        gcuId: null,
        data: [],
        name: '',
        description: '',
        file: null,
        selectedNotification: {}
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.setState({loading: true});
        getAllSettings(this.props.authUser.user.branch.id)
            .then(data => {
                this.setState({ data });
            })
            .finally(() => this.setState({loading: false}));
    };

    handleOnClick = item => {
        this.setState({ selectedNotification: item, show: true });
    };

    handleOnRowClick = (gcuId) => {
        this.setState({ gcuId:  gcuId});
        this.setState({ showUpdate: true });
    };

    createCGU = () => {
        this.props.setRequestGlobalAction(true);
        createBranchCGU({file: this.state.file,}, { fileData: ['file'], multipart: true })
            .then(data => {
                this.setState({ show: false });
                this.loadData();
            })
            .catch(() => null)
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    updateCGU = () => {
        updateBranchCGU({
            file: this.state.file,
            id: this.state.gcuId,
        }, { fileData: ['file'], multipart: true }).then(data => {
            this.setState({ showUpdate: false })
            getAllSettings(this.props.authUser.user.branch.id).then(data => {
                this.setState({ data })
            })
        });
    };

    render() {
        const { show, showUpdate, selectedNotification, data } = this.state;
        return (
            <>
                <CustomList
                    list={data}
                    loading={this.state.loading}
                    titleList={"Configurations"}
                    onAddClick={() => this.setState({ show: true })}
                    itemsFoundText={n => `${n} configurations trouvées`}
                    /*addPermissions={{
                        permissions: [Permission.userProfile.createOne.name],
                    }}*/
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucune configurations trouvées
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th><IntlMessages id="components.name" /></th>
                                                    <th>Valeur</th>
                                                    {/* <th>Fichier</th> */}
                                                    {/*<th>Nombres de permissions</th>*/}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr
                                                        key={key}
                                                        className="cursor-pointer"
                                                        onClick={() => this.handleOnRowClick(item.id)}
                                                    >
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.name}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {/* <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.description}</h4>
                                                                </div>
                                                            </div>
                                                        </td> */}
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    {
                                                                        item.name == 'CGU' ?
                                                                            <h4 className="m-0 fw-bold text-dark">
                                                                                <a href={getFilePath(item.value)} target='_blank' >{item.value.length > 30 ? item.value.substring(0, 30) + '...' : item.value}</a>
                                                                            </h4> : null
                                                                    }
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
                            Ajouter un CGU
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
                                    <FormGroup>
                                        <InputLabel className="text-left">
                                            Fichier
                                        </InputLabel>
                                        <Input
                                            id="File"
                                            type="file"
                                            name="file"
                                            onChange={event => this.setState({ file: event.target.files[0] })}
                                        />
                                    </FormGroup>
                                </div>
                                <FormGroup className="mb-15">
                                    <Button
                                        // type="submit"
                                        color="primary"
                                        variant="contained"
                                        className="text-white font-weight-bold mr-3"
                                        onClick={() => this.createCGU()}
                                    >
                                        Enregistrer
                                    </Button>
                                </FormGroup>
                            </div>
                        </RctCollapsibleCard>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={showUpdate}
                    onClose={() => this.setState({ showUpdate: false })}
                    aria-labelledby="responsive-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth={'lg'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Update un CGU
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
                                    <FormGroup>
                                        <InputLabel className="text-left">
                                            Fichier
                                        </InputLabel>
                                        <Input
                                            id="File"
                                            type="file"
                                            name="file"
                                            onChange={event => this.setState({ file: event.target.files[0] })}
                                        />
                                    </FormGroup>
                                </div>
                                <FormGroup className="mb-15">
                                    <Button
                                        // type="submit"
                                        color="primary"
                                        variant="contained"
                                        className="text-white font-weight-bold mr-3"
                                        onClick={() => this.updateCGU()}
                                    >
                                        Update
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

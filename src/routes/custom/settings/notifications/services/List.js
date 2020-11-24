import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {SETTINGS} from "Url/frontendUrl";
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {withStyles} from "@material-ui/core";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import TimeFromMoment from "Components/TimeFromMoment";
import {Form, FormGroup, Input as InputStrap} from "reactstrap";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import {getServicesNotifications, setRequestGlobalAction} from "Actions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

class List extends Component {
    static contextType = AbilityContext;

    state = {
        show: false,
        selectedNotification: {}
    };

    componentDidMount() {
        this.props.getServicesNotifications(this.props.authUser.user.branch.id);
    }

    handleOnClick = item => {
        this.setState({selectedNotification: item, show: true});
    };

    render() {
        const { servicesNotifications, loading, error, history } = this.props;
        const { show, selectedNotification } = this.state;
        console.log("servicesNotifications => ", servicesNotifications);
        return (
            <>
                <CustomList
                    error={error}
                    loading={loading}
                    list={servicesNotifications}
                    // titleList={"Notifications"}
                    onAddClick={() => history.push(SETTINGS.NOTIFICATION.SERVICE.CREATE)}
                    itemsFoundText={n => `${n} notifications de services trouvés`}
                    /*addPermissions={{
                        permissions: [Permission.userProfile.createOne.name],
                    }}*/
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucune notifications de services trouvés
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th><IntlMessages id="components.name" /></th>
                                                <th><IntlMessages id="widgets.description" /></th>
                                                <th>Date de fin</th>
                                                {/*<th>Nombres de permissions</th>*/}
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {list && list.map((item, key) => (
                                            <tr
                                                key={key}
                                                className="cursor-pointer"
                                                onClick={() => this.handleOnClick(item)}
                                            >
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.message}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">
                                                                <TimeFromMoment
                                                                    time={item.expireAt}
                                                                />
                                                            </h4>
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
                    onClose={() => this.setState({show: false})}
                    aria-labelledby="responsive-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth={'lg'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Notification
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => this.setState({show: false})}>
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
                                            Nom
                                        </InputLabel>
                                        <InputStrap
                                            disabled
                                            isRequired
                                            id="name"
                                            name={'name'}
                                            className="input-lg"
                                            value={selectedNotification.name}
                                        />
                                    </FormGroup>
                                </div>

                                <div className="col-12 my-3">
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="description">
                                            Description
                                        </InputLabel>
                                        <InputStrap
                                            disabled
                                            isRequired
                                            id="description"
                                            name={'description'}
                                            className="input-lg"
                                            value={selectedNotification.description}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-12 my-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>message</h4>
                                        </div>
                                    </div>
                                    <InputStrap
                                        name="text"
                                        type="textarea"
                                        id="exampleText"
                                        value={selectedNotification.message}
                                        style={{height: '500px'}}
                                        disabled
                                    />
                                </div>
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
const mapStateToProps = ({ requestGlobalLoader, servicesNotifications, authUser  }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: servicesNotifications.loading,
        servicesNotifications: servicesNotifications.data,
        error: servicesNotifications.error
    }
};

export default connect(mapStateToProps, {getServicesNotifications, setRequestGlobalAction})
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(List))));

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
import { Button, FormGroup, Input as InputStrap } from "reactstrap";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import { getUnitTypes, setRequestGlobalAction, createUnitType } from "Actions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import { NotificationManager } from "react-notifications";
import CustomAsyncComponent from "Components/CustomAsyncComponent";

class List extends Component {
    static contextType = AbilityContext;

    state = {
        show: false,
        name: '',
        description: '',
        data: []
    };

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        this.props.setRequestGlobalAction(true)
        getUnitTypes().then(data =>
            this.setState({ data })
        )
            .catch(err => this.setState({ data: [] }))
            .finally(() => {
                this.props.setRequestGlobalAction(false)
            })
    }

    createNewUnitType() {
        this.setState({ show: false })
        this.props.setRequestGlobalAction(true)
        createUnitType({ name: this.state.name, description: this.state.description }).then(data => {
            this.loadData();
        }).catch(err =>
            NotificationManager.error("Le type d'unité existe déjà")
        ).finally(() => {
            this.setState({ name: '', description: '' })
            this.props.setRequestGlobalAction(false)
        })
    }

    render() {
        const { show, data } = this.state;
        return (
            <>
                <CustomList
                    list={data}
                    loading={false}
                    // titleList={"Notifications"}
                    onAddClick={() => this.setState({ show: true })}
                    itemsFoundText={n => `${n} types d'unités trouvés`}
                    /*addPermissions={{
                        permissions: [Permission.userProfile.createOne.name],
                    }}*/
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun type trouvés
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th><IntlMessages id="components.name" /></th>
                                                    <th><IntlMessages id="widgets.description" /></th>
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
                                                                    <h4 className="m-0 fw-bold text-dark">{item.description}</h4>
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
                            Création d'un type d'unité
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
                        <div className="row">
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
                                        onChange={event => this.setState({ name: event.target.value })}
                                    />
                                </FormGroup>
                            </div>

                            <div className="col-12 my-3">
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="description">
                                        Description
                                        </InputLabel>
                                    <InputStrap
                                        id="description"
                                        name={'description'}
                                        className="input-lg"
                                        onChange={event => this.setState({ description: event.target.value })}
                                    />
                                </FormGroup>
                            </div>

                            <div className="col-12 my-3">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    className="text-white font-weight-bold"
                                    onClick={() => this.createNewUnitType()}
                                >
                                    Créer le type d'unité
                                </Button>
                            </div>


                        </div>
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
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(List))));

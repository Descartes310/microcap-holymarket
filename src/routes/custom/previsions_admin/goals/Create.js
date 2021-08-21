import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import { NotificationManager } from "react-notifications";
import { setRequestGlobalAction, createGoal } from "Actions";
import { Button, FormGroup, Input as InputStrap } from "reactstrap";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

class Create extends Component {

    state = {
        label: '',
        description: ''
    };

    componentDidMount() {
    }

    createNewUnit() {
        this.setState({ show: false })
        this.props.setRequestGlobalAction(true)
        createGoal({ label: this.state.label, description: this.state.description }).then(data => {
            NotificationManager.success('Objectif créé avec succès');
        }).finally(() => {
            this.props.close();
            this.setState({ label: '', description: '' })
            this.props.setRequestGlobalAction(false)
        })
    }

    render() {
        const { data } = this.state;
        const { show } = this.props;

        return (
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
                        Création d'un Objectif
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
                                <InputLabel className="text-left" htmlFor="label">
                                    Nom
                                </InputLabel>
                                <InputStrap
                                    isRequired
                                    id="label"
                                    name={'label'}
                                    className="input-lg"
                                    onChange={event => this.setState({ label: event.target.value })}
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
                                    type="textarea"
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
                                onClick={() => this.createNewUnit()}
                            >
                                Créer l'objectif
                                </Button>
                        </div>


                    </div>
                </DialogContent>
            </Dialog>
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
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(Create))));

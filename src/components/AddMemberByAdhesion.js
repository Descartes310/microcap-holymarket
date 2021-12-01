import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { setRequestGlobalAction } from "Actions";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { Form, FormGroup, Input as InputStrap } from "reactstrap";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import { findUserByMembership, addMemberToOrganisation } from 'Actions/independentActions';

class AddMemberByAdhesion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: null,
            adhesion: '',
            user: null,
        }
    }

    componentDidMount() {
    }

    onResearch = () => {
        findUserByMembership(this.state.adhesion).then(data => {
            this.setState({ user: data })
        }).catch(err => {
            this.setState({ user: null })
        })
    };

    onSubmit = () => {
        addMemberToOrganisation(this.state.user.id, {role: this.state.role}).catch(err => {
            NotificationManager.error("Echec de la création du partenaire");
            onClose();
        }).finally(() => {
            this.setState({ user: null });
            this.props.onClose();
        })
    };

    render() {

        const { user } = this.state;
        const { show, onClose, roles } = this.props;

        return (
            <Dialog
                open={show}
                onClose={() => onClose()}
                aria-labelledby="responsive-dialog-title"
                maxWidth={'md'}
                fullWidth
            >
                <DialogTitle id="form-dialog-title">
                    <div className="row justify-content-between align-items-center">
                        Rechercher un utilisateur
                        <IconButton
                            color="primary"
                            aria-label="close"
                            className="text-danger"
                            onClick={() => onClose()}>
                            <CancelIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className="col-md-12">
                            <Form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <FormGroup className="col-md-10 col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="adhesion">
                                            Numéro d'adhésion
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="adhesion"
                                            type="text"
                                            name={'adhesion'}
                                            className="has-input input-lg"
                                            value={this.state.adhesion}
                                            onChange={(e) => this.setState({ adhesion: e.target.value })}
                                        />
                                    </FormGroup>
                                    <FormGroup className="col-md-2 col-sm-12">
                                        <InputLabel className="text-left">
                                        </InputLabel>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() => this.onResearch()}
                                            className="text-white font-weight-bold"
                                        >
                                            Rechercher
                                        </Button>
                                    </FormGroup>
                                </div>
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="name">
                                        Noms / Raison sociale
                                    </InputLabel>
                                    <InputStrap
                                        disabled
                                        type="text"
                                        value={user?.name}
                                        id="corporateName"
                                        name="corporateName"
                                        className="input-lg"
                                    />
                                </FormGroup>
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="commercialName">
                                        Adresse email
                                    </InputLabel>
                                    <InputStrap
                                        disabled
                                        type="text"
                                        className="input-lg"
                                        id="commercialName"
                                        name="commercialName"
                                        value={user?.email}
                                    />
                                </FormGroup>
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="immatriculationValue">
                                        Identification
                                    </InputLabel>
                                    <InputStrap
                                        disabled
                                        type="text"
                                        className="input-lg"
                                        id="immatriculationValue"
                                        name="immatriculationValue"
                                        value={user?.identification}
                                    />
                                </FormGroup>
                                {user && (
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="type">
                                            Role de l'utilisateur
                                        </InputLabel>
                                        <select
                                            className="form-control"
                                            style={{ width: '100%', display: 'inline-block' }}
                                            onChange={(e) => this.setState({ role: e.target.value })}
                                        >
                                            <option value={null}>
                                                Choisissez un role
                                            </option>
                                            {
                                                roles.map(role => (
                                                    <option key={role.value} value={role.value}>
                                                        {role.label}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </FormGroup>
                                )}
                                <FormGroup>
                                    <Button
                                        color="primary"
                                        disabled={!this.state.user || !this.state.role}
                                        variant="contained"
                                        onClick={() => this.onSubmit()}
                                        className="text-white font-weight-bold"
                                    >
                                        Terminer
                                    </Button>
                                </FormGroup>
                            </Form>
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
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(AddMemberByAdhesion))));

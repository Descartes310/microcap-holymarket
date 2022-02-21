import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { FormGroup, Input, Button } from 'reactstrap';
import {NotificationManager} from "react-notifications";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class ChangeAccessCredentials extends Component {

    state = {
        login: null,
        password: null,
     }
  
     constructor(props) {
        super(props);
     }

     componentDidMount() {}
  
     onSubmit = () => {
        this.props.setRequestGlobalAction(true);

        let datas = {
            login: this.state.login,
            password: this.state.password
        };

        UserService.changeAccessCredentials(this.props.access.id, datas).then(() => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            NotificationManager.success("Ce login est déjà utilisé, veuillez le changer.");
            this.props.onClose();
        })
        .finally(() => this.props.setRequestGlobalAction(false))
     }


    render() {

        const { onClose, show, access } = this.props;
        const { login, password } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="sm"
                title={(
                    <h3 className="fw-bold">
                        Changement des paramètres d'accès
                    </h3>
                )}
            >
                <RctCardContent>
                    <FormGroup tag="fieldset">
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="login">
                                Login
                            </InputLabel>
                            <Input
                                required
                                id="login"
                                type="text"
                                name='login'
                                value={login}
                                className="input-lg"
                                onChange={(e) => this.setState({ login: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="password">
                                Mot de passe
                            </InputLabel>
                            <Input
                                required
                                id="password"
                                type="password"
                                name='password'
                                value={password}
                                className="input-lg"
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </FormGroup>
                        <Button
                            color="primary"
                            disabled={!login || !password || !access}
                            className="w-100 ml-0 mt-15 text-white"
                            onClick={() => this.onSubmit()}
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(ChangeAccessCredentials)));
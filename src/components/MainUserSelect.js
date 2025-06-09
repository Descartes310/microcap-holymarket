import { connect } from 'react-redux';
import React, { Component } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap, InputGroup, InputGroupAddon  } from 'reactstrap';

class MainUserSelect extends Component {

    state = {
        user: null,
        email: null
    }
  
    constructor(props) {
        super(props);
    }

    findUserByEmail = () => {
        this.props.setRequestGlobalAction(true);
        let data = {email: this.state.email};
        UserService.findByEmail(data)
        .then(response => {
            this.setState({ user: response }, () => {
                if(this.state.user != null) {
                    this.props.onChange(this.state.user, response);
                }
            });
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Cet email est inexistant");
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }
  
    render() {

        const { label } = this.props;
        const { email, user } = this.state;

        return (
            <div>
                <div className="d-flex">
                    <FormGroup className="col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            {label ? label : 'Email utilisateur'}
                        </InputLabel>
                        <InputGroup>
                            <InputStrap
                                id="email"
                                type="text"
                                value={email}
                                name={'email'}
                                className="has-input input-lg custom-input"
                                onChange={(e) => this.setState({ email: e.target.value })}
                            />
                            <InputGroupAddon addonType="append">
                                <Button color="primary" variant="contained" onClick={() => {
                                    this.findUserByEmail();
                                }} >
                                    <span className='text-white'>Rechercher</span>
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </div>
                {user && (
                    <div className='row'>
                        <FormGroup className="has-wrapper col-md-6 col-sm-12">
                            <InputStrap
                                disabled
                                className="input-lg"
                                value={user.userName}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper col-md-6 col-sm-12">
                            <InputStrap
                                disabled
                                className="input-lg"
                                value={user.email}
                            />
                        </FormGroup>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(MainUserSelect));

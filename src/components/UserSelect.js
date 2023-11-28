import { connect } from 'react-redux';
import React, { Component } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { getReferralTypeLabel } from 'Helpers/helpers';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Label, Button, Input as InputStrap, InputGroup, InputGroupAddon  } from 'reactstrap';

class UserSelect extends Component {

    state = {
        member: null,
        membership: null,
    }
  
    constructor(props) {
        super(props);
    }

    findUserByMembership = () => {
        this.props.setRequestGlobalAction(true);
        UserService.findUserByReference(this.state.membership)
        .then(response => {
            this.setState({ member: response }, () => {
                if(this.state.member != null) {
                    this.props.onChange(this.state.membership, response);
                }
            });
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Ce numéro utilisateur est inexistant");
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }
  
    render() {

        const { onChange } = this.props;
        const { membership, member } = this.state;

        return (
            <div>
                <div className="d-flex">
                    <FormGroup className="col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Réference utilisateur
                        </InputLabel>
                        <InputGroup>
                            <InputStrap
                                type="text"
                                id="reference"
                                value={membership}
                                name={'reference'}
                                className="has-input input-lg custom-input"
                                onChange={(e) => this.setState({ membership: e.target.value })}
                            />
                            <InputGroupAddon addonType="append">
                                <Button color="primary" variant="contained" onClick={() => {
                                    this.findUserByMembership();
                                }} >
                                    <span className='text-white'>Rechercher</span>
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    
                </div>
                {member && (
                    <div className='row'>
                        <FormGroup className="has-wrapper col-md-4 col-sm-12">
                            <InputStrap
                                disabled
                                className="input-lg"
                                value={member.userName}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper col-md-4 col-sm-12">
                            <InputStrap
                                disabled
                                className="input-lg"
                                value={member.email}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper col-md-4 col-sm-12">
                            <InputStrap
                                disabled
                                className="input-lg"
                                value={getReferralTypeLabel(member.referralType)}
                            />
                        </FormGroup>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(UserSelect));

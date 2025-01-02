import { connect } from 'react-redux';
import React, { Component } from 'react';
import UserService from 'Services/users';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { getReferralTypeLabel } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap, InputGroup, InputGroupAddon  } from 'reactstrap';

class UserSelect extends Component {

    state = {
        members: [],
        member: null,
        membership: null,
    }
  
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.isSelect) {
            this.getMembers()
        }
    }

    getMembers = () => {
        this.props.setRequestGlobalAction(true),
        GroupService.getGroupMembers()
        .then(response => this.setState({ members: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findUserByMembership = () => {
        this.props.setRequestGlobalAction(true);
        let data = {
            from_group: this.props.fromMyOrganisation ?? false
        };
        if(this.props.type) {
            data.type = this.props.type;
        }
        UserService.findUserByReference(this.state.membership, data)
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

        const { label, isSelect } = this.props;
        const { membership, member, members } = this.state;

        return (
            <div>
                <div className="d-flex">
                    { isSelect ? (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                {label ? label : 'Sélectionner un utilisateur'}
                            </InputLabel>
                            <Autocomplete
                                value={member}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    this.setState({ member: item }, () => {
                                        if(this.state.member) {
                                            this.props.onChange(this.state.member.referralCode, this.state.member);
                                        }
                                    })
                                }}
                                options={members}
                                getOptionLabel={(option) => option.groupPostMotivation?.groupPost ? option.userName+" ("+option.groupPostMotivation?.groupPost.label+")" : option.userName}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    ) : (
                        <FormGroup className="col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="reference">
                                {label ? label : 'Réference utilisateur'}
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
                    )}
                </div>
                {member && !isSelect && (
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

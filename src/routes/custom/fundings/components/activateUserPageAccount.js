import { connect } from 'react-redux';
import React, { Component } from 'react';
import GroupService from 'Services/groups';
import FundingService from 'Services/funding';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class ActivateUserPageAccount extends Component {

    state = {
        members: [],
        member: null,
        label: null,
        minBalance: null,
        maxBalance: null,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getMembers();
    }

    getMembers = () => {
        this.props.setRequestGlobalAction(true),
        GroupService.getGroupMembers()
        .then(response => {
            this.setState({ members: response.filter(m => m.userName) })
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {        
        if(!this.props.account || !this.state.member || !this.state.minBalance || !this.state.maxBalance || this.state.minBalance >= this.state.maxBalance) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }
        this.props.setRequestGlobalAction(true);
        
        FundingService.activateUserPageAccount(this.props.account.id, {
            min_balance: this.state.minBalance,
            max_balance: this.state.maxBalance,
            referral_code: this.state.member.reference,
            label: this.state.label
        })
        .then(() => {
            window.location.reload();
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        });
    }

    render() {

        const { onClose, show, title, account } = this.props;
        const { members, label, minBalance, maxBalance, member } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <RctCardContent>

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Membres
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={member}
                            options={members}
                            onChange={(__, item) => {
                                console.log(item);
                                this.setState({ member: item });
                            }}
                            getOptionLabel={(option) => option.userName}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                        <InputStrap
                            type="text"
                            id="label"
                            name='label'
                            value={label}
                            className="input-lg"
                            placeholder="Désignation du compte"
                            onChange={(e) => this.setState({ label: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                        <InputStrap
                            type="number"
                            id="minBalance"
                            name='minBalance'
                            value={minBalance}
                            className="input-lg"
                            placeholder="Plancher du compte"
                            onChange={(e) => this.setState({ minBalance: e.target.value, tickets: [] })}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                        <InputStrap
                            type="number"
                            id="maxBalance"
                            name='maxBalance'
                            value={maxBalance}
                            className="input-lg"
                            placeholder="Planfond du compte"
                            onChange={(e) => this.setState({ maxBalance: e.target.value, tickets: [] })}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                this.onSubmit();
                            }}
                            className="text-white font-weight-bold"
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(ActivateUserPageAccount));
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import FundingService from "Services/funding";
import UserSelect from 'Components/UserSelect';
import { FormGroup, Button } from 'reactstrap';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from "react-notifications";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class InviteParticipantModal extends Component {

    state = {
        deals: [],
        deal: null,
        member: null,
     }
  
     constructor(props) {
        super(props);
     }

     componentDidMount() {
        this.getDeals();
     }

     getDeals = () => {
        this.props.setRequestGlobalAction(true),
        FundingService.getDeals({type: this.props.type, received: true, free: true, referral_code: this.props.referralCode, entity_reference: this.props.lineReference})
        .then(response => this.setState({ deals: response }))
        .catch(() => this.setState({ deals: [] }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {
        const {deal, member} = this.state;

        if(!deal || !member) {
            NotificationManager.error("Remplissez toutes les informations");
            return;
        }

        this.props.setRequestGlobalAction(true);
        FundingService.inviteCodevSubscriber(deal.reference, {codev_line_reference: this.props.lineReference, referral_code: member.referralCode})
        .then(() => {
            NotificationManager.success("L'invitation a été envoyée");
            this.props.onClose();
        })
        .catch(err => {
            NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard");
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { onClose, show } = this.props;
        const { deals, deal, member } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Inviter un participant
                    </h3>
                )}
            >
                <RctCardContent>

                    <UserSelect label={'Numéro utilisateur'} fromMyOrganisation={false} onChange={(_, user) => {
                        this.setState({ member: user })
                    }}/>

                    { member && (
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Deals disponibles
                            </InputLabel>
                            <Autocomplete
                                value={deal}
                                options={deals}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    this.setState({ deal: item });
                                }}
                                getOptionLabel={(option) => option?.offer?.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    )}

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!deal || !member}
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Inviter
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(InviteParticipantModal)));
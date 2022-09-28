import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { getReferralTypeLabel } from 'Helpers/helpers';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

class SearchMember extends Component {

    state = {
        member: null,
        membership: null
    }
  
     constructor(props) {
        super(props);
     }

     findUserByMembership = () => {
        this.props.setRequestGlobalAction(true);
        UserService.findUserByReference(this.state.membership)
        .then(response => {
            this.setState({ member: response });
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

        const { member, membership } = this.state;
        const { onClose, show, submit } = this.props;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="sm"
                title={(
                    <h3 className="fw-bold">
                        Trouvez le membre
                    </h3>
                )}
            >
                <RctCardContent>
                    <div className="row">
                        <FormGroup className="has-wrapper col-md-9">
                            <InputLabel className="text-left" htmlFor="membership">
                                Numéro utilisateur
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                id="membership"
                                name='membership'
                                value={membership}
                                className="input-lg"
                                onChange={(e) => this.setState({ membership: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-3">
                            <InputLabel className="text-left" htmlFor="membership">
                                &nbsp;
                            </InputLabel>
                            <Button
                                color="primary"
                                variant="contained"
                                disabled={!membership}
                                onClick={() => this.findUserByMembership()}
                                className="text-white font-weight-bold mr-20 bg-blue"
                            >
                                Vérifier
                            </Button>
                        </FormGroup>
                    </div>

                    {member && (
                        <>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.userName}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.email}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={getReferralTypeLabel(member.referralType)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    disabled={!member}
                                    onClick={() => submit(member)}
                                    className="text-white font-weight-bold mr-20 bg-blue"
                                >
                                    Continuer
                                </Button>
                            </FormGroup>
                        </>
                    )}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(SearchMember)));
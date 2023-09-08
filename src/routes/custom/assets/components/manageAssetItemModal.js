import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import UserService from 'Services/users';
import AssetService from 'Services/assets';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import TimeFromMoment from "Components/TimeFromMoment";
import { getReferralTypeLabel } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';

class ManageAssetItemModal extends Component {
  
    state = {
        datas: [],
        profiles: [],
        profile: null,
        member: null,
        membership: null,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getProfiles();
        this.getParticipants();
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

    getParticipants = () => {
        this.props.setRequestGlobalAction(true);
        AssetService.getParticipants(this.props.asset.reference)
        .then(response => {
            this.setState({ datas: response });
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    getProfiles = () => {
        this.props.setRequestGlobalAction(true);
        AssetService.getProfiles()
        .then(response => {
            this.setState({ profiles: response });
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    onSubmit = () => {

        const { profile, membership, member } = this.state;

        if(!profile || !member) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        let data = {
            profile_reference: profile.reference,
            asset_reference: this.props.asset.reference,
            referral_code: membership
        }

        this.props.setRequestGlobalAction(true);
        AssetService.createManagement(data)
        .then(() => {
            NotificationManager.success("Intervenant enregistré avec succès");
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("La création a échouée");
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
            this.props.onClose();
        })

    }

    render() {

        const { onClose, show, title } = this.props;
        const { profiles, profile, membership, member, datas } = this.state;

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
                    <FormGroup className="has-wrapper">
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

                    {member && (
                        <div className="row">
                            <FormGroup className="has-wrapper col-md-4">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.userName}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper col-md-4">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.email}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper col-md-4">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={getReferralTypeLabel(member.referralType)}
                                />
                            </FormGroup>
                        </div>
                    )}

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Profile de gestion
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={profile}
                            options={profiles}
                            onChange={(__, item) => {
                                this.setState({ profile: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!membership}
                            onClick={() => this.findUserByMembership()}
                            className="text-white font-weight-bold mr-20 bg-blue"
                        >
                            Vérifier l'utilisateur
                        </Button>
                        <Button
                            color="primary"
                            disabled={!member}
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Enregistrer l'intervenant
                        </Button>
                    </FormGroup>
                    <hr />
                    <CustomList
                        list={datas}
                        loading={false}
                        itemsFoundText={n => `${n} participants trouvés`}
                        renderItem={list => (
                            <>
                                {list && list.length === 0 ? (
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucun participant trouvé
                                        </h4>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="fw-bold">Noms & prénoms</th>
                                                    <th className="fw-bold">Profile</th>
                                                    <th className="fw-bold">Date enregistrement</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.userName}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.assetProfile.label}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <TimeFromMoment time={item.createdAt} showFullDate />
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(ManageAssetItemModal)));
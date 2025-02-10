import { connect } from 'react-redux';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import AccountService from "Services/accounts";
import CustomList from "Components/CustomList";
import UserSelect from 'Components/UserSelect';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TimeFromMoment from 'Components/TimeFromMoment';
import {FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class AccountProfiles extends Component {

    state = {
        profiles: [],
        member: null,
        description: null,
        showCreate: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getProfiles();
    }

    getProfiles = () => {
        this.props.setRequestGlobalAction(true);
        AccountService.getAllAccountProfiles(this.props.reference).then(response => {
            this.setState({profiles: response});
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    deleteProfile = (reference) => {
        this.props.setRequestGlobalAction(true);
        AccountService.deleteAccountProfile(reference).then(response => {
            this.getProfiles();
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    onSubmit = () => {        
        if(!this.state.member || !this.state.showCreate) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        this.props.setRequestGlobalAction(true);

        let data = {
            referralCode: this.state.member.referralCode,
            accountReference: this.props.reference
        }

        if(this.state.description) {
            data.description = this.state.description
        }

        AccountService.createAccountProfile(data).then(() => {
            NotificationManager.success("Le profile a été ajouté avec succès");
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'ajout");
        }).finally(() => {
            this.setState({ member: null, showCreate: false, description: null });
            this.getProfiles();
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { profiles, showCreate, member, description } = this.state;

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
                    { showCreate ? (
                        <>
                            <UserSelect label={'Numéro utilisateur'} onChange={(_, user) => {
                                this.setState({ member: user });
                            }}/>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="description">
                                    Description
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="text"
                                    id="description"
                                    name='description'
                                    value={description}
                                    className="input-lg"
                                    onChange={(e) => this.setState({ description: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => this.onSubmit()}
                                    disabled={!member}
                                    className="text-white font-weight-bold"
                                >
                                    Enregistrer
                                </Button>
                            </FormGroup>
                        </>
                    ) : 
                        <CustomList
                            list={profiles}
                            loading={false}
                            itemsFoundText={n => `${n} profiles trouvés`}
                            onAddClick={() => this.setState({ showCreate: true })}
                            renderItem={list => (
                                <>
                                    {list && list.length === 0 ? (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucun profile trouvé
                                            </h4>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-hover table-middle mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="fw-bold">Nom</th>
                                                        <th className="fw-bold">Email</th>
                                                        <th className="fw-bold">Numéro</th>
                                                        <th className="fw-bold">Date de création</th>
                                                        <th className="fw-bold">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list && list.map((item, key) => (
                                                        <tr key={key} className="cursor-pointer">
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <p className="m-0 text-dark">{item?.fullName}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <p className="m-0 text-dark">{item?.email}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <p className="m-0 text-dark">{item?.referralCode}</p>
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
                                                            <td>
                                                                <Button
                                                                    color="primary"
                                                                    variant="contained"
                                                                    className="text-white font-weight-bold"
                                                                    onClick={() => {
                                                                        this.deleteProfile(item.reference);
                                                                    }}
                                                                >
                                                                    Supprimer
                                                                </Button>
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
                    }
                </RctCardContent>
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(AccountProfiles));
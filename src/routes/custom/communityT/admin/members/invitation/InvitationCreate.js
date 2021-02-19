/**
 * Email Listing
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

// redux action
import {readEmail, onSelectEmail, markAsStarEmail, setRequestGlobalAction} from 'Actions';

//Intl Message
import IntlMessages from 'Util/IntlMessages';
import {Input, InputGroup, InputGroupAddon} from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import {globalSearch, textTruncate} from "Helpers/helpers";
import Chip from "@material-ui/core/Chip";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {Scrollbars} from "react-custom-scrollbars";
import {searchUsers, getUserCommunitiesAdmin} from "Actions";
import {NotificationManager} from "react-notifications";
import UserAvatar from "Components/UserAvatar";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import Button from "@material-ui/core/Button";
import {sendManyInvitations} from "Actions/independentActions";
import {COMMUNITY} from "Url/frontendUrl";

class InvitationCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSelected: [],
            searchLoading: false,
            searched: '',
            userFound: [],
            step: 1,
            groupSelected: {},
            groupFound: [],
        }
    }

    componentDidMount() {
        this.props.getUserCommunitiesAdmin();
    }


    onSearchChanged = (event, can) => {
        this.setState({searched: event.target.value}, () => {
            this.state.step === 1
                ? this.handleSearch(this.state.searched)
                : this.handleGroup(this.state.searched);
        });
    };

    handleSearch = (value) => {
        if (value !== '') {
            this.setState({searchLoading: true});
            // Apply order feature
            searchUsers(value)
                .then(response => {
                    this.setState({userFound: response});
                })
                .catch((error) => {
                    NotificationManager.error("Un problème est survenue lors de la recherche. Veuillez réessayer");
                })
                .finally(() => this.setState({searchLoading: false}));
        }
    };

    handleGroup = (value) => {
        if (value !== '') {
            // this.setState({searchLoading: true});
            this.setState({groupFound: globalSearch(this.props.userCommunitiesAdmin.data, this.state.searched)});
            /*const result = globalSearch(this.props.userCommunitiesAdmin.data, this.state.searched);
            // Apply order feature
            searchUsers(value)
                .then(response => {
                    this.setState({userFound: response});
                })
                .catch((error) => {
                    NotificationManager.error("Un problème est survenue lors de la recherche. Veuillez réessayer");
                })
                .finally(() => this.setState({searchLoading: false}));*/
        }
    };

    onSelectedUser = (user) => {
        this.setState(prevState => ({userSelected: [...prevState.userSelected, user]}));
    };

    onUnSelectedUser = (user) => {
        this.setState(prevState => ({userSelected: prevState.userSelected.filter(u => u.id !== user.id)}));
    };

    onToggleUserSelection(event, user, isUserSelected) {
        event.stopPropagation();
        if (isUserSelected) {
            this.onUnSelectedUser(user);
        } else {
            this.onSelectedUser(user);
        }
    }

    onToggleGroupSelection(event, group, isGroupSelected) {
        event.stopPropagation();
        this.setState({groupSelected: isGroupSelected ? {} : group});
    }

    isUserSelected = (user) => {
        // return this.state.userSelected.find(u => u.id === user.id) !== undefined;
        return this.state.userSelected.map(u => u.id).includes(user.id);
    };

    onPreviousClick = () => {
        /*if (this.state.userSelected.length === 0) {
            NotificationManager.error("Vous devez selectionner au moins un utilisateur");
            return;
        }*/

        this.setState({step: 1, searchLoading: false, searched: ''});
    };

    onNextClick = () => {
        if (this.state.userSelected.length === 0) {
            NotificationManager.error("Vous devez selectionner au moins un utilisateur");
            return;
        }

        this.setState({step: 2, searchLoading: false, searched: ''});
    };

    onSubmit = () => {
        if (Object.keys(this.state.groupSelected).length <= 0) {
            NotificationManager.error("Vous devez selectionner un groupe");
            return;
        }

        this.props.setRequestGlobalAction(true);
        // const res = confirm("Cette operation peut prendre quelques minutes. Souhaitez-vous continuer ?");
        const users = JSON.stringify(this.state.userSelected.map(u => u.id));
        sendManyInvitations(this.state.groupSelected.id, users)
            .then(() => {
                NotificationManager.success("Invitation envoyé avec succès");
                this.props.history.push(COMMUNITY.INVITATIONS.LIST.SEND);
            })
            .catch(() => {
                NotificationManager.error("L'invitation n'a pas pu être envoyé. Veuillez réessayer.");
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    render() {
        const { loading, userCommunitiesAdmin } = this.props;
        const { userSelected, searchLoading, userFound, searched, step, groupFound, groupSelected } = this.state;
        const isGroupSelected = Object.keys(groupSelected).length > 0;

        if (userCommunitiesAdmin.loading) {
            return (<RctSectionLoader/>)
        }

        return (
            <div className="">
                {userCommunitiesAdmin.data && userCommunitiesAdmin.data === 0 ? (
                    <div className="chat-box-main">
                        <div className="text-center fw-bold">
                            Vous devez être administrateur dans au moins un groupe pour pourvoir inviter un utilisateur.
                        </div>
                    </div>
                ) : (
                    <>
                        <>
                           <div className="align-items-center row justify-content-between p-3 bg-small-white">
                               <h2 className="text-center fw-bold m-0">
                                   {step === 1
                                       ? "Etape 1/2: Selectionner des utilisateurs à inviter"
                                       : "Etape 2/2: Selectionner un groupe dans lequel inviter"
                                   }
                               </h2>
                               <div>
                                   {step === 2 && (
                                       <Button
                                           // type="submit"
                                           size="small"
                                           color="primary"
                                           disabled={loading}
                                           variant="contained"
                                           className={"text-white font-weight-bold mr-3 bg-blue"}
                                           onClick={this.onPreviousClick}
                                       >
                                           <i className="zmdi zmdi-arrow-left mr-2"/>
                                           <IntlMessages id={"button.previous"} />
                                       </Button>
                                   )}
                                   <Button
                                       // type="submit"
                                       size="small"
                                       color="primary"
                                       disabled={loading}
                                       variant="contained"
                                       className={"text-white font-weight-bold mr-3 " + (step === 1 ? 'bg-blue' : '')}
                                       onClick={step === 1 ? this.onNextClick : this.onSubmit}
                                   >
                                       <IntlMessages id={step === 1 ? "button.next" : "button.submit"} />
                                       {step === 1 && (<i className="zmdi zmdi-arrow-right ml-2"/>)}
                                   </Button>
                               </div>
                           </div>
                        </>
                        {step === 1 ? (
                            <>
                                <div className="row justify-content-center">
                                    <div className="mt-sm-3 mb-2">
                                        <div className="d-inline-block bg-white text-center text-black p-1 col-12">
                                            <h4>({userSelected.length}) Utilisateur(s) selectioné(s)</h4>
                                            {userSelected.map((user, key) => (
                                                <Chip
                                                    key={key}
                                                    onClick={() => this.onUnSelectedUser(user)}
                                                    onDelete={() => this.onUnSelectedUser(user)}
                                                    label={user.name}
                                                    className="chip-outline-primary text-black mr-10 mb-10"
                                                    avatar={(
                                                        <UserAvatar
                                                            avatar={user.avatar}
                                                            name={user.name}
                                                        />
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <FormControl>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <IconButton aria-label="facebook">
                                                        <i className="zmdi zmdi-search"/>
                                                    </IconButton>
                                                </InputGroupAddon>
                                                <Input
                                                    type="text"
                                                    name="search"
                                                    value={searched}
                                                    autoComplete="off"
                                                    placeholder={'Rechercher un utilisateur...'}
                                                    onChange={event => this.onSearchChanged(event)}
                                                />
                                            </InputGroup>
                                        </FormControl>
                                    </div>
                                </div>

                                <ul className="list-unstyled m-0">
                                    {searchLoading ? (
                                        <RctSectionLoader/>
                                    ) : searched && searched !== '' ? (
                                        <>
                                            {(userFound && userFound.length > 0) ? userFound.map((user, key) => {
                                                    const isUserSelected = this.isUserSelected(user);
                                                    return (
                                                        <li
                                                            key={key}
                                                            className="d-flex justify-content-between align-items-center list-item px-20 py-10 cursor-pointer h__bg-small-white"
                                                            onClick={(event) => this.onToggleUserSelection(event, user, isUserSelected)}
                                                        >
                                                            <div className="d-flex align-items-center w-100">
                                                                <div className="checkbox-wrap">
                                                                    <Checkbox
                                                                        checked={isUserSelected}
                                                                        onClick={(event) => this.onToggleUserSelection(event, user, isUserSelected)}
                                                                    />
                                                                </div>
                                                                <div className="center-hor-ver emails media w-100">
                                                                    <div className="avatar-wrap w-10 align-self-center">
                                                                        <UserAvatar
                                                                            avatar={user.avatar}
                                                                            name={user.name}
                                                                        />
                                                                    </div>
                                                                    <div className="media-body d-flex align-items-center w-90">
                                                                        <div className="d-inline-block w-25">
                                                                            <h4 className="m-0">{user.name}</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                                :
                                                <div className="d-flex justify-content-center align-items-center py-50">
                                                    <h4>Aucun utilisateurs trouvés</h4>
                                                </div>
                                            }
                                        </>
                                    ) : (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>Entrez un email pour rechercher un utilisateur</h4>
                                        </div>
                                    )}
                                </ul>
                            </>
                        ) : (
                            <div className="p-2">
                                <div className="row justify-content-center ">
                                    <div className="mt-sm-3 mb-2">
                                        <div className="d-inline-block bg-white text-center text-black p-1 col-12">
                                            <h4>({isGroupSelected ? '1' : '0'}) Groupe selectioné</h4>
                                            {isGroupSelected && (
                                                <Chip
                                                    onClick={() => this.onUnSelectedUser(groupSelected)}
                                                    onDelete={() => this.onUnSelectedUser(groupSelected)}
                                                    label={groupSelected.name}
                                                    className="chip-outline-primary text-black mr-10 mb-10"
                                                    avatar={(
                                                        <UserAvatar
                                                            avatar={groupSelected.avatar}
                                                            name={groupSelected.label}
                                                        />
                                                    )}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <FormControl>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <IconButton aria-label="facebook">
                                                        <i className="zmdi zmdi-search"/>
                                                    </IconButton>
                                                </InputGroupAddon>
                                                <Input
                                                    type="text"
                                                    name="search"
                                                    value={searched}
                                                    autoComplete="off"
                                                    placeholder={'Rechercher un groupe...'}
                                                    onChange={event => this.onSearchChanged(event)}
                                                />
                                            </InputGroup>
                                        </FormControl>
                                    </div>
                                </div>

                                <ul className="list-unstyled m-0">
                                    {searchLoading ? (
                                        <RctSectionLoader/>
                                    ) : searched && searched !== '' ? (
                                        <>
                                            {(groupFound && groupFound.length > 0) ? groupFound.map((group, key) => {
                                                    const isGroupSelected = group.id === groupSelected.id;
                                                    return (
                                                        <li
                                                            key={key}
                                                            className="d-flex justify-content-between align-items-center list-item px-20 py-10 cursor-pointer h__bg-small-white"
                                                            onClick={(event) => this.onToggleGroupSelection(event, group, isGroupSelected)}
                                                        >
                                                            <div className="d-flex align-items-center w-100">
                                                                <div className="checkbox-wrap">
                                                                    <Checkbox
                                                                        checked={isGroupSelected}
                                                                        onClick={(event) => this.onToggleGroupSelection(event, group, isGroupSelected)}
                                                                    />
                                                                </div>
                                                                <div className="center-hor-ver emails media w-100">
                                                                    <div className="avatar-wrap w-10 align-self-center">
                                                                        <UserAvatar
                                                                            avatar={group.avatar}
                                                                            name={group.label}
                                                                        />
                                                                    </div>
                                                                    <div className="media-body d-flex align-items-center w-90">
                                                                        <div className="d-inline-block w-25">
                                                                            <h4 className="m-0">{group.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                                :
                                                <div className="d-flex justify-content-center align-items-center py-50">
                                                    <h4>Aucun groupes trouvés</h4>
                                                </div>
                                            }
                                        </>
                                    ) : (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>Entrez un nom pour rechercher un groupe</h4>
                                        </div>
                                    )}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalAction, userCommunitiesAdmin }) => {
    return {loading: requestGlobalAction, userCommunitiesAdmin};
};

export default withRouter(connect(mapStateToProps, {
    getUserCommunitiesAdmin,
    setRequestGlobalAction,
    onSelectEmail,
    markAsStarEmail
})(InvitationCreate));

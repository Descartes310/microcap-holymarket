import React, { Component } from 'react';
import { connect } from "react-redux";
import IntlMessages from 'Util/IntlMessages';
import { setRequestGlobalAction, acceptInvitation, getInvitationsPending } from "Actions";
import { injectIntl } from "react-intl";
import { Fab, withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { AbilityContext } from "Permissions/Can";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import FormControl from "@material-ui/core/FormControl";
import { Input, InputGroup, InputGroupAddon, Media } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { globalSearch, getFilePath } from "Helpers/helpers";
import { requestsReceived, invitationSent, getUserClient, getUserClientExp, createUserPieceValue, deleteUserClient } from "Actions/independentActions";
import InvitationType from "Enums/InvitationType";
import { Scrollbars } from "react-custom-scrollbars";
import InvitationItem from "./InvitationItem";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import CancelIcon from '@material-ui/icons/Cancel';
import {NotificationManager} from "react-notifications";

class InvitationsListType extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);
        this.state = {
            searched: '',
            loading: true,
            showBox: false,
            isAdding: false,
            pieces: [],
            invitation: null,
            userPieces: [],
            datas: []
        }
    }

    componentDidMount() {
        this.getDatas()
    }

    getDatas = () => {
        if (this.props.type == InvitationType.INVITATION) {
            this.getRequests();
            this.getPieces();
        }
        if (this.props.type == InvitationType.INVITATION_SEND) {
            this.getInvitations();
        }
    }

    onSearchChanged = (event) => {
        this.setState({ searched: event.target.value });
    };

    getInvitations = () => {
        invitationSent(this.props.communitySpace.data).then(data => {
            this.setState({ datas: data });
        }).finally(() => this.setState({ loading: false }))
    };

    getRequests = () => {
        requestsReceived(this.props.communitySpace.data).then(data => {
            this.setState({ datas: data });
        }).finally(() => this.setState({ loading: false }))
    };

    getPieces = () => {
        getUserClientExp(this.props.authUser.user.branch.id).then(data => {
            this.setState({ pieces: data });
        })
    };

    handleSearch = (value, data) => {
        if (value !== '') {
            // Apply order feature
            return globalSearch(data, this.state.searched);
        }

        return data;
    };

    onAccept = () => {
        this.props.setRequestGlobalAction(true);
        acceptInvitation(this.state.invitation.invitationId)
            .then(() => {
                NotificationManager.success("Vous faite maintenant partir du groupe " + this.state.invitation.group.label);
                console.log("La communauté est ==> ", this.props.communitySpace.data, this.state.invitation)
                this.getDatas();
            })
            .catch(() => null)
            .finally(() => { this.props.setRequestGlobalAction(false); this.setState({ showBox: false}) });
    };

    onHandleRequest = (invitation) => {
        getUserClient(invitation.userId, invitation.userType).then(data => {
            this.setState({ userPieces: data, showBox: true, isAdding: false, invitation });
        })
    }

    onAddPiece = (piece) => {
        this.props.setRequestGlobalAction(true);
        createUserPieceValue({
            piece_id: piece.id,
            group_id: this.state.invitation.group.id,
            user_id: this.state.invitation.user.id
        }).then(data => {
            NotificationManager.success("Demande de pièce terminée");
            getUserClient(this.state.invitation.userId, this.state.invitation.userType).then(data => {
                this.setState({ userPieces: data, isAdding: false });
            })
        }).finally(() => {this.setState({ isAdding: false }); this.props.setRequestGlobalAction(false)})
    }

    onDeletePiece = (piece) => {
        this.props.setRequestGlobalAction(true);
        deleteUserClient(piece.id).then(data => {
            NotificationManager.success("Demande de pièce supprimée");
            getUserClient(this.state.invitation.userId, this.state.invitation.userType).then(data => {
                this.setState({ userPieces: data, isAdding: false });
            })
        }).finally(() => {this.setState({ isAdding: false }); this.props.setRequestGlobalAction(false)})
    }


    render() {
        const { classes, title } = this.props;
        const { loading, datas, showBox, isAdding } = this.state;

        if (loading) {
            return (<RctSectionLoader />)
        }

        return (
            <>
                <div className="page-list">
                    {loading
                        ? (<RctSectionLoader />)
                        : (
                            <RctCollapsibleCard>
                                <h1 style={{ marginBottom: '30px' }}>{title}</h1>
                                <div className="align-items-center mb-30 px-15 row">
                                    <div className={classes.flex}>
                                        <FormControl>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <IconButton aria-label="facebook">
                                                        <i className="zmdi zmdi-search" />
                                                    </IconButton>
                                                </InputGroupAddon>
                                                <Input
                                                    type="text"
                                                    name="search"
                                                    value={this.state.searched}
                                                    placeholder={'Recherchez...'}
                                                    onChange={this.onSearchChanged}
                                                />
                                            </InputGroup>
                                        </FormControl>
                                    </div>
                                    <p className={classes.title}>
                                        {datas.length} invitation(s) reçu(s)
                                    </p>
                                </div>
                                <>
                                    {datas.length == 0 ? (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucune invitation trouvée
                                            </h4>
                                        </div>
                                    ) : (
                                            <>
                                                <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={400} autoHide>
                                                    <ul className="new-mail mb-0 list-unstyled">
                                                        {datas.map((invitation, key) => (
                                                            <InvitationItem
                                                                key={key}
                                                                reload={this.getDatas}
                                                                invitation={invitation}
                                                                showBox={() => this.onHandleRequest(invitation)}
                                                            />
                                                        ))}
                                                    </ul>
                                                </Scrollbars>
                                            </>
                                        )}
                                </>
                            </RctCollapsibleCard>
                        )
                    }
                    <Dialog
                        open={showBox}
                        onClose={() => { this.setState({ showBox: false }) }}
                        aria-labelledby="responsive-dialog-title"
                        maxWidth={'md'}
                        fullWidth
                    >
                        <DialogTitle id="form-dialog-title">
                            <div className="row justify-content-between align-items-center">
                                Demande de pièces
                            <IconButton
                                    color="primary"
                                    aria-label="close"
                                    className="text-danger"
                                    onClick={() => { this.setState({ showBox: false }) }}>
                                    <CancelIcon />
                                </IconButton>
                            </div>
                        </DialogTitle>
                        <DialogContent>
                            <div className="row">
                                <div className="col-md-8">
                                    {
                                        isAdding ?
                                            <table className="table table-hover table-middle mb-0 text-center">
                                                <thead>
                                                    <tr>
                                                        <th>Ajouter une nouvelle pièce</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.pieces.filter(p => !this.state.userPieces.map(a => a.userPiece.id).includes(p.id)).map(p => (
                                                        <tr>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{p.name}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    size="small"
                                                                    color="primary"
                                                                    variant="contained"
                                                                    className={"text-white font-weight-bold mr-3"}
                                                                    onClick={() => this.onAddPiece(p)}
                                                                >
                                                                    Reclamer
                                                                </Button>
                                                                <Button
                                                                    href={getFilePath(p.file)}
                                                                    target='_blank'
                                                                    size="small"
                                                                    color="primary"
                                                                    variant="contained"
                                                                    className={"text-white font-weight-bold mr-3"}
                                                                >
                                                                    Consulter
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    }
                                                </tbody>
                                            </table>
                                            :
                                            <table className="table table-hover table-middle mb-0 text-center">
                                                <thead>
                                                    <tr>
                                                        <th>Liste des pièces demandées</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.userPieces.map(p => (
                                                            <tr>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold" style={{ textAlign: 'left' }}>{p.userPiece.name}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            {
                                                                                p.file != null ?
                                                                                    <Button href={getFilePath(p.file)} target='_blank' variant="contained">Consulter</Button>
                                                                                    :
                                                                                    <Button className="btn-danger text-white" onClick={() => this.onDeletePiece(p)} variant="contained">Retirer</Button>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                    }
                                </div>
                                <div className="col-md-4" style={{ display: 'block' }}>
                                    {/* <Button color="primary" variant="contained" style={{ marginBottom: 20, width: '100%' }}>Reclammer</Button> */}
                                    <Button color="primary" className="bg-blue text-white" onClick={() => this.onAccept()} variant="contained" style={{ marginBottom: 20, width: '100%' }}>Accepter la demande</Button>
                                    <Button color="primary" variant="contained" style={{ marginBottom: 20, width: '100%' }}>Archiver</Button>
                                    <Button color="primary" variant="contained" style={{ marginBottom: 20, width: '100%' }} onClick={() => this.setState({ isAdding: !this.state.isAdding })}>{isAdding ? 'Voir les pièces demandées' : 'Ajouter une pièce'}</Button>
                                </div>
                            </div>

                        </DialogContent>
                    </Dialog>
                </div>
            </>
        );
    }
}


const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace }) => {
    return { requestGlobalLoader, authUser: authUser.data, communitySpace: communitySpace };
};

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});

/*  export default connect(mapStateToProps, {getInvitationsPending, setRequestGlobalAction})
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(InvitationsListType))));
 */

export default connect(mapStateToProps, { setRequestGlobalAction, acceptInvitation, getInvitationsPending })(withStyles(useStyles, { withTheme: true })(withRouter(InvitationsListType)));

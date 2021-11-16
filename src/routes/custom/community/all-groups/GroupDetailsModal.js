import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { getFilePath } from 'Helpers/helpers';
import { withRouter } from "react-router-dom";
import CommunityType from "Enums/CommunityType";
import MatButton from '@material-ui/core/Button';
import { AbilityContext } from "Permissions/Can";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { NotificationManager } from "react-notifications";
import { setRequestGlobalAction, pinGroup } from "Actions";
import { COMMUNITY, joinUrlWithParamsId } from 'Url/frontendUrl';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

class GroupDetailsModal extends Component {
    static contextType = AbilityContext;

    state = {
        loading: true,
        showAskingBox: false
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    enterInCommunitySpace = (id) => {
        window.location = joinUrlWithParamsId(COMMUNITY.MEMBERS.LIST, id);
    };

    onPin = () => {
        this.props.setRequestGlobalAction(true);
        pinGroup(this.props.community.id)
            .then(data => {
                NotificationManager.success("La communauté a bien été épinglée/désépinglée");
            })
            .finally(() => {
                this.props.setRequestGlobalAction(false);
                this.props.onClose();
            })
    }

    render() {

        const { show, community, onClose, onJoin, onInvite } = this.props;

        return (
            <Dialog
                fullWidth
                open={show}
                maxWidth={'lg'}
                onClose={() => onClose()}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <div className="row justify-content-between align-items-center">
                        <h2>Détails de la communauté</h2>
                        <IconButton
                            color="primary"
                            aria-label="close"
                            className="text-danger"
                            onClick={() => onClose()}
                        >
                            <CancelIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className={`chat-content`}>
                        {community ?
                            <div className='d-flex flex-row align-items-center justify-content-center'>
                                <div style={{ flex: 1, paddingLeft: '5%' }}>
                                    <img src={community.image ? getFilePath(community.image) : require('Assets/img/groups.png')} alt="Community image" width="80%" />
                                </div>
                                <div className='d-flex flex-column justify-content-center' style={{ flex: 1 }}>
                                    <div style={{ marginBottom: 20 }}>
                                        <h2>Nom de la communuaté</h2>
                                        <span>{community.label}</span>
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <h2>Numéro de référence</h2>
                                        <span>{community.reference}</span>
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <h2>Type de communauté</h2>
                                        {
                                            community.typeGroup.name === CommunityType.COMMUNAUTE_PROJET ?
                                                <span style={{ backgroundColor: 'rgba(46, 178, 229, 0.8)', padding: 10, marginTop: 40, marginBottom: 20, width: 76, borderRadius: 5, color: 'white', fontSize: '0.8em' }}>
                                                    Communuaté projet
                                                </span>
                                                : null
                                        }
                                        {
                                            community.typeGroup.name === CommunityType.COMMUNAUTE_CONVENTIONNEE ?
                                                <span style={{ backgroundColor: 'rgba(200, 0, 0, 0.5)', padding: 10, marginTop: 40, marginBottom: 20, width: 76, borderRadius: 5, color: 'white', fontSize: '0.8em' }}>
                                                    Communauté conventionnée
                                                </span>
                                                : null
                                        }
                                        {
                                            community.typeGroup.name === CommunityType.COMMUNAUTE_AFFINITE ?
                                                <span style={{ backgroundColor: 'rgba(200, 0, 0, 0.5)', padding: 10, marginTop: 40, marginBottom: 20, width: 76, borderRadius: 5, color: 'white', fontSize: '0.8em' }}>
                                                    Communauté d'affinité
                                                </span>
                                                : null
                                        }
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <h2>Nombre de membre</h2>
                                        <span>{community.members}</span>
                                    </div>
                                </div>
                            </div> : null}
                        {
                            community ?
                                <div style={{ marginLeft: '10%', marginTop: '5%', marginBottom: '5%' }}>
                                    <div style={{ marginBottom: 20 }}>
                                        <h2>Description de la communuaté</h2>
                                    </div>

                                    <span>{community.description}</span>
                                </div>
                                : null
                        }
                        {
                            community ?
                                <div className="text-center" style={{ padding: 10, width: "100%" }}>

                                    {!community.status && (
                                        <MatButton variant="contained" className="btn-info ml-10 mb-10 text-white btn-icon" onClick={() => onJoin()}>
                                            Adhérer
                                        </MatButton>
                                    )}

                                    {community.status && (<MatButton variant="contained" color="primary" className="ml-10 mr-10 mb-10 text-white btn-icon" onClick={() => onInvite()}>Envoyer une invitation</MatButton>)}

                                    {community.status && (<MatButton variant="contained" className="btn-info ml-10 mb-10 text-white btn-icon" onClick={() => this.enterInCommunitySpace(community.id)}>Rejoindre</MatButton>)}
                                    <MatButton variant="contained" className={`${community.pin ? 'btn-danger' : 'btn-success'} ml-10 mb-10 text-white btn-icon`} onClick={() => this.onPin()}>
                                        { community.pin ? <span>Désépingler</span> : <span>Epingler</span> }
                                    </MatButton>
                                </div>
                                :
                                null
                        }
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(GroupDetailsModal)));

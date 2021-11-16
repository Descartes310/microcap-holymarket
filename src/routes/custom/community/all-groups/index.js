import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import GroupItem2 from '../groups/GroupItem2';
import Switch from '@material-ui/core/Switch';
import JoinGroupModal from "./JoinGroupModal";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import CustomList from "Components/CustomList";
import { AbilityContext } from "Permissions/Can";
import GroupDetailsModal from "./GroupDetailsModal";
import { NotificationManager } from "react-notifications";
import { getInvitationsPending } from "Actions/GeneralActions";
import { COMMUNITY, joinUrlWithParamsId } from 'Url/frontendUrl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getCommunitiesByBranch } from "Actions/independentActions";
import InvitationCreateDialog from "../../communityT/members/invitation/InvitationCreateDialog";
import { getGroupPosts, getMotivations, sendRequestInvitation, setRequestGlobalAction } from "Actions";

class AllGroups extends Component {
    static contextType = AbilityContext;

    state = {
        posts: [],
        post: null,
        group: null,
        loading: true,
        communities: [],
        motivations: [],
        motivation: null,
        filterPin: false,
        showAskingBox: false,
        showDetailsBox: false,
        showInvitationBox: false
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.setState({ loading: false });
        getCommunitiesByBranch(this.props.authUser.user.branch.id, this.props.authUser.user.id)
            .then(data => {
                this.setState({ communities: data });
            })
            .finally(() => this.setState({ loading: false }));
    };

    onEnterClick = (group) => {
        this.setState({ showAskingBox: true, group })
    };

    getPosts = (id) => {
        this.props.setRequestGlobalAction(true);
        getGroupPosts(id)
            .then(data => {
                this.setState({ posts: data });
            }).finally(() => {
                this.props.setRequestGlobalAction(false);
            });
    };

    getPostMotivations = (post) => {
        this.setState({ post: post });
        this.props.setRequestGlobalAction(true);
        getMotivations(post.id)
            .then(data => {
                this.setState({ motivations: data });
            }).finally(() => {
                this.props.setRequestGlobalAction(false);
            });
    };

    onAskingClick = (group) => {
        this.props.setRequestGlobalAction(true);
        let data = { motivation_id: this.state.motivation };
        sendRequestInvitation(group.id, this.props.authUser.user.id, data)
            .then(() => {
                NotificationManager.success("Votre demande pour le groupe " + group.label + " a été envoyé");
                this.loadData();
                this.props.getInvitationsPending(this.props.authUser.user.id);
            })
            .catch(() => null)
            .finally(() => {
                this.props.setRequestGlobalAction(false);
                this.setState({ showAskingBox: false, group: null, posts: [], post: null, motivations: [], motivation: null });
            });
    };

    onJoinClick = (id) => {
        this.props.history.push(joinUrlWithParamsId(COMMUNITY.MEMBERS.LIST, id));
    };

    onDetailsView = (group) => {
        this.setState({ showDetailsBox: true, group })
    };

    render() {
        const { communities, loading, showAskingBox, group, showDetailsBox, showInvitationBox, filterPin } = this.state;

        if (!loading && communities && communities.length === 0) {
            return (
                <h3 className="center-hor-ver h-20">Aucun groupes disponible pour le moment</h3>
            );
        }

        return (
            <>
                <CustomList
                    loading={loading}
                    list={communities}
                    itemsFoundText={n => `${n} Groupe(s) trouvé(s)`}
                    renderItem={list => (
                        <>
                            {!list || (list && list.length === 0) ? (
                                <div className="no-found-user-wrap d-flex justify-content-center align-items-center py-50">
                                    <h4> Aucune communauté trouvée</h4>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-20 d-flex align-items-center">
                                        <span style={{ marginRight: 20 }}>Afficher les communautés épinglées</span>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    color="primary"
                                                    className="switch-btn"
                                                    checked={this.state.filterPin}
                                                    onClick={() => this.setState({ filterPin: !this.state.filterPin })}
                                                />
                                            }
                                        />
                                    </div>
                                    <div className="row" style={{ paddingBottom: 50 }}>
                                        {list.filter(c => !(filterPin && !c.pin)).map((community, key) => (
                                            <div className="col-sm-6 col-md-4 col-lg-3" key={key}>
                                                <GroupItem2
                                                    group={community}
                                                    isMember={community.status}
                                                    adhesion={this.onEnterClick}
                                                    enterInCommunitySpace={this.onJoinClick}
                                                    onViewCommunityDetails={this.onDetailsView}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                />

                {group && (
                    <JoinGroupModal
                        show={showAskingBox && group}
                        community={group}
                        onClose={() => this.setState({ showAskingBox: false, group: null })}
                    />
                )}

                {group && (
                    <GroupDetailsModal
                        community={group}
                        show={showDetailsBox && group}
                        onClose={() => { this.setState({ showDetailsBox: false, group: null }); this.loadData() }}
                        onJoin={() => { this.setState({ showDetailsBox: false, showAskingBox: true, group: group }) }}
                        onInvite={() => this.setState({ showDetailsBox: false, showInvitationBox: true, group: group })}
                    />
                )}

                {(group && showInvitationBox) && (
                    <InvitationCreateDialog open={showInvitationBox} handleClose={() => this.setState({ showInvitationBox: false })} community={group} />
                )}
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace }) => {
    return { requestGlobalLoader, authUser: authUser.data, communitySpace }
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

export default connect(mapStateToProps, { getInvitationsPending, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(AllGroups))));

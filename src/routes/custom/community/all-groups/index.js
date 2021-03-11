import React, { Component } from 'react';
import { connect } from "react-redux";
import IntlMessages from 'Util/IntlMessages';
import { sendRequestInvitation, acceptInvitation, setRequestGlobalAction } from "Actions";
import { injectIntl } from "react-intl";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import Permission from "Enums/Permissions";
import CustomList from "Components/CustomList";
import Button from "@material-ui/core/Button";
import { statusCommunitySpaceStatus, setCommunitySpaceData, setCommunitySpaceAdmins } from 'Actions/CommunityAction';
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import { getInvitationsPending } from "Actions/GeneralActions";
import { getCommunitiesByBranch, getCommunityAdmins } from "Actions/independentActions";
import { COMMUNITY } from 'Url/frontendUrl';
import GroupItem2 from '../groups/GroupItem2';

class AllGroups extends Component {
    static contextType = AbilityContext;

    state = {
        loading: true,
        communities: []
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        getCommunitiesByBranch(this.props.authUser.user.branch.id, this.props.authUser.user.id).then(data => {
            this.setState({ communities: data });
        }).finally(() => this.setState({ loading: false }))
    }

    onEnterClick = (group) => {
        console.log('user use and group', this.props.authUser.user.id, group.id)
        this.props.setRequestGlobalAction(true);
        sendRequestInvitation(group.id, this.props.authUser.user.id)
            .then(() => {
                NotificationManager.success("Votre demande pour le groupe " + group.label + " a été envoyé");
                getCommunitiesByBranch(this.props.authUser.user.branch.id, this.props.authUser.user.id).then(data => {
                    this.setState({ communities: data });
                }).finally(() => this.setState({ loading: false }))
                this.props.getInvitationsPending(this.props.authUser.user.id);
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    onJoinClick = (group) => {
        getCommunityAdmins(group.id).then(data => {
            this.props.statusCommunitySpaceStatus(true);
            this.props.setCommunitySpaceAdmins(data);
            this.props.setCommunitySpaceData(group.id);
            this.props.history.push(COMMUNITY.MEMBERS.LIST);
        })
    }


    render() {

        const { communities, loading } = this.state;

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
                                    <div className="row" style={{ paddingBottom: 50 }}>
                                        {list.map((community, key) => (
                                            <div className="col-sm-6 col-md-4 col-lg-3" key={key}>
                                                <GroupItem2 group={community} isMember={community.status}/>
                                            </div>
                                        ))}
                                    </div>
                                )}
                        </>
                    )}
                />
                
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

export default connect(mapStateToProps, { getInvitationsPending, setRequestGlobalAction, setCommunitySpaceAdmins, statusCommunitySpaceStatus, setCommunitySpaceData })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(AllGroups))));

import React, { Component } from 'react';
import {connect} from "react-redux";
import IntlMessages from 'Util/IntlMessages';
import {sendRequestInvitation, acceptInvitation, getUserCommunitiesNotIn, setRequestGlobalAction} from "Actions";
import {injectIntl} from "react-intl";
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {AbilityContext} from "Permissions/Can";
import Permission from "Enums/Permissions";
import CustomList from "Components/CustomList";
import Button from "@material-ui/core/Button";
import {NotificationManager} from "react-notifications";
import {ERROR_500} from "Constants/errors";
import {getInvitationsPending} from "Actions/GeneralActions";

class AllGroups extends Component {
    static contextType = AbilityContext;

    componentDidMount() {
        this.props.getUserCommunitiesNotIn();
    }

    onEnterClick = (group) => {
        this.props.setRequestGlobalAction(true);
        sendRequestInvitation(group.id)
            .then(() => {
                NotificationManager.success("Votre demande pour le groupe " + this.props.invitation.group.label + " a été envoyé");
                this.props.getInvitationsPending();
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    render() {
        const { userCommunitiesNotIn, loading, error } = this.props;

        if (!loading && userCommunitiesNotIn && userCommunitiesNotIn.length === 0) {
            return (
                <h3 className="center-hor-ver h-20">Aucun groupes disponible pour le moment</h3>
            );
        }

        return (
            <>
                <CustomList
                    error={error}
                    loading={loading}
                    list={userCommunitiesNotIn}
                    itemsFoundText={n => `${n} Groupe(s) trouvé(s)`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun groupes trouvés
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th><IntlMessages id="components.name" /></th>
                                                <th><IntlMessages id="widgets.description" /></th>
                                                <th/>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {list && list.map((group, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-left media-middle mr-15">
                                                            {/*<img src={group.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                        </div>
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{group.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{group.description}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="table-action">
                                                    <Button
                                                        // type="submit"
                                                        size="small"
                                                        color="primary"
                                                        disabled={loading}
                                                        variant="contained"
                                                        className={"text-white font-weight-bold mr-3 bg-blue"}
                                                        onClick={() => this.onEnterClick(group)}
                                                    >
                                                        Integrer
                                                        <i className="zmdi zmdi-arrow-right mr-2"/>
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
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, userCommunitiesNotIn, authUser  }) => {
    return { requestGlobalLoader, authUser: authUser.data, loading: userCommunitiesNotIn.loading, userCommunitiesNotIn: userCommunitiesNotIn.data, error: userCommunitiesNotIn.error }
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

export default connect(mapStateToProps, {getInvitationsPending, getUserCommunitiesNotIn, setRequestGlobalAction})
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(AllGroups))));

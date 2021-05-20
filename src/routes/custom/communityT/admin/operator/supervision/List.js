import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { COMMUNITY_ADMIN, joinUrlWithParamsId } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import {
    setRequestGlobalAction,
    getOperatorPendingCommunities,
    getOperatorCurrentCommunities,
    cancelInvitation,
    deleteInvitation,
    acceptOperatorInvitation
} from "Actions";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import Button from '@material-ui/core/Button';
import SweetAlert from "react-bootstrap-sweetalert";
import InvitationType from "Enums/InvitationType";
import {NotificationManager} from "react-notifications";
import {ERROR_500} from "Constants/errors";

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = COMMUNITY_ADMIN.POST;

    state = {
        posts: [],
        communities: [],
        showWarningBox: false,
        gotoCommunities: false,
        gotoInvitations: true,
    };

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getCommunities();
        this.getOperatorCommunities();
    }

    getCommunities = () => {
        setRequestGlobalAction(true)
        getOperatorPendingCommunities().then(data => {
            this.setState({ posts: data })
        }).finally(() => {
            setRequestGlobalAction(false)
        })
    };

    getOperatorCommunities = () => {
        setRequestGlobalAction(true)
        getOperatorCurrentCommunities().then(data => {
            this.setState({ communities: data })
        }).finally(() => {
            setRequestGlobalAction(false)
        })
    };

    handleActiveConfirmed = (id) => {
        this.setState({showWarningBox: false});
        const confirmationStatus = false;
        this.props.setRequestGlobalAction(false);
        acceptOperatorInvitation(id, confirmationStatus)
            .then(() => {
                NotificationManager.success("Votre sollicitation a été refusée avec succès ");
                this.getCommunities();
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    onAccept = (id) => {
        const confirmationStatus = true;
        this.props.setRequestGlobalAction(true);
        acceptOperatorInvitation(id, confirmationStatus)
            .then(() => {
                NotificationManager.success("Vous êtes maintenant opérateur du groupe ");
                this.getCommunities();
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    onCancel = () => {
        this.setState({showWarningBox: true});
    };

    goToCommunities = () => {
        this.setState({ gotoCommunities: true});
        this.setState({ gotoInvitations: false});
    };

    goToInvitations = () => {
        this.setState({ gotoCommunities: false});
        this.setState({ gotoInvitations: true});
    };



    render() {
        const { history } = this.props;
        const { communities, posts , gotoInvitations, gotoCommunities} = this.state;

        return (
            <>
            { gotoInvitations ? (
                <div className="page-list mt-70 pt-20">
                <PageTitleBar title={"Communautés Impétrantes"} enableBreadCrumb={true} match={this.props.match} history={history} />
                <CustomList
                    list={posts}
                    loading={false}
                    itemsFoundText={n => `${n} communauté(s) trouvée(s)`}
                    // onAddClick={() => history.push(this.baseUrl.CREATE)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div>
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                        <tr>
                                            <th>Nom de la communauté</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucunes Communautés Impétrantes trouvées
                                        </h4>
                                    </div>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                        <tr>
                                            <th>Nom de la communauté</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {list && list.map((item, key) => (
                                            <tr
                                                key={key}
                                                className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.group.name}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <Button
                                                                color="primary"
                                                                disabled={item.native}
                                                                variant="contained"
                                                                className="text-white font-weight-bold bg-blue"
                                                                style={{ marginRight: 10 }}
                                                                onClick={() => this.onAccept(item.id)}
                                                            >
                                                                Accepter
                                                            </Button>
                                                            <Button
                                                                color="danger"
                                                                disabled={item.native}
                                                                variant="contained"
                                                                className="text-white font-weight-bold bg-blue"
                                                                style={{ marginRight: 10 }}
                                                                onClick={() => this.onCancel()}
                                                            >
                                                                Refuser
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <SweetAlert
                                                        type="danger"
                                                        showCancel
                                                        showConfirm
                                                        show={this.state.showWarningBox}
                                                        title={"Confirmation"}
                                                        customButtons={(
                                                            <>
                                                                <Button
                                                                    color="blue"
                                                                    disabled={this.props.requestGlobalLoader}
                                                                    variant="outlined"
                                                                    onClick={() => this.setState({showWarningBox: false})}
                                                                    className="text-white bg-blue font-weight-bold mr-3"
                                                                >
                                                                    Non je ne veux pas
                                                                </Button>
                                                                <Button
                                                                    color="primary"
                                                                    disabled={this.props.requestGlobalLoader}
                                                                    variant="contained"
                                                                    className="text-white font-weight-bold"
                                                                    onClick={() => this.handleActiveConfirmed(item.id)}
                                                                >
                                                                    Oui je veux
                                                                </Button>
                                                            </>
                                                        )}
                                                    >
                                                        "Voulez vous vraiment refusé cette sollicitation ?"
                                                    </SweetAlert>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            <Button
                                color="primary"
                                disabled={this.props.requestGlobalLoader}
                                variant="contained"
                                className="text-white font-weight-bold"
                                onClick={() => this.goToCommunities()}
                            >
                                Voir les communautés
                                <i className="zmdi zmdi-arrow-right"></i>
                            </Button>
                        </>
                    )}
                />
            </div>) : ( gotoCommunities ?
                <div className="page-list mt-70 pt-20">
                    <PageTitleBar title={"Communautés"} enableBreadCrumb={true} match={this.props.match} history={history} />
                    <CustomList
                        list={communities}
                        loading={false}
                        itemsFoundText={n => `${n} communauté(s) trouvée(s)`}
                        // onAddClick={() => history.push(this.baseUrl.CREATE)}
                        renderItem={list => (
                            <>
                                {list && list.length === 0 ? (
                                    <div>
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                            <tr>
                                                <th>Nom de la communauté</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucunes Communautés Impétrantes trouvées
                                            </h4>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                            <tr>
                                                <th>Nom de la communauté</th>
                                                <th>Type</th>
                                                <th>Description</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {list && list.map((item, key) => (
                                                <tr
                                                    key={key}
                                                    className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.name}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.typeGroup.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.description}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <Button
                                    color="primary"
                                    disabled={this.props.requestGlobalLoader}
                                    variant="contained"
                                    className="text-white font-weight-bold"
                                    onClick={() => this.goToInvitations()}
                                >
                                    <i className="zmdi zmdi-arrow-left"></i>
                                    Voir les sollicitations
                                </Button>
                            </>
                        )}
                    />
                </div> : null
            )}
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        communitySpace: communitySpace
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(List)));

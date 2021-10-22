import Status from "Enums/Status";
import { connect } from "react-redux";
import Tab from '@material-ui/core/Tab';
import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import { RctCard } from 'Components/RctCard';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import SweetAlert from "react-bootstrap-sweetalert";
import { COMMUNITY, joinUrlWithParamsId } from "Url/frontendUrl";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {
    setRequestGlobalAction, acceptOperatorInvitation, getOperatorCurrentCommunities,
    getOperatorPendingCommunities
} from "Actions";

class Supervision extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            posts: [],
            communities: [],
            showWarningBox: false,
            invitations: false,
        }
    }

    handleChange = (event, value) => {
        const oldActivateTab = this.state.activeTab;
        this.setState({ activeTab: value });
        if (oldActivateTab !== value) {
            switch (value) {
                case 0: return this.setState({ invitations: false });
                case 1: return this.setState({ invitations: true });
                default: return this.setState({ invitations: false });
            }
        }
    };

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
        this.setState({ showWarningBox: false });
        const confirmationStatus = false;
        this.props.setRequestGlobalAction(false);
        acceptOperatorInvitation(id, confirmationStatus)
            .then(() => {
                NotificationManager.success("Votre sollicitation a été refusée avec succès ");
                this.getOperatorCommunities();
            })
            .catch(() => null)
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    onAccept = (id) => {
        const confirmationStatus = true;
        this.props.setRequestGlobalAction(true);
        acceptOperatorInvitation(id, confirmationStatus)
            .then(() => {
                NotificationManager.success("Vous êtes maintenant opérateur du groupe ");
                window.location.reload();
            })
            .catch(() => null)
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    onCancel = () => {
        this.setState({ showWarningBox: true });
    };

    enterInCommunitySpace = (id) => {
        window.location = joinUrlWithParamsId(COMMUNITY.MEMBERS.LIST, id);
    };

    render() {
        const { history } = this.props;
        const { communities, activeTab, invitations } = this.state;

        return (
            <div className="userProfile-wrapper overflow-hidden">
                <PageTitleBar title={"Mes communautés"} enableBreadCrumb={false} />
                <RctCard>
                    <div className="rct-tabs">
                        <AppBar position="static">
                            <div className="d-flex align-items-center">
                                <div className="w-100">
                                    <Tabs
                                        value={activeTab}
                                        onChange={this.handleChange}
                                        scrollButtons="off"
                                        indicatorColor="primary"
                                        centered
                                    >
                                        <Tab
                                            icon={<i className="zmdi zmdi-group-work" />}
                                            label={"Mes communautés"}
                                        />
                                        <Tab
                                            icon={<i className="ti-world"></i>}
                                            label={"Demande de supervisions"}
                                        />
                                    </Tabs>
                                </div>
                            </div>
                        </AppBar>
                    </div>
                    <>
                        {!invitations ?
                            <div className="page-list">
                                <CustomList
                                    list={communities}
                                    loading={false}
                                    itemsFoundText={n => `${n} communauté(s) trouvée(s)`}
                                    renderItem={list => (

                                        <div className="table-responsive">
                                            <table className="table table-hover table-middle mb-0 text-center">
                                                <thead>
                                                    <tr>
                                                        <th>Nom de la communauté</th>
                                                        <th>Type de la communauté</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                {list && list.filter(p => p.status === Status.ACCEPTED).length === 0 ?
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan={3}>
                                                                <div className="d-flex justify-content-center align-items-center py-50">
                                                                    <h4>
                                                                        Aucunes Communautés trouvées
                                                                    </h4>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    :
                                                    <tbody>
                                                        {list && list.filter(p => p.status === Status.ACCEPTED).map((item, key) => (
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
                                                                            <h4 className="m-0 fw-bold text-dark">{item.group.typeGroup.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Button
                                                                        color="primary"
                                                                        disabled={item.native}
                                                                        variant="contained"
                                                                        className="text-white font-weight-bold"
                                                                        style={{ marginRight: 10 }}
                                                                        onClick={() => this.enterInCommunitySpace(item.group.id)}
                                                                    >
                                                                        Rejoindre
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                }
                                            </table>
                                        </div>
                                    )}
                                />
                            </div>
                            :
                            <div className="page-list">
                                <CustomList
                                    list={communities}
                                    loading={false}
                                    itemsFoundText={n => `${n} communauté(s) trouvée(s)`}
                                    renderItem={list => (
                                        <div className="table-responsive">
                                            <table className="table table-hover table-middle mb-0 text-center">
                                                <thead>
                                                    <tr>
                                                        <th>Nom de la communauté</th>
                                                        <th>Type de la communauté</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                {list && list.filter(p => p.status === Status.PENDING).length === 0 ?
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan={3}>
                                                                <div className="d-flex justify-content-center align-items-center py-50">
                                                                    <h4>
                                                                        Aucunes Communautés trouvées
                                                                    </h4>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    :

                                                    <tbody>
                                                        {list && list.filter(p => p.status === Status.PENDING).map((item, key) => (
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
                                                                            <h4 className="m-0 fw-bold text-dark">{item.group.typeGroup.label}</h4>
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
                                                                                    onClick={() => this.setState({ showWarningBox: false })}
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
                                                }
                                            </table>
                                        </div>
                                    )}
                                />
                            </div>
                        }
                    </>
                </RctCard>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, currentCommunity, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data, currentCommunity: currentCommunity }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Supervision));

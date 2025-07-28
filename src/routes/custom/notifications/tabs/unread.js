import { connect } from "react-redux";
import React, { Component } from 'react';
import BankService from "Services/banks";
import ProductService from "Services/products";
import { setRequestGlobalAction } from "Actions";
import ConfirmBox from "Components/dialog/ConfirmBox";
import NotificationType from "Enums/NotificationType";
import { List as ListMaterial } from '@material-ui/core';
import SingleTitleText from "Components/SingleTitleText";
import NotificationService from "Services/notifications";
import AccountAgreement from "Components/AccountAgreement";
import Item from "Routes/custom/notifications/components/Item";
import ActivationBox from "Routes/custom/notifications/ActivationBox";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import InitDealModal from "Routes/custom/fundings/components/InitDealModal";
import CodevInvitationBox from "Routes/custom/notifications/CodevInvitationBox";
import ConfirmMembershipBox from "Routes/custom/notifications/ConfirmMembershipBox";

class Unread extends Component {

    action = null;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            notifications: [],
            notification: null,
            showInitDealBox: false,
            injectionResponse: false,
            showActivationBox: false,
            showActivationPassBox: false,
            showCodevInvitationBox: false,
            showConfirmInjectionBox: false,
            showConfirmMembershipBox: false,
            showAccountActivationBox: false,
            showConfirmCodevInvitationBox: false
        }
    }

    componentDidMount() {
        const actionParam = new URLSearchParams(this.props.location.search).get("action");
        if(actionParam) {
            this.action = actionParam;
        }
        this.getNotifications();
    }

    getNotifications = () => {
        NotificationService.getNotifications(NotificationType.UNREAD, false)
        .then(notifications => {
            this.setState({ notifications });
            const activationNotification = notifications.find(n => n.type === 'ACTIVATION');
            if(activationNotification && this.action === 'activate') {
                this.onActivationClick(activationNotification);
            }
        }).finally(() => {
           this.setState({ loading: false })
        });
     }

    responseToInvitationRequest = (status) => {
        let referralCode = this.state.notification.details.find(nd => nd.type === "CODEV_MEMBER_TO_INVITE")?.value;
        let lineReference = this.state.notification.details.find(nd => nd.type === "CODEV_LINE_REF")?.value;
        ProductService.responseToInviteCodevSubscriber({
            status,
            referral_code: referralCode,
            line_reference: lineReference,
            notification_id: this.state.notification.id
        })
        .finally(() => {
           this.setState({ loading: false, showConfirmCodevInvitationBox: false, notification: null });
        });
     }

     responseToInjectionRequest = () => {
        let injectionReference = this.state.notification.details.find(nd => nd.type === "INJECTION_REFERENCE")?.value;
        BankService.approveInjection(injectionReference, {
            approved: this.state.injectionResponse, notification_id: this.state.notification.id
        })
        .finally(() => {
           this.setState({ loading: false, showConfirmInjectionBox: false, notification: null, injectionResponse: false });
           this.getNotifications();
        });
     }

    onActivationClick = (notification) => {
        this.setState({ showActivationBox: true, notification })
    };

    onActivationPassClick = (notification) => {
        this.setState({ showActivationPassBox: true, notification })
    };

    onApproveInjection = (notification, status) => {
        this.setState({ showConfirmInjectionBox: true, notification, injectionResponse: status })
    };

    onFundingActivationClick = (notification) => {
        this.setState({ showAccountActivationBox: true, notification })
    };    
    
    onInitDealClick = (notification) => {
        this.setState({ showInitDealBox: true, notification })
    };

    onCodevInvitationClick = (notification) => {
        this.setState({ showCodevInvitationBox: true, notification });
    };

    onCodevInvitationRequestClick = (notification) => {
        this.setState({ showConfirmCodevInvitationBox: true, notification });
    };

    onMembershipConfirmClick = (notification) => {
        this.setState({ showConfirmMembershipBox: true, notification });
    };

    render() {
        const { notifications, loading, showActivationBox, notification, showInitDealBox, showConfirmMembershipBox,
            showCodevInvitationBox, showConfirmCodevInvitationBox, showAccountActivationBox, showConfirmInjectionBox } = this.state;

        if (loading) {
            return (<RctSectionLoader />);
        }

        return (
            <div>
                <div>
                    <div className="d-flex justify-content-between py-20 px-10 border-bottom">
                        <div>
                            <a href="#" onClick={() => this.getNotifications()} className="btn-outline-default mr-10"><i className="ti-reload"></i></a>
                        </div>
                    </div>
                    <>
                        {notifications.length === 0 ? (
                            <SingleTitleText
                                text="Pas de nouvelle notifications"
                            />
                        ) : (
                                <ListMaterial className="list-group aqua-ripple p-0">
                                    {notifications && notifications.map((notification, index) => (
                                        <Item
                                            key={index}
                                            tab="UNREAD"
                                            notification={notification}
                                            authUser={this.props.authUser}
                                            reloadNotifications={this.getNotifications}
                                            onInitDealClick={() => this.onInitDealClick(notification)}
                                            setRequestGlobalAction={this.props.setRequestGlobalAction}
                                            onActivationClick={() => this.onActivationClick(notification)}
                                            onActivationPassClick={() => this.onActivationPassClick(notification)}
                                            onCodevInvitationClick={() => this.onCodevInvitationClick(notification)}
                                            onFundingActivationClick={() => this.onFundingActivationClick(notification)}
                                            onApproveInjection={(status) => this.onApproveInjection(notification, status)}
                                            onMembershipConfirmClick={() => this.onMembershipConfirmClick(notification)}
                                            onCodevInvitationRequestClick={() => this.onCodevInvitationRequestClick(notification)}
                                        />
                                    ))}
                                </ListMaterial>
                            )}
                    </>
                </div>
                {!this.props.authUser.active && (
                    <ActivationBox
                        show={showActivationBox}
                        notification={notification}
                        pdfURL={'http://www.africau.edu/images/default/sample.pdf'}
                        onClose={() => this.setState({ showActivationBox: false })}
                    />
                )}

                {notification && showCodevInvitationBox && (
                    <CodevInvitationBox
                        notification={notification}
                        show={showCodevInvitationBox}
                        onClose={() => this.setState({ showCodevInvitationBox: false })}
                    />
                )}

                {notification && showConfirmMembershipBox && (
                    <ConfirmMembershipBox
                        notification={notification}
                        show={showConfirmMembershipBox}
                        onClose={() => this.setState({ showConfirmMembershipBox: false, notification: null })}
                    />
                )}

                {notification && showAccountActivationBox && (
                    <AccountAgreement 
                        isUserValidating={true}
                        show={showAccountActivationBox}
                        notification_id={notification.id}
                        title={'Convention de compte'}
                        onClose={() => {
                            this.setState({ showAccountActivationBox: false, notification: null })
                        }}
                        accountReference={notification.details.find(nd => nd.type === "ACCOUNT_REFERENCE")?.value}
                    />
                )}

                {notification && showInitDealBox && (
                    <InitDealModal 
                        show={showInitDealBox}
                        onClose={() => {
                            this.setState({ showInitDealBox: false, notification: null })
                        }}
                        notification={notification?.id}
                        reference={notification.details.find(nd => nd.type === "GRANT_OFFER_REFERENCE")?.value}
                    />
                )}

                <ConfirmBox
                    show={showConfirmCodevInvitationBox}
                    rightButtonOnClick={() => {
                        this.responseToInvitationRequest(true);
                    }}
                    leftButtonOnClick={() => {
                        this.responseToInvitationRequest(false);
                    }}
                    message={"Souhaitez-vous approuver la demande d'invitation?"}
                />

                <ConfirmBox
                    show={showConfirmInjectionBox}
                    rightButtonOnClick={() => {
                        this.responseToInjectionRequest();
                    }}
                    leftButtonOnClick={() => {
                        this.setState({ loading: false, showConfirmInjectionBox: false, notification: null, injectionResponse: false });
                    }}
                    message={"Voulez vous continuer ?"}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ authUser, requestGlobalAction }) => {
    return {
        authUser: authUser.data,
        requestGlobalAction
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(Unread);

import { connect } from "react-redux";
import React, { Component } from 'react';
import AccountService from "Services/accounts";
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

class Unread extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            notifications: [],
            notification: null,
            showInitDealBox: false,
            showActivationBox: false,
            showActivationPassBox: false,
            showCodevInvitationBox: false,
            showAccountActivationBox: false,
            showConfirmCodevInvitationBox: false
        }
    }

    componentDidMount() {
        this.getNotifications();
    }

    getNotifications = () => {
        NotificationService.getNotifications(NotificationType.UNREAD, false)
        .then(notifications => this.setState({notifications}))
        .finally(() => {
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

    onActivationClick = (notification) => {
        this.setState({ showActivationBox: true, notification })
    };

    onActivationPassClick = (notification) => {
        this.setState({ showActivationPassBox: true, notification })
    };

    onFundingActivationClick = (notification) => {
        let accountId = notification.details.find(nd => nd.type === "ACCOUNT_ID")?.value;
        let orderId = notification.details.find(nd => nd.type === "ORDER_ID")?.value;
        let notificationId = notification.id;
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

    render() {
        const { notifications, loading, showActivationBox, notification, showInitDealBox,
            showCodevInvitationBox, showConfirmCodevInvitationBox, showAccountActivationBox } = this.state;

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

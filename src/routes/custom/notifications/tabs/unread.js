import Status from "Enums/Status";
import { connect } from "react-redux";
import React, { Component } from 'react';
import { setRequestGlobalAction } from "Actions";
import NotificationType from "Enums/NotificationType";
import { List as ListMaterial } from '@material-ui/core';
import SingleTitleText from "Components/SingleTitleText";
import NotificationService from "Services/notifications";
import Item from "Routes/custom/notifications/components/Item";
import ActivationBox from "Routes/custom/notifications/ActivationBox";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";

class Unread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            notifications: [],
            notification: null,
            showActivationBox: false,
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

    onActivationClick = (notification) => {
        this.setState({ showActivationBox: true, notification })
    };

    render() {
        const { notifications, loading, showActivationBox, notification } = this.state;

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
                                            notification={notification}
                                            authUser={this.props.authUser}
                                            reloadNotifications={this.getNotifications}
                                            setRequestGlobalAction={this.props.setRequestGlobalAction}
                                            onActivationClick={() => this.onActivationClick(notification)}
                                        />
                                    ))}
                                </ListMaterial>
                            )}
                    </>
                </div>
                {this.props.authUser.status === Status.PENDING && (
                    <ActivationBox
                        show={showActivationBox}
                        notification={notification}
                        pdfUrl={'http://www.africau.edu/images/default/sample.pdf'}
                        onClose={() => this.setState({ showActivationBox: false })}
                    />
                )}
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

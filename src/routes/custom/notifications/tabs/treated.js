import { connect } from "react-redux";
import React, { Component } from 'react';
import { setRequestGlobalAction } from "Actions";
import NotificationType from "Enums/NotificationType";
import { List as ListMaterial } from '@material-ui/core';
import SingleTitleText from "Components/SingleTitleText";
import NotificationService from "Services/notifications";
import Item from "Routes/custom/notifications/components/Item";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";

class Read extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            notifications: [],
            showActivationBox: false,
        }
    }

    componentDidMount() {
        this.getNotifications();
    }

    getNotifications = () => {
        NotificationService.getNotifications(NotificationType.READ, true)
        .then(notifications => this.setState({notifications}))
        .finally(() => {
           this.setState({ loading: false })
        });
     }

    render() {
        const { notifications, loading } = this.state;

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
                                            tab="TREATED"
                                        />
                                    ))}
                                </ListMaterial>
                            )}
                    </>
                </div>
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

export default connect(mapStateToProps, { setRequestGlobalAction })(Read);
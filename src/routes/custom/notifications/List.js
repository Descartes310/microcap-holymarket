import {connect} from "react-redux";
import React, {Component} from 'react';
import {getAllNotifications} from "Actions";
import {Scrollbars} from "react-custom-scrollbars";
import Item from "Routes/custom/notifications/Item";
import {List as ListMaterial} from '@material-ui/core';
import SingleTitleText from "Components/SingleTitleText";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import FetchFailedComponent from "Components/FetchFailedComponent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import ActivationBox from "Routes/custom/notifications/ActivationBox";
import Status from "Enums/Status";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: {
                data: null,
                loading: true,
            },
            showActivationBox: false,
            selectedNotifications: [],
        }
    }

    componentDidMount() {
        this.props.getAllNotifications(this.props.authUser.user.id);
    }

    onActivationClick = (notificationId) => {
        this.setState({showActivationBox: true})
    };

    render() {
        const { data: notifications, loading } = this.props.notifications;

        if (loading) {
            return (<RctSectionLoader />);
        }

        if (!notifications) {
            return (<FetchFailedComponent />)
        }

        return (
            <>
                <PageTitleBar
                    title={"Notifications"}
                />
                <RctCollapsibleCard fullBlock customClasses={'full-height'}>
                    <div className="table-responsive">
                        <div className="d-flex justify-content-between py-20 px-10 border-bottom">
                            <div>
                                <a href="#" onClick={(e) => this.onReload(e)} className="btn-outline-default mr-10"><i className="ti-reload"></i></a>
                                {/*<a href="#" onClick={e => e.preventDefault()} className="btn-outline-default mr-10">More</a>*/}
                            </div>
                        </div>
                        <>
                            {notifications.length === 0 ? (
                                <SingleTitleText
                                    text="Pas de nouvelle notifications pour le moment"
                                />
                            ) : (
                                <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={424} autoHide>
                                    <ListMaterial className="list-group aqua-ripple p-0">
                                        {notifications && notifications.map((notification, index) => (
                                            <Item
                                                key={index}
                                                notification={notification}
                                                authUser={this.props.authUser}
                                                onActivationClick={() => this.onActivationClick(notification.id)}
                                            />
                                        ))}
                                    </ListMaterial>
                                </Scrollbars>
                            )}
                        </>
                    </div>
                </RctCollapsibleCard>
                {this.props.authUser.user.status === Status.PENDING && (
                    <ActivationBox
                        show={this.state.showActivationBox}
                        onClose={() => this.setState({showActivationBox: false})}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = ({ notifications, notifications2, authUser }) => {
    return {
        notifications,
        notifications2,
        authUser: authUser.data
    }
};

export default connect(mapStateToProps, {getAllNotifications})(List);

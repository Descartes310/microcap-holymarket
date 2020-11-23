import React, {Component} from 'react';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import {getAllNotifications2} from "Actions";
import {connect} from "react-redux";
import FetchFailedComponent from "Components/FetchFailedComponent";
import SingleTitleText from "Components/SingleTitleText";
import {Scrollbars} from "react-custom-scrollbars";
import Item from "Routes/custom/notifications/Item";
import Notification from "Models/Notification";
import {List as ListMaterial} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: {
                data: null,
                loading: true,
            },
            selectedNotifications: [],
        }

    }

    componentDidMount() {
        getAllNotifications2(this.props.authUser.user.id)
            .then(result => {
                this.setState(prevState => ({
                    notifications: {data: result.map(n => new Notification(n)), loading: false}
                }))
            })
            .catch(() => {
                this.setState(prevState => ({
                    notifications: {data: null, loading: false}
                }));
            })
        // this.props.getAllNotifications2(this.props.authUser.user.id)
        //     .catch(error => console.log("eeere => ", error))
    }

    render() {
        console.log('this.props.notifications => ', this.props);
        console.log('this.props.notifications2 => ', this.props.authUser);

        // const { notifications } = this.props;
        const { selectedNotifications, notifications } = this.state;
        const { data, loading } = notifications;

        if (notifications.loading) {
            return (<RctSectionLoader />);
        }

        if (!notifications.data) {
            return (<FetchFailedComponent />)
        }

        // return (<p>dqdsq</p>)

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
                                {/*{notifications.data && notifications.data.map((notification, index) => (
                                    <Item
                                        key={index}
                                        notification={notification}
                                    />
                                ))}*/}
                            </div>
                        </div>
                        <>
                            {notifications.data.length === 0 ? (
                                <SingleTitleText
                                    text="Pas de nouvelle notifications pour le moment"
                                />
                            ) : (
                                <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={424} autoHide>
                                    <ListMaterial className="list-group aqua-ripple p-0">
                                        {notifications.data && notifications.data.map((notification, index) => (
                                            <Item
                                                key={index}
                                                notification={notification}
                                            />
                                        ))}
                                    </ListMaterial>
                                </Scrollbars>
                            )}
                        </>
                    </div>
                </RctCollapsibleCard>
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

export default connect(mapStateToProps, {getAllNotifications2})(List);

import React, {Component} from 'react';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import {getAllNotifications} from "Actions";
import {connect} from "react-redux";
import FetchFailedComponent from "Components/FetchFailedComponent";
import SingleTitleText from "Components/SingleTitleText";
import {Scrollbars} from "react-custom-scrollbars";
import Item from "Routes/custom/notifications/Item";
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
        this.props.getAllNotifications(this.props.authUser.user.id);
    }

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

export default connect(mapStateToProps, {getAllNotifications})(List);

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Fab} from "@material-ui/core";
import {Scrollbars} from "react-custom-scrollbars";

class Item extends Component {
    render() {
        const { notification } = this.props;
        return (
            <ListItem className="d-flex px-20 py-3 align-items-start" button>
                <div className="avatar-wrap mr-15">
                    <span className={`badge badge-xs badge-success mr-10 mt-10 position-relative`}>&nbsp;</span>
                    {/*<img src={comment.userAvatar} alt="project logo" className="rounded-circle" width="40" height="40" />*/}
                </div>
                <div className="comment-wrap">
                    <h5 className="mb-0">{notification.title}</h5>
                    <p className="mb-0 font-xs">{notification.message}</p>
                </div>
                <div className="comment-action w-20 text-right">
                    <span className="font-xs text-muted font-weight-light d-block comment-date">{notification.createdAt.fromNow()}</span>
                    <div className="d-flex align-items-center">
                        <Fab variant="round" size="small" color="primary" className="btn-sm mx-1 bg-primary text-white">
                            <i className="zmdi zmdi-check"/>
                        </Fab>
                        <Fab variant="round" size="small" className="bg-blue text-white btn-sm mx-1">
                            <i className="zmdi zmdi-menu"/>
                        </Fab>
                    </div>
                </div>
            </ListItem>
        );
    }
}

Item.propTypes = {};

export default Item;

/**
 * Email List Item
 */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

// helpers functions
import { textTruncate } from 'Helpers/helpers';
import UserAvatar from "Components/UserAvatar";

const ListItem = ({ user, onSelectEmail, handleMarkAsStar, onReadEmail, getTaskLabelNames }) => {
    return (
        <li className="d-flex justify-content-between align-items-center list-item" onClick={onReadEmail}>
            <div className="d-flex align-items-center w-100">
                <div className="emails media w-100">
                    <div className="avatar-wrap w-10 align-self-center d-sm-r-none">
                        <UserAvatar
                            user={user}
                        />
                    </div>
                    <div className="media-body d-flex align-items-center w-90">
                        <div className="d-inline-block w-25">
                            <h5 className="mb-1">{user.userName }</h5>
                            <span className="font-xs d-inline-block">{textTruncate(user.user.login, 30)}</span>
                        </div>
                        <p className="font-xs text-muted w-75 d-inline-block mb-0 mx-4">{textTruncate(user.corporateName, 120)}</p>
                    </div>
                </div>
            </div>
            <div className="font-xs text-muted w-10 text-right">{user.user.createdAt}</div>
        </li>
    )
};

export default ListItem;

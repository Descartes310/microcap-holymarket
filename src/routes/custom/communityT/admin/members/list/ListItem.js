/**
 * Email List Item
 */
import React from 'react';
import {Button} from "reactstrap";

// helpers functions
import { textTruncate } from 'Helpers/helpers';
import UserAvatar from "Components/UserAvatar";

const ListItem = ({ user, onReadEmail, getClientFolder }) => {
    return (
        <li className="d-flex justify-content-between align-items-center list-item" onClick={onReadEmail}>
            <div className="d-flex align-items-center w-100">
                <div className="emails media w-100">
                    <div className="avatar-wrap w-10 align-self-center d-sm-r-none">
                        <UserAvatar
                            avatar={user.avatar}
                            name={user.name}
                        />
                    </div>
                    <div className="media-body d-flex align-items-center w-90">
                        <div className="d-inline-block w-25">
                            <h5 className="mb-1">{user.name}</h5>
                            <span className="font-xs d-inline-block">{textTruncate(user.email, 30)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="font-xs text-muted w-10" style={{ marginRight: '50px' }}>
                <Button
                    color="primary"
                    className="text-white mr-2"
                    onClick={getClientFolder}
                >
                    Consulter les détails
                </Button>
            </div>
        </li>
    )
};

export default ListItem;

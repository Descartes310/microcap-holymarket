/**
 * Email List Item
 */
import React from 'react';
import {Button} from "reactstrap";

// helpers functions
import { textTruncate } from 'Helpers/helpers';
import UserAvatar from "Components/UserAvatar";
import { getFilePath } from "Helpers/helpers";

const ListItem = ({ user, onGenerate, onViewVoucher, buttonLabel }) => {
    return (
        <li className="d-flex justify-content-between align-items-center list-item">
            <div className="d-flex align-items-center w-100">
                <div className="emails media w-100">
                    <div className="avatar-wrap w-10 align-self-center d-sm-r-none">
                        <UserAvatar
                            avatar={getFilePath(user.avatar)}
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
            <div className="font-xs text-muted" style={{ marginRight: '50px' }}>
                <Button
                    color="primary"
                    className="text-white"
                    onClick={onGenerate}
                >
                    Générer un code de { buttonLabel }
                </Button>
            </div>
            <div className="font-xs text-muted" style={{ marginRight: '50px' }}>
                <Button
                    variant="contained"
                    className={"text-white font-weight-bold mr-3 bg-blue"}
                    onClick={onViewVoucher}
                >
                    Consulter les codes actifs
                </Button>
            </div>
        </li>
    )
};

export default ListItem;

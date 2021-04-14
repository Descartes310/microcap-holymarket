/**
 * Community List Item
 */
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import classnames from 'classnames';

// helpers
import { textTruncate, getFilePath } from 'Helpers/helpers';
import UserAvatar from "Components/UserAvatar";

const GroupItem = ({ community, selectedCommunity, onClickListItem, favourite, admin }) => (
    <ListItem
        onClick={onClickListItem}
        className={classnames('user-list-item',
            { 'item-active': selectedCommunity && selectedCommunity.id === community.id }
        )}
    >
        <div className="d-flex justify-content-between w-100 align-items-center">
            <div className="media align-items-center w-90">
                <div className="media-left position-relative mr-10">
                    <UserAvatar
                        avatar={community.image ? getFilePath(community.image) : require('Assets/img/groups.png')}
                        name={community.label}
                    />
                    {/*<img src={community.photo_url} className="img-fluid rounded-circle" alt="community profile" width="40" height="40" />*/}
                    
                    {/* <span className="badge badge-success badge-xs p-5 rct-notify">&nbsp;</span> */}
                </div>
                <div className="media-body" style={{ width: '100%' }}>
                    <h5 className="mb-0" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", width: "75%", overflow: "hidden" }}>{community.label}</h5>
                    {community.description && (<span className="font-xs d-block" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", width: "75%", overflow: "hidden" }}>{community.description}</span>)}
                </div>
            </div>
            <div className="text-right msg-count d-flex flex-column">
                { favourite ? <i style={{ color: 'red' }} className="zmdi zmdi-star"/> : null }
                { admin ? <i style={{ color: '#ff9800' }} className="ti-crown"/> : null }
                {/*{community.new_message_count !== 0 ?
                    <span className="badge badge-danger rounded-circle">{community.new_message_count}</span>
                    : null
                }*/}
            </div>
        </div>
    </ListItem>
);

export default GroupItem;

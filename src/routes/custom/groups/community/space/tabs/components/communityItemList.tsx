import React from 'react';
import { connect } from 'react-redux';
import { onSelectCommunity } from 'Actions';
import UserAvatar from "Components/UserAvatar";
import ListItem from '@material-ui/core/ListItem';
import { getFilePath, DEFAULT_IMAGE } from 'Helpers/helpers';

const CommunityItemList = ({ community, onSelectCommunity, favourite = false, admin = false, selectedCommunity }) => {
    return (
        <ListItem
            onClick={() => onSelectCommunity(community)}
            className={`user-list-item cursor-pointer`} 
            style={{ backgroundColor: community?.groupId === selectedCommunity?.groupId ? '#80808038' : '#fff'}}
        >
            <div className="d-flex justify-content-between w-100 align-items-center">
                <div className="media align-items-center w-90">
                    <div className="media-left position-relative mr-10">
                        <UserAvatar
                            width={50}
                            height={50}
                            name={community.userName}
                            avatar={community.image ? getFilePath(community.image) : DEFAULT_IMAGE}
                        />
                    </div>
                    <div className="media-body" style={{ width: '100%' }}>
                        <h5 className="mb-0" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", width: "75%", overflow: "hidden", fontSize: '1.1em' }}>{community.userName}</h5>
                    </div>
                </div>
                <div className="text-right msg-count d-flex flex-column">
                    { favourite ? <i style={{ color: 'red' }} className="zmdi zmdi-star"/> : null }
                    { admin ? <i style={{ color: '#ff9800' }} className="ti-crown"/> : null }
                </div>
            </div>
        </ListItem>
    )
};

const mapStateToProps = ({ group }) => {
    return { selectedCommunity: group.community}
}

export default connect(mapStateToProps, {onSelectCommunity})(CommunityItemList);
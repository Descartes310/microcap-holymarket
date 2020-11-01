import React from 'react';
import Avatar from "@material-ui/core/Avatar";

const UserAvatar = ({user}) => {
    return (
        <>
            {(user.user.avatar && user.user.avatar !== '') ?
                <img src={user.user.avatar} alt="mail user" className="rounded-circle mr-15 align-self-center" width="40" height="40" />
                : <Avatar className="mr-15 align-self-center">{user.userName.charAt(0)}</Avatar>
            }
        </>
    );
};

export default UserAvatar;

import React from 'react';
import Avatar from "@material-ui/core/Avatar";

const UserAvatar = ({user = null, avatar = null, name = null, className = '', width = '40', height = '40'}) => {
    let _avatar, _name;
    if (avatar)
        _avatar = avatar;
    else if (user && user.user)
        _avatar = user.user.avatar;

    if (name)
        _name = name;
    else if (user)
        _name = user.userName;
    else _name = 'a';

    return (
        <>
            {(_avatar && _avatar !== '') ?
                <img src={_avatar} alt="mail user" className={"rounded-circle mr-15 align-self-center" + className} width={width} height={height} />
                : <Avatar className={"mr-15 align-self-center" + className}>{_name.charAt(0)}</Avatar>
            }
        </>
    );
};

export default UserAvatar;

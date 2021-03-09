/**
 * User Block
 */
import React, { Component } from 'react';

class UserBlock extends Component {


    render() {
        return (
            <div className="profile-top mb-20">
                <img src={require('Assets/img/profile.jpg')} alt="profile banner" className="img-fluid" width="1920" height="345" />
                <div className="profile-content">
                    <div className="media">
                    <div><img src={this.props.userAvatar ? this.props.userAvatar : require('Assets/avatars/profile.jpg')} alt="user profile" className="rounded-circle mr-30 bordered" width="140" height="140" />
                        <div  onClick={this.props.shouldEdit} style={{border: "solid #464D69 1px", borderRadius: "50px", width: "37px", textAlign: "center", position: "absolute", bottom: "8px", left: "110px", height: "35px", color: "#736969", background: "#ecf0f7", fontSize: "x-large"}}>
                            <i className="ti-pencil"></i>
                            </div>
                        </div>
                        <div className="media-body pt-25">
                            <div className="mb-20">
                                <h2>{this.props.userName}</h2>
                                <p>{this.props.userEmail}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserBlock;

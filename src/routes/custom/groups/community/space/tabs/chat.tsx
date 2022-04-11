import React from 'react';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

const Chat = () => {

    
    return (
        <RctCollapsibleCard>
            <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
                <div className="d-flex justify-content-center align-items-center" >
                    <img src={require("Assets/img/chat.png")} width="50%" />
                </div>
                <div className="content px-20">
                    <div className="d-flex justify-content-start align-items-center mb-5">
                        <h1 className="pr-10 mb-0 mt-20">Messagerie bientôt disponible</h1>
                    </div>
                </div>
            </div>
        </RctCollapsibleCard >
    );
}

export default Chat;
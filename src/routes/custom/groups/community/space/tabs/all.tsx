import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getGroupTypeLabel } from 'Helpers/helpers';
import {NotificationManager} from 'react-notifications';
import { GROUP, joinUrlWithParamsId } from 'Url/frontendUrl';
import CommunityItemGrid from './components/communityItemGrid';
import SendJoinRequestModal from '../../../components/sendJoinRequestModal';

const All = (props) => {

    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);

    useEffect(() => {
        getGroups();
    }, []);

    const getGroups = () => {
        props.setRequestGlobalAction(true),
            GroupService.getCommunityDatas({ belongs: false })
                .then(response => setGroups(response))
                .finally(() => props.setRequestGlobalAction(false))
    }

    const sendRequest = (motivation) => {
        if(!motivation || !group) {
            NotificationManager.error("Veuillez renseigner les informations");
            return;
        }
        props.setRequestGlobalAction(true);
        
        let data = { 
            type: 'REQUEST', 
            postMotivationId: motivation.id, 
            groupReference: group.groupReference, 
            userReference: props.authUser.referralId, 
        };

        GroupService.makeGroupRequest(data)
            .then(() => getGroups())
            .finally(() => {
                setGroup(null);
                setShowRequestModal(false);
                props.setRequestGlobalAction(false);
            })
    }

    return (
        <>
            <CustomList
                loading={false}
                list={groups}
                itemsFoundText={n => `${n} communauté.s trouvée.s`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun communauté.s trouvée.s
                                </h4>
                            </div>
                        ) : (
                            <div className='row'>
                                {list && list.map((item, index) => (
                                    <CommunityItemGrid key={index} community={item}/>
                                ))}
                            </div>
                        )}
                    </>
                )}
            />
            { group && (
                <SendJoinRequestModal
                    group={group}
                    title={'Demander une adhésion'} 
                    show={showRequestModal && group}
                    onClose={() => {
                        setGroup(null);
                        setShowRequestModal(false);
                    }}
                    onSubmit={(motivation) => sendRequest(motivation)}
                />
            )}
        </>
    );
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(All));
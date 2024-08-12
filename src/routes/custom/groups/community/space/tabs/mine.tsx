import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { GROUP, joinUrlWithParamsId } from 'Url/frontendUrl';
import CommunityItemList from './components/communityItemList';
import GroupDetails from 'Routes/custom/groups/details/components/groupDetails';

const Mine = (props) => {

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getGroups();
    }, []);

    const getGroups = () => {
        props.setRequestGlobalAction(true),
        GroupService.getCommunityDatas({ belongs: 'IN'})
        .then(response => setGroups(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <div className='w-100 row'>
            <div className='col-md-4'>
                <CustomList
                    list={groups}
                    loading={false}
                    showSearch={false}
                    addText="Créer une communauté"
                    onAddClick={() => props.history.push(GROUP.COMMUNITY.MANAGEMENT.CREATE)}
                    renderItem={list => (
                        list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun communauté.s trouvée.s
                                </h4>
                            </div>
                        ) : (
                            list && list.map((item, index) => (
                                <CommunityItemList key={index} community={item}/>
                        )))
                    )}
                />
            </div>
            <div className='col-md-8'>
                { props.selectedCommunity && (
                    <GroupDetails id={props.selectedCommunity.groupReference} />
                )}
            </div>
            
        </div>
    );
}

const mapStateToProps = ({ group }) => {
    return { selectedCommunity: group.community}
}

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Mine));
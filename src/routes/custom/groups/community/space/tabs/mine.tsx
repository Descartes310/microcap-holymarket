import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import GroupDetails from './components/groupDetails';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import CommunityItemGrid from './components/communityItemGrid';

const Mine = (props) => {

    const [group, setGroup] = useState(null);
    const [groups, setGroups] = useState([]);
    const [filters, setFilters] = useState([]);
    const [showGroupDetails, setShowGroupDetails] = useState(false);

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
            <div className='col-md-3'>
                <CustomList
                    list={[
                        {label: 'Favoris', icon: 'favorite-outline', type: 'FAVORITE'},
                        {label: 'Projets', icon: 'folder-outline', type: 'PROJECT'},
                        {label: 'Conventionnées', icon: 'shield-security', type: 'CONVENTIONATED_COMMUNITY'},
                        {label: 'Affinités', icon: 'link', type: 'UNCONVENTIONATED_COMMUNITY'},
                        {label: 'Clans', icon: 'accounts-outline', type: 'SUB_COMMUNITY'},
                    ]}
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
                            <>
                                <h1 className='mb-20 mt-10'>Filtres</h1>
                                { list && list.map((item, index) => (
                                    <div key={index} className="d-flex w-100 align-items-center">
                                        <Checkbox
                                            color="primary"
                                            checked={filters.includes(item.type)}
                                            onChange={() => {
                                                if(filters.includes(item.type)) {
                                                    setFilters([...filters.filter(f => f != item.type)])
                                                } else {
                                                    // setFilters([...filters, item.type])
                                                    setFilters([item.type])
                                                }
                                            }}
                                        />
                                        <div className='d-flex align-items-center ml-20'>
                                            <i className={`zmdi ${"zmdi-"+item.icon}`} />
                                            <span className='ml-10'>{item.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                    )}
                />
            </div>
            <div className='col-md-9 d-flex pt-20' style={{ justifyContent: 'space-evenly' }}>
                {groups
                    .filter(g => (filters.includes('FAVORITE') && g.favorite) || (!filters.includes('FAVORITE')))
                    .filter(g => (filters.includes(g.groupType)) || (filters.includes('FAVORITE') || filters.length <= 0))
                    .map((item, index) => (
                    <CommunityItemGrid 
                        key={index}
                        size='col-md-5'
                        showDetailsButton={true}
                        community={item}
                        openDetails={() => {
                            setGroup(item);
                            setShowGroupDetails(true);
                        }}
                    />
                ))}
            </div>

            { group && showGroupDetails && (
                <GroupDetails
                    community={group}
                    title={'Détails de la communauté'} 
                    show={showGroupDetails && group}
                    onClose={() => {
                        setGroup(null);
                        setShowGroupDetails(false);
                    }}
                />
            )}
        </div>
    );
}

const mapStateToProps = ({ group }) => {
    return { selectedCommunity: group.community}
}

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Mine));
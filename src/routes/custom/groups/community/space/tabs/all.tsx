import { connect } from 'react-redux';
import { communityTypes } from 'Data';
import GroupService from 'Services/groups';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import GroupDetails from './components/groupDetails';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {NotificationManager} from 'react-notifications';
import CommunityItemGrid from './components/communityItemGrid';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import SendJoinRequestModal from '../../../components/sendJoinRequestModal';

const All = (props) => {

    const [name, setName] = useState("");
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(null);
    const [userReference, setUserReference] = useState("");
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [groupType, setGroupType] = useState(communityTypes.find(ct => ct.value === new URLSearchParams(props.location.search).get("type")));

    useEffect(() => {
        getGroups();
    }, []);

    const getGroups = () => {
        let datas: any = {belongs: false}
        if(name) datas.name = name;
        if(groupType) datas.type = groupType.value;
        if(userReference) datas.user_reference = userReference;
        props.setRequestGlobalAction(true);
        GroupService.getCommunityDatas(datas)
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
            .then(() => {
                NotificationManager.success("La requête a bien été envoyée");
                getGroups();
            })
            .catch(() => {
                NotificationManager.error("Vous devez être authentifié au préalable");
            })
            .finally(() => {
                setGroup(null);
                setShowRequestModal(false);
                props.setRequestGlobalAction(false);
            })
    }

    return (
        <>
            <div className='d-flex flex-row justify-content-end align-items-center pr-30 mt-50'>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="label">
                        Nom de la communauté
                    </InputLabel>
                    <InputStrap
                        required
                        id="label"
                        type="text"
                        name='label'
                        value={name}
                        className="input-lg"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="has-wrapper ml-10">
                    <InputLabel className="text-left" htmlFor="userReference">
                        Référence d'utilisateur
                    </InputLabel>
                    <InputStrap
                        required
                        type="text"
                        id="userReference"
                        name='userReference'
                        value={userReference}
                        className="input-lg"
                        onChange={(e) => setUserReference(e.target.value)}
                    />
                </FormGroup>
                <div className="col-md-2 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Type de communauté
                    </InputLabel>
                    <Autocomplete
                        value={groupType}
                        options={communityTypes}
                        id="combo-box-demo"
                        onChange={(__, item) => {
                            setGroupType(item);
                        }}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                <FormGroup>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            getGroups();
                        }}
                        className="text-white font-weight-bold"
                    >
                        Rechercher
                    </Button>
                </FormGroup>
            </div>
            <CustomList
                loading={false}
                list={groups}
                showSearch={false}
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
                                    <CommunityItemGrid 
                                        key={index}
                                        community={item}
                                        authUser={props.authUser}
                                        onAskRequest={() => {
                                            setShowRequestModal(true);
                                            setGroup(item);
                                        }}
                                        openDetails={() => {
                                            setGroup(item);
                                            setShowDetailsModal(true);
                                        }}
                                    />
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
            { group && showDetailsModal && (
                <GroupDetails
                    community={group}
                    title={'Détails de la communauté'} 
                    show={showDetailsModal && group}
                    onClose={() => {
                        setGroup(null);
                        setShowDetailsModal(false);
                    }}
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
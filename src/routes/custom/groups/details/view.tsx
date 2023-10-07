import { connect } from 'react-redux';
import { HOME } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import GroupDetails from './components/groupDetails';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const View = (props) => {

    const [group, setGroup] = useState(null);

    useEffect(() => {
        getGroup(props.match.params.id ? props.match.params.id : props.authUser.referralId);
    }, []);

    const getGroup = (reference) => {
        props.setRequestGlobalAction(true),
        GroupService.getGroupDetails(reference)
            .then(response => {
                setGroup(response);
            })
            .catch(err => {
                console.log(err);
                props.history.push(HOME);
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Détails du groupe"}
            />
            <RctCollapsibleCard>
                <GroupDetails id={props.match.params.id ? props.match.params.id : props.authUser.referralId} />
            </RctCollapsibleCard>
        </>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(View));
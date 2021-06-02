import {
    setCommunitySpaceData,
    setCommunitySpaceLoader,
    setCommunitySpaceAdmins,
    statusCommunitySpaceStatus
} from "Actions/CommunityAction";
import {connect} from "react-redux";
import React, {useEffect} from 'react';
import EmptyResult from "Components/EmptyResult";
import {COMMUNITY, COMMUNITY_ADMIN} from "Url/frontendUrl";
import CommunityAdmins from "Routes/custom/communityT/admin";
import {getCommunityAdmins} from "Actions/independentActions";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import CommunityMembersList from "Routes/custom/communityT/members/list";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import CommunityMembersActivities from "Routes/custom/communityT/activities";
import {AsyncCommunityProject} from "Components/AsyncComponent/AsyncComponent";
import CommunityMembersPostsProjects from "Routes/custom/communityT/postsProjects";

const CommunityTIndex = (props) => {
    const {
        match,
        communitySpace,
        setCommunitySpaceData,
        setCommunitySpaceAdmins,
        setCommunitySpaceLoader,
        statusCommunitySpaceStatus,
    } = props;

    useEffect(() => {
        if (!communitySpace.status)
            loadData();
        else setCommunitySpaceLoader(false);
    }, []);

    const loadData = () => {
        setCommunitySpaceLoader(true);
        getCommunityAdmins(match.params.id, {skipError: true})
            .then(data => {
                statusCommunitySpaceStatus(true);
                setCommunitySpaceAdmins(data);
                setCommunitySpaceData(match.params.id);
            })
            .finally(() => setCommunitySpaceLoader(false));
    };

    if (communitySpace.loading) {
        return (<RctSectionLoader />);
    }

    if (!communitySpace.status) {
        return (
            <div className="full-height">
                <EmptyResult message={"La communauté que vous recherchez n'a pas pu être trouvé"} />
            </div>
        )
    }

    return (
        <div className="full-height">
            <Switch>
                <Route path={COMMUNITY_ADMIN.SELF} component={CommunityAdmins} />
                <Route path={COMMUNITY.MEMBERS.LIST} component={CommunityMembersList} />
                <Route path={COMMUNITY.PROJECTS.SELF} component={AsyncCommunityProject} />
                <Route path={COMMUNITY.POST_PROJECT.SELF} component={CommunityMembersPostsProjects} />
                <Route path={COMMUNITY.ACTIVITY.SELF} component={CommunityMembersActivities} />
                <Redirect exact from={`${match.url}/`} to={COMMUNITY.MEMBERS.SELF} />
            </Switch>
        </div>
    )
};

export default connect(({communitySpace}) => ({communitySpace}), {
    setCommunitySpaceData,
    setCommunitySpaceLoader,
    setCommunitySpaceAdmins,
    statusCommunitySpaceStatus,
})(withRouter(CommunityTIndex));

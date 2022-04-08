import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import ProjectDetails from './components/ProjectDetails';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Show = (props) => {

    const [project, setProject] = useState<any>(null);

    useEffect(() => {
        getProject();
    }, []);

    const getProject = () => {
        props.setRequestGlobalAction(true)
        ProjectService.getProjectById(props.match.params.id)
        .then(response => {
            setProject(response)
        })
        .catch((error) => {
            console.log(error);
            setProject(null);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Fiche projet"}
            />
            <RctCollapsibleCard>
                <ProjectDetails project={project} />
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Show));
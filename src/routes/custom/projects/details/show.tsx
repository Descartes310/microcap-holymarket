import { connect } from 'react-redux';
import { PROJECT } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Show = (props) => {

    const [project, setProject] = useState(null);

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
                { project && (
                    <>
                        <h1 className='fw-bold mt-10' style={{ fontSize: '2.5rem' }}>{ project.label } </h1>
                        <div className='mt-70'>
                            <h3 className="fw-500" style={{ fontSize: '1.5rem' }}> Budget estimé</h3>
                            <p style={{ fontSize: '1.2rem', paddingLeft: 20 }}>{project.budget}</p>
                        </div>
                        {
                            project.items.map(item => (
                                item.value === "COMPLEX_VALUE" && item.subValues?.length >= 0 ?
                                <div className='mt-30'>
                                    <h3 className="fw-500" style={{ fontSize: '1.3rem' }}>{item.projectItem.label}</h3>
                                    { item.subValues.map(subValue => (
                                        <>
                                            <h4 className="fw-500" style={{ fontSize: '1.2rem', paddingLeft: 20 }}>{subValue.projectItem.label}</h4>
                                            <p style={{ fontSize: '1.1rem', paddingLeft: 40 }}>
                                                <span dangerouslySetInnerHTML={{__html: subValue.value}}></span>
                                            </p>
                                        </>
                                    ))}
                                </div>
                                :
                                <div className='mt-30'>
                                    <h3 className="fw-500" style={{ fontSize: '1.3rem' }}>{item.projectItem.label}</h3>
                                    <p style={{ fontSize: '1.2rem', paddingLeft: 20 }}>
                                        <span dangerouslySetInnerHTML={{__html: item.value}}></span>
                                    </p>
                                </div>
                            ))
                        }
                    </>
                )}
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Show));
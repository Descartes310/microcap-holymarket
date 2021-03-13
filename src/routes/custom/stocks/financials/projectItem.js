/**
 * Visitor Area Chart Widget
 */
import React from 'react';
import CountUp from 'react-countup';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { Button } from 'reactstrap'
import { withRouter } from "react-router-dom";
import { PROJECTS, joinUrlWithParamsId } from 'Url/frontendUrl';

const ProjectItem = ({ project, history }) => (
    <RctCard>
        <RctCardContent style={{ height: 306 }}>
            <div className="clearfix">
                <div>
                    <h3 className="mb-15 fw-semi-bold" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%", overflow: "hidden" }}>{project.project.title}</h3>
                    <div className="d-flex">
                        <div className="mr-50">
                            <span className="fs-14 d-block">Besoin estimé</span>
                            <CountUp
                                separator=","
                                className="counter-point"
                                start={0}
                                end={120}
                                duration={5}
                                useEasing={true}
                            />
                        </div>
                        <div className="">
                            <span className="fs-14 d-block">Taille de la communauté</span>
                            <CountUp separator="," className="counter-point" start={0} end={project.members} duration={5} useEasing={true} />
                        </div>
                    </div>
                    <p className="mt-20" style={{ textOverflow: "ellipsis", overflow: "hidden", lineHeight: '1.5em', height: '7.5em' }}>
                        { project.project.description }
                    </p>
                    <Button
                        color="primary"
                        className="text-white mr-2"
                        onClick={() => history.push(joinUrlWithParamsId(PROJECTS.FOLDERS.SHOW, project.project.id))}
                    >
                        Consulter les détails
                    </Button>
                </div>
            </div>
        </RctCardContent>
    </RctCard >
);

export default withRouter(ProjectItem);

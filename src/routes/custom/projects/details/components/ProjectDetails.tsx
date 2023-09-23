import React from 'react';
import { getPriceWithCurrency } from 'Helpers/helpers';
import UpdateComplexTable from 'Components/UpdateComplexTable';

const ProjectDetails = (props) => {
    const project = props.project;
    return (
        project && (
            <>
                <h1 className='fw-bold mt-10' style={{ fontSize: '2.5rem' }}>{ project.label } </h1>
                <div className='mt-70'>
                    <h3 className="fw-500" style={{ fontSize: '1.5rem' }}> Budget estimé</h3>
                    <p style={{ fontSize: '1.2rem', paddingLeft: 20 }}>{getPriceWithCurrency(project.budget, project.currency)}</p>
                </div>
                {
                    project.items.filter(i => i.showable).map(item => (
                        item.value === "COMPLEX_VALUE" && item.subValues?.length >= 0 ?
                        <div className='mt-30'>
                            <h3 className="fw-500" style={{ fontSize: '1.3rem' }}>{item.projectItem.label}</h3>
                            { item.subValues.sort((a, b) => (a.id+"").localeCompare(b.id+"")).map(subValue => (
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
                {
                    project.tables.map((table, index) => (
                        <>
                            <h3 className="fw-500" style={{ fontSize: '1.3rem' }}>{table.label}</h3>
                            <UpdateComplexTable key={index}  projectId={project.id} id={table.id} editMode={false} />
                        </>
                    ))
                }
            </>
        )
    );
};

export default ProjectDetails;
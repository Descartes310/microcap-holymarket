import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import { getFilePath } from 'Helpers/helpers';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';

const DEFAULT_BANNER = 'https://www.athero.org.au/fh/wp-content/uploads/default-banner.png';

const GroupDetails = ({ id, setRequestGlobalAction }: any) => {

    const [group, setGroup] = useState(null);
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        getGroup(id);
    }, [id]);

    const getGroup = (reference) => {
        setRequestGlobalAction(true),
        GroupService.getGroupDetails(reference)
            .then(response => {
                setGroup(response);
                let titleDetails = group.details.find(d => d.detailsType === 'TITLE');
                let imageDetails = group.details.find(d => d.detailsType === 'IMAGE');
                let descriptionDetails = group.details.find(d => d.detailsType === 'DESCRIPTION');
                setTitle(titleDetails ? titleDetails.value : null);
                setImage(imageDetails ? imageDetails.value : null);
                setDescription(descriptionDetails ? descriptionDetails.value : null);
            })
            .catch(err => {
                console.log(err);
                //history.push(HOME);
            })
            .finally(() => setRequestGlobalAction(false))
    }

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mb-30">
                <Card>
                    <CardImg top width="100%" className="img-fluid ripple-effect" style={{ maxHeight: 250 }} src={image ? getFilePath(image) : DEFAULT_BANNER} alt={`Bannière du groupe`} />
                    <CardBody>
                        <CardTitle>
                            <h1 className='fw-bold mt-10' style={{ fontSize: '2.5rem' }}> { title ? title : group ? group.label : 'Titre du groupe' } </h1>
                        </CardTitle>
                        <CardBody>
                            <span dangerouslySetInnerHTML={{
                                __html: description
                            }}>
                            </span>
                        </CardBody>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(GroupDetails);
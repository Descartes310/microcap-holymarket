import { connect } from 'react-redux';
import { HOME } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import { getFilePath } from 'Helpers/helpers';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import {
	Card,
	CardImg,
	CardBody,
	CardTitle
} from 'reactstrap';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const DEFAULT_BANNER = 'https://www.athero.org.au/fh/wp-content/uploads/default-banner.png';

const View = (props) => {

    const [group, setGroup] = useState(null);
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        getGroup(props.match.params.id ? ("grp_"+props.match.params.id+"").toLowerCase() : props.authUser.referralId);
    }, []);

    const getGroup = (reference) => {
        props.setRequestGlobalAction(true),
        GroupService.getGroupDetails(reference)
            .then(response => {
                setGroup(response);
                let titleDetails = response.details.find(d => d.detailsType === 'TITLE');
                let imageDetails = response.details.find(d => d.detailsType === 'IMAGE');
                let descriptionDetails = response.details.find(d => d.detailsType === 'DESCRIPTION');
                setTitle(titleDetails ? titleDetails.value : null);
                setImage(imageDetails ? imageDetails.value : null)
                setDescription(descriptionDetails ? descriptionDetails.value : null)
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
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" style={{ maxHeight: 250 }} src={image ? getFilePath(image) : DEFAULT_BANNER} alt={`Bannière du groupe`} />
                            <CardBody>
                                <CardTitle>
                                    <h1 className='fw-bold mt-10' style={{ fontSize: '2.5rem' }}> { title ? title : group ? group.label : 'Group Title' } </h1>
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
            </RctCollapsibleCard>
        </>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(View));
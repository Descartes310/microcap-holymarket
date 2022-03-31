import { connect } from 'react-redux';
import { LANDING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import { getFilePath } from 'Helpers/helpers';
import SettingService from 'Services/settings';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import DiscoverLayout from "Routes/custom/dashboard/landing/discover/DiscoverLayout";

const DEFAULT_BANNER = 'https://www.athero.org.au/fh/wp-content/uploads/default-banner.png';

const BlogDetails = (props) => {
    
    const [article, setArticle] = useState(null);

    useEffect(() => {
        getArticle(props.match.params.id);
    }, []);

    const getArticle = (id) => {
        props.setRequestGlobalAction(true),
        SettingService.getArticleDetails(id)
            .then(response => {
                setArticle(response);
            })
            .catch(err => {
                console.log(err);
                props.history.push(LANDING.BLOG);
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <DiscoverLayout style={{ paddingTop: '24vh', backgroundColor: 'white' }}>
            <div className='container mb-70'>
                <div className="showcase-card-block d-flex flex-column pb-0" style={{ padding: '0vh 10vw' }}>
                    <div className='container'>
                    <div className="row center-hor-ver mb-70 flex-column intro">
                        <h2 className="font-weight-bold text-black text-center underline-title mb-50" data-aos="fade-right">
                            Blog MicroCap
                        </h2>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 mb-30">
                        <Card>
                            <CardImg top width="100%" className="img-fluid ripple-effect" style={{ maxHeight: 250 }} src={article ? getFilePath(article.cover) : DEFAULT_BANNER} alt={`Bannière du groupe`} />
                            <CardBody>
                                <CardTitle>
                                    <h1 className='fw-bold mt-10' style={{ fontSize: '2.5rem' }}> { article ? article.title : 'Article Title' } </h1>
                                </CardTitle>
                                <CardBody>
                                    <span dangerouslySetInnerHTML={{
                                        __html: article?.content
                                    }}>
                                    </span>
                                </CardBody>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </DiscoverLayout>
    );
}
export default connect(() => {}, { setRequestGlobalAction })(withRouter(BlogDetails));
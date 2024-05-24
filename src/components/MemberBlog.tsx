import { connect } from 'react-redux';
import UserService from 'Services/users';
import { getFilePath } from 'Helpers/helpers';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { url } from 'inspector';

const DEFAULT_BANNER = 'https://www.athero.org.au/fh/wp-content/uploads/default-banner.png';
const CLASSES = {
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

const MemberBlog = ({ member, setRequestGlobalAction }: any) => {

    const [group, setGroup] = useState(null);
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticles(member?.reference);
    }, [member]);

    const getArticles = (reference) => {
        UserService.getArticles(reference)
        .then((response) => {
          setArticles(response);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mb-30">
                <Card>
                    <div style={{ backgroundImage: `url(${member.image ? getFilePath(member.image) : DEFAULT_BANNER})`, backgroundRepeat: 'round', padding: '10%' }} >&nbsp;</div>
                    <CardBody>
                        <CardTitle>
                            <h1 className='fw-bold mt-10' style={{ fontSize: '2.5rem' }}> { member.name ? member.name : "Fil d'actualité" } </h1>
                        </CardTitle>
                        <CardBody>
                            <p>{member?.description}</p>
                        </CardBody>
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <div className="row">
                                { articles.map((article, index) => (
                                <div 
                                    key={index} 
                                    className="col-sm-12 col-md-12 col-lg-12 cursor-pointer mb-10" 
                                >
                                    <Card>
                                        <div>
                                            <img src={article ? getFilePath(article.cover) : DEFAULT_BANNER} style={{ maxHeight: 250, maxWidth: '100%' }}/>
                                        </div>
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
                                ))}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(MemberBlog);
import { withRouter } from "react-router-dom";
import SettingService from 'Services/settings';
import React, {useState, useEffect} from 'react';
import { LANDING, joinUrlWithParamsId } from 'Url/frontendUrl';
import DiscoverLayout from "Routes/custom/dashboard/landing/discover/DiscoverLayout";
import BlogArticle from 'Routes/custom/dashboard/landing/discover/components/BlogArticle';

const Blog = (props) => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
      getArticles();
    }, []);

    const getArticles = () => {
        SettingService.getActiveArticles()
        .then((response) => setArticles(response))
        .catch((err) => {
            console.log(err);
        });
    }

    document.body.style.overflow = "auto";

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
          <div className='row d-flex flex-row'>
            { articles.map((article, index) => (
              <div 
                key={index} 
                className="col-sm-6 col-md-4 col-lg-4 w-8-full cursor-pointer" 
                onClick={() => props.history.push(joinUrlWithParamsId(LANDING.BLOG_DETAILS, article.id))}
              >
                <BlogArticle article={article} />
              </div>
            ))}
          </div>
        </div>
      </DiscoverLayout>
    );
};

export default withRouter(Blog);

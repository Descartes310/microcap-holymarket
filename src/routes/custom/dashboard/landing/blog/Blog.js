import { FormGroup } from 'reactstrap';
import { withRouter } from "react-router-dom";
import SettingService from 'Services/settings';
import React, {useState, useEffect} from 'react';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { LANDING, joinUrlWithParamsId } from 'Url/frontendUrl';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import DiscoverLayout from "Routes/custom/dashboard/landing/discover/DiscoverLayout";
import BlogArticle from 'Routes/custom/dashboard/landing/discover/components/BlogArticle';

const Blog = (props) => {

    const [topics, setTopics] = useState([]);
    const [articles, setArticles] = useState([]);
    const [topicSelected, setTopicSelected] = useState([]);

    useEffect(() => {
      getArticles();
      getTopics();
    }, []);

    const getArticles = () => {
        SettingService.getActiveArticles()
        .then((response) => setArticles(response))
        .catch((err) => {
            console.log(err);
        });
    }

    const getTopics = () => {
      SettingService.getBlogTopics()
      .then((response) => {
        setTopics(response);
        setTopicSelected(response.map(t => t.id));
      }).catch((err) => {
          console.log(err);
      });
    }

    const sortArticles = (id) => {
      if(topicSelected.includes(id)) {
        setTopicSelected(topicSelected.filter(ts => ts != id));
      } else {
        setTopicSelected([...topicSelected, id]);
      }
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
            <div className="col-sm-12 col-md-10 col-lg-10">
              <div className="row">
                { articles.filter(a => topicSelected.includes(a.topic?.id)).map((article, index) => (
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
            <div className="col-sm-12 col-md-2 col-lg-2 d-flex align-items-baseline flex-column">
              <h2>Thèmes</h2>
              <FormGroup className="col-sm-12 has-wrapper d-flex align-items-baseline">
                { topics.map(topic => (
                  <FormControlLabel control={
                      <Checkbox
                          color="primary"
                          checked={topicSelected.includes(topic.id)}
                          onChange={() => sortArticles(topic.id)}
                      />
                  } label={`${topic.title}`}
                  />
                ))}
              </FormGroup>
            </div>
            
          </div>
        </div>
      </DiscoverLayout>
    );
};

export default withRouter(Blog);

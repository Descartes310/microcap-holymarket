import api from 'Api';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import React, { Component } from 'react';
import IntlMessages from 'Util/IntlMessages';
import { withRouter } from "react-router-dom";
import { getFilePath } from 'Helpers/helpers';
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

class Gallery extends Component<any, any> {
 
     state = {
        activities: []
     }
 
     componentDidMount() {
         this.getActivities();
     }
 
     getActivities = () => {
         this.props.setRequestGlobalAction(true);
         ProjectService.getProjectActivities(this.props.match.params.id, { type: 'ILLUSTRATION'}).then(response => {
             this.setState({ activities: response });
         })
         .finally(() => this.props.setRequestGlobalAction(false))
     }
 
     render() {
         const { activities } = this.state;

         return (
             <div className="gallery-wrapper">
                 <PageTitleBar title={'Galérie projet'} match={this.props.match} />
                <RctCollapsibleCard>
                    <div className="row">
                        {activities && activities.map((activity, key) => (
                            <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3" key={key}>
                                <figure className="img-wrapper">
                                    <img src={getFilePath(activity.file)} className="img-fluid" alt="gallery 1" />
                                    <figcaption>
                                        <h4>{activity.label}</h4>
                                        <h2>{activity.value}</h2>
                                    </figcaption>
                                    <a href="#" onClick={e => e.preventDefault()}>&nbsp;</a>
                                </figure>
                            </div>
                        ))}
                    </div>
                 </RctCollapsibleCard>
             </div>
         );
     }
 }
 

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Gallery));
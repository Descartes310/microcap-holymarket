import { connect } from 'react-redux';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { getFilePath } from 'Helpers/helpers';
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import GalleryItemModal from './components/ProjectGalleryItem';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

class Gallery extends Component<any, any> {
 
     state = {
        activities: [],
        showAddItem: false
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
         const { activities, showAddItem } = this.state;

         return (
             <div className="gallery-wrapper">
                 <PageTitleBar title={'Galérie projet'} match={this.props.match} />
                <RctCollapsibleCard>
                    <Button
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold mb-50"
                        onClick={() => this.setState({ showAddItem: true })}
                    >
                        Ajouter un élément
                    </Button>
                    <div className="row mt-50">
                        {activities && activities.map((activity, key) => (
                            <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3" key={key} onClick={() => window.open(getFilePath(activity.file), "blank")}>
                                <figure className="img-wrapper">
                                    <img src={getFilePath(activity.cover ? activity.cover : activity.file)} className="img-fluid" alt="gallery 1" />
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
                 <GalleryItemModal
                    show={showAddItem}
                    id={this.props.match.params.id}
                    title={'Création d\'un élément'}
                    onClose={() => {
                        this.setState({ showAddItem: false });
                        this.getActivities();
                    }}
                />
             </div>
         );
     }
 }
 

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Gallery));
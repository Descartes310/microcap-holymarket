import {Link} from "react-router-dom";
import React, {Component} from 'react';
import {SlideDown} from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import IntlMessages from "Util/IntlMessages";
import { Player } from 'video-react';
// import "node_modules/video-react/dist/video-react.css";
import {AGENTS, AUTH, GALERY_PROJECT, HOME, PASS_DETAILS, DISCOVER} from "Url/frontendUrl";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown} from 'reactstrap';

class DiscoverVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
        }
    }

    componentDidMount() {
       
    }

    componentWillUnmount() {
       
    }

    onModal = (event) => {
        event.preventDefault();
        this.setState(state => ({openModal: !state.openModal}))
    };

    handleCloseConfirmationAlert = () => {
        this.setState({openModal: false});
    }
    


    render() {
        const { } = this.state;
        

        return (

        <div className="container">
            <div className="row" >
                <div className="col-md-6">
                    <p style={{ fontSize: '1.2em', marginTop: 20, textAlign: 'center' }}>
                        Microcap vous accompagne dans la réalisation de votre projet:  création ou développement d’entreprise, actionnariat, formation à l’entrepreneuriat ...<br />
                        <Link to={AUTH.REGISTER} style={{ color: '#e19d00' }}>İnscrivez-vous</Link> et choississez l’abonnement qui vous correspond parmi <Link to={PASS_DETAILS} style={{ color: '#e19d00' }}>nos PASS</Link>
                    </p>
                </div>
                <div className="col-md-6">
                    <img src={require('Assets/img/microcap.png')} style={{width:"100%"}}/>
                    <div className="text-center btn-over">
                        <a className="btn-round" onClick={(event)=>this.onModal(event)} >
                            <i className="ti-control-play font-2x" aria-hidden="true"></i></a>
                    </div>
                    {/* <Player
                        playsInline
                        poster={require('Assets/img/microcap.png')}
                        //src='http://api-preprod.microcap.fr/files/videos/video.mp4'
                        src='http://api.microcap.fr/files/videos/video.mp4'
                    /> */}
                </div>
            
            <Dialog
                open={this.state.openModal}
                onClose={this.handleCloseConfirmationAlert}
                aria-labelledby="alert-dialog-title"
                fullWidth='false'
                maxWidth='md'  
                
            >
                <DialogTitle id="alert-dialog-title">
                    <a class="" onClick={()=>this.handleCloseConfirmationAlert()} >
                            <i className="ti-close font-2x" aria-hidden="true"></i>
                        </a>
                </DialogTitle>
                <DialogContent>
                    
                        <Player
                            playsInline
                            poster={require('Assets/img/microcap.png')}
                            //src='http://api-preprod.microcap.fr/files/videos/video.mp4'
                            src='http://api.microcap.fr/files/videos/video.mp4'
                            
                        /> 
                      
                </DialogContent>
            
            </Dialog>
            </div>
        </div>
        );
    }
}

export default DiscoverVideo;

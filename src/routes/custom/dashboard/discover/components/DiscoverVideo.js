import { Player } from 'video-react';
import {Link} from "react-router-dom";
import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {AUTH, PASS_DETAILS} from "Url/frontendUrl";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

class DiscoverVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
        }
    }

    onModal = (event) => {
        event.preventDefault();
        this.setState(state => ({openModal: !state.openModal}))
    };

    handleCloseConfirmationAlert = () => {
        this.setState({openModal: false});
    };

    render() {
        const { } = this.state;
        return (
            <div className="row video">
                <div className="col-md-6 video-text-content" data-aos="fade-right">
                    <p className="text-center">
                        Microcap vous accompagne dans la réalisation
                        de votre projet:  création ou développement
                        d’entreprise, actionnariat, formation à l’entrepreneuriat ...
                        <br />
                        <Link to={AUTH.REGISTER} className="text-primary">
                            İnscrivez-vous</Link> et choississez l’abonnement
                        qui vous correspond parmi
                        <Link to={PASS_DETAILS} className="text-primary">
                            nos PASS</Link>
                    </p>
                </div>
                <div className="col-md-6 video-display" data-aos="fade-left">
                    <img src={require('Assets/img/microcap.png')} className="img-fluid w-100 h-100"/>
                    <div className="text-center btn-over">
                        <div onClick={(event)=>this.onModal(event)} className="center-hor-ver w-100 h-100 cursor-pointer">
                            <i className="ti-control-play font-2x" aria-hidden="true"/>
                        </div>
                    </div>
                </div>

            <Dialog
                open={this.state.openModal}
                onClose={this.handleCloseConfirmationAlert}
                aria-labelledby="alert-dialog-title"
                fullWidth='false'
                maxWidth='md'
                className="main-dialog"
            >
                <DialogTitle id="alert-dialog-title">
                    <div className="close-cross">
                        <a className="" onClick={()=>this.handleCloseConfirmationAlert()} >
                            <i className="ti-close font-2x" aria-hidden="true"/>
                        </a>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Player
                        autoPlay
                        poster={require('Assets/img/microcap.png')}
                        //src='http://api-preprod.microcap.fr/files/videos/video.mp4'
                        src='http://api.microcap.fr/files/videos/video.mp4'
                    />
                </DialogContent>

            </Dialog>
            </div>
        );
    }
}

export default DiscoverVideo;

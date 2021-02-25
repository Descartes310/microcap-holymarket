import { connect } from "react-redux";
import React, { Component } from 'react';
import { getAllNotifications, setRequestGlobalAction } from "Actions";
import { Scrollbars } from "react-custom-scrollbars";
import Item from "Routes/custom/notifications/Item";
import { List as ListMaterial } from '@material-ui/core';
import SingleTitleText from "Components/SingleTitleText";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import FetchFailedComponent from "Components/FetchFailedComponent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import ActivationBox from "Routes/custom/notifications/ActivationBox";
import Status from "Enums/Status";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from "@material-ui/core/IconButton";
import { Button } from "reactstrap";
import { updateUserPieceValue, getAllSettingsByName } from 'Actions/independentActions';
import { NotificationManager } from "react-notifications";
import { Form, FormGroup, Input as InputStrap } from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

class Treated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: {
                data: null,
                loading: true,
            },
            showBox: false,
            notif: null,
            file: null,
            data: [],
            showActivationBox: false,
            selectedNotifications: [],
        }
    }

    componentDidMount() {
        this.props.getAllNotifications(this.props.authUser.user.id, 'TREATED');
        getAllSettingsByName(this.props.authUser.user.branch.id, 'CGU').then(data => {
            this.setState({ data })
        })
    }

    onActivationClick = (notificationId) => {
        this.setState({ showActivationBox: true })
    };

    createPiece = () => {
        this.props.setRequestGlobalAction(true);
        updateUserPieceValue({
            user_id: this.props.authUser.user.id,
            file: this.state.file,
            piece_id: this.state.notif.userPiece.id
        }, { fileData: ['file'], multipart: true }).then(data => {
            this.setState({ show: false })
            NotificationManager.success("La pièce a été renseignée avec succès");
        }).catch(err => {
            console.log(err);
            NotificationManager.error("La pièce n'a pas pu etre renseignée");
        }).finally(() => {
            this.setState({ notif: null, showBox: false });
            this.props.setRequestGlobalAction(false);
        });
    };

    onAskingPieceClick = (notification) => {
        this.setState({ showBox: true, notif: notification })
    };

    render() {
        const { data: notifications, loading } = this.props.notifications;

        if (loading) {
            return (<RctSectionLoader />);
        }

        if (!notifications) {
            return (<FetchFailedComponent />)
        }

        return (
            <>
                <div>
                    <div className="table-responsive">
                        <div className="d-flex justify-content-between py-20 px-10 border-bottom">
                            <div>
                                <a href="#" onClick={(e) => this.onReload(e)} className="btn-outline-default mr-10"><i className="ti-reload"></i></a>
                                {/*<a href="#" onClick={e => e.preventDefault()} className="btn-outline-default mr-10">More</a>*/}
                            </div>
                        </div>
                        <>
                            {notifications.length === 0 ? (
                                <SingleTitleText
                                    text="Pas de notifications traitées pour le moment"
                                />
                            ) : (
                                    <ListMaterial className="list-group aqua-ripple p-0">
                                        {notifications && notifications.reverse().map((notification, index) => (
                                            <Item
                                                key={index}
                                                notification={notification}
                                                markAsRead={() => alert('Déjà lue')}
                                                state="TREATED"
                                                authUser={this.props.authUser}
                                                onAskingPieceClick={() => this.onAskingPieceClick(notification)}
                                                onActivationClick={() => this.onActivationClick(notification.id)}
                                            />
                                        ))}
                                    </ListMaterial>
                                )}
                        </>
                    </div>
                </div>
                {this.props.authUser.user.status === Status.PENDING && (
                    <ActivationBox
                        show={this.state.showActivationBox}
                        pdfUrl={this.state.data.length > 0 ? this.state.data[0].value : ''}
                        onClose={() => this.setState({ showActivationBox: false })}
                    />
                )}
                <Dialog
                    open={this.state.showBox}
                    onClose={() => { this.setState({ showBox: false }) }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'md'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Reseigner la pièce demandée
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => { this.setState({ showBox: false }) }}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-md-12">
                                {this.state.notif ? this.state.notif.message : ''}
                                <div className='mt-40' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <span>Télecharchez un exemplaire de la pièce demandée ici</span>
                                    <Button
                                        color="primary"
                                        className="text-white mr-2"
                                        href={this.state.notif?.userPiece.file}
                                        target="_blank"
                                        download
                                    >
                                        Télecharger
                                    </Button>
                                </div>
                                <div className="col-12 my-3">
                                    <FormGroup style={{ width: '100%' }}>
                                        <InputLabel className="text-left">
                                            Fichier
                                        </InputLabel>
                                        <Input
                                            style={{ width: '100%' }}
                                            id="File"
                                            type="file"
                                            name="file"
                                            onChange={event => this.setState({ file: event.target.files[0] })}
                                        />
                                    </FormGroup>
                                    <Button
                                        color="primary"
                                        className="text-white mr-2"
                                        onClick={() => this.createPiece()}
                                    >
                                        Soumettre
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

const mapStateToProps = ({ notifications, notifications2, authUser, requestGlobalAction }) => {
    return {
        notifications,
        notifications2,
        authUser: authUser.data,
        requestGlobalAction
    }
};

export default connect(mapStateToProps, { getAllNotifications, setRequestGlobalAction })(Treated);

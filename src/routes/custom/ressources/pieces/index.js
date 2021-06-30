import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { getUserPieces, setRequestGlobalAction, updateUserPieceValue } from "Actions";
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import { Button } from "reactstrap";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { Form, FormGroup, Input as InputStrap } from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { getFilePath } from "Helpers/helpers";


class ListPieces extends Component {

    static contextType = AbilityContext;

    state = {
        loading: true,
        file: null,
        id: 0,
        show: false,
        pieces: []
    }

    getMyPieces = () => {
        this.setState({ loading: true })
        getUserPieces().then(data => {
            console.log(data)
            this.setState({ pieces: data })
        }).finally(() => this.setState({ loading: false }))
    }

    componentDidMount() {
        this.getMyPieces();
    }

    createPiece = () => {
        this.props.setRequestGlobalAction(true);
        updateUserPieceValue({
            user_id: this.props.authUser.user.id,
            file: this.state.file,
            piece_id: this.state.id
        }, { fileData: ['file'], multipart: true }).then(data => {
            NotificationManager.success("La pièce a été renseignée avec succès");
        }).catch(err => {
            NotificationManager.error("La pièce n'a pas pu etre renseignée");
        }).finally(() => {
            this.setState({id: 0, show: false})
            this.props.setRequestGlobalAction(false);
        });
    };

    render() {

        const { loading, pieces, show, id } = this.state;

        return (

            <div className="page-list">
                <h1 style={{
                    margin: '3%'
                }}>Mes pièces</h1>
                {loading
                    ? (<RctSectionLoader />)
                    : (
                        <CustomList
                            loading={loading}
                            list={pieces}
                            itemsFoundText={n => `${n} pieces(s) trouvé(s)`}
                            addPermissions={{
                                permissions: [],
                            }}
                            renderItem={list => (
                                <>
                                    {list && list.length === 0 ? (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucun piece trouvé
                                    </h4>
                                        </div>
                                    ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0 text-center">
                                                    <thead>
                                                        <tr>
                                                            <th>Nom de la pièce</th>
                                                            <th>Description</th>
                                                            <th>Exemplaire</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {pieces && pieces.map((item, key) => (
                                                            <tr key={key} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.userPiece.name}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.userPiece.description}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Button
                                                                        color="primary"
                                                                        className="text-white mr-2"
                                                                        href={getFilePath(item.userPiece.file)}
                                                                        target="_blank"
                                                                        download
                                                                    >
                                                                        Télecharger
                                                                    </Button>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        !item.file ?
                                                                            <Button
                                                                                color="primary"
                                                                                className="text-white mr-2"
                                                                                onClick={() => this.setState({show: true, id: item.userPiece.id})}
                                                                            >
                                                                                Renseigner
                                                                            </Button>
                                                                            :
                                                                            <Button
                                                                                color="primary"
                                                                                className="text-white mr-2"
                                                                                href={getFilePath(item.file)}
                                                                                target="_blank"
                                                                                download
                                                                            >
                                                                                Consulter
                                                                            </Button>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                </>
                            )}
                        />
                    )
                }
                <Dialog
                    open={show && id != 0}
                    onClose={() => this.setState({ show: false })}
                    aria-labelledby="responsive-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth={'sm'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Renseigner la pièce
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => this.setState({ show: false })}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <RctCollapsibleCard>
                            <div className="row">
                                
                                
                                <div className="col-12 my-3">
                                    <FormGroup>
                                        <InputLabel className="text-left">
                                           Selectionner la pièce à soumettre
                                        </InputLabel>
                                        <Input
                                            id="File"
                                            type="file"
                                            name="avatar"
                                            onChange={event => this.setState({ file: event.target.files[0] })}
                                        />
                                    </FormGroup>
                                </div>
                                <FormGroup className="mb-15">
                                    <Button
                                        // type="submit"
                                        color="primary"
                                        variant="contained"
                                        className="text-white font-weight-bold mr-3"
                                        onClick={() => this.createPiece()}
                                    >
                                       Soumettre
                                    </Button>
                                </FormGroup>
                            </div>
                        </RctCollapsibleCard>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});

const mapStateToProps = ({ authUser, settings, requestGlobalAction }) => {
    return {
        authUser: authUser.data,
        requestGlobalAction
    };
};

export default withRouter(connect(mapStateToProps, {setRequestGlobalAction})(withStyles(useStyles, { withTheme: true })(ListPieces)));

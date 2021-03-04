import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readEmail, onSelectEmail } from 'Actions';
import IntlMessages from 'Util/IntlMessages';
import { withStyles } from "@material-ui/core";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { getMembersOfCommunity, getVouchers, getUserClient } from 'Actions/independentActions';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {AbilityContext} from "Permissions/Can";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import CancelIcon from '@material-ui/icons/Cancel';
import TimeFromMoment from "Components/TimeFromMoment";
import AmountCurrency from "Components/AmountCurrency";
import SimpleProfile from './SimpleProfile';


class ListMembers extends Component {

    static contextType = AbilityContext;

    state = {
        loading: true,
        users: [],
        codes: [],
        showVoucherBox: false,
        showBox: false
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    getMembers = () => {
        getMembersOfCommunity(this.props.communitySpace.data).then(data => {
            this.setState({ users: data })
        }).finally(() => this.setState({ loading: false}))
    }

    onViewVoucher = user => {
        this.setState({ showVoucherBox: true });
        getVouchers(this.props.communitySpace.data, user.id, 'ALL').then(data => {
            this.setState({ codes: data })
        }).catch(err => {
            this.setState({ codes: [] })
        }).finally(() => {})
    }

    componentDidMount() {
        this.getMembers();
    }

    getClientFolder = (user) => {
        getUserClient(user.id).then(data => {
            this.setState({ userPieces: data, showBox: true });
        })
    }

    render() {
        const { loading, users, showVoucherBox, codes, showBox } = this.state;
        const { classes } = this.props;
        return (

            <div className="page-list">
                <PageTitleBar title={"Membres de la communautés"} />
                {loading 
                    ? (<RctSectionLoader />)
                    : (
                        <RctCollapsibleCard>
                            <div className="align-items-center mb-30 px-15 row">
                                <div className={classes.flex}>
                                    <FormControl>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <IconButton aria-label="facebook">
                                                    <i className="zmdi zmdi-search"></i>
                                                </IconButton>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="search"
                                                value={this.state.searched}
                                                placeholder={'Recherchez...'}
                                                onChange={event => this.onSearchChanged(event)}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </div>
                                <p className={classes.title}>
                                    {users.length} utilisateur(s) trouvé(s)
                                </p>
                            </div>
                            <div className="rct-tabs">
                                <ul className="list-unstyled m-0">
                                    {users.length > 0 ? users.map((user, key) => (
                                        <>
                                        <ListItem
                                            user={user}
                                            key={key}
                                            onViewVoucher={() => this.onViewVoucher(user)}
                                            isMe={this.props.authUser.user.id == user.id}
                                            getClientFolder={() => this.getClientFolder(user)}
                                        />
                                        <Dialog
                                            open={showBox}
                                            onClose={() => { this.setState({ showBox: false, codes: [] }) }}
                                            aria-labelledby="responsive-dialog-title"
                                            maxWidth={'lg'}
                                            fullWidth
                                        >
                                            <DialogTitle id="form-dialog-title">
                                                <div className="row justify-content-between align-items-center">
                                                    Profile de l'utlisateur
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="close"
                                                        className="text-danger"
                                                        onClick={() => { this.setState({ showBox: false, codes: [] }) }}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                </div>
                                            </DialogTitle>
                                            <DialogContent>
                                                <SimpleProfile currentUser={user} />
                                            </DialogContent>
                                        </Dialog>
                                        </>
                                    ))
                                        :
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucun utilisateurs trouvés
                                            </h4>
                                        </div>
                                    }
                                </ul>
                            </div>
                        </RctCollapsibleCard>
                    )
                }
                
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

const mapStateToProps = ({ authUser, communitySpace, settings }) => {
    return { 
        authUser: authUser.data, 
        communitySpace: communitySpace,
        currencies: settings.currencies
     };
};

export default withRouter(connect(mapStateToProps, {
    readEmail,
    onSelectEmail,
})(withStyles(useStyles, { withTheme: true })(ListMembers)));

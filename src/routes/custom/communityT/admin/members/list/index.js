import ListItem from './ListItem';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withStyles} from "@material-ui/core";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import EmptyResult from "Components/EmptyResult";
import {onSelectEmail, readEmail} from 'Actions';
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import SimpleProfile from '../../../members/list/SimpleProfile';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {getMembersOfCommunity, getUser, getCommunity} from 'Actions/independentActions';

class ListMembers extends Component {
    static contextType = AbilityContext;

    state = {
        loading: true,
        showBox: false,
        community: null,
        userPieces: [],
        users: []
    };

    componentDidMount() {
        this.getMembers();
        this.getCommunityDetails();
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    getCommunityDetails = () => {
        getCommunity(this.props.communitySpace.data)
            .then(data => {
                this.setState({ community: data });
            })
            .finally(() => this.setState({ loading: false }));
    };

    getMembers = () => {
        this.setState({loading: true});
        getMembersOfCommunity(this.props.communitySpace.data)
            .then(data => {
                this.setState({ users: data });
            })
            .catch(() => {
                this.setState({ users: null });
            })
            .finally(() => this.setState({ loading: false }));
    };

    getUserDetails = (id, type) => {
        getUser(id, type)
            .then(data => {
                this.setState({ user: data, showBox: true });
            });
    };

    render() {
        const { loading, users, showBox, user, community } = this.state;

        return (
            <div className="page-list">
                <CustomList
                    list={users}
                    error={!!users}
                    loading={loading}
                    showBackBtn={false}
                    onRetryClick={this.getMembers}
                    itemsFoundText={n => `${n} utilisateur(s) trouvé(s)`}
                    renderItem={list => (
                        <div className="rct-tabs">
                            <ul className="list-unstyled m-0">
                                {list.length === 0 ? (
                                    <EmptyResult message="Aucun utilisateurs trouvés" />
                                ) : list.map((user, key) => (
                                    <ListItem
                                        key={key}
                                        user={user}
                                        onReadEmail={() => this.readEmail(user)}
                                        getUserDetails={() => this.getUserDetails(user.id, user.type)}
                                        onSelectEmail={(e) => this.onSelectEmail(e, user)}
                                    />
                                ))}
                            </ul>
                        </div>
                    )}
                />
                <Dialog
                    open={showBox && user != null}
                    onClose={() => { this.setState({ showBox: false }) }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'md'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Profile de l'utlisateur
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
                        <SimpleProfile user={user} communitySpace={this.props.communitySpace} community={community} />
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

const mapStateToProps = ({ authUser, communitySpace }) => {
    return {
        authUser: authUser.data,
        communitySpace: communitySpace
    };
};

export default withRouter(connect(mapStateToProps, {
    readEmail,
    onSelectEmail,
})(withStyles(useStyles, { withTheme: true })(ListMembers)));

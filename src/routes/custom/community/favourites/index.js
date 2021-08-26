import {connect} from "react-redux";
import {FormGroup} from 'reactstrap';
import {injectIntl} from "react-intl";
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import GroupItem2 from '../groups/GroupItem2';
import Select from "@material-ui/core/Select";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import {NotificationManager} from "react-notifications";
import {getInvitationsPending} from "Actions/GeneralActions";
import {getFavouritesGroups} from "Actions/independentActions";
import {COMMUNITY, joinUrlWithParamsId} from 'Url/frontendUrl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {getGroupPosts, getMotivations, sendRequestInvitation, setRequestGlobalAction} from "Actions";

class FavouritesGroups extends Component {
    static contextType = AbilityContext;

    state = {
        loading: true,
        communities: [],
        group: null,
        showAskingBox: false,
        posts: [],
        post: null,
        motivations: [],
        motivation: null
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        getFavouritesGroups()
            .then(data => {
                this.setState({ communities: data });
            })
            .finally(() => this.setState({ loading: false }));
    }

    onEnterClick = (group) => {
        this.setState({ showAskingBox: true, group }, () => {
            this.getPosts(group.id);
        })
    };

    getPosts = (id) => {
        this.props.setRequestGlobalAction(true);
        getGroupPosts(id)
            .then(data => {
                this.setState({ posts: data });
            }).finally(() => {
                this.props.setRequestGlobalAction(false);
            });
    };

    getPostMotivations = (post) => {
        this.setState({ post: post });
        this.props.setRequestGlobalAction(true);
        getMotivations(post.id)
            .then(data => {
                this.setState({ motivations: data })
            })
            .finally(() => {
                this.props.setRequestGlobalAction(false);
            });
    };

    onAskingClick = (group) => {
        this.props.setRequestGlobalAction(true);
        let data = { motivation_id: this.state.motivation };
        sendRequestInvitation(group.id, this.props.authUser.user.id, data)
            .then(() => {
                NotificationManager.success("Votre demande pour le groupe " + group.label + " a été envoyé");
                getFavouritesGroups()
                    .then(data => {
                        this.setState({ communities: data });
                    })
                    .finally(() => this.setState({ loading: false }));
                this.props.getInvitationsPending(this.props.authUser.user.id);
            })
            .catch(() => null)
            .finally(() => {
                this.props.setRequestGlobalAction(false);
                this.setState({ showAskingBox: false, group: null, posts: [], post: null, motivations: [], motivation: null });
            });
    };

    onJoinClick = (id) => {
        this.props.history.push(joinUrlWithParamsId(COMMUNITY.MEMBERS.LIST, id));
    };

    render() {
        const { communities, loading, showAskingBox } = this.state;

        if (!loading && communities && communities.length === 0) {
            return (
                <h3 className="center-hor-ver h-20">Aucun groupes disponible pour le moment</h3>
            );
        }

        return (
            <>
                <CustomList
                    loading={loading}
                    list={communities}
                    itemsFoundText={n => `${n} Groupe(s) trouvé(s)`}
                    renderItem={list => (
                        <>
                            {!list || (list && list.length === 0) ? (
                                <div className="no-found-user-wrap d-flex justify-content-center align-items-center py-50">
                                    <h4> Aucune communauté trouvée</h4>
                                </div>
                            ) : (
                                    <div className="row" style={{ paddingBottom: 50 }}>
                                        {list.map((community, key) => (
                                            <div className="col-sm-6 col-md-4 col-lg-3" key={key}>
                                                <GroupItem2 group={community} isMember={community.status} adhesion={this.onEnterClick} enterInCommunitySpace={this.onJoinClick} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                        </>
                    )}
                />

                <Dialog
                    open={showAskingBox}
                    onClose={() => { this.setState({ showAskingBox: false, group: null, posts: [], post: null, motivations: [], motivation: null }) }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'sm'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Demander l'adhésion à {this.state.group ? this.state.group.label : ''}
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => { this.setState({ showAskingBox: false, group: null, posts: [], post: null, motivations: [], motivation: null }) }}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="row align-items-center" style={{ marginTop: '5%' }}>
                            <FormGroup className="col-sm-12 has-wrapper">
                                <CustomAsyncComponent
                                    loading={false}
                                    data={this.state.posts}
                                    component={data => (
                                        <div className="form-group text-left">
                                            <FormControl fullWidth>
                                                <InputLabel className="text-left" htmlFor="currency-helper">
                                                    Catégorie d'utilisateur
                                                </InputLabel>
                                                <Select onChange={e => this.getPostMotivations(e.target.value)}>
                                                    {data.map(item => (
                                                        <MenuItem key={item.id} value={item} className="center-hor-ver">
                                                            {item.title}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    )}
                                />
                            </FormGroup>

                            {this.state.post ?
                                <div style={{ display: "flex", flexDirection: 'column', width: '100%' }}>
                                    <p style={{ fontWeight: 'bold' }}>
                                        Description de la catégorie:
                                    </p>
                                    <p className="mt-10 mb-20">
                                        {this.state.post.description}
                                    </p>
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <CustomAsyncComponent
                                            loading={false}
                                            data={this.state.motivations}
                                            component={data => (
                                                <div className="form-group text-left">
                                                    <FormControl fullWidth>
                                                        <InputLabel className="text-left" htmlFor="currency-helper">
                                                            Selectionner votre motivation
                                                </InputLabel>
                                                        <Select onChange={e => this.setState({ motivation: e.target.value })}>
                                                            {data.map(item => (
                                                                <MenuItem key={item.id} value={item.id} className="center-hor-ver">
                                                                    {item.title}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            )}
                                        />
                                    </FormGroup>
                                </div>
                                : null}
                            <div style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>

                                <Button
                                    color="primary"
                                    variant="contained"
                                    className="text-white font-weight-bold bg-danger"
                                    style={{ marginRight: 10 }}
                                    onClick={() => this.setState({ showAskingBox: false, group: null, posts: [], post: null, motivations: [], motivation: null })}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    className="text-white font-weight-bold"
                                    onClick={() => this.onAskingClick(this.state.group)}
                                >
                                    Demander l'adhésion
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace }) => {
    return { requestGlobalLoader, authUser: authUser.data, communitySpace }
};

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

export default connect(mapStateToProps, {getInvitationsPending, setRequestGlobalAction})
(withStyles(useStyles, {withTheme: true})(withRouter(injectIntl(FavouritesGroups))));

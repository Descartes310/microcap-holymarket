import { connect } from "react-redux";
import { FormGroup } from 'reactstrap';
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import GroupItem2 from '../groups/GroupItem2';
import Select from "@material-ui/core/Select";
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import { setRequestGlobalAction } from "Actions";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { NotificationManager } from "react-notifications";
import { getInvitationsPending } from "Actions/GeneralActions";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import { getDisableCommunitiesByBranch, activeCommunity } from "Actions/independentActions";

class AllGroups extends Component {
    static contextType = AbilityContext;

    state = {
        code: '',
        group: null,
        loading: true,
        communities: [],
        showActiveBox: false
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.setState({ loading: false });
        getDisableCommunitiesByBranch()
            .then(data => {
                this.setState({ communities: data });
            })
            .finally(() => this.setState({ loading: false }));
    };

    onActiveCommunity = () => {
        this.setState({ loading: false });
        activeCommunity(this.state.group.id, this.state.code)
            .then(data => {
                window.location.reload();
            })
            .catch((err) => {
                NotificationManager.error("Le code n'est pas valide");
            })
            .finally(() => this.setState({ loading: false }));
    };

    render() {
        const { communities, loading, showActiveBox, group } = this.state;

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
                                            <GroupItem2
                                                pending={true}
                                                group={community}
                                                isMember={community.status}
                                                adhesion={this.onEnterClick}
                                                activeCommunity={() => this.setState({ group: community, showActiveBox: true })}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                />

                {group && (
                    <Dialog
                        open={showActiveBox}
                        onClose={() => { this.setState({ group: null, showActiveBox: false }) }}
                        aria-labelledby="responsive-dialog-title"
                        maxWidth={'sm'}
                        fullWidth
                    >
                        <DialogTitle id="form-dialog-title">
                            <div className="row justify-content-between align-items-center">
                                Activer la communauté {this.state.group ? this.state.group.label : ''}
                                <IconButton
                                    color="primary"
                                    aria-label="close"
                                    className="text-danger"
                                    onClick={() => { this.setState({ group: null, showActiveBox: false }) }}>
                                    <CancelIcon />
                                </IconButton>
                            </div>
                        </DialogTitle>
                        <DialogContent>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="name">
                                    Code d'activation
                                </InputLabel>
                                <input
                                    id="code"
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => this.setState({ code: e.target.value })}
                                />
                            </FormGroup>
                            <div className="row align-items-center" style={{ marginTop: '5%' }}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    className="text-white font-weight-bold bg-danger"
                                    style={{ marginRight: 10 }}
                                    onClick={() => this.setState({ showActiveBox: false, group: null })}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    className="text-white font-weight-bold"
                                    onClick={() => this.onActiveCommunity()}
                                >
                                    Valider
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}

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

export default connect(mapStateToProps, { getInvitationsPending, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(AllGroups))));

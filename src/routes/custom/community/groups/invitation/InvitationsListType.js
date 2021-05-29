import React, { Component } from 'react';
import {connect} from "react-redux";
import IntlMessages from 'Util/IntlMessages';
import {getInvitationsPending, invitationSent, requestsReceived, setRequestGlobalAction} from "Actions";
import {injectIntl} from "react-intl";
import {Fab, withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {AbilityContext} from "Permissions/Can";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import FormControl from "@material-ui/core/FormControl";
import {Input, InputGroup, InputGroupAddon, Media} from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import {globalSearch} from "Helpers/helpers";
import InvitationType from "Enums/InvitationType";
import Avatar from "@material-ui/core/Avatar";
import {Scrollbars} from "react-custom-scrollbars";
import InvitationItem from "./InvitationItem";

class InvitationsListType extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);
        this.state = {
            searched: '',
        }
    }

    componentDidMount() {
        console.log('this.props Invitation type=>',this.props );
        // this.props.getInvitationsPending(this.props.authUser.user.id);
        this.getDatas();
    };

    getDatas = () => {
        if (this.props.type === InvitationType.REQUEST) {
            this.getRequests();
        }
        if (this.props.type === InvitationType.INVITATION) {
            this.getInvitations();
        }
    };

    getInvitations = () => {
        invitationSent(this.props.authUser.user.id).then(data => {
            this.setState({ datas: data });
        }).finally(() => this.setState({ loading: false }))
    };

    getRequests = () => {
        requestsReceived(this.props.authUser.user.id).then(data => {
            this.setState({ datas: data });
        }).finally(() => this.setState({ loading: false }))
    };


    onSearchChanged = (event) => {
        this.setState({searched: event.target.value});
        // console.log('event', event)
    };

    handleSearch = (value, data) => {
        if (value !== '') {
            // Apply order feature
            return globalSearch(data, this.state.searched);
        }

        return data;
    };


    render() {
        const { classes, comInvitationsPending, loading, type } = this.props;
        if (!loading && comInvitationsPending === null) {
            return (<p>Un problème est survenue</p>)
        }

        if (loading) {
            return (<RctSectionLoader/>)
        }

        let orderedItems = this.handleSearch(this.state.searched, comInvitationsPending.filter(invitation => invitation.type === this.props.type));

        return (
            <>
                <div className="page-list">
                    {loading || orderedItems === null
                        ? (<RctSectionLoader/>)
                        : (
                            <RctCollapsibleCard>
                                <div className="align-items-center mb-30 px-15 row">
                                    <div className={classes.flex}>
                                        <FormControl>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <IconButton aria-label="facebook">
                                                        <i className="zmdi zmdi-search" />
                                                    </IconButton>
                                                </InputGroupAddon>
                                                <Input
                                                    type="text"
                                                    name="search"
                                                    value={this.state.searched}
                                                    placeholder={'Recherchez...'}
                                                    onChange={this.onSearchChanged}
                                                />
                                            </InputGroup>
                                        </FormControl>
                                    </div>
                                    <p className={classes.title}>
                                        {orderedItems.length} invitation(s) reçu(s)
                                    </p>
                                </div>
                                <>
                                    {orderedItems.length == 0 ? (
                                        <div className="d-flex justify-content-center align-items-center py-50">
                                            <h4>
                                                Aucune invitation trouvée
                                            </h4>
                                        </div>
                                    ) : (
                                        <>
                                            <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={400} autoHide>
                                                <ul className="new-mail mb-0 list-unstyled">
                                                    {orderedItems.map((invitation, key) => (
                                                        <InvitationItem
                                                            key={key}
                                                            invitation={invitation}
                                                        />
                                                    ))}
                                                </ul>
                                            </Scrollbars>
                                        </>
                                    )}
                                </>
                            </RctCollapsibleCard>
                        )
                    }
                </div>
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, comInvitationsPending, authUser, communitySpace  }) => {
    return { requestGlobalLoader, authUser: authUser.data, loading: comInvitationsPending.loading, comInvitationsPending: comInvitationsPending.data, error: comInvitationsPending.error, communitySpace: communitySpace }
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

/*  export default connect(mapStateToProps, {getInvitationsPending, setRequestGlobalAction})
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(InvitationsListType))));
 */

export default connect(mapStateToProps, {getInvitationsPending, setRequestGlobalAction})(withStyles(useStyles, { withTheme: true })(withRouter(InvitationsListType)));

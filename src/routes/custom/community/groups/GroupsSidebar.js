import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';

// components
import { connect } from "react-redux";
import { setRequestGlobalAction, setCurrentCommunity, getUserCommunities } from "Actions";
import { withRouter } from "react-router-dom";
import { Input, InputGroup, InputGroupAddon } from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";
import List from "@material-ui/core/List";
import GroupItem from "Routes/custom/community/groups/GroupItem";
import Button from "@material-ui/core/Button";
import IntlMessages from "Util/IntlMessages";
import FormControl from "@material-ui/core/FormControl";
import CommunityCreate from "Routes/custom/community/groups/CommunityCreate";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class GroupsSidebar extends Component {
    state = {
        showCreateBox: false,
        filterFavourite: false
    };

    componentDidMount() {
        this.props.getUserCommunities(this.props.authUser.user.id);
    }

    onCommunityClick = (community, favourite) => {
        this.props.setCurrentCommunity(community, favourite);
    };

    render() {
        const { userCommunities, loading } = this.props;

        if (loading) {
            return (<RctSectionLoader />)
        }

        return (
            <>
                <CommunityCreate
                    show={this.state.showCreateBox}
                    onClose={() => this.setState({ showCreateBox: false })}
                />
                <div className="chat-sidebar">
                    <div>
                        <div className="justify-content-between align-items-center mt-2 mb-30 px-15 row">
                            <div className="col-md-3 col-sm-4">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    className="text-white font-weight-bold"
                                    onClick={() => this.setState({ showCreateBox: true })}
                                >
                                    <i className="zmdi zmdi zmdi-plus mr-2" />
                                    Créer
                                </Button>
                            </div>
                            <div className="col-md-9 col-sm-8">
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
                                            // value={this.state.searched}
                                            placeholder={'Recherchez...'}
                                        // onChange={event => this.onSearchChanged(event, canSearch)}
                                        />
                                    </InputGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div className="chat-list">
                            <Scrollbars
                                className="rct-scroll"
                                autoHide
                                style={{ height: "calc(100vh - 188px)" }}
                            >
                                <>
                                    {!userCommunities || (userCommunities && userCommunities.length === 0) ? (
                                        <div className="no-found-user-wrap d-flex justify-content-center align-items-center py-50">
                                            <h4> Aucune communauté trouvé</h4>
                                        </div>
                                    ) : (
                                            <>
                                                <div className="mb-20 d-flex align-items-center" style={{ marginLeft: 30 }}>
                                                    <span style={{ marginRight: 20 }}>Filtrer les favoris</span>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={this.state.filterFavourite}
                                                                onClick={() => this.setState({ filterFavourite: !this.state.filterFavourite })}
                                                                color="primary"
                                                                className="switch-btn"
                                                            />
                                                        }
                                                    />
                                                </div>
                                                {
                                                    this.state.filterFavourite ?
                                                        < List className="p-0 mb-0">
                                                            {userCommunities.filter(data => data.favourite == true).map((community, key) => (
                                                                <GroupItem
                                                                    key={key}
                                                                    community={community.group}
                                                                    favourite={community.favourite}
                                                                    onClickListItem={() => this.onCommunityClick(community.group, community.favourite)}
                                                                />
                                                            ))}
                                                        </List>
                                                        :
                                                        <List className="p-0 mb-0">
                                                            {userCommunities.map((community, key) => (
                                                                <GroupItem
                                                                    key={key}
                                                                    community={community.group}
                                                                    favourite={community.favourite}
                                                                    onClickListItem={() => this.onCommunityClick(community.group, community.favourite)}
                                                                />
                                                            ))}
                                                        </List>
                                                }
                                            </>
                                        )}
                                </>
                            </Scrollbars>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, userCommunities }) => {
    return {
        requestGlobalLoader, authUser: authUser.data,
        userCommunities: userCommunities.data,
        loading: userCommunities.loading,
        error: userCommunities.error,
    }
};

export default connect(mapStateToProps, { setCurrentCommunity, getUserCommunities, setRequestGlobalAction })(withRouter(GroupsSidebar));


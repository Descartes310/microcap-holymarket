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
import { getMembersOfCommunity } from 'Actions/independentActions';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {AbilityContext} from "Permissions/Can";
import User from "Models/User";


class ListMembers extends Component {

    static contextType = AbilityContext;

    state = {
        loading: true,
        users: []
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    getMembers = () => {
        getMembersOfCommunity(this.props.communitySpace.data).then(data => {
            this.setState({ users: data })
        }).finally(() => this.setState({ loading: false}))
    }

    componentDidMount() {
        this.getMembers();
    }

    render() {
        const { loading, users } = this.state;
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
                                        <ListItem
                                            user={user}
                                            key={key}
                                            onSelectEmail={(e) => this.onSelectEmail(e, user)}
                                            onReadEmail={() => this.readEmail(user)}
                                        />
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

const mapStateToProps = ({ authUser, communitySpace }) => {
    return { authUser: authUser.data, 
        communitySpace: communitySpace };
};

export default withRouter(connect(mapStateToProps, {
    readEmail,
    onSelectEmail,
})(withStyles(useStyles, { withTheme: true })(ListMembers)));

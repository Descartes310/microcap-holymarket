/**
 * Email Listing
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

//Intl Message
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { withStyles } from "@material-ui/core";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import { setCommunitySpaceAdmins, statusCommunitySpaceStatus, setCommunitySpaceData } from "Actions/CommunityAction";
import { getUserCommunities } from "Actions";
import IntlMessages from 'Util/IntlMessages';
import Button from "@material-ui/core/Button";
import { COMMUNITY } from 'Url/frontendUrl';
import { getCommunityAdmins, getPartnersOperatorByMe } from "Actions/independentActions";
import UserType from "Enums/UserType";
import { USERS } from 'Url/frontendUrl';

class PersonalSpace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searched: '',
            operators: []
        }
    }

    componentDidMount() {
        this.props.getUserCommunities(this.props.authUser.user.id);
        if (this.props.authUser.user.userType === UserType.ORGANISATION) {

        }
    }

    onJoinClick = (group) => {
        getCommunityAdmins(group.id).then(data => {
            this.props.statusCommunitySpaceStatus(true);
            this.props.setCommunitySpaceAdmins(data);
            this.props.setCommunitySpaceData(group.id);
            this.props.history.push(COMMUNITY.MEMBERS.LIST);
        })
    }

    getOperators = () => {
        getPartnersOperatorByMe(this.props.authUser.user.id).then(data => {
            this.setState({ operators: data })
        })
    }

    render() {
        const { loading, history, userCommunities } = this.props;
        const { operators } = this.state;
        return (
            <div className="page-list">
                <PageTitleBar title={"Espace personnel"} enableBreadCrumb={true} match={this.props.match} history={history} />
                {loading
                    ? (<RctSectionLoader />)
                    : (
                        <RctCollapsibleCard>
                            <Accordion>
                                <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                                    <Typography>Utilisateurs</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <NavLink to={USERS.USERS_PROFILE.DISPLAY_PROFILE} className="nav-link" activeClassName="active">
                                    <Button
                                        // type="submit"
                                        size="small"
                                        color="primary"
                                        disabled={loading}
                                        variant="contained"
                                        className={"text-white font-weight-bold mr-3"}
                                        // onClick={() => this.onJoinClick(group)}
                                    >
                                        Consulter mon profil
                                    </Button>
                                </NavLink>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                                    <Typography>Partenaires</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="row" style={{ flexDirection: 'column', width: '100%' }}>
                                        <Accordion>
                                            <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                                                <Typography>Opérateur Microcap</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <table className="table table-hover table-middle mb-0 text-center">
                                                    <thead>
                                                        <tr>
                                                            <th><IntlMessages id="components.name" /></th>
                                                            <th>Numéro de contrat</th>
                                                            <th />
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {operators && operators.map((operator, key) => (
                                                            <tr key={key} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-left media-middle mr-15">
                                                                            {/*<img src={group.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                                        </div>
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{operator.organisation.commercialName}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{operator.contractNumber}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="table-action">

                                                                    <Button
                                                                        // type="submit"
                                                                        size="small"
                                                                        color="primary"
                                                                        disabled={loading}
                                                                        variant="contained"
                                                                        className={"text-white font-weight-bold mr-3"}
                                                                    // onClick={() => this.onJoinClick(group)}
                                                                    >
                                                                        Rejoindre l'espace
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                                                <Typography>Communauté Microcap</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <table className="table table-hover table-middle mb-0 text-center">
                                                    <thead>
                                                        <tr>
                                                            <th><IntlMessages id="components.name" /></th>
                                                            <th><IntlMessages id="widgets.description" /></th>
                                                            <th />
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {userCommunities && userCommunities.filter(g => g.group.typeGroup.name == 'COMMUNAUTE_CONVENTIONNEE').map((group, key) => (
                                                            <tr key={key} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-left media-middle mr-15">
                                                                            {/*<img src={group.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                                        </div>
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{group.group.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{group.group.description}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="table-action">

                                                                    <Button
                                                                        // type="submit"
                                                                        size="small"
                                                                        color="primary"
                                                                        disabled={loading}
                                                                        variant="contained"
                                                                        className={"text-white font-weight-bold mr-3"}
                                                                        onClick={() => this.onJoinClick(group.group)}
                                                                    >
                                                                        Rejoindre la communauté
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                                                <Typography>Exploitant Microcap</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>

                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                                    <Typography>Prestataires</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                                    <Typography>Entrepreneurs</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                                    <Typography>Investisseurs</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>}>
                                    <Typography>Epargnant</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                </AccordionDetails>
                            </Accordion>
                        </RctCollapsibleCard>
                    )
                }
            </div>
        );
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

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, userCommunities }) => {
    return {
        loading: requestGlobalLoader || userCommunities.loading,
        authUser: authUser.data,
        userCommunities: userCommunities.data,
        error: userCommunities.error,
    };
};

export default withRouter(connect(mapStateToProps, { getUserCommunities, setCommunitySpaceAdmins, statusCommunitySpaceStatus, setCommunitySpaceData })(withStyles(useStyles, { withTheme: true })(PersonalSpace)));

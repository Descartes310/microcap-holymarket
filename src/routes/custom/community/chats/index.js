import React, { Component } from 'react';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";


class Chat extends Component {
    static contextType = AbilityContext;

    state = {
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {


        return (
            <RctCollapsibleCard>
                <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
                    {/* <div className="d-flex justify-content-center align-items-center" >
                        <img src={require("Assets/img/chat.png")} width="50%" />
                    </div>
                    <div className="content px-20">
                        <div className="d-flex justify-content-start align-items-center mb-5">
                            <h1 className="pr-10 mb-0 mt-20">Messagerie bientôt disponible</h1>
                        </div>
                    </div> */}
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered table-middle mb-0">
                            <thead>
                                <tr>
                                    <th colSpan={4}>Emplois</th>
                                    <th colSpan={3}>Ressources</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    className="cursor-pointer"
                                >
                                    <td rowSpan={2}>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Immobilisation</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Codes poste</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Libellé</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Montant</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Codes poste</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Libellé poste</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Montant</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr
                                    className="cursor-pointer"
                                >
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Abondements</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Abondements</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Abondements</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Abondements</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Abondements</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Abondements</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr
                                    className="cursor-pointer"
                                >
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Exploitation</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Abondements</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Abondements</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Abondements</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Abondements</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Abondements</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Abondements</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Total</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td colSpan={3}>
                                        <div className="media">
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Total</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td colSpan={2}>
                                        <div className="media">
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </RctCollapsibleCard>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data }
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

export default connect(mapStateToProps, {})
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(Chat))));

import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { COMMUNITY_ADMIN, joinUrlWithParamsId } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction, getAllOperators, choosedOperator} from "Actions";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import Button from '@material-ui/core/Button';
import {Fab} from "@material-ui/core";
import {RctCard} from "Components/RctCard";
import {NotificationManager} from "react-notifications";
import {ERROR_500} from "Constants/errors";

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = COMMUNITY_ADMIN.OPERATOR;

    state = {
        operators: []
    };

    constructor(props) {
        super(props)
    };

    componentDidMount() {
        this.getOperators();
    };

    getOperators = () => {
        this.props.setRequestGlobalAction(true);
        getAllOperators(this.props.authUser.user.branch.id, this.props.communitySpace.data).then(data => {
            this.setState({ operators: data })
        }).finally(() => {
            this.props.setRequestGlobalAction(false)
        })
    };

    selectedOperator = (id) => {
        this.props.setRequestGlobalAction(true);
        choosedOperator(id, this.props.communitySpace.data)
            .then(() => {
                NotificationManager.success("Opérqteur selectionné avec succès");
                this.props.history.push(this.baseUrl.LIST);
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    render() {
        const { history } = this.props;
        const { operators } = this.state;

        return (
            <div className="page-list mt-70 pt-20">
                <PageTitleBar title={"Liste des opérateurs de la communauté"} enableBreadCrumb={true} match={this.props.match} history={history} />
                <CustomList
                    list={operators}
                    loading={false}
                    itemsFoundText={n => `${n} opérateur(s) trouvé(s)`}
                    // onAddClick={() => history.push(this.baseUrl.CREATE)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div>
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>Titre</th>
                                                <th>Description</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucuns operateurs trouvés
                                        </h4>
                                    </div>
                                </div>
                            ) : (
                                list && list.length === 1 ? (
                                    <RctCard customClasses="profile-head">
                                        <div className="profile-top">
                                            <img src={require('Assets/img/profile-bg.jpg')}
                                                 alt="profile banner" width="1920" height="200" />
                                        </div>
                                        <div className="profile-bottom border-bottom">
                                            <div className="user-image text-center mb-30">
                                                <img
                                                    src={!list[0].user.avatar ? require('Assets/avatars/profile.jpg') : list[0].user.avatar}
                                                    className="img-fluid rounded-circle rct-notify mx-auto"
                                                    alt="user images"
                                                    width="110"
                                                    height="110"
                                                />
                                            </div>
                                            <div className="user-list-content">
                                                <div className="text-center">
                                                    <h3 className="fw-bold">{list[0].user.profile.name}</h3>
                                                    <p>{list[0].user.profile.type}</p>
                                                    <div className="social-list clearfix mb-40">
                                                        <ul className="list-inline d-inline-block mb-0">
                                                            <li className="list-inline-item">
                                                                <Fab variant="round" size="small" className="btn-facebook text-white">
                                                                    <i className="zmdi zmdi-facebook"></i>
                                                                </Fab>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <Fab variant="round" size="small" className="btn-twitter text-white">
                                                                    <i className="zmdi zmdi-twitter"></i>
                                                                </Fab>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <Fab variant="round" size="small" className="btn-google text-white">
                                                                    <i className="zmdi zmdi-google"></i>
                                                                </Fab>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <Fab variant="round" size="small" className="btn-linkedin text-white">
                                                                    <i className="zmdi zmdi-linkedin"></i>
                                                                </Fab>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <Fab variant="round" size="small" className="btn-youtube text-white">
                                                                    <i className="zmdi zmdi-youtube"></i>
                                                                </Fab>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="user-activity text-center">
                                            <ul className="list-inline d-inline-block">
                                                <li className="list-inline-item">
                                                    <span className="fw-bold">
                                                       <i className="zmdi zmdi-phone"></i>
                                                    </span>
                                                    <span>{list[0].user.phone ? list[0].user.phone : 'Add phone number' }</span>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="fw-bold">
                                                        <i className="zmdi zmdi-email"></i>
                                                    </span>
                                                    <span>{list[0].user.email}</span>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span className="fw-bold">
                                                        <i className="zmdi zmdi-pin"></i>
                                                    </span>
                                                    <span>{list[0].user.nationality}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </RctCard>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Nom</th>
                                                    <th>Type</th>
                                                    {/* <th>Section parent</th> */}
                                                    <th>Description</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr
                                                        key={key}
                                                        className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.user.profile.name}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.user.profile.type}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.user.profile.description}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <Button
                                                                        color="primary"
                                                                        disabled={item.native}
                                                                        variant="contained"
                                                                        className="text-white font-weight-bold bg-blue"
                                                                        style={{ marginRight: 10 }}
                                                                        onClick={() => this.selectedOperator(item.id)}
                                                                    >
                                                                       Selectionner
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                        </>
                    )}
                />
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        communitySpace: communitySpace
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(List)));

import {
    getAllOperators,
    choosedOperator,
    cancelChosenOperator,
    removeChosenOperator,
    setRequestGlobalAction,
} from "Actions";
import Status from "Enums/Status";
import {connect} from "react-redux";
import {Fab} from "@material-ui/core";
import {injectIntl} from "react-intl";
import React, {Component} from 'react';
import {RctCard} from "Components/RctCard";
import {withRouter} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import EmptyResult from "Components/EmptyResult";
import {NotificationManager} from "react-notifications";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

class List extends Component {
    static contextType = AbilityContext;

    state = {
        operators: [],
        operatorResponse: {},
    };

    constructor(props) {
        super(props)
    };

    componentDidMount() {
        this.getOperators();
    };

    getOperators = () => {
        this.props
            .getAllOperators(this.props.authUser.user.branch.id, this.props.communitySpace.data)
    };

    selectedOperator = (id) => {
        this.props.setRequestGlobalAction(true);
        choosedOperator(id, this.props.communitySpace.data)
            .then(data => {
                this.setState({ operatorResponse: data });
                NotificationManager.success("Opérqteur selectionné avec succès");
                this.getOperators();
            })
            .catch(() => null)
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    removeOperator = () => {
        this.props.setRequestGlobalAction(true);
        removeChosenOperator(this.props.communitySpace.data)
            .then(() => {
                NotificationManager.success("Opérateur destitué avec succès");
                this.getOperators();
            })
            .catch(() => null)
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    cancelOperator = (id) => {
        this.props.setRequestGlobalAction(true);
        cancelChosenOperator(id, this.props.communitySpace.data)
            .then(() => {
                NotificationManager.success("Opérateur annulé avec succès");
                this.getOperators();
            })
            .catch(() => null)
            .finally(() => this.props.setRequestGlobalAction(false));
    };

    render() {
        const { history, comSollicitationsPending, loading } = this.props;
        const { operatorResponse, operators, cancelSelection, selected} = this.state;

        return (
            <div className="page-list mt-70 pt-20">
                <PageTitleBar title={"Liste des opérateurs de la communauté"} enableBreadCrumb={true} match={this.props.match} history={history} />
                <CustomList
                    loading={loading}
                    list={comSollicitationsPending}
                    onRetryClick={this.getOperators}
                    itemsFoundText={Array.isArray(comSollicitationsPending
                    ) ? n => `${n} opérateur(s) trouvé(s)`: null}
                    renderItem={list => (
                        <>
                            {Array.isArray(list.operators) ? (
                                <>
                                    {list.operators.length === 0 ? (
                                        <div>
                                            <EmptyResult message="Aucuns operateurs trouvés" />
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-hover table-middle mb-0 text-center">
                                                <thead>
                                                <tr>
                                                    <th>Noms et prénom</th>
                                                    <th>Adresse email</th>
                                                    {/* <th>Section parent</th> */}
                                                    <th>Numero de téléphone</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {list && list.operators.map((item, key) => (
                                                        <tr
                                                            key={key}
                                                            className="cursor-pointer">
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{item.commercialName}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{item.user.email}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{item.user.phone}</h4>
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
                                                                        >Selectionner
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <RctCard customClasses="profile-head">
                                    <div className="profile-top">
                                        <img src={require('Assets/img/profile-bg.jpg')}
                                             alt="profile banner" width="1920" height="200" />
                                    </div>
                                    <div className="profile-bottom border-bottom">
                                        <div className="user-image text-center mb-30">
                                            <img
                                                width="110"
                                                height="110"
                                                alt="user images"
                                                className="img-fluid rounded-circle rct-notify mx-auto"
                                                src={!list.operators.user.avatar ? require('Assets/avatars/profile.jpg') : list.operators.user.avatar}
                                            />
                                        </div>
                                        <div className="user-list-content">
                                            <div className="text-center">
                                                <h3 className="fw-bold">{list.operators.commercialName}</h3>
                                                <p>{list.operators.user.userType}</p>
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
                                                <span>{list.operators.user.phone ? list.operators.user.phone : 'Add phone number' }</span>
                                            </li>
                                            <li className="list-inline-item">
                                                    <span className="fw-bold">
                                                        <i className="zmdi zmdi-email"></i>
                                                    </span>
                                                <span>{list.operators.user.email}</span>
                                            </li>
                                            <li className="list-inline-item">
                                                    <span className="fw-bold">
                                                        <i className="zmdi zmdi-pin"></i>
                                                    </span>
                                                <span>{list.operators.user.nationality}</span>
                                            </li>
                                            { list.status === Status.PENDING ? <li className="list-inline-item">
                                                <span>Requête en cours...</span>
                                            </li> : null}
                                            <li className="list-inline-item">
                                                <div className="media">
                                                    <div className="media-body pt-10">
                                                        { list.status === Status.ACCEPTED ? <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold bg-blue"
                                                            style={{ marginRight: 10 }}
                                                            onClick={() => this.removeOperator()}
                                                        >
                                                            Destituer l'opérateur
                                                        </Button> : list.status === Status.PENDING ?
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                className="text-white font-weight-bold bg-danger"
                                                                style={{ marginRight: 10 }}
                                                                onClick={() => this.cancelOperator(list.operators.user.profile.id)}
                                                            >
                                                                Annuler l'opérateur
                                                            </Button> : null}
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </RctCard>
                            )}
                        </>
                    )}
                />
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace, comSollicitationsPending }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        communitySpace: communitySpace,
        loading: comSollicitationsPending.loading,
        comSollicitationsPending: comSollicitationsPending.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction, getAllOperators })(withRouter(injectIntl(List)));

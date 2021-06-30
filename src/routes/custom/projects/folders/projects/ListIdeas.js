import { projects } from "Data";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { joinUrlWithParamsId, PROJECTS } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction, getUsersBooks } from "Actions";
import Button from '@material-ui/core/Button';

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = PROJECTS.FOLDERS.PROJECTS;

    state = {
        ideas: []
    }

    componentDidMount() {
        this.props.setRequestGlobalAction(true)
        getUsersBooks('PERSONNAL_IDEA').then(data => {
            this.setState({ ideas: data })
        }).finally(() => {
            this.props.setRequestGlobalAction(false)
        })
    }

    render() {
        const { intl, history } = this.props;
        const { ideas } = this.state;

        return (
            <>
                <CustomList
                    list={ideas}
                    loading={false}
                    // titleList={"Mes projets"}
                    itemsFoundText={n => `${n} idée.s trouvée.s`}
                    onAddClick={() => history.push(this.baseUrl.CREATE_IDEAS)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucune idée trouvée
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Titre</th>
                                                    <th>Type</th>
                                                    {/* <th>Description</th> */}
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr
                                                        key={key}
                                                        className="cursor-pointer"
                                                    >
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{item.title}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Idée personnelle</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {/* <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.description}</h4>
                                                                </div>
                                                            </div>
                                                        </td> */}
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <Button
                                                                        color="primary"
                                                                        variant="contained"
                                                                        className="text-white font-weight-bold"
                                                                        style={{ marginRight: 10 }}
                                                                        // onClick={() => this.onItemClick(item.id)}
                                                                    >
                                                                        Voir le détails
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
                    )}
                />
            </>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(List)));

import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import Button from "@material-ui/core/Button";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import TimeFromMoment from "Components/TimeFromMoment";
import {setRequestGlobalAction, getUsersBooks} from "Actions";
import {PROJECTS, joinUrlWithParamsId} from "Url/frontendUrl";

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = PROJECTS.FOLDERS.WORKS;
    state = {
        books: []
    }

    componentDidMount() {
        this.props.setRequestGlobalAction(true);
        getUsersBooks().then(data => {
            this.setState({ books: data })
        }).finally(() => this.props.setRequestGlobalAction(false))
    }

    onUpdate(id) {
        this.props.history.push(joinUrlWithParamsId(PROJECTS.FOLDERS.WORKS.UPDATE, id))
    }

    render() {
        const { intl, history } = this.props;
        const { books } = this.state;

        return (
            <>
                <CustomList
                    list={books}
                    loading={false}
                    titleList={"Structures projets"}
                    itemsFoundText={n => intl.formatMessage({id: "projects.configuration.works.found"}, {count: n})}
                    onAddClick={() => history.push(this.baseUrl.CREATE)}
                    /*addPermissions={{
                        permissions: [Permission.roles.createOne.name],
                    }}*/
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        <IntlMessages id="projects.configuration.works.found" values={{count: 0}} />
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Titre du type d'ouvrage</th>
                                                {/*<th>Contenu</th>*/}
                                                <th>Type d'Ouvrage Parent</th>
                                                <th>Date de création</th>
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
                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{item.title}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            {item.parent ? (
                                                                <h4 className="m-0 fw-bold text-dark">{ item.parent.title}</h4>
                                                            ) : (
                                                                <h4 className="m-0 fw-bold text-dark">&#x0005F;</h4>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <TimeFromMoment time={item.createdAt} showFullDate/>
                                                        </div>
                                                    </div>
                                                </td>
                                                    <td>
                                                        <Button
                                                            size="small"
                                                            color="primary"
                                                            variant="contained"
                                                            className={"text-white font-weight-bold mr-3 bg-blue"}
                                                            onClick={() => this.onUpdate(item.id)}
                                                        >
                                                            Editer
                                                        </Button>
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
const mapStateToProps = ({ requestGlobalLoader, authUser  }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(withRouter(injectIntl(List)));

import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import {PROJECTS} from "Url/frontendUrl";
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction, getAllPostProject} from "Actions";

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = PROJECTS.POST_PROJETS;

    state = {
        posts: []
    }

    componentDidMount() {
        setRequestGlobalAction(true)
        getAllPostProject(this.props.authUser.branchId).then(data => {
            this.setState({ posts: data })
        }).finally(() => {
            setRequestGlobalAction(false)
        })
    }

    render() {
        const { intl, history } = this.props;
        const { posts } = this.state;

        return (
            <>
                <CustomList
                    list={posts}
                    loading={false}
                    titleList={"Poste Projets"}
                    itemsFoundText={n => intl.formatMessage({id: "projects.found"}, {count: n})}
                    onAddClick={() => history.push(this.baseUrl.CREATE)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div>
                                    <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Titre</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            
                                            </tbody>
                                        </table>
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            <IntlMessages id="projects.found" values={{count: 0}} />
                                        </h4>
                                    </div>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>Titre</th>
                                                <th>Description</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.title}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.description}</h4>
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
const mapStateToProps = ({ requestGlobalLoader, authUser  }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data
    }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(withRouter(injectIntl(List)));

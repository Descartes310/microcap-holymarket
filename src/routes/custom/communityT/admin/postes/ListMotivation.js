import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { COMMUNITY_ADMIN, joinUrlWithParamsId } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction, getMotivations } from "Actions";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = COMMUNITY_ADMIN.POST.MOTIVATION;

    state = {
        posts: []
    }

    componentDidMount() {
        this.getPostMotivations();
    }

    getPostMotivations = () => {
        console.log(this.props.match.params.id)
        setRequestGlobalAction(true)
        getMotivations(this.props.match.params.id, this.props.communitySpace.data).then(data => {
            this.setState({ posts: data })
        }).finally(() => {
            setRequestGlobalAction(false)
        })
    }

    render() {
        const { history, match } = this.props;
        const { posts } = this.state;

        return (
            <div className="page-list">
                <PageTitleBar title={"Liste des motivations"} enableBreadCrumb={true} match={this.props.match} history={history} />
                <CustomList
                    list={posts}
                    loading={false}
                    itemsFoundText={n => `${n} motivation(s) trouvée(s)`}
                    onAddClick={() => history.push(joinUrlWithParamsId(this.baseUrl.CREATE, match.params.id))}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div>
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th>Titre</th>
                                                <th>Description</th>
                                                <th>Categorie associée</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucunes motivations trouvées
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
                                                    <th>Categorie associée</th>
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
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.post.title}</h4>
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

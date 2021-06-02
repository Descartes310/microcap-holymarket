import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { AbilityContext } from "Permissions/Can";
import EmptyResult from "Components/EmptyResult";
import { setRequestGlobalAction, getMotivations } from "Actions";
import {COMMUNITY_ADMIN, joinUrlWithParams, joinUrlWithParamsId} from "Url/frontendUrl";

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = COMMUNITY_ADMIN.POST.MOTIVATION;

    state = {
        loading: true,
        posts: []
    };

    componentDidMount() {
        if (!this.props.location.state || (this.props.location.state && !this.props.location.state.post)) {
            this.props.history.push(joinUrlWithParamsId(COMMUNITY_ADMIN.POST.SELF, this.props.match.params.id));
        } else this.getPostMotivations();
    }

    getPostMotivations = () => {
        this.setState({loading: true});
        getMotivations(this.props.match.params.postId)
            .then(data => {
                this.setState({ posts: data });
            })
            .finally(() => {this.setState({loading: false})})
    };

    onAddClick = () => {
        this.props.history.push(joinUrlWithParams(this.baseUrl.CREATE, [
            {param: 'id', value: this.props.match.params.id},
            {param: 'postId', value: this.props.match.params.postId},
        ]));
    };

    render() {
        const { posts, loading, post } = this.state;

        return (
            <div className="page-list">
                <CustomList
                    list={posts}
                    loading={loading}
                    titleList="Liste des motivations"
                    onAddClick={() => this.onAddClick()}
                    itemsFoundText={n => `${n} motivation(s) trouvée(s)`}
                    addingButton={this.props.location.state ? this.props.location.state.post ? this.props.location.state.post.native : true : true}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <EmptyResult message="Aucunes motivations trouvées" />
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

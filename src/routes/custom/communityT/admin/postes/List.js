import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import { AbilityContext } from "Permissions/Can";
import { setRequestGlobalAction, getGroupPosts } from "Actions";
import {COMMUNITY_ADMIN, joinUrlWithParams, joinUrlWithParamsId} from "Url/frontendUrl";

class List extends Component {
    static contextType = AbilityContext;

    communitySpaceId = this.props.match.params.id;

    baseUrl = COMMUNITY_ADMIN.POST;

    state = {
        loading: true,
        posts: []
    };

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        this.setState({loading: true});
        getGroupPosts(this.props.communitySpace.data)
            .then(data => {
                this.setState({ posts: data });
            }).finally(() => {
                this.setState({loading: false});
            });
    };

    goToMotivation = (post) => {
        this.props.history.push(
            joinUrlWithParams(
                this.baseUrl.MOTIVATION.LIST,
            [
                {param: 'postId', value: post.id},
                {param: 'id', value: this.communitySpaceId}
            ]),
            {post: post}
        );
    };

    render() {
        const { history } = this.props;
        const { loading, posts } = this.state;

        return (
            <div className="">
                <CustomList
                    list={posts}
                    loading={loading}
                    titleList={"Categories de membre"}
                    itemsFoundText={n => `${n} catégorie(s) trouvée(s)`}
                    onAddClick={() => history.push(joinUrlWithParamsId(this.baseUrl.CREATE, this.communitySpaceId))}
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
                                            Aucunes catégories trouvées
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
                                                    <th>Actions</th>
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
                                                                    <Button
                                                                        color="primary"
                                                                        disabled={item.native}
                                                                        variant="contained"
                                                                        className="text-white font-weight-bold bg-blue"
                                                                        style={{ marginRight: 10 }}
                                                                        onClick={() => this.goToMotivation(item)}
                                                                    >
                                                                        Motivations
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

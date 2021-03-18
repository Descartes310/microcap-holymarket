import { projects } from "Data";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { joinUrlWithParamsId, PROJECTS } from "Url/frontendUrl";
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from "Actions";
import { getAllProjectReaction } from "Actions/independentActions";

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = PROJECTS.FOLDERS.REACTIONS;

    state = {
        reactions: [],
        loading: true
    }

    componentDidMount() {
        getAllProjectReaction(this.props.communitySpace.data).then( data => {
            this.setState({ reactions: data })
        }).finally(() => this.setState({ loading: false }));
    }

    getTypeLabel = (type) => {
        const item = projects.initialisationOptions.find(i => i.value === type);
        return item ? item.name : '';
    };

    onItemClick = (projectId) => {
        // this.props.history.push(joinUrlWithParamsId(this.baseUrl.SHOW, projectId));
    };

    render() {
        const { communitySpace, history } = this.props;
        const { reactions, loading } = this.state;

        return (
            <>
                <CustomList
                    list={reactions}
                    loading={loading}
                    titleList={"Activités sur le projet"}
                    itemsFoundText={() => 'Activités trouvé.e.s'}
                    onAddClick={() => history.push(this.baseUrl.CREATE)}
                    renderItem={reactions => (
                        <>
                            {reactions && reactions.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Activités trouvé.e.s
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Titre</th>
                                                    <th>Type</th>
                                                    <th>Contenu</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reactions && reactions.map((item, key) => (
                                                    <tr
                                                        key={key}
                                                        className="cursor-pointer"
                                                        onClick={() => this.onItemClick(item.id)}
                                                    >
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
                                                                    <h4 className="m-0 fw-bold text-dark">{item.type}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{item.content}</h4>
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
const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        communitySpace
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(List)));

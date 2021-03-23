import { projects } from "Data";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import { AbilityContext } from "Permissions/Can";
import { setRequestGlobalAction } from "Actions";
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { joinUrlWithParamsId, PROJECTS } from "Url/frontendUrl";
import { getAllProjectReaction } from "Actions/independentActions";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

class List extends Component {
    static contextType = AbilityContext;
    baseUrl = PROJECTS.FOLDERS.REACTIONS;

    state = {
        reactions: [],
        loading: true,
        showBox: false,
        selectedItem: {}
    }

    componentDidMount() {
        getAllProjectReaction(this.props.communitySpace.data).then(data => {
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
        const { reactions, loading, showBox, selectedItem } = this.state;

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
                                                    <th>Action</th>

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
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                className="text-white font-weight-bold bg-blue"
                                                                style={{ marginRight: 10 }}
                                                                onClick={() => { this.setState({ showBox: true, selectedItem: item }) }}
                                                            >
                                                                Consulter
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
                <Dialog
                    open={showBox}
                    onClose={() => { this.setState({ showBox: false }) }}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth={'md'}
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        <div className="row justify-content-between align-items-center">
                            Contenu de l'activité
                            <IconButton
                                color="primary"
                                aria-label="close"
                                className="text-danger"
                                onClick={() => { this.setState({ showBox: false }) }}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                        <span dangerouslySetInnerHTML={{
                            __html: selectedItem.content
                        }}></span>
                    </DialogContent>
                </Dialog>
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

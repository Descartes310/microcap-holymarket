import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { SETTINGS } from "Url/frontendUrl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import CustomList from "Components/CustomList";
import { getAllPostProject, setRequestGlobalAction } from "Actions";

class List extends Component {
    static contextType = AbilityContext;

    state = {
        data: [],
    };

    componentDidMount() {
        this.props.getAllPostProject(this.props.authUser.branchId)
        .then(result => {
            if (result) {
                this.setState({data: result});
            }
        });
    }

    handleOnClick = item => {
        this.setState({ selectedNotification: item, show: true });
    };

    createCGU = () => {
        createBranchCGU({
            file: this.state.file,
        }, { fileData: ['file'], multipart: true }).then(data => {
            this.setState({ show: false })
            getAllSettings(this.props.authUser.user.branch.id).then(data => {
                this.setState({ data })
            })
        });
    };

    render() {
        const { data } = this.state;
        return (
            <>
                <CustomList
                    list={data}
                    titleList={"Catégories membres communautés"}
                    onAddClick={() => this.props.history.push(SETTINGS.POST.CREATE)}
                    itemsFoundText={n => `${n} catégories trouvées`}
                    /*addPermissions={{
                        permissions: [Permission.userProfile.createOne.name],
                    }}*/
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucune catégories trouvées
                                    </h4>
                                </div>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th><IntlMessages id="components.name" /></th>
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

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});

// map state to props
const mapStateToProps = ({ requestGlobalLoader, projectWorks, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        projectWorks
    }
};

export default connect(mapStateToProps, { getAllPostProject, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(List))));

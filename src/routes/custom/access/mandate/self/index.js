import Create from "./Create";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {withStyles} from "@material-ui/core";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import {getMandate, getMandateOfUser, setRequestGlobalAction} from "Actions";
import TimeFromMoment from "Components/TimeFromMoment";
import UserType from "Enums/UserType";

class MandateList extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);

        this.userDoesNotHaveRight = !this.props.authUser.isExploitant() && !this.props.authUser.isManager();

        this.state = {
            showCreateBox: false,
        }
    }

    componentDidMount() {
        if (this.userDoesNotHaveRight) {
            this.props.getMandateOfUser(this.props.authUser.user.id);
        } else {
            this.props.getMandate(this.props.authUser.branchId);
        }
    }

    render() {
        const { mandate, loading, error } = this.props;
        const { showCreateBox } = this.state;

        return (
            <>
                {/* {!this.userDoesNotHaveRight && ( */}
                    <Create
                        show={showCreateBox}
                        onClose={() => this.setState({showCreateBox: false})}
                    />
                {/* )} */}
                <CustomList
                    error={error}
                    list={mandate}
                    loading={loading}
                    onAddClick={ () => this.setState({showCreateBox: true}) }
                    itemsFoundText={n => `${n} mandat(s) trouvés`}
                    /*addPermissions={{
                        permissions: [Permission.userProfile.createOne.name],
                    }}*/
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun mandat trouvés
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th><IntlMessages id="components.name" /></th>
                                                <th>
                                                    Model de mandat
                                                </th>
                                                <th>
                                                    Date de création du model
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-left media-middle mr-15">
                                                            {/*<img src={item.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                        </div>
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.user.email}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.mandateModel.name}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <TimeFromMoment
                                                                time={item.mandateModel.createdAt}
                                                            />
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
const mapStateToProps = ({ requestGlobalLoader, mandate, authUser  }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: mandate.loading,
        mandate: mandate.data,
        error: mandate.error
    }
};

export default connect(mapStateToProps, {getMandate, getMandateOfUser, setRequestGlobalAction})
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(MandateList))));

import Create from "./Create";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import Permission from "Enums/Permissions";
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {withStyles} from "@material-ui/core";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import {getMandateType, setRequestGlobalAction} from "Actions";

class MandateTypeList extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);
        this.state = {
            showCreateBox: false,
        }
    }

    componentDidMount() {
        this.props.getMandateType(this.props.authUser.branchId);
    }

    render() {
        const { mandateType, loading, error } = this.props;
        const { showCreateBox } = this.state;

        return (
            <>
                {/*{this.context.can(Permission.userProfile.createOne.name, Permission) && (*/}
                    <Create
                        show={showCreateBox}
                        onClose={() => this.setState({showCreateBox: false})}
                    />
                {/*)}*/}
                <CustomList
                    error={error}
                    loading={loading}
                    list={mandateType}
                    onAddClick={() => this.setState({showCreateBox: true})}
                    itemsFoundText={n => `${n} type de mandat trouvés`}
                    /*addPermissions={{
                        permissions: [Permission.userProfile.createOne.name],
                    }}*/
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun type de mandat trouvés
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                            <tr>
                                                <th><IntlMessages id="components.name" /></th>
                                                <th><IntlMessages id="widgets.description" /></th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
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
const mapStateToProps = ({ requestGlobalLoader, mandateType, authUser  }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: mandateType.loading,
        mandateType: mandateType.data,
        error: mandateType.error
    }
};

export default connect(mapStateToProps, {getMandateType, setRequestGlobalAction})
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(MandateTypeList))));

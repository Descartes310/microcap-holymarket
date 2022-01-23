import Create from "./Create";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import Permission from "Enums/Permissions.tsx";
import {withRouter} from "react-router-dom";
import IntlMessages from 'Util/IntlMessages';
import {withStyles} from "@material-ui/core";
import {AbilityContext} from "Permissions/Can";
import CustomList from "Components/CustomList";
import {getMandateType, getMandateModel, setRequestGlobalAction} from "Actions";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import SingleTitleText from "Components/SingleTitleText";
import {NotificationManager} from "react-notifications";
import {ERROR_500} from "Constants/errors";

class List extends Component {
    static contextType = AbilityContext;
    constructor(props) {
        super(props);
        this.state = {
            selectedMandateType: "",
            showCreateBox: false,
        }
    }

    componentDidMount() {
        this.props.getMandateType(this.props.authUser.branchId)
            .then(result => {
                if (result && result.length > 0) this.onMandateTypeChange(result[0].id);
            });
    }

    onMandateTypeChange = (newValue) => {
        if (this.state.selectedMandateType !== newValue) {
            this.setState({selectedMandateType: newValue, loadingState: true}, () => {
                this.props.getMandateModel(this.state.selectedMandateType, this.props.authUser.branchId);
            });
        }
    };

    onFinishCreation = () => {
        this.setState({showCreateBox: false});
        this.props.getMandateModel(this.state.selectedMandateType, this.props.authUser.branchId);
    };

    render() {
        const { mandateType, loading, error, mandateModel } = this.props;
        const { showCreateBox, selectedMandateType } = this.state;

        if (loading) {
            return (<RctSectionLoader/>);
        }

        if (!mandateType || (mandateType && mandateType.length === 0)) {
            return (<SingleTitleText
                text="Veuillez d'abord créer un type de mandat"
            />)
        }

        return (
            <>
                {/*{this.context.can(Permission.userProfile.createOne.name, Permission) && (*/}
                <Create
                    show={showCreateBox}
                    mandateTypeId={selectedMandateType}
                    onClose={() => this.onFinishCreation()}
                />
                {/*)}*/}
                <CustomAsyncComponent
                    loading={loading}
                    data={mandateType}
                    component={data => (
                        <div className="form-group text-left mb-3">
                            <FormControl fullWidth>
                                <InputLabel className="text-left" htmlFor="operator-helper">
                                    Type de mandat
                                </InputLabel>
                                <Select
                                    value={selectedMandateType}
                                    onChange={event => this.onMandateTypeChange(event.target.value)}
                                    input={<Input name="operator" id="operator-helper" />}>
                                    {data.map((item, index) => (
                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    )}
                />
                {selectedMandateType !== "" && (
                    <CustomList
                        error={error}
                        loading={mandateModel.loading}
                        list={mandateModel.data}
                        onAddClick={() => this.setState({showCreateBox: true})}
                        itemsFoundText={n => `${n} modele(s) de mandat trouvés`}
                        /*addPermissions={{
                            permissions: [Permission.userProfile.createOne.name],
                        }}*/
                        renderItem={list => (
                            <>
                                {list && list.length === 0 ? (
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucun modele de mandat trouvés
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
                )}
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
const mapStateToProps = ({ requestGlobalLoader, mandateType, mandateModel, authUser  }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        loading: mandateType.loading,
        mandateType: mandateType.data,
        error: mandateType.error,
        mandateModel: mandateModel,
    }
};

export default connect(mapStateToProps, {getMandateType, getMandateModel, setRequestGlobalAction})
(withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(List))));

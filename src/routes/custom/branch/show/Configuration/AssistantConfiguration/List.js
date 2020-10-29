/**
 * Employ Payroll
 */
import React, { Component, Fragment } from 'react';
import update from 'react-addons-update';
import {Badge, FormGroup, Input} from 'reactstrap';

// api
import api from 'Api';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

// intl messages
import {connect} from "react-redux";
import IntlMessages from 'Util/IntlMessages';
import {getAllAssistantForOneBranch} from "Actions";
import {injectIntl} from "react-intl";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import NetworkBranchIntlMessages from "Components/NetworkBranchIntlMessages";
import IconButton from "@material-ui/core/IconButton";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import _ from 'lodash';
import {NotificationManager} from "react-notifications";

class NetworkProfileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'withParent',
            assistants: null,
        }
    }

    componentDidMount() {
        this.getAllNetworkProfilePartnership();
    }

    getAllNetworkProfilePartnership = () => {
        getAllAssistantForOneBranch(this.props.authUser.branch.id)
            .then(result => this.setState({assistants: result}))
            .catch(error => {
                NotificationManager.error(this.props.intl.formatMessage({id: 'error.500'}));
                this.setState({assistants: []})
            })
            .finally(() => this.setState({loading: false}));
    };

    handleOrder = (value, data) => {
        if (value !== 'none') {
            // Apply order feature
            return _.sortBy(data, 'profileParent');
        }

        return data;
    };

    render() {
        const { assistants, loading } = this.state;

        let orderedItems = this.handleOrder(this.state.order, assistants);

        return (
            <div className="mx-4">
                {loading || orderedItems === null
                    ? (<RctSectionLoader />)
                    : orderedItems.length === 0
                        ? (
                            <RctCollapsibleCard>
                                <IntlMessages id="list.noThingToDisplay" values={{thing: this.props.intl.formatMessage({id: 'branch.assistantConfiguration'})}} />
                            </RctCollapsibleCard>
                        )
                        : (
                            <>
                                <div className="row justify-content-between mb-15">
                                    <div className="col-md-3 col-sm-8">
                                        <div className="form-group">
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="uncontrolled">
                                                    <IntlMessages id="list.sortBy" />
                                                </InputLabel>
                                                <Select
                                                    id="uncontrolled"
                                                    className="mt-0"
                                                    value={this.state.order}
                                                    onChange={(event) => this.setState({order: event.target.value})}
                                                >
                                                    <MenuItem value="withParent">
                                                        <IntlMessages id="branch.withParent" />
                                                    </MenuItem>
                                                    <MenuItem value="withoutParent">
                                                        <IntlMessages id="branch.withoutParent" />
                                                    </MenuItem>
                                                    <MenuItem value="none">
                                                        <IntlMessages id="general.none" />
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-4 center-holder text-right">
                                        <p><NetworkBranchIntlMessages id="branch.found" values={{count: orderedItems.length}}/> </p>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0 text-center">
                                        <thead>
                                        <tr>
                                            <th><IntlMessages id="widgets.profile" /></th>
                                            <th><IntlMessages id="general.parentProfile" /></th>
                                            <th><IntlMessages id="widgets.action" /></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {orderedItems && orderedItems.map((networkProfile, key) => (
                                            <tr key={key}>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-left media-middle mr-15">
                                                            {/*<img src={networkProfile.label} alt="user profile" className="media-object rounded-circle" width="35" height="35" />*/}
                                                        </div>
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{networkProfile.networkProfile.name}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{networkProfile.networkProfile.profileParent ? networkProfile.networkProfile.profileParent.label : '—'}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="table-action">
                                                    {/*<a
                                                        href="#"
                                                        // onClick={(e) => this.onCheckBoxClick(e, employee)}
                                                    >
                                                        <i className="ti-eye"/>
                                                    </a>*/}
                                                    {/*<IconButton
                                                        color="inherit"
                                                        className="bg-blue text-white mr-3"
                                                        // onClick={this.handleDrawerToggle}
                                                    >
                                                        <i className="zmdi zmdi-eye font-sm"/>
                                                    </IconButton>*/}
                                                    <IconButton
                                                        color="inherit"
                                                        aria-label="open drawer"
                                                        className="bg-danger text-white mr-3"
                                                        // onClick={this.handleDrawerToggle}
                                                    >
                                                        <i className="zmdi zmdi-delete font-sm"/>
                                                    </IconButton>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )
                }
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ networkProfile, authUser  }) => {
    return { authUser: authUser.data, loading: networkProfile.loading, networkProfiles: networkProfile.data, error: networkProfile.error }
};

export default connect(mapStateToProps, {})(injectIntl(NetworkProfileList));

import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React, {Component} from 'react';
import {PROJECTS} from "Url/frontendUrl";
import {ERROR_500} from "Constants/errors";
import {withRouter} from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import Select from "@material-ui/core/Select/Select";
import {NotificationManager} from "react-notifications";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import {Button, Form, FormGroup, Input as InputStrap} from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {createProjectStandardPresentation, setRequestGlobalAction, getProjectStandard} from "Actions";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            standardId: '-1',
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.props.getProjectStandard(this.props.authUser.branchId)
            .then(result => {
                if (result) {
                    this.setState({standardId: result[0] ? +result[0].id : ''});
                }
            });
    };

    handleOnFormChange = (field, value) => {
        this.setState({[field]: value});
    };

    validate = () => {
        if (this.state.label.length === 0) {
            NotificationManager.error(this.props.intl.formatMessage({id: 'form.error.verify.name'}));
            return false;
        }

        if (this.state.standardId.length === 0) {
            NotificationManager.error("Vous devez selectionner un standard de présentation");
            return false;
        }

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            const data = {
                name: this.state.label,
                standardId: Number(this.state.standardId),
                branchId: this.props.authUser.branchId,
            };

            createProjectStandardPresentation(data)
                .then(() => {
                    NotificationManager.success("Présentation créée avec succès");
                    this.props.history.push(PROJECTS.CONFIGURATION.STANDARD.PRESENTATION.LIST);
                })
                .catch(() => null)
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    onBackClick = () => {
        this.props.history.push(PROJECTS.CONFIGURATION.STANDARD.PRESENTATION.LIST);
    };

    render() {
        const { intl, match, history, projectStandard } = this.props;

        return (
            <>
                <div className="my-3 pl-3 page-title m-0">
                    <i onClick={this.onBackClick} className="ti-angle-left cursor-pointer mr-2 icon-hover d-inline-flex"/>
                    <h3 className="font-lg d-inline-flex">
                        Création d'une présentation
                    </h3>
                </div>
                <div className="full-height row">
                    <div className="col-md-12 col-sm-12 pr-md-40">
                        <RctCollapsibleCard>
                            <Form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="label">
                                            Nom
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="label"
                                            name={'label'}
                                            value={this.state.label}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('label', event.target.value)}
                                        />
                                        <span className="has-icon"><i className="ti-pencil"/></span>
                                    </FormGroup>

                                    <CustomAsyncComponent
                                        loading={false}
                                        data={projectStandard.data}
                                        component={data => (
                                            <FormGroup className="col-sm-12 has-wrapper">
                                                <InputLabel className="text-left" htmlFor="description">
                                                    Standard
                                                </InputLabel>
                                                <Select
                                                    value={this.state.standardId}
                                                    onChange={event => this.setState({ standardId: event.target.value })}
                                                    input={<Input name="institution" id="institution-helper" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                            {item.title}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormGroup>
                                        )}
                                    />
                                </div>

                                <div className="row">
                                    <Button
                                        color="primary"
                                        className="fw-bold btn-submit text-white"
                                        onClick={() => this.onSubmit()}
                                    >
                                        <i className="fw-bold ti-check mr-2" />
                                        <IntlMessages id="button.submit" />
                                    </Button>
                                </div>

                            </Form>
                        </RctCollapsibleCard>
                    </div>
                </div>
            </>
        );
    }
}

Create.propTypes = {

};

const mapStateToProps = ({ requestGlobalLoader, authUser, projectStandard }) => {
    return {
        projectStandard,
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, {setRequestGlobalAction, getProjectStandard})(withRouter((injectIntl(Create))));

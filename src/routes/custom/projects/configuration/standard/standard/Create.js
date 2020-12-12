import {connect} from "react-redux";
import {PROJECTS} from "Url/frontendUrl";
import {injectIntl} from "react-intl";
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import {NotificationManager} from "react-notifications";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {createProjectStandard, setRequestGlobalAction} from "Actions";
import {Button, Form, FormGroup, Input as InputStrap} from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {ERROR_500} from "Constants/errors";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            title: false,
            subTitle: false,
            paragraph: false,
            subParagraph: false,
            image: false,
            table: false,
            description: '',
        }
    }

    handleOnFormChange = (field, value) => {
        this.setState({[field]: value});
    };

    validate = () => {
        if (this.state.label.length === 0) {
            NotificationManager.error(this.props.intl.formatMessage({id: 'form.error.verify.name'}));
            return false;
        }

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            const data = {
                branchId: this.props.authUser.branchId,
                title: this.state.label,
                hasTitle: this.state.title,
                hasSubTitle: this.state.subTitle,
                hasParagraph: this.state.paragraph,
                hasSubParagraph: this.state.subParagraph,
                hasImage: this.state.image,
                hasTable: this.state.table,
            };
            createProjectStandard(data)
                .then(() => {
                    NotificationManager.success("Standard de configuraiton effectué avec succès");
                    this.props.history.push(PROJECTS.CONFIGURATION.STANDARD.LIST);
                })
                .catch(() => {
                    NotificationManager.error(ERROR_500);
                })
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    onBackClick = () => {
        this.props.history.push(PROJECTS.CONFIGURATION.STANDARD.LIST);
    };

    render() {
        const { intl, match, history } = this.props;
        const { label, description, title, subTitle, paragraph, subParagraph, image, table } = this.state;

        return (
            <>
                <div className="my-3 pl-3 page-title m-0">
                    <i onClick={this.onBackClick} className="ti-angle-left cursor-pointer mr-2 icon-hover d-inline-flex"/>
                    <h3 className="font-lg d-inline-flex">
                        Création d'un standard de présentation
                    </h3>
                </div>
                <div className="full-height row">
                    <div className="col-md-12 col-sm-12 pr-md-40">
                        <RctCollapsibleCard>
                            <Form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="label">
                                            Désignation du modèle
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="label"
                                            name={'label'}
                                            value={label}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('label', event.target.value)}
                                        />
                                        <span className="has-icon"><i className="ti-pencil"/></span>
                                    </FormGroup>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <InputLabel className="text-left" htmlFor="label">
                                            Niveau de détails
                                        </InputLabel>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={title}
                                                onChange={() => this.handleOnFormChange('title', !title)}
                                            />
                                        } label={"Titre"}
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={subTitle}
                                                onChange={() => this.handleOnFormChange('subTitle', !subTitle)}
                                            />
                                        } label={"Sous-titre"}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={paragraph}
                                                onChange={() => this.handleOnFormChange('paragraph', !paragraph)}
                                            />
                                        } label={"Paragraphe"}
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={subParagraph}
                                                onChange={() => this.handleOnFormChange('subParagraph', !subParagraph)}
                                            />
                                        } label={"Sous-paragraphe"}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={image}
                                                onChange={() => this.handleOnFormChange('image', !image)}
                                            />
                                        } label={"Illustration image"}
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={table}
                                                onChange={() => this.handleOnFormChange('table', !table)}
                                            />
                                        } label={"Illustration tableau"}
                                        />
                                    </div>
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

const mapStateToProps = ({ requestGlobalLoader, authUser  }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(withRouter((injectIntl(Create))));

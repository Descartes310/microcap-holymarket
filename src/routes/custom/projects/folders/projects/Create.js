import ReactQuill from 'react-quill';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { PROJECTS } from "Url/frontendUrl";
import { ERROR_500 } from "Constants/errors";
import { withRouter } from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import { NotificationManager } from "react-notifications";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { Button, Form, FormGroup, Input as InputStrap } from 'reactstrap';
import { createProjectWork, setRequestGlobalAction, getUsersBooks } from "Actions";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        // ['link', 'image'],
        ['clean'],
        [{ 'align': [] }],
        ['code-block']
    ],
};

const formats = [
    'header',
    'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'align',
    'code-block'
];

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            description: '',
            parentId: '-1',
            books: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.props.setRequestGlobalAction(true);
        getUsersBooks().then(data => {
            this.setState({ books: data })
        }).finally(() => this.props.setRequestGlobalAction(false))
    };

    handleOnFormChange = (field, value) => {
        this.setState({ [field]: value });
    };

    validate = () => {
        if (this.state.label.length === 0) {
            NotificationManager.error(this.props.intl.formatMessage({ id: 'form.error.verify.name' }));
            return false;
        }

        /*if (this.state.description.length === 0) {
            NotificationManager.error(this.props.intl.formatMessage({id: 'form.error.verify.description'}));
            return false;
        }*/

        return true;
    };

    onSubmit = () => {
        if (this.validate()) {
            this.props.setRequestGlobalAction(true);
            const data = {
                title: this.state.label,
                type: 'PERSONNAL_IDEA',
                description: this.state.description,
                branchId: this.props.authUser.branchId,
                admin: false
            };

            createProjectWork(data)
                .then(() => {
                    NotificationManager.success("Idée créée avec succès");
                    this.props.history.push(PROJECTS.FOLDERS.PROJECTS.IDEAS);
                })
                .catch(() => {
                    NotificationManager.error(ERROR_500);
                })
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    render() {
        const { match, history } = this.props;
        const { books } = this.state;

        return (
            <>
                {/* <PageTitleBar
                    match={match}
                    history={history}
                    title={"Création d'une idée personnelle"}
                /> */}
                <div className="full-height row">
                    <div className="col-md-12 col-sm-12 pr-md-40">
                        <RctCollapsibleCard>
                            <Form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="label">
                                            Titre
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="label"
                                            name={'label'}
                                            value={this.state.label}
                                            className="has-input input-lg input-border"
                                            onChange={event => this.handleOnFormChange('label', event.target.value)}
                                        />
                                        <span className="has-icon"><i className="ti-pencil" /></span>
                                    </FormGroup>

                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left">
                                            Description
                                        </InputLabel>
                                        <ReactQuill modules={modules} onChange={(e) => this.setState({ description: e })} formats={formats} placeholder="Entrez votre description..." />
                                    </FormGroup>
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

const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter((injectIntl(Create))));

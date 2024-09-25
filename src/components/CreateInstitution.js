import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import SettingService from 'Services/settings';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { FormGroup, Input, Button } from 'reactstrap';
import {NotificationManager} from "react-notifications";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class CreateInstitution extends Component {

    state = {
        code: null,
        label: null,
        description: null,
        noAgencyCode: false
    }
  
     constructor(props) {
        super(props);
    }

     generateCode = () => {
        this.props.setRequestGlobalAction(true);
        SettingService.generateCode({nature: 'AGENCY_CODE'})
        .then(response => {
            this.setState({ code: response });
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    onSubmit = () => {

        const { label, code, description } = this.state;

        if(!label || !code) {
            NotificationManager.error("Le formulaire est mal rempli");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let datas = {
            label, code, description, type: this.props.type
        };
         
        UserService.createInstitution(datas).then(() => {
            this.props.onClose();
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error("Ce code est déjà utilisé, veuillez le changer.");
            //this.props.onClose();
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }


    render() {

        const { onClose, show, title } = this.props;
        const { label, code, description, noAgencyCode } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="lg"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <RctCardContent>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Nom
                        </InputLabel>
                        <Input
                            required
                            id="label"
                            type="text"
                            name='label'
                            value={label}
                            className="input-lg"
                            onChange={(e) => this.setState({ label: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="code">
                            Code
                        </InputLabel>
                        <Input
                            required
                            id="code"
                            type="text"
                            name='code'
                            value={code}
                            className="input-lg"
                            disabled={noAgencyCode}
                            onChange={(e) => this.setState({ code: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-12 col-sm-12 mb-20">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={noAgencyCode}
                                onChange={(e) => {
                                    this.setState({ noAgencyCode: e.target.checked }, () => {
                                        if(this.state.noAgencyCode) {
                                            this.generateCode();
                                        }
                                    })
                                }}
                            />
                        } label={"Je n'ai pas de code agence"}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <Input
                            required
                            id="description"
                            type="text"
                            name='description'
                            value={description}
                            className="input-lg"
                            onChange={(e) => this.setState({ description: e.target.value })}
                        />
                    </FormGroup>
                    <Button
                        color="primary"
                        disabled={!label || !code}
                        className="ml-0 text-white float-right"
                        onClick={() => this.onSubmit()}
                    >
                        Enregistrer
                    </Button>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(CreateInstitution)));
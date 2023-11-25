import { connect } from 'react-redux';
import { GROUP, joinUrlWithParamsId } from 'Url/frontendUrl';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import GroupService from 'Services/groups';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);

    const onSubmit = () => {
        if(!label || !startDate || !endDate) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data: any = {
            label, description,
            startDate, endDate,
            reference: props.match.params.id
        }

        props.setRequestGlobalAction(true);
        GroupService.createCampaign(data)
        .then(() => {
            NotificationManager.success("L'element a été créé avec succès");
            props.history.push(joinUrlWithParamsId(GROUP.ADMINISTRATION.PROJECT.FINANCIAL_STRUCTURE.CAMPAIGN_LIST, props.match.params.id));
        }).catch((error) => {
            console.log(error);
            NotificationManager.error("Une erreur est survenue lors de l'element");
        }).finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>

            <PageTitleBar
                title={"Structures financieres"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>                    
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            id="description"
                            type="text"
                            name='description'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="startDate">
                            Date de debut
                        </InputLabel>
                        <InputStrap
                            required
                            id="startDate"
                            type="date"
                            name='startDate'
                            className="input-lg"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="endDate">
                            Date de fin
                        </InputLabel>
                        <InputStrap
                            required
                            id="endDate"
                            type="date"
                            name='endDate'
                            className="input-lg"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));
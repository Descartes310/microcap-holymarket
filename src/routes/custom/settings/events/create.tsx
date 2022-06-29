import { connect } from 'react-redux';
import React, { useState } from 'react';
import { SETTING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import SettingService from 'Services/settings';
import {setRequestGlobalAction} from 'Actions';
import {NotificationManager} from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [endTime, setEndTime] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [description, setDescription] = useState('');

    const onSubmit = () => {

        if(!label || !startDate) {
            NotificationManager.error("Le titre et la date de début sont obligatoires");
            return;
        }
        props.setRequestGlobalAction(true);

        let data: any = {
            label: label,
            start_date: startDate,
        }

        if(description)
            data.description = description;

        if(startTime)
            data.start_time = startTime+':00';

        if(endDate)
            data.endDate = endDate;

        if(endTime)
            data.end_time = endTime+':00';

        SettingService.createEvent(data).then(() => {
            NotificationManager.success("L'évènement a été créé avec succès");
            props.history.push(SETTING.EVENT.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création de l'évènement");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }


    return (
        <>
            <PageTitleBar
                title={"Création d'un évènement"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Titre
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
                    <div className="row">
                        <FormGroup className="col-md-9 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="startDate">
                                Date de début
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
                        <FormGroup className="col-md-3 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="startTime">
                                Heure de début
                            </InputLabel>
                            <InputStrap
                                required
                                id="startTime"
                                type="time"
                                name='startTime'
                                className="input-lg"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="row">
                        <FormGroup className="col-md-9 col-sm-12 has-wrapper">
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
                        <FormGroup className="col-md-3 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="endTime">
                                Heure de fin
                            </InputLabel>
                            <InputStrap
                                required
                                id="endTime"
                                type="time"
                                name='endTime'
                                className="input-lg"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Create));
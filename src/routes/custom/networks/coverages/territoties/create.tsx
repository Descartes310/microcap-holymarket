import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TerritoryService from 'Services/territories';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import { getTerritoryChildrenValue, getTerritoryTypes } from 'Helpers/helpers';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { NETWORK } from 'Url/frontendUrl';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [parent, setParent] = useState(null);
    const [territories, setTerritories] = useState([]);
    const [description, setDescription] = useState('');
    const [parentType, setParentType] = useState(null);


    useEffect(() => {
        getTerritories();
    }, []);

    const getTerritories = () => {
        props.setRequestGlobalAction(true)
        TerritoryService.getAllTerritories()
        .then((response) => setTerritories(response))
        .catch((err) => console.log(err))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(!label) {
            NotificationManager.error('Veuillez renseigner au moins le nom du térritoire');
            return;
        }

        let data: any = {
            label, description
        };

        if(parentType != null) {
            if(parent == null) {
                NotificationManager.error('Veuillez renseigner le térritoire parent');
                return;  
            } else {
                data.parentId = parent.id;
                data.type = getTerritoryChildrenValue(parentType.value);
            }
        } else {
            data.type = 'MAINLAND';
        }

        props.setRequestGlobalAction(true);
        TerritoryService.createTerritory(data)
        .then((response) => {
            props.history.push(NETWORK.COVERAGE.TERRITORY.LIST);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }


    return (
        <>
            <PageTitleBar
                title={"Création du térritoire"}
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
                            required
                            id="description"
                            type="text"
                            name='description'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>


                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Type du parent (laisser vide pour créer un continent)
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={getTerritoryTypes()}
                            value={parentType}
                            onChange={(__, item) => {
                                setParentType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Térritoire parent
                        </InputLabel>
                        <Autocomplete
                            value={parent}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setParent(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            options={territories.filter(t => t.type === parentType?.value)}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

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
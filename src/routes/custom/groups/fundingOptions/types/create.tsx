import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [supports, setSupports] = useState([]);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [strutural, setStructural] = useState(false);
    const [description, setDescription] = useState('');    
    const [selectedSupports, setSelectedSupports] = useState([]);

    useEffect(() => {
        getSupports();
        getCategories();
    }, []);

    const getSupports = () => {
        props.setRequestGlobalAction(true),
        GroupService.getSupportTypes()
        .then(response => setSupports(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getCategories = () => {
        props.setRequestGlobalAction(true),
        GroupService.getFundingOptionCategories()
        .then(response => setCategories(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!label || !description || !category || selectedSupports.length <= 0) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data: any = {
            label: label,
            structural: strutural,
            description: description,
            category_reference: category?.reference,
            support_references: selectedSupports.map(s => s.reference)
        }
        
        props.setRequestGlobalAction(true);
        GroupService.createFundingOptionTypes(data).then(() => {
            NotificationManager.success("L'option de financement a été créée avec succès");
            props.history.push(GROUP.FUNDING_OPTION.TYPE.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
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
                
                <FormGroup className="col-sm-12 has-wrapper">
                    <FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={strutural}
                            onChange={() => setStructural(!strutural)}
                        />
                    } label={'Type structurel'}
                    />
                </FormGroup>

                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Catégorie
                    </InputLabel>
                    <Autocomplete
                        value={category}
                        id="combo-box-demo"
                        options={categories}
                        onChange={(__, item) => {
                            setCategory(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>

                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Type supports
                    </InputLabel>
                    <Autocomplete
                        multiple
                        id="combo-box-demo"
                        options={supports}
                        value={selectedSupports}
                        onChange={(__, item) => {
                            setSelectedSupports(item);
                        }}
                        getOptionLabel={(option) => option.label}
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
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Create));
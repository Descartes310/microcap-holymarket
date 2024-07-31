import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { USER_ACCOUNT_TYPE } from 'Url/frontendUrl';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UserAccountTypeService from 'Services/account-types';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const CATEGORY_TYPES = [
    { label: 'Partenaires', value: 'PARTNER'},
    { label: 'Client professionnel', value: 'PROFESSIONAL_CLIENT'},
    { label: 'Client particulier', value: 'PARTICULAR_CLIENT'}
]

const Create = (props) => {

    const [type, setType] = useState(null);
    const [label, setLabel] = useState(null);
    const [parent, setParent] = useState(null);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypeCategories()
        .then(response => setCategories(response))
        .finally(() => setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!label) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }
        props.setRequestGlobalAction(true);

        let data: any = {
            label: label,
            description: description,
        }

        if(parent)
            data.parentId = parent.id;

        UserAccountTypeService.createAccountTypeCategory(data).then(() => {
            NotificationManager.success("La catégorie a été créée avec succès");
            props.history.push(USER_ACCOUNT_TYPE.CATEGORY.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création de la catégorie");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }


    return (
        <>
            <PageTitleBar
                title={"Création de catégorie"} onBackClick={() => props.history.push(USER_ACCOUNT_TYPE.CATEGORY.LIST)}
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
                    {/* <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Type de catégorie
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={CATEGORY_TYPES}
                            value={type}
                            onChange={(__, item) => {
                                setType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div> */}
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Catégorie parent
                        </InputLabel>
                        <Autocomplete
                            value={parent}
                            id="combo-box-demo"
                            options={categories}
                            onChange={(__, item) => {
                                setParent(item);
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
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Create));
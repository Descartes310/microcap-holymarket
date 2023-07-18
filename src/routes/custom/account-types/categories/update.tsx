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

const Update = (props) => {

    const [type, setType] = useState(null);
    const [label, setLabel] = useState(null);
    const [parent, setParent] = useState(null);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        getCategories();
        findCategory();
    }, []);

    const findCategory = () => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.findAccountTypeCategory(props.match.params.id)
        .then(response => {
            setLabel(response.label);
            setParent(response.parentCategory);
            setDescription(response.description);
        })
        .catch((err) => {
            console.log(err);
            props.history.push(USER_ACCOUNT_TYPE.CATEGORY.LIST);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getCategories = () => {
        setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypeCategories()
        .then(response => setCategories(response.filter(c => c.id != props.match.params.id)))
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

        UserAccountTypeService.updateAccountTypeCategory(props.match.params.id, data).then(() => {
            NotificationManager.success("La catégorie a été éditée avec succès");
            props.history.push(USER_ACCOUNT_TYPE.CATEGORY.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue lors de l'édition de la catégorie");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }


    return (
        <>
            <PageTitleBar
                title={"Edition de catégorie"}
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
                            Mettre a jour
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));
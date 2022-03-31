import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [code, setCode] = useState('');
    const [label, setLabel] = useState('');
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCategories()
        .then(response => setCategories(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(!label || !code)
            return;

        let data: any = {
            label: label,
            code: code,
            description: description    
        };

        if(category) {
            data.parentId = category.id
        }

        ProductService.createCategory(data)
        .then(response => {
            NotificationManager.success('La catégorie a été créée avec succès');
            props.history.push(MARKETPLACE.CATEGORY.LIST);
        }).catch(err => {
            console.log(err);
            NotificationManager.error('Une erreur est survenue lors de la création de la catégorie');
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Création de catégorie"}
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
                        <InputLabel className="text-left" htmlFor="code">
                            Code
                        </InputLabel>
                        <InputStrap
                            required
                            id="code"
                            type="text"
                            name='code'
                            className="input-lg"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
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
                            Catégorie parent
                        </InputLabel>
                        <Autocomplete
                            options={categories}
                            id="combo-box-demo"
                            value={category}
                            onChange={(__, item) => {
                                setCategory(item);
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


export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));
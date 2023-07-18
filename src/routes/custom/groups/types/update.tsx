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
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    const [type, setType] = useState(null);
    const [label, setLabel] = useState('');
    const [types, setTypes] = useState([]);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        findType();
        getTypes();
        getCategories();
    }, []);

    const findType = () => {
        props.setRequestGlobalAction(true),
        GroupService.findGroupType(props.match.params.id)
        .then(response => {
            setLabel(response.label);
            setType(response.parentType);
            setCategory(response.groupCategory);
            setDescription(response.description);
        })
        .catch((err) => {
            console.log(err);
            props.history.push(GROUP.TYPE.LIST);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getCategories = () => {
        setRequestGlobalAction(true),
        GroupService.getGroupCategories()
        .then(response => setCategories(response))
        .finally(() => setRequestGlobalAction(false))
    }

    const getTypes = () => {
        props.setRequestGlobalAction(true),
        GroupService.getGroupTypes({})
        .then(response => setTypes(response.filter(c => c.reference != props.match.params.id)))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!category || !label)
            return

        props.setRequestGlobalAction(true);

        let data: any = {
            label: label,
            description: description,
            groupCategoryId: category.id,
        };

        if(type)
            data.groupTypeId = type.id;

        GroupService.updateGroupType(props.match.params.id, data).then(() => {
            NotificationManager.success("Le type a été éditée avec succès");
            props.history.push(GROUP.TYPE.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue lors de l'édition du type");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Edition du type de groupe"}
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
                            Catégorie du groupe
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
                            Type parent
                        </InputLabel>
                        <Autocomplete
                            value={type}
                            id="combo-box-demo"
                            options={types}
                            onChange={(__, item) => {
                                setType(item);
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
                            Mettre aà jour
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));
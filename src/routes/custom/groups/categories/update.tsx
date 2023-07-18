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

    const [label, setLabel] = useState('');
    const [parent, setParent] = useState(null);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        getCategories();
        findCategory();
    }, []);

    const getCategories = () => {
        setRequestGlobalAction(true),
        GroupService.getGroupCategories()
        .then(response => setCategories(response.filter(c => c.reference != props.match.params.id)))
        .finally(() => setRequestGlobalAction(false))
    }

    const findCategory = () => {
        props.setRequestGlobalAction(true),
        GroupService.findGroupCategory(props.match.params.id)
        .then(response => {
            setLabel(response.label);
            setParent(response.parentCategory);
            setDescription(response.description);
        })
        .catch((err) => {
            console.log(err);
            props.history.push(GROUP.CATEGORY.LIST);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        props.setRequestGlobalAction(true);

        let data: any = {
            label: label,
            description: description,
        }

        if(parent) {
            data.parent_id = parent.id;
        }

        GroupService.updateGroupCategory(props.match.params.id, data).then(() => {
            NotificationManager.success("La catégorie a été éditée avec succès");
            props.history.push(GROUP.CATEGORY.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue lors de l'edition de la catégorie");
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
                            Mettre à jour
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));
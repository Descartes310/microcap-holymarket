import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import React, { useEffect, useState } from 'react';
import FundingService from 'Services/funding';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getInvestmentPerimeterTypes } from 'Helpers/helpers';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean'],
        [{ 'align': [] }],
        ['code-block']
    ],
};

const formats = [
    'header',
    'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'align',
    'code-block'
];

const AddProspectusItem = (props) => {

    const {show, onClose} = props;

    const [name, setName] = useState('');
    const [label, setLabel] = useState('');
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);
    const [politics, setPolitics] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [perimeter, setPerimeter] = useState('');
    const [reference, setReference] = useState('');
    const [strategies, setStrategies] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        getPrograms();
        getPolitics();
        getStrategies();
    }, [])

    const getPolitics = () => {
        props.setRequestGlobalAction(true),
        FundingService.getFundingPolitics()
        .then(response => setPolitics(response.map(d => { return {label: d.label, reference: d.reference}})))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getStrategies = () => {
        props.setRequestGlobalAction(true),
        FundingService.getFundingStrategies()
        .then(response => setStrategies(response.map(d => { return {label: d.label, reference: d.reference}})))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getPrograms = () => {
        props.setRequestGlobalAction(true),
        FundingService.getFundingPrograms()
        .then(response => setPrograms(response.map(d => { return {label: d.label, reference: d.reference}})))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Ajouter un investissement
                </h3>
            )}
        >
            <RctCardContent>
                <Form onSubmit={props.onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Désignation
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            name='label'
                            type={"text"}
                            value={label}
                            className="input-lg"
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <ReactQuill value={description} modules={modules} onChange={(e) => setDescription(e)} formats={formats} /> 
                    </FormGroup>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Périmètre
                        </InputLabel>
                        <Autocomplete
                            value={perimeter}
                            id="combo-box-demo"
                            options={[...getInvestmentPerimeterTypes(), {
                                label: 'Programme',
                                value: 'PROGRAM'
                            }]}
                            onChange={(__, item) => {
                                setPerimeter(item);
                                setItem(null);
                                switch (item.value) {
                                    case 'PROGRAM':
                                        setItems(programs)
                                        break;
                                    case 'POLITIC':
                                        setItems(politics)
                                        break;
                                    case 'STRATEGY':
                                        setItems(strategies)
                                        break;
                                    default:
                                        setItems([]);
                                }
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Article
                        </InputLabel>
                        <Autocomplete
                            value={item}
                            id="combo-box-demo"
                            options={items}
                            onChange={(__, item) => {
                                setReference(item.reference);
                                setName(item.label);
                                setItem(item);                    
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            className="text-white font-weight-bold"
                            onClick={() => {
                                if(label && description && name && reference && perimeter) {
                                    props.onSubmit({label, description, name, reference, perimeter: perimeter.value});
                                }
                            }}
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCardContent>
        </DialogComponent>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(AddProspectusItem));
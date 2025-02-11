import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import UnitSelect from 'Components/UnitSelect';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
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

const AddProgramInvestment = (props) => {

    const {show, onClose} = props;

    const [label, setLabel] = useState('');
    const [amount, setAmount] = useState('');
    const [period, setPeriod] = useState('');
    const [currency, setCurrency] = useState('');
    const [exitOption, setExitOption] = useState('');
    const [description, setDescription] = useState('');

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
                    <div className='row'>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="amount">
                                Coût
                            </InputLabel>
                            <InputStrap
                                required
                                id="amount"
                                type="number"
                                name='amount'
                                value={amount}
                                className="input-lg"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </FormGroup>
                        <UnitSelect className="col-md-6 col-sm-12 has-wrapper" label="Devise" isCurrency={true} onChange={(c) => setCurrency(c)} />
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <ReactQuill value={description} modules={modules} onChange={(e) => setDescription(e)} formats={formats} /> 
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="period">
                            Durée d'exploitation
                        </InputLabel>
                        <InputStrap
                            required
                            id="period"
                            name='period'
                            type={"text"}
                            value={period}
                            className="input-lg"
                            onChange={(e) => setPeriod(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="exit">
                            Option de sortie
                        </InputLabel>
                        <InputStrap
                            required
                            id="exit"
                            name='exit'
                            type={"text"}
                            value={exitOption}
                            className="input-lg"
                            onChange={(e) => setExitOption(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            className="text-white font-weight-bold"
                            onClick={() => {
                                if(label && description && amount && currency && period && exitOption) {
                                    props.onSubmit({label, description, amount, currency: currency.code, period, exit: exitOption});
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(AddProgramInvestment));
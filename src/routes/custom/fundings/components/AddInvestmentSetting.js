import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

const AddInvestmentSetting = (props) => {

    const {show, onClose, items} = props;

    const [item, setItem] = useState(null);
    const [value, setValue] = useState('');

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Ajouter un paramètre
                </h3>
            )}
        >
            <RctCardContent>
                <Form onSubmit={props.onSubmit}>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Paramètre
                        </InputLabel>
                        <Autocomplete
                            value={item}
                            id="combo-box-demo"
                            onChange={(__, i) => {
                                setItem(i)
                            }}
                            options={items}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="value">
                            Valeur
                        </InputLabel>
                        { item && item.formInputType.toLowerCase() == 'textarea' ? 
                            <ReactQuill value={value} modules={modules} onChange={(e) => setValue(e)} formats={formats} /> 
                            : 
                            <InputStrap
                                required
                                id="value"
                                name='value'
                                value={value}
                                className="input-lg"
                                type={item ? item.formInputType.toLowerCase() : "text"}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        }
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            className="text-white font-weight-bold"
                            onClick={() => {
                                if(item && value) {
                                    props.onSubmit({setting: item, value});
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(AddInvestmentSetting));
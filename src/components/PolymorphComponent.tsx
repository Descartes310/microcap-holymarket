import React from 'react';
import ReactQuill from 'react-quill';
import { FormGroup, Input } from 'reactstrap';
import { FileUploader } from "react-drag-drop-files";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

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

const PolymorphComponent = ({ componentType, value, label, isRequired, handleOnChange, displayAddButton, displayDeleteButton, addInitializationItem, deleteInitializationItem }) => {

    const renderComponent = () => {
        if (componentType === 'file') {
            return (
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="title">
                        { label } {!isRequired && ' (optionnel)'}
                    </InputLabel>
                    <FileUploader
                        classes="mw-100"
                        label="Sélectionner votre fichier ici"
                        handleChange={(file) => {
                            handleOnChange(file);
                        }} name="file" types={fileTypes} />
                </FormGroup>
            );
        }
        else if (componentType === 'textarea') {
            return (
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="description">
                        { label } {!isRequired && ' (optionnel)'}
                    </InputLabel>
                    <ReactQuill value={value} modules={modules} onChange={(e) => handleOnChange(e)} formats={formats} />
                </FormGroup>
            )
        }
        else return (
            <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                <InputLabel className="text-left d-flex justify-content-between">
                    <span>
                        { label } {!isRequired && ' (optionnel)'} 
                    </span>
                    <div className="d-flex justify-content-between" style={{width: 150}}>
                        { displayAddButton && <span className="cursor-pointer" onClick={() => addInitializationItem()} style={{color: '#0d5fc2', fontWeight: 600}}>Ajouter</span> }
                        { displayDeleteButton && <span className="cursor-pointer" onClick={() => deleteInitializationItem()} style={{color: 'red', fontWeight: 600}}>Supprimer</span> }
                    </div>
                </InputLabel>
                <Input
                    name={label}
                    label={label}
                    value={value}
                    className="input-lg"
                    type={componentType}
                    onChange={(e) => handleOnChange(e.target.value)}
                />
            </FormGroup>
        );
    };

    return (
        renderComponent()
    );
};

export default PolymorphComponent;

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

const PolymorphComponent = ({ projectItem, componentType, value, label, isRequired, handleOnChange, displayAddButton, displayDeleteButton, addInitializationItem = () => {}, deleteInitializationItem = () => {} }) => {

    const renderComponent = (inputComponentType, inputIsRequired, inputLabel, inputValue, subItemId) => {
        if (inputComponentType === 'file') {
            return (
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="title">
                        { inputLabel } {!inputIsRequired && ' (optionnel)'}
                    </InputLabel>
                    <FileUploader
                        classes="mw-100"
                        label="Sélectionner votre fichier ici"
                        handleChange={(file) => {
                            handleOnChange(projectItem, file, subItemId);
                        }} name="file" types={fileTypes} />
                </FormGroup>
            );
        }
        else if (inputComponentType === 'textarea') {
            return (
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="description">
                        { inputLabel } {!inputIsRequired && ' (optionnel)'}
                    </InputLabel>
                    <ReactQuill value={projectItem?.value} modules={modules} onChange={(e) => handleOnChange(projectItem, e, subItemId)} formats={formats} />
                </FormGroup>
            )
        }
        else if (inputComponentType === 'complex') {
            return (
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left font-weight-bold mb-30" htmlFor="description">
                        { inputLabel } {!inputIsRequired && ' (optionnel)'}
                    </InputLabel>
                    { projectItem.item.items.map(item => (
                        renderComponent(item.inputType.toLowerCase(), inputIsRequired, item.label, null, item.id)
                    )) }
                </FormGroup>
            )
        }
        else return (
            <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                <InputLabel className="text-left d-flex justify-content-between">
                    <span>
                        { inputLabel } {!inputIsRequired && ' (optionnel)'} 
                    </span>
                    <div className="d-flex justify-content-between" style={{width: 150}}>
                        { displayAddButton && <span className="cursor-pointer" onClick={() => addInitializationItem()} style={{color: '#0d5fc2', fontWeight: 600}}>Ajouter</span> }
                        { displayDeleteButton && <span className="cursor-pointer" onClick={() => deleteInitializationItem()} style={{color: 'red', fontWeight: 600}}>Supprimer</span> }
                    </div>
                </InputLabel>
                <Input
                    name={inputLabel}
                    label={inputLabel}
                    value={projectItem?.value}
                    className="input-lg"
                    type={inputComponentType}
                    onChange={(e) => handleOnChange(projectItem, e.target.value, subItemId)}
                />
            </FormGroup>
        );
    };

    return (
        renderComponent(componentType, isRequired, label, value, null)
    );
};

export default PolymorphComponent;

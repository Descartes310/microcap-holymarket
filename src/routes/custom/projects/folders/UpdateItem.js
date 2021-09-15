import ReactQuill from 'react-quill';
import { useForm } from "react-hook-form";
import { Form, FormGroup } from "reactstrap";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import React, { useState, useEffect } from "react";
import ComplexTable from "Components/ComplexTable";
import Select from "@material-ui/core/Select/Select";
import InputComponent from "Components/InputComponent";
import FormControl from "@material-ui/core/FormControl";
import DialogComponent from "Components/DialogComponent";
import { NotificationManager } from "react-notifications";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        // ['link', 'image'],
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

const AddWork = ({ show, works, onSave, onClose, onSubmitComplexBook, onDeleteComplexBook }) => {
    const { control, register, errors, handleSubmit, watch } = useForm();

    const [book, setBook] = useState(null);
    const [content, setContent] = useState('');

    const onSubmit = (data) => {
        if (book === null || book === undefined) {
            NotificationManager.error("Vous devez choisir un ouvrage ou en créé un d'abord");
            return;
        }
        const id = book.id;
        if (id === null || id === undefined) {
            NotificationManager.error("Vous devez choisir un ouvrage ou en créé un d'abord");
            return;
        }

        onSave({ id: book.id, content: content, max: 1, description: data.description, required: false, code: data.code, label: data.label, amount: data.amount });
    };

    useEffect(() => {
        if (book)
            setContent(book.content);
    }, [book])

    return (
        <DialogComponent show={show} title={"Editer une section"} onClose={onClose}>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-sm-12">

                            <FormGroup className="col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="type">
                                    Ouvrage à éditer
                                </InputLabel>
                                <Select
                                    value={book}
                                    onChange={event => { setBook(null); setBook(event.target.value) }}
                                    input={<Input name="type" id="type" />}>
                                    {works.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item.book.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormGroup>
                        </div>

                        {book && (
                            book.book.nature !== 'COMPLEX' ?
                                <div className="col-sm-12">
                                    <div className="col-sm-12">
                                        <FormGroup className="col-sm-12 has-wrapper">
                                            <InputLabel className="text-left" htmlFor="description">
                                                Contenu
                                            </InputLabel>
                                            {/* <InputComponent
                                                id="name"
                                                isRequired
                                                errors={errors}
                                                name={'content'}
                                                register={register}
                                                className="input-lg"
                                                defaultValue={book.content}
                                            /> */}
                                            <ReactQuill defaultValue={book.content} onChange={(e) => setContent(e)} modules={modules} formats={formats} placeholder="Entrez votre description..." />
                                        </FormGroup>

                                        <FormGroup className="col-sm-12 has-wrapper">
                                            <InputLabel className="text-left" htmlFor="max">
                                                Description
                                            </InputLabel>
                                            <InputComponent
                                                id="description"
                                                isRequired
                                                errors={errors}
                                                type='text'
                                                name={'description'}
                                                register={register}
                                                className="input-lg"
                                                defaultValue={book.description}
                                            />
                                        </FormGroup>
                                    </div>


                                    <FormGroup className="mb-15">
                                        <Button
                                            // type="submit"
                                            color="primary"
                                            // disabled={loading}
                                            variant="contained"
                                            className="text-white font-weight-bold mr-3"
                                            onClick={handleSubmit(onSubmit)}
                                        >
                                            Ajouter
                                        </Button>
                                    </FormGroup>

                                </div>
                                :
                                <div className="col-sm-12">
                                    <ComplexTable edit values={book.details} onSubmit={(data) => onSubmitComplexBook(book.id, data, true)} onDeleteComplexBook={(data) => onDeleteComplexBook(book.id, data)} />
                                </div>
                        )}

                    </div>
                </Form>
            </RctCollapsibleCard>
        </DialogComponent>
    );
};

export default AddWork;

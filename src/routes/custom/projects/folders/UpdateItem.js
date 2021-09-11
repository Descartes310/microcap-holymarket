import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormGroup } from "reactstrap";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
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

const AddWork = ({ show, works, onSave, onClose }) => {
    const { control, register, errors, handleSubmit, watch } = useForm();

    const [book, setBook] = useState(null);

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

        // if (data.max < 1) {
        //     NotificationManager.error("Vous devez définir un nombre maximal d'occurence correcte");
        //     return;
        // }
        // if (data.label.length < 1) {
        //     NotificationManager.error("Vous devez définir un libellé correct");
        //     return;
        // }
        // if (data.code.length < 1) {
        //     NotificationManager.error("Vous devez définir un code correct");
        //     return;
        // }
        // if (data.amount < 0) {
        //     NotificationManager.error("Vous devez définir un montant correct");
        //     return;
        // }

        onSave({ id: book.id, content: data.content, max: 1, description: data.description, required: false, code: data.code, label: data.label, amount: data.amount });
    };

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
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="description">
                                            Etiquette
                                        </InputLabel>
                                        <InputComponent
                                            id="name"
                                            isRequired
                                            errors={errors}
                                            name={'content'}
                                            register={register}
                                            className="input-lg"
                                            defaultValue={book.content}
                                        />
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
                                :
                                <div className="col-sm-12">
                                    <ComplexTable />
                                    {/* <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="description">
                                            Code
                                        </InputLabel>
                                        <InputComponent
                                            id="code"
                                            isRequired
                                            errors={errors}
                                            name={'code'}
                                            register={register}
                                            className="input-lg"
                                            defaultValue={book.code}
                                        />
                                    </FormGroup>

                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="max">
                                            Libellé
                                        </InputLabel>
                                        <InputComponent
                                            id="label"
                                            isRequired
                                            errors={errors}
                                            type='text'
                                            name={'label'}
                                            register={register}
                                            className="input-lg"
                                            defaultValue={book.libelle}
                                        />
                                    </FormGroup>

                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <InputLabel className="text-left" htmlFor="max">
                                            Montant
                                        </InputLabel>
                                        <InputComponent
                                            id="amount"
                                            isRequired
                                            errors={errors}
                                            type='number'
                                            name={'amount'}
                                            register={register}
                                            className="input-lg"
                                            defaultValue={book.amount}
                                        />
                                    </FormGroup> */}
                                </div>
                        )}

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
                </Form>
            </RctCollapsibleCard>
        </DialogComponent>
    );
};

export default AddWork;

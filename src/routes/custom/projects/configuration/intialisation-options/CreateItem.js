import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormGroup } from "reactstrap";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import Select from "@material-ui/core/Select/Select";
import InputComponent from "Components/InputComponent";
import FormControl from "@material-ui/core/FormControl";
import DialogComponent from "Components/DialogComponent";
import { NotificationManager } from "react-notifications";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { truncate } from "lodash";

const AddWork = ({ show, works, onSave, onClose }) => {
    const { control, register, errors, handleSubmit, watch } = useForm();

    const [required, setRequired] = useState(false);
    const [editable, setEditable] = useState(true);

    const onSubmit = (data) => {
        const id = data.id;
        if (id === null || id === undefined) {
            NotificationManager.error("Vous devez choisir un ouvrage ou en créé un d'abord");
            return;
        }

        if (data.max < 1) {
            NotificationManager.error("Vous devez définir un nombre maximal d'occurence correcte");
            return;
        }

        const work = works.find(i => i.id === id);

        onSave({ ...work, content: data.content, max: Math.ceil(data.max), required: required, editable: editable, description: data.description });
    };

    return (
        <DialogComponent show={show} title={"Ajouté un ouvrage"} onClose={onClose}>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-sm-12">
                            <CustomAsyncComponent
                                loading={false}
                                data={works}
                                component={data => (
                                    <div className="form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="representativePosition">
                                                Type d'Ouvrage
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                name={'id'}
                                                className="mt-0"
                                                errors={errors}
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                defaultValue={data[0] ? data[0].id : undefined}
                                                as={<Select input={<Input name="representativePosition" id="representativePosition" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={item.id} value={item.id}>
                                                            {item.title}
                                                        </MenuItem>
                                                    ))}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            />
                        </div>

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
                            />
                        </FormGroup>

                        <FormGroup className="col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="max">
                                Nombre maximal d'occurences
                            </InputLabel>
                            <InputComponent
                                id="max"
                                isRequired
                                errors={errors}
                                type='number'
                                defaultValue={1}
                                name={'max'}
                                register={register}
                                className="input-lg"
                            />
                        </FormGroup>

                        <FormControl className="col-sm-12 has-wrapper">
                            <InputComponent
                                isRequired
                                className="mt-0"
                                errors={errors}
                                id="required"
                                control={control}
                                name={'required'}
                                register={register}
                                componentType="select"
                                as={<FormControlLabel control={
                                    <Checkbox
                                        color="primary"
                                        checked={required}
                                        onChange={() => { setRequired(!required) }}
                                    />
                                } label={"Ouvrage obligatoire"}
                                />}
                            />
                        </FormControl>

                        <FormControl className="col-sm-12 has-wrapper">
                            <InputComponent
                                isRequired
                                className="mt-0"
                                errors={errors}
                                id="editable"
                                control={control}
                                name={'editable'}
                                register={register}
                                componentType="select"
                                as={<FormControlLabel control={
                                    <Checkbox
                                        color="primary"
                                        checked={editable}
                                        onChange={() => { setEditable(!editable) }}
                                    />
                                } label={"Ouvrage éditable"}
                                />}
                            />
                        </FormControl>

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

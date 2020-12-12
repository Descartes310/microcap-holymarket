import React from "react";
import {useForm} from "react-hook-form";
import {Form, FormGroup} from "reactstrap";
import {useTheme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select/Select";
import InputComponent from "Components/InputComponent";
import FormControl from "@material-ui/core/FormControl";
import {NotificationManager} from "react-notifications";
import DialogComponent from "Components/DialogComponent";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

const AddWork = ({show, works, onSave, onClose}) => {
    const { control, register, errors, handleSubmit } = useForm();

    const onSubmit = (data) => {
        const id = data.id;
        if (id === null || id === undefined) {
            NotificationManager.error("Vous devez choisir un ouvrage ou en créé un d'abord");
            return;
        }
        const work = works.find(i => i.id === id);
        onSave({...work, content: data.content});
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
                                                Ouvrage
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
                                                        <MenuItem key={item.id} value={item.id} className="center-hor-ver">
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
                                Contenu
                            </InputLabel>
                            <InputComponent
                                id="name"
                                isRequired
                                errors={errors}
                                name={'content'}
                                register={register}
                                className="input-lg"
                            />
                            <span className="has-icon"><i className="ti-pencil"/></span>
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
                </Form>
            </RctCollapsibleCard>
        </DialogComponent>
    );
};

export default AddWork;

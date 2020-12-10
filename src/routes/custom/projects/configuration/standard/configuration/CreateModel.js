import React, {useEffect, useState} from 'react';
import {Form, FormGroup} from "reactstrap";
import InputComponent from "Components/InputComponent";
import {injectIntl} from 'react-intl';
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormControl from "@material-ui/core/FormControl";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {useForm} from "react-hook-form";
import _ from "lodash";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import {NotificationManager} from "react-notifications";
import {ERROR_500} from "Constants/errors";
import {createModel} from 'Actions';
import DialogComponent from "Components/DialogComponent";

const CreateModel = props => {
    const {
        intl,
        show,
        onClose,
        branchId,
        loadData,
        detailsLevel,
        chosenTitle,
        projectWorks,
        getProjectWorks,
        projectStandardId,
        setRequestGlobalAction,
    } = props;

    const { register, errors, handleSubmit, watch, control, getValues} = useForm();

    const [display, setDisplay] = useState(false);

    const onSubmit = (data) => {
        setRequestGlobalAction(true);
        const _data = {
            ...data,
            show: display,
            branchId: branchId,
            presentationStandardId: projectStandardId,
        };
        createModel(_data)
            .then(() => {
                NotificationManager.success("Model créé avec succès");
                loadData();
                onClose();
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => setRequestGlobalAction(false))
    };

    return (
        <DialogComponent show={show} title={"Création d'un modèle"} onClose={onClose}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-100">
                    <div className="row align-items-flex-end">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="institution-helper">
                                Titre du bloc
                            </InputLabel>
                            <InputComponent
                                id="firstName"
                                type="text"
                                isRequired
                                errors={errors}
                                register={register}
                                name={'title'}
                                className="input-lg"
                            />
                            <span className="has-icon"><i className="ti-pencil"/></span>
                        </FormGroup>

                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                    checked={display}
                                    onChange={() => setDisplay(!display)}
                                />
                            } label={"Afficher"}
                            />
                        </FormGroup>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <CustomAsyncComponent
                                loading={false}
                                data={detailsLevel}
                                component={data => (
                                    <div className="col-md-12 col-sm-12 form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="detail-helper">
                                                Niveau de détail
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                className="mt-0"
                                                errors={errors}
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                name={'detail'}
                                                defaultValue={data[0] ? data[0].value : undefined}
                                                as={<Select input={<Input name="detail" id="detail-helper" />}>
                                                    {detailsLevel.map((item, index) => (
                                                        <MenuItem key={index} value={item.value} className="center-hor-ver">
                                                            {item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <CustomAsyncComponent
                                loading={false}
                                data={projectWorks.data}
                                onRetryClick={getProjectWorks}
                                component={data => (
                                    <div className="col-md-12 col-sm-12 form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="bookId-helper">
                                                Ouvrage de projets
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                className="mt-0"
                                                errors={errors}
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                name={'bookId'}
                                                defaultValue={data[0] ? data[0].id : undefined}
                                                as={<Select input={<Input name="bookId" id="bookId-helper" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
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
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <CustomAsyncComponent
                                loading={false}
                                data={chosenTitle}
                                // onRetryClick={_getIdentificationType}
                                component={data => (
                                    <div className="col-md-12 col-sm-12 form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="titleToUse-helper">
                                                Titre à utiliser
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                className="mt-0"
                                                errors={errors}
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                name={'titleToUser'}
                                                defaultValue={data[0] ? data[0].value : undefined}
                                                as={<Select input={<Input name="titleToUse" id="titleToUse-helper" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.value} className="center-hor-ver">
                                                            {item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <Button
                            // type="submit"
                            color="primary"
                            // disabled={loading}
                            variant="contained"
                            className="text-white font-weight-bold btn-submit"
                            onClick={handleSubmit(onSubmit)}
                        >
                            <IntlMessages id="button.submit" />
                        </Button>
                    </div>
                </div>
            </Form>
        </DialogComponent>
    );
};

CreateModel.propTypes = {

};

export default injectIntl(CreateModel);

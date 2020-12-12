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

const ThirdStepItem = props => {
    const {
        intl,
        register,
        errors,
        control,
        step,
        detailsLevel,
        chosenTitle,
        projectWorks,
        getProjectWorks,
    } = props;

    const displayWatch = watch(step + 'display');

    return (
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
                        name={step + 'title'}
                        className="input-lg"
                    />
                    <span className="has-icon"><i className="zmdi zmdi-account"/></span>
                </FormGroup>

                <FormControl fullWidth className="w-100 ml-15">
                    <InputComponent
                        isRequired
                        className="mt-0"
                        errors={errors}
                        control={control}
                        register={register}
                        componentType="select"
                        id="defaultNetwork"
                        name={step + 'defaultNetwork'}
                        as={<FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={displayWatch}
                                onChange={() => setValue('display', !displayWatch)}
                            />
                        } label={"Réseau par default ?"}
                        />}
                    />
                </FormControl>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <CustomAsyncComponent
                        loading={false}
                        data={detailsLevel}
                        component={data => (
                            <div className="col-md-12 col-sm-12 form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="institution-helper">
                                        Niveau de détail
                                    </InputLabel>
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        name={step + 'detailLevel'}
                                        defaultValue={data[0] ? data[0].value : undefined}
                                        as={<Select input={<Input name="institution" id="institution-helper" />}>
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
                        data={projectWorks}
                        onRetryClick={getProjectWorks}
                        component={data => (
                            <div className="col-md-12 col-sm-12 form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="institution-helper">
                                        Ouvrage de projets
                                    </InputLabel>
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        name={step + 'institution'}
                                        defaultValue={data[0] ? data[0].id : undefined}
                                        as={<Select input={<Input name="institution" id="institution-helper" />}>
                                            {data.map((item, index) => (
                                                <MenuItem key={index} value={item.id} className="center-hor-ver">
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
                        data={chosenTitle}
                        // onRetryClick={_getIdentificationType}
                        component={data => (
                            <div className="col-md-12 col-sm-12 form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="institution-helper">
                                        Titre à utiliser
                                    </InputLabel>
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        name={step + 'institution'}
                                        defaultValue={data[0] ? data[0].name : undefined}
                                        as={<Select input={<Input name="institution" id="institution-helper" />}>
                                            {data.map((item, index) => (
                                                <MenuItem key={index} value={item.name} className="center-hor-ver">
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
        </div>
    );
};

ThirdStepItem.propTypes = {

};

export default injectIntl(ThirdStepItem);

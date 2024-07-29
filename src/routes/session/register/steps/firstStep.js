import _ from 'lodash';
import { injectIntl } from 'react-intl';
import { useForm } from "react-hook-form";
import AppConfig from "Constants/AppConfig";
import { Form, FormGroup } from "reactstrap";
import Button from "@material-ui/core/Button";
import TerritoryType from "Enums/Territories";
import Checkbox from "@material-ui/core/Checkbox";
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import TerritoryService from "Services/territories";
import IconButton from "@material-ui/core/IconButton";
import InputComponent from "Components/InputComponent";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from '@material-ui/lab/Autocomplete';
import ErrorInputComponent from "Components/ErrorInputComponent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { minMaxValidatorObject, passwordValidatorObject } from "Helpers/validator";

const FirstStep = props => {
    const { loading, setData, intl, defaultState } = props;

    const [countries, setCountries] = useState([]);
    const [passwordType, setPasswordType] = useState('password');
    const [residenceCountry, setResidenceCountry] = useState(null);
    const [passwordConfirmType, setPasswordConfirmType] = useState('password');

    const { register, errors, handleSubmit, watch, control, setValue } = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {
            useEmailAsLogin: true,
            useMicrocapEmail: false
        }
    });

    const isOrganisation = watch('isOrganisation');
    const useMicrocapEmail = watch('useMicrocapEmail');

    useEffect(() => {
        _getCountries();
    }, []);

    const _getCountries = () => {
        TerritoryService.getTerritories(TerritoryType.COUNTRY)
        .then(countries => {
            setCountries(countries);
        })
        .catch(error => {
            setCountries([]);
            NotificationManager.error("An error occur " + error);
        });
    };

    /**
     * On submit
     */
    const onSubmit = (data) => {
        if(!residenceCountry) {
            return;
        }
        setData({...data, residenceCountry: residenceCountry.id});
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>
            <div className="row align-items-flex-end">

                <FormControl fullWidth className='mb-20 pl-15'>
                    <InputComponent
                        isRequired
                        className="mt-0"
                        errors={errors}
                        id="isOrganisation"
                        control={control}
                        name={'isOrganisation'}
                        register={register}
                        componentType="select"
                        as={<FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={isOrganisation}
                                onChange={() => setValue('isOrganisation', !isOrganisation)}
                            />
                        } label={"Je suis une personne morale"}
                        />}
                    />
                </FormControl>

                <FormGroup className="col-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="userName">
                        Votre nom complet
                    </InputLabel>
                    <InputComponent
                        isRequired
                        id="userName"
                        type="text"
                        name={'userName'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                    />
                </FormGroup>
            </div>

            { !useMicrocapEmail && (
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="email">
                        Votre adresse email
                    </InputLabel>
                    <InputComponent
                        isRequired
                        id="email"
                        type="email"
                        name={'email'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                    />
                </FormGroup>
            )}

            <FormControl fullWidth className='mb-20'>
                <InputComponent
                    isRequired
                    className="mt-0"
                    errors={errors}
                    id="useMicrocapEmail"
                    control={control}
                    name={'useMicrocapEmail'}
                    register={register}
                    componentType="select"
                    as={<FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={useMicrocapEmail}
                            onChange={() => setValue('useMicrocapEmail', !useMicrocapEmail)}
                        />
                    } label={"Je n'ai pas une adresse email"}
                    />}
                />
            </FormControl>

            <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                <InputLabel className="text-left">
                    Pays de résidence/d'implantation
                </InputLabel>
                <Autocomplete
                    value={residenceCountry}
                    options={countries}
                    id="combo-box-demo"
                    classes={{ paper: 'custom-input' }}
                    getOptionLabel={(option) => option.label}
                    onChange={(__, item) => { setResidenceCountry(item) }}
                    renderTags={options => {
                        return (
                            options.map(option =>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'  }}>
                                    <IconButton color="primary">
                                        <img src={option.details.find(d => d.code === 'FLAG')?.value} style={{ width: 25, height: 15 }}/>
                                    </IconButton>
                                    {option.label}
                                </div>
                            )
                        )
                
                    }}
                    renderOption={option => {
                        return (
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'  }}>
                                <IconButton color="primary">
                                    <img src={option.details.find(d => d.code === 'FLAG')?.value} style={{ width: 25, height: 15 }} />
                                </IconButton>
                                {option.label}
                            </div>
                        );
                    }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
            </div>

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="password">
                    Votre mot de passe
                </InputLabel>
                <InputComponent
                    isRequired
                    id="password"
                    errors={errors}
                    name={'password'}
                    type={passwordType}
                    register={register}
                    className="has-input input-lg"
                    otherValidator={{ minLength: AppConfig.minPasswordLength }}
                >
                    {errors.password?.type === 'minLength' && (
                        <ErrorInputComponent text={intl.formatMessage({ id: minMaxValidatorObject.minMessage }, { min: AppConfig.minPasswordLength })} />
                    )}
                </InputComponent>
                <span onClick={() => setPasswordType(passwordType === 'password' ? 'text' : 'password')} className="has-icon">
                    <i className={`zmdi zmdi-${passwordType === 'password' ? 'eye' : 'eye-off'}`}></i>
                </span>
            </FormGroup>

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="password">
                    Ressaisir le même mot de passe
                </InputLabel>
                <InputComponent
                    isRequired
                    type={passwordConfirmType}
                    errors={errors}
                    register={register}
                    id="passwordConfirmation"
                    name={'passwordConfirmation'}
                    className="has-input input-lg"
                    otherValidator={{ validate: value => value === watch('password') }}
                >
                    {errors.passwordConfirmation && (
                        <ErrorInputComponent text={intl.formatMessage({ id: passwordValidatorObject.passwordConfirmation })} />
                    )}
                </InputComponent>
                <span onClick={() => setPasswordConfirmType(passwordConfirmType === 'password' ? 'text' : 'password')} className="has-icon">
                    <i className={`zmdi zmdi-${passwordConfirmType === 'password' ? 'eye' : 'eye-off'}`}></i>
                </span>
            </FormGroup>

            <FormGroup className="mb-15">
                <Button
                    color="primary"
                    disabled={loading}
                    variant="contained"
                    className="text-white font-weight-bold w-100"
                    onClick={handleSubmit(onSubmit)}
                >
                    Créer mon compte
                </Button>
            </FormGroup>
        </Form >
    );
};

FirstStep.propTypes = {

};

export default injectIntl(FirstStep);

import _ from 'lodash';
import { injectIntl } from 'react-intl';
import { useForm } from "react-hook-form";
import GroupService from 'Services/groups';
import AppConfig from 'Constants/AppConfig';
import { Form, FormGroup } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import TerritoryType from "Enums/Territories";
import SettingService from 'Services/settings';
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import TerritoryService from "Services/territories";
import IconButton from "@material-ui/core/IconButton";
import InputComponent from "Components/InputComponent";
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import { Select as MaterialSelect } from "@material-ui/core";
import ErrorInputComponent from "Components/ErrorInputComponent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";

const SecondStepForGroup = props => {

    const { loading, previousStep, setData, defaultState, intl } = props;
    const { register, errors, handleSubmit, control, getValues } = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : {}
    });

    const [errorMessages] = useState({
        startingDate: '',
        endingDate: '',
        birthDate: '',
    });

    const [types, setTypes] = useState([]);
    const [countries, setCountries] = useState([]);
    const [juridicForms, setJuridicForms] = useState([]);
    const [residenceCountry, setResidenceCountry] = useState(null);

    useEffect(() => {
        if(residenceCountry) {
            _getIdentificationType();
            getJuridicForms();;
        }
    }, [residenceCountry]);

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

    const getJuridicForms = () => {
        GroupService.getJuridicTypes({territory: residenceCountry.reference})
        .then(response => setJuridicForms(response))
    }

    const _getIdentificationType = () => {
        SettingService.getImmatriculationsByTerritory({territory: residenceCountry.reference, referral_type: 'GROUP'})
        .then(response => setTypes(response))
    }

    /**
     * On submit
     */
    const onSubmit = (data) => {

        if(!data.endingValidityDate) {
            delete data.endingValidityDate;
        }
        if(!data.groupTypeReference) {
            delete data.groupTypeReference;
        }
        if(!data.identificationNumber) {
            delete data.identificationNumber;
        }
        if(!data.identificationType) {
            delete data.identificationType;
        }
        if(!data.startingValidityDate) {
            delete data.startingValidityDate;
        }

        if(residenceCountry) data.residenceCountry = residenceCountry;

        // console.log(data);
        setData(data, true);
    };

    const onPreviousClicked = (event) => {
        event.preventDefault();
        const values = getValues();
        setData(values);
        previousStep();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>

            <div className="form-group text-left">

                <div className="row align-items-flex-end">
                    <FormGroup className="col-12 has-wrapper">
                        <InputComponent
                            isRequired
                            id="socialName"
                            type="text"
                            name={'socialName'}
                            errors={errors}
                            register={register}
                            className="has-input input-lg"
                            placeholder={"Raison sociale"}
                        />
                    </FormGroup>
                </div>

                <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                    <InputLabel className="text-left">
                        Pays d'implantation
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
                                            <img src={AppConfig.api.territory+option.details.find(d => d.code === 'FLAG')?.value} style={{ width: 25, height: 15 }}/>
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
                                        <img src={AppConfig.api.territory+option.details.find(d => d.code === 'FLAG')?.value} style={{ width: 25, height: 15 }} />
                                    </IconButton>
                                    {option.label}
                                </div>
                            );
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
            </div>

            <div className="row align-items-flex-end">
                <CustomAsyncComponent
                    data={juridicForms}
                    component={data => {
                        return (
                            <div className="col-12 form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="groupTypeReference">
                                        Forme juridique
                                    </InputLabel>
                                    <InputComponent
                                        errors={errors}
                                        control={control}
                                        isRequired={false}
                                        register={register}
                                        componentType="select"
                                        id="groupTypeReference"
                                        name={'groupTypeReference'}
                                        as={
                                            <MaterialSelect
                                                input={<Input name="groupTypeReference"
                                                    id="groupTypeReference-helper" />
                                                }>
                                                {data.map((item, index) => (
                                                    <MenuItem key={index} value={item.reference}>
                                                        {item.label}
                                                    </MenuItem>
                                                ))
                                                }
                                            </MaterialSelect>
                                        }
                                    />
                                </FormControl>
                            </div>
                        )
                    }}
                />
                <CustomAsyncComponent
                    data={types}
                    component={data => {
                        return (
                            <div className="col-12 form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="identificationType">
                                        Type d'immatriculation
                                    </InputLabel>
                                    <InputComponent
                                        errors={errors}
                                        control={control}
                                        isRequired={false}
                                        register={register}
                                        componentType="select"
                                        id="identificationType"
                                        name={'identificationType'}
                                        as={
                                            <MaterialSelect
                                                input={<Input name="identificationType"
                                                    id="identificationType-helper" />
                                                }>
                                                {data.map((item, index) => (
                                                    <MenuItem key={index} value={item.id}>
                                                        {item.code ? item.code : item.label}
                                                    </MenuItem>
                                                ))
                                                }
                                            </MaterialSelect>
                                        }
                                    />
                                </FormControl>
                            </div>
                        )
                    }}
                />
                <FormGroup className="col-12 has-wrapper">
                    <InputComponent
                        id="identificationNumber"
                        type="text"
                        isRequired={false}
                        name={'identificationNumber'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                        placeholder={"Numéro d'immatriculation"}
                    />
                </FormGroup>
            </div>

            <div className="row align-items-flex-end">
                <FormGroup className="col-6 has-wrapper">
                    <InputLabel className="text-left" htmlFor="startingValidityDate">
                        <IntlMessages id="date.validity.start" />
                    </InputLabel>
                    <InputComponent
                        id="startingValidityDate"
                        type="date"
                        isRequired={false}
                        errors={errors}
                        register={register}
                        name={'startingValidityDate'}
                        className="has-input input-lg"
                        placeholder={intl.formatMessage({ id: "date.validity.end" })}
                    >
                        {errors.startingValidityDate && errors.startingValidityDate?.type !== 'required' && (
                            <ErrorInputComponent
                                text={intl.formatMessage(
                                    { id: errorMessages.startingDate.id },
                                    errorMessages.startingDate.value,
                                )}
                            />
                        )}
                    </InputComponent>
                </FormGroup>
                <FormGroup className="col-6 has-wrapper">
                    <InputLabel className="text-left" htmlFor="endingValidityDate">
                        <IntlMessages id="date.validity.end" />
                    </InputLabel>
                    <InputComponent
                        id="endingValidityDate"
                        type="date"
                        isRequired={false}
                        name={'endingValidityDate'}
                        errors={errors}
                        register={register}
                        className="has-input input-lg"
                        placeholder={intl.formatMessage({ id: "date.validity.end" })}
                    >
                        {errors.endingValidityDate && errors.endingValidityDate?.type !== 'required' && (
                            <ErrorInputComponent
                                text={intl.formatMessage(
                                    { id: errorMessages.endingDate.id },
                                    errorMessages.endingDate.value,
                                )}
                            />
                        )}
                    </InputComponent>
                </FormGroup>
            </div>

            <FormGroup className="mb-15">
                <Button
                    color="primary"
                    disabled={loading}
                    variant="outlined"
                    className="font-weight-bold mr-2"
                    onClick={onPreviousClicked}
                >
                    <i className="ti-arrow-left font-weight-bold mr-2"></i> <IntlMessages id="button.previous" />
                </Button>

                <Button
                    type="submit"
                    color="primary"
                    disabled={loading}
                    variant="contained"
                    className="text-white font-weight-bold"
                >
                    <IntlMessages id="auth.signup" />
                </Button>
            </FormGroup>
        </Form>
    );
};

SecondStepForGroup.propTypes = {

};

export default injectIntl(SecondStepForGroup);

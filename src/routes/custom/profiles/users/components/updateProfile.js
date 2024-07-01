import { connect } from 'react-redux';
import UserService from 'Services/users';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import TerritoryType from "Enums/Territories";
import SettingService from 'Services/settings';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import TerritoryService from "Services/territories";
import IconButton from "@material-ui/core/IconButton";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

const UpdateProfile = (props) => {

    const {show, onClose, authUser: user } = props;
    const [types, setTypes] = useState([]);
    const [email, setEmail] = useState(user.email);
    const [countries, setCountries] = useState([]);
    const [name, setName] = useState(user.userName);
    const [juridicForms, setJuridicForms] = useState([]);
    const [juridicForm, setJuridicForm] = useState(null);
    const [nationality, setNationality] = useState(null);
    // const [telephone, setTelephone] = useState(user.telephone);
    const [residenceCountry, setResidenceCountry] = useState(null);
    const [immatriculationType, setImmatriculationType] = useState(null);
    // const [notificationAddress, setNotificationAddress] = useState(user.notificationAddress);
    const [immatriculationNumber, setImmatriculationNumber] = useState(user.identificationNumber);
    const [immatriculationEndDate, setImmatriculationEndDate] = useState(user.identificationEndDate);
    const [immatriculationStartDate, setImmatriculationStartDate] = useState(user.identificationStartDate);

    useEffect(() => {
        _getCountries();
    }, []);

    useEffect(() => {
        if(residenceCountry) {
            _getIdentificationType();
            getJuridicForms();
        }
    }, [residenceCountry]);

    useEffect(() => {
        if(countries.length > 0) {
            setResidenceCountry(countries.find(c => c.id == user.residenceCountry));
            setNationality(countries.find(c => c.id == user.nationality));
        }
    }, [countries]);

    useEffect(() => {
        if(types.length > 0) {
            setImmatriculationType(types.find(c => c.id == user.identificationTypeId));
        }
    }, [types]);

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

    const _getIdentificationType = () => {
        SettingService.getImmatriculationsByTerritory({territory: residenceCountry.reference, referral_type: user?.referralType})
        .then(response => setTypes(response))
    }

    const getJuridicForms = () => {
        GroupService.getJuridicTypes({territory: residenceCountry.reference})
        .then(response => {
            setJuridicForms(response);
            setJuridicForm(response.find(j => j.id === user.juridicForm))
        })
    }

    const checkFormValidity = () => {
        if(!name || !email || !residenceCountry 
            || !immatriculationType || !immatriculationNumber || !immatriculationStartDate || !immatriculationEndDate) {
                NotificationManager.error("Le formulaire est mal rempli");
                return false;
        } else {
            return true;
        }
    }

    const onSubmit = () => {
        checkFormValidity();
        let data = {
            user_name: name,
            email, 
            // telephone,
            // notification_address: notificationAddress,
            residence_country: residenceCountry.id,
            identification_type: immatriculationType.id,
            identification_value: immatriculationNumber,
            identification_end_date: immatriculationEndDate,
            identification_start_date: immatriculationStartDate
        };
        if(nationality) data.nationality = nationality.id;
        if(juridicForm) data.juridic_form = juridicForm.id;
        
        props.setRequestGlobalAction(true);
        UserService.updateProfile(data).then(() => {
            NotificationManager.success('Le profil a été mis à jour');
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
            props.onClose(true);
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Mettre à jour mon profile
                </h3>
            )}
        >
            <RctCardContent>
                <div className='row'>
                    <FormGroup className="col-6 has-wrapper">
                        <InputLabel className="text-left" htmlFor="value">
                            Nom d'utilisateur
                        </InputLabel>
                        <InputStrap
                            type="text"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            id="userName"
                            name={'userName'}
                            className="input-lg"
                        />
                    </FormGroup>
                    <FormGroup className="col-6 has-wrapper">
                        <InputLabel className="text-left" htmlFor="email">
                            Adresse Email
                        </InputLabel>
                        <InputStrap
                            id="email"
                            type="email"
                            name='email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="input-lg"
                        />
                    </FormGroup>
                </div>
                <div className='row'>
                    { user.referralType != 'GROUP' && (
                        <div className="col-md-6 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Pays d'implantation
                            </InputLabel>
                            <Autocomplete
                                value={nationality}
                                options={countries}
                                id="combo-box-demo"
                                classes={{ paper: 'custom-input' }}
                                getOptionLabel={(option) => option.label}
                                onChange={(__, item) => { setNationality(item) }}
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
                    )}
                    <div className={`col-md-${user.referralType == 'GROUP' ? '12' : '6'} col-sm-12 has-wrapper mb-30`}>
                        <InputLabel className="text-left">
                            { user.referralType == 'GROUP' ? "Pays de d'implantation" : "Pays de résidence"}
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
                </div>
                { user.referralType === 'GROUP' && (
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                        <InputLabel className="text-left">
                            Forme juridique
                        </InputLabel>
                        <Autocomplete
                            value={juridicForm}
                            options={juridicForms}
                            id="combo-box-demo"
                            classes={{ paper: 'custom-input' }}
                            getOptionLabel={(option) => option.code ? option.code : option.label}
                            onChange={(__, item) => { setJuridicForm(item) }}
                            renderTags={options => {
                                return (options.map(option => option.label))
                        
                            }}
                            renderOption={option => {
                                return (option.label)
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                )}

                <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                    <InputLabel className="text-left">
                        Type d'immatriculation
                    </InputLabel>
                    <Autocomplete
                        value={immatriculationType}
                        options={types}
                        id="combo-box-demo"
                        classes={{ paper: 'custom-input' }}
                        getOptionLabel={(option) => option.label}
                        onChange={(__, item) => { setImmatriculationType(item) }}
                        renderTags={options => {
                            return (options.map(option => option.label))
                    
                        }}
                        renderOption={option => {
                            return (option.label)
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                
                <FormGroup className="col-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="identificationNumber">
                        Numéro d'immatriculation
                    </InputLabel>
                    <InputStrap
                        id="identificationNumber"
                        type="text"
                        name={'identificationNumber'}
                        className="has-input input-lg"
                        value={immatriculationNumber}
                        onChange={(e) => setImmatriculationNumber(e.target.value)}
                    />
                </FormGroup>
                <div className="row align-items-flex-end">
                    <FormGroup className="col-6 has-wrapper">
                        <InputLabel className="text-left" htmlFor="startingValidityDate">
                            Date de début validité
                        </InputLabel>
                        <InputStrap
                            id="startingValidityDate"
                            type="date"
                            name={'startingValidityDate'}
                            className="has-input input-lg"
                            value={immatriculationStartDate}
                            onChange={(e) => setImmatriculationStartDate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="col-6 has-wrapper">
                        <InputLabel className="text-left" htmlFor="endingValidityDate">
                            Date de fin validité
                        </InputLabel>
                        <InputStrap
                            id="endingValidityDate"
                            type="date"
                            name={'endingValidityDate'}
                            className="has-input input-lg"
                            value={immatriculationEndDate}
                            onChange={(e) => setImmatriculationEndDate(e.target.value)}
                        />
                    </FormGroup>
                </div>
                <Button
                    color="primary"
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Enregistrer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(UpdateProfile));
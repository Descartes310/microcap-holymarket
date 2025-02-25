import { connect } from 'react-redux';
import { NETWORK } from 'Url/frontendUrl';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import UserSelect from 'Components/UserSelect';
import { contractTypes } from 'Helpers/helpers';
import ContractService from 'Services/contracts';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import UserAccountTypeService from 'Services/account-types';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import UserService from 'Services/users';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [types, setTypes] = useState([]);
    const [type, setType] = useState(null);
    const [pass, setPass] = useState(null);
    const [passes, setPasses] = useState([]);
    const [number, setNumber] = useState('');
    const [member, setMember] = useState(null);
    const [hasPass, setHasPass] = useState(false);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [contractType, setContractType] = useState(null);

    useEffect(() => {
        getTypes();
        getCategories();
    }, []);

    useEffect(() => {
        if(member) {
            getActivePass();
        }
    }, [member])

    const getCategories = () => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypeCategories()
        .then(response => setCategories(response))
        .finally(() => props.setRequestGlobalAction(false))
    }  

    const getActivePass = () => {
        props.setRequestGlobalAction(true),
        UserService.getActivePass(member.referralCode)
        .then(response => setPasses(response))
        .finally(() => props.setRequestGlobalAction(false))
    }    
    
    const getTypes = () => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypes()
        .then(response => setTypes(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const generateContractNumber = () => {
        setNumber(String(Math.random()).substring(2,12));
    }

    const onSubmit = () => {
        if(!label || !number || !contractType) {
            NotificationManager.error('Veuillez renseigner les informations');
            return;
        }

        if(hasPass && !pass) {
            NotificationManager.error('Veuillez sélectionner un pass');
            return;
        }

        let data: any = {
            label, 
            number,
            type: contractType.value
        };

        if(hasPass && pass) {
            data.passReference = pass.reference;
        }

        if(contractType.value !== 'ASSET') {
            if(!type) {
                NotificationManager.error('Veuillez renseigner les informations');
                return;
            } else {
                data.accountTypeReference = type.reference;
            }
        }

        props.setRequestGlobalAction(true);
        ContractService.createContract(data)
        .then(() => {
            props.history.push(NETWORK.COVERAGE.CONTRACT.LIST);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Création de contrat"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="number">
                            Numéro
                        </InputLabel>
                        <InputStrap
                            required
                            id="number"
                            type="text"
                            name='number'
                            className="input-lg"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </FormGroup>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Cible du contract
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={contractTypes()}
                            value={contractType}
                            onChange={(__, item) => {
                                setContractType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    { contractType?.value && contractType?.value !== 'ASSET' && (
                        <>
                            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Catégorie du contrat
                                </InputLabel>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={categories}
                                    value={category}
                                    onChange={(__, item) => {
                                        setCategory(item);
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </div>

                            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Type du contrat
                                </InputLabel>
                                <Autocomplete
                                    value={type}
                                    id="combo-box-demo"
                                    onChange={(__, item) => {
                                        setType(item);
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    options={types.filter(t => t.userAccountTypeCategory.id === category?.id)}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </div>

                            <FormGroup className="col-sm-12 has-wrapper">
                                <FormControlLabel control={
                                    <Checkbox
                                        color="primary"
                                        checked={hasPass}
                                        onChange={() => setHasPass(!hasPass)}
                                    />
                                } label={'Associer un pass'}
                                />
                            </FormGroup>
                            { hasPass && (
                                <>
                                    <UserSelect label={'Numéro utilisateur'} onChange={(_, user) => {
                                        setMember(user);
                                    }} />
                                    { member && (
                                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                            <InputLabel className="text-left">
                                                Liste des passes
                                            </InputLabel>
                                            <Autocomplete
                                                value={pass}
                                                id="combo-box-demo"
                                                onChange={(__, item) => {
                                                    setPass(item);
                                                }}
                                                options={passes}
                                                getOptionLabel={(option) => option.label}
                                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={generateContractNumber}
                            className="text-white font-weight-bold bg-blue mr-10"
                        >
                            Générer un numéro
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));
import { connect } from 'react-redux';
import UnitSelect from 'Components/UnitSelect';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import GroupService from 'Services/groups';
import { PROJECT } from 'Url/frontendUrl';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(null);
    const [support, setSupport] = useState(null);
    const [supports, setSupports] = useState([]);
    const [optionTypes, setOptionTypes] = useState([]);
    const [optionType, setOptionType] = useState(null);
    const [amount, setAmount] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [quantity, setQuantity] = useState(null);

    useEffect(() => {
        getProjects();
    }, []);

    useEffect(() => {
        if(project) {
            getFundingOptionTypes();
        }
    }, [project]);

    useEffect(() => {
        if(optionType) {
            getSupportTypes();
        }
    }, [optionType]);

    const getProjects = () => {
        ProjectService.getAllProjects()
        .then(response => {
            setProjects(response.filter(p => p.groupTypeReference));
        })
        .catch(error => {
            setProjects([]);
            NotificationManager.error("An error occur " + error);
        });
    };

    const getFundingOptionTypes = () => {
        GroupService.getFundingTypeByGroup(project?.groupTypeReference)
        .then(response => {
            setOptionTypes(response);
        })
        .catch(error => {
            setProjects([]);
            NotificationManager.error("An error occur " + error);
        });
    };

    const getSupportTypes = () => {
        GroupService.getOptionTypesSupport(optionType?.reference)
        .then(response => {
            setSupports(response);
        })
        .catch(error => {
            setProjects([]);
            NotificationManager.error("An error occur " + error);
        });
    };
    
    const onSubmit = () => {        
        if(!project || !support || !optionType || !quantity || !amount || !label || !currency) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            label, 
            nominal: amount,
            quantity,
            currency: currency?.code,
            option_support_reference: support?.reference,
            project_reference: project?.reference
        }

        ProjectService.createProjectSubscription(data).then(() => {
            NotificationManager.success("L'item a été créé avec succès");
            props.history.push(PROJECT.SUBSCRIPTION.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'item");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Nouvelle souscription"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>

                    <div className="row">
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Projet
                            </InputLabel>
                            <Autocomplete
                                value={project}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setProject(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={projects}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

                    <div className="row">
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Type d'options
                            </InputLabel>
                            <Autocomplete
                                value={optionType}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setOptionType(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={optionTypes}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

                    <div className="row">
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Support d'options
                            </InputLabel>
                            <Autocomplete
                                value={support}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setSupport(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={supports}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="amount">
                                Valeur nominale
                            </InputLabel>
                            <InputStrap
                                required
                                id="amount"
                                type="number"
                                name='amount'
                                value={amount}
                                className="input-lg"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </FormGroup>
                        <UnitSelect label="Devise" isCurrency={true} onChange={(c) => setCurrency(c)} />
                    </div>

                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="quantity">
                                Quantité
                            </InputLabel>
                            <InputStrap
                                required
                                id="quantity"
                                type="number"
                                name='quantity'
                                value={quantity}
                                className="input-lg"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Désignation
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
                    </div>

                    <FormGroup>
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
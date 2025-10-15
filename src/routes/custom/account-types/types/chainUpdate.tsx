import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import { referraTypes } from 'Helpers/helpers';
import ProductService from 'Services/products';
import { getChainEventTypes } from 'Helpers/datas';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import UserAccountTypeService from 'Services/account-types';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { joinUrlWithParamsId, USER_ACCOUNT_TYPE } from 'Url/frontendUrl';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const Update = (props) => {

    const [event, setEvent] = useState(null);
    const [chain, setChain] = useState(null);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [accountType, setAccountType] = useState(null);
    const [accountTypes, setAccountTypes] = useState([]);
    const [referralType, setReferralType] = useState(null);
    const [createAccess, setCreateAccess] = useState(false);
    const [productReference, setProductReference] = useState(null);
    const [mustHaveMembership, setMustHaveMembership] = useState(false);
    const [contractAccountType, setContractAccountType] = useState(null);
    const [delayForDesactivation, setDelayForDesactivation] = useState(0);
    const [contractTypeReference, setContractTypeReference] = useState(null);
    const [hasDelayForDesactivation, setHasDelayForDesactivation] = useState(false);

    useEffect(() => {
        getTypes();
        findChain();
        getProducts();
    }, []);

    useEffect(() => {
        if(products.length > 0 && productReference) {
            setProduct(products.find(p => p.reference == productReference));
        }
    }, [products, productReference]);

    useEffect(() => {
        if(accountTypes.length > 0 && contractTypeReference) {
            setContractAccountType(accountTypes.find(at => at.reference == contractTypeReference));
        }
    }, [accountTypes, contractTypeReference]);

    const findChain = () => {
        setRequestGlobalAction(true),
        UserAccountTypeService.findChain(props.match.params.chainId)
        .then(response => {
            setChain(response);
            setAccountType(response.next);
            setCreateAccess(response.createAccess);
            setProductReference(response.productModelReference);
            setContractTypeReference(response.contractTypeReference);
            setDelayForDesactivation(response.delayForInactivity);
            setEvent(getChainEventTypes().find(e => e.value === response.event));
            setReferralType(referraTypes().find(e => e.value === response.referralType));
            setHasDelayForDesactivation(response.delayForInactivity && response.delayForInactivity > 0)
        })
        .finally(() => setRequestGlobalAction(false))
    }

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProductModels({types: ['PRODUCT'], nature: 'PASS'})
            .then(response => setProducts(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const getTypes = () => {
        setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypes()
        .then(response => setAccountTypes(response.filter(at => at.show)))
        .finally(() => setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!accountType || !event || !referralType) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        if(event.value == 'PASS' && !product) {
            NotificationManager.error("Le pass est obligatoire");
            return;
        }

        if(event.value == 'ACTIVATE_CONTRACT' && !contractAccountType) {
            NotificationManager.error("Le type de contrat est obligatoire");
            return;
        }

        if(hasDelayForDesactivation && (!delayForDesactivation || delayForDesactivation <= 0)) {
            NotificationManager.error("Le nombre de jour est obligatoire");
            return;
        }

        let data: any = {
            event: event.value,
            nextId: accountType.id,
            referralType: referralType.value,
            createAccess, mustHaveMembership
        }

        if(product) {
            data.pass_reference = product.reference;
        }

        if(hasDelayForDesactivation) {
            data.delay_for_inactivity = delayForDesactivation;
        }

        if(contractAccountType) {
            data.contract_account_type = contractAccountType.reference;
        }
        
        props.setRequestGlobalAction(true);

        UserAccountTypeService.updateChain(props.match.params.chainId, data).then(() => {
            NotificationManager.success("Le lien a été édité avec succès");
            props.history.push(joinUrlWithParamsId(USER_ACCOUNT_TYPE.TYPE.CHAIN, props.match.params.id));
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création du lien");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Edition d'une chaine"} onBackClick={() => props.history.push(joinUrlWithParamsId(USER_ACCOUNT_TYPE.TYPE.CHAIN, props.match.params.id))}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Type de compte à assigner
                        </InputLabel>
                        <Autocomplete
                            value={accountType}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setAccountType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            options={accountTypes.filter(at => at.id != props.match.params.id)}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Evènement
                        </InputLabel>
                        <Autocomplete
                            value={event}
                            id="combo-box-demo"
                            options={getChainEventTypes()}
                            onChange={(__, item) => {
                                setEvent(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    
                    {event && event.value == 'PASS' && (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Pass
                            </InputLabel>
                            <Autocomplete
                                value={product}
                                id="combo-box-demo"
                                options={products}
                                onChange={(__, item) => {
                                    setProduct(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    )}
                    
                    {event && event.value == 'ACTIVATE_CONTRACT' && (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Type de contrat
                            </InputLabel>
                            <Autocomplete
                                value={contractAccountType}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setContractAccountType(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={accountTypes.filter(at => at.id != props.match.params.id && at.show)}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    )}

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Cible
                        </InputLabel>
                        <Autocomplete
                            value={referralType}
                            id="combo-box-demo"
                            options={referraTypes()}
                            onChange={(__, item) => {
                                setReferralType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={hasDelayForDesactivation}
                                onChange={() => setHasDelayForDesactivation(!hasDelayForDesactivation)}
                            />
                        } label={'Définir un delai (en jours) pour désactiver en cas d\'inactivité'}
                        />
                    </FormGroup>

                    { hasDelayForDesactivation && (
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="delayForDesactivation">
                                Nombre de jours pour désactivation
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                className="input-lg"
                                id="delayForDesactivation"
                                name='delayForDesactivation'
                                value={delayForDesactivation}
                                onChange={(e) => setDelayForDesactivation(e.target.value)}
                            />
                        </FormGroup>
                    )}

                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={mustHaveMembership}
                                onChange={() => setMustHaveMembership(!mustHaveMembership)}
                            />
                        } label={'Doit avoir un numéro d\'adhésion'}
                        />
                    </FormGroup>

                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={createAccess}
                                onChange={() => setCreateAccess(!createAccess)}
                            />
                        } label={'Ajout de souscription'}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));
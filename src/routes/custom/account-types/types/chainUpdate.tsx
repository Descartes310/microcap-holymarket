import { connect } from 'react-redux';
import {Form, FormGroup} from 'reactstrap';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import { referraTypes } from 'Helpers/helpers';
import { getChainEventTypes } from 'Helpers/datas';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import UserAccountTypeService from 'Services/account-types';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { joinUrlWithParamsId, USER_ACCOUNT_TYPE } from 'Url/frontendUrl';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import ProductService from 'Services/products';

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

    const findChain = () => {
        setRequestGlobalAction(true),
        UserAccountTypeService.findChain(props.match.params.chainId)
        .then(response => {
            setChain(response);
            setAccountType(response.next);
            setCreateAccess(response.createAccess);
            setProductReference(response.productModelReference);
            setEvent(getChainEventTypes().find(e => e.value === response.event));
            setReferralType(referraTypes().find(e => e.value === response.referralType));
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
        .then(response => setAccountTypes(response))
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

        let data: any = {
            event: event.value,
            nextId: accountType.id,
            referralType: referralType.value,
            createAccess
        }

        if(product) {
            data.product_model_reference = product.reference;
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
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));
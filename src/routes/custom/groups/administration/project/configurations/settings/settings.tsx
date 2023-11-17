import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProjectService from 'Services/projects';
import ProductService from 'Services/products';
import CustomCart from '../_components/customCart';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import GroupService from 'Services/groups';

const List = (props) => {

    const [products, setProducts] = useState([]);
    const [minBase, setMinBase] = useState(null);
    const [maxBase, setMaxBase] = useState(null);
    const [minRate, setMinRate] = useState(null);
    const [supports, setSupports] = useState([]);
    const [maxRate, setMaxRate] = useState(null);
    const [customCarts, setCustomCarts] = useState([]);
    const [optionTypes, setOptionTypes] = useState([]);
    const [optionType, setOptionType] = useState(null);
    const [showCreateProduct, setShowCreateProduct] = useState(false);

    useEffect(() => {
        getProducts();
        getCustomCarts();
        getOptionTypes();
    }, []);

    useEffect(() => {
        if(optionType) {
            getSupports();
        } else {
            setSupports([]);
        }
    }, [optionType]);

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProducts().then(response => {
            setProducts(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getCustomCarts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCustomCarts().then(response => {
            setCustomCarts(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getOptionTypes = () => {
        props.setRequestGlobalAction(true);
        GroupService.getFundingOptionTypesByGroup().then(response => {
            setOptionTypes(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getSupports = () => {
        props.setRequestGlobalAction(true);
        GroupService.getOptionTypesSupport(optionType.reference).then(response => {
            setSupports(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <div>
            <RctCollapsibleCard>
                <h1 className='mb-20'>Contre partie en numeraire des deals</h1>
                <div className="row">
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="minBase">
                            Base fixe minimum
                        </InputLabel>
                        <InputStrap
                            required
                            id="minBase"
                            type="number"
                            name='minBase'
                            value={minBase}
                            className="input-lg"
                            onChange={(e) => setMinBase(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="maxBase">
                            Base fixe maximum
                        </InputLabel>
                        <InputStrap
                            required
                            id="maxBase"
                            type="number"
                            name='maxBase'
                            value={maxBase}
                            className="input-lg"
                            onChange={(e) => setMaxBase(e.target.value)}
                        />
                    </FormGroup>
                </div>
                <div className="row">
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="minRate">
                            Taux minimum
                        </InputLabel>
                        <InputStrap
                            required
                            id="minRate"
                            type="number"
                            name='minRate'
                            value={minRate}
                            className="input-lg"
                            onChange={(e) => minRate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="maxRate">
                            Taux maximum
                        </InputLabel>
                        <InputStrap
                            required
                            id="maxRate"
                            type="number"
                            name='maxRate'
                            value={maxRate}
                            className="input-lg"
                            onChange={(e) => setMaxRate(e.target.value)}
                        />
                    </FormGroup>
                </div>
                <h1 className='mb-20 mt-20'>Contre partie en nature des deals</h1>
                <CustomList
                    list={customCarts}
                    loading={false}
                    itemsFoundText={n => `${n} attributs trouvés`}
                    onAddClick={() => setShowCreateProduct(true)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun produit trouvé
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Désignation</th>
                                                <th className="fw-bold">Marché</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item?.market?.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                />

                <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Option de financement autorisées
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={optionType}
                        options={optionTypes}
                        onChange={(__, item) => {
                            setOptionType(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </FormGroup>

                <CustomCart
                    show={showCreateProduct}
                    onClose={() => {
                        setShowCreateProduct(false);
                        getCustomCarts();
                    }}
                />
            </RctCollapsibleCard>
        </div>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));

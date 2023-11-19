import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProjectService from 'Services/projects';
import ProductService from 'Services/products';
import CustomCart from '../_components/customCart';
import React, { useEffect, useState } from 'react';
import { getPriceWithCurrency } from 'Helpers/helpers';
import { NotificationManager } from 'react-notifications';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import FundingOptionsModal from '../_components/fundingOptions';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import CreateFundingOption from '../_components/createFundingOption';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const List = (props) => {

    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState([]);
    const [minBase, setMinBase] = useState(null);
    const [maxBase, setMaxBase] = useState(null);
    const [minRate, setMinRate] = useState(null);
    const [maxRate, setMaxRate] = useState(null);
    const [customCarts, setCustomCarts] = useState([]);
    const [showCreateProduct, setShowCreateProduct] = useState(false);
    const [showFundingOptions, setShowFundingOptions] = useState(false);
    const [showCreateFundingOption, setShowCreateFundingOption] = useState(false);

    useEffect(() => {
        getProducts();
        getCustomCarts();
        getOptions();
    }, []);

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

    const getOptions = () => {
        props.setRequestGlobalAction(true);
        GroupService.getFundingOptions().then(response => {
            setOptions(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {        
        if(!minBase || !maxBase || !minRate || !maxRate) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        let data = {
            minBase, maxBase,
            minRate, maxRate,
        }
                
        props.setRequestGlobalAction(true);
        // ProductService.createCustomCart(data).then(() => {
        //     NotificationManager.success("L'item a été créé avec succès");
        // }).catch((err) => {
        //     console.log(err);
        //     NotificationManager.error("Une erreur est survenu lors de l'item");
        // }).finally(() => {
        //     props.setRequestGlobalAction(false);
        // })
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
                            onChange={(e) => setMinRate(e.target.value)}
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

                <h1 className='mb-20 mt-20'>Structure financiere</h1>
                <CustomList
                    list={options}
                    loading={false}
                    addText='Editer'
                    showAddIcon={false}
                    itemsFoundText={n => `${n} éléments trouvés`}
                    onAddClick={() => setShowFundingOptions(true)}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun élément trouvé
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Support</th>
                                                <th className="fw-bold">Valeur</th>
                                                <th className="fw-bold">Estimation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item?.supportType?.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.nominalAmount, item.currency)}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item?.quantity}</h4>
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

                <CustomCart
                    show={showCreateProduct}
                    onClose={() => {
                        setShowCreateProduct(false);
                        getCustomCarts();
                    }}
                />

                <FundingOptionsModal
                    show={showFundingOptions}
                    onClose={() => {
                        setShowFundingOptions(false);
                        getOptions();
                    }}
                    onCreate={() => {
                        setShowFundingOptions(false);
                        setShowCreateFundingOption(true);
                    }}
                />

                <CreateFundingOption
                    show={showCreateFundingOption}
                    onClose={() => {
                        getOptions();
                        setShowCreateFundingOption(false);
                        setShowFundingOptions(true);
                    }}
                />
            </RctCollapsibleCard>
        </div>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));

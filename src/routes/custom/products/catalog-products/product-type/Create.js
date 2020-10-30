import React, {useEffect} from 'react';
import {Form, FormGroup} from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {
    setRequestGlobalAction,
    createCatalog,
    getCategoryProducts,
    createCategoryProducts,
    getCatalogsOfOneType
} from "Actions";
import {NotificationManager} from "react-notifications";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {connect} from "react-redux";

// Material
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Product from "Enums/Product";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import {createProductType} from "Actions/independentActions";
import {getProductTypes} from "Actions/GeneralActions";

const CategoryProductsCreate = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { categoryProducts, catalogTypes, authUser, catalog, loading, intl, onClose, show, setRequestGlobalAction, getCatalogsOfOneType, getCategoryProducts, getProductTypes } = props;

    const { control, register, errors, handleSubmit, setValue, watch} = useForm({
        defaultValues: {
            isAvailable: false,
            isDefaultPfm: false,
            isDefaultMember: false,
        }
    });

    const isAvailableWatch = watch('isAvailable');
    const isDefaultPfmWatch = watch('isDefaultPfm');
    const isDefaultMemberWatch = watch('isDefaultMember');

    useEffect(() => {
        fetchCategoryProducts();
        fetchCatalogTypes();
    }, []);

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);

        const _data = {...data};

        _data.organisationId = authUser.id;

        createProductType(_data, authUser.user.branch.id)
            .then(() => {
                NotificationManager.success("Type de produits créée avec succès");
                getProductTypes(authUser.user.branch.id);
                onClose();
            })
            .catch((error) => {
                // console.log("error => ", JSON.stringify(error));
                NotificationManager.error("Une erreur est survenue");
                // console.log("error => ", error.message);
            })
            .finally(() => setRequestGlobalAction(false));
    };

    const fetchCatalogTypes = () => {
        getCatalogsOfOneType(Product.PRODUCT, authUser.user.branch.id);
    };

    const fetchCategoryProducts = () => {
        getCategoryProducts(authUser.user.branch.id);
    };

    return (
        <>
            <Dialog
                open={show}
                onClose={onClose}
                fullScreen={fullScreen}
                aria-labelledby="responsive-dialog-title"
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth={'lg'}
                fullWidth
            >
                <DialogTitle id="form-dialog-title">
                    <div className="row justify-content-between align-items-center">
                        Creation d'un nouveau type de produit
                        <IconButton
                            color="primary"
                            aria-label="close"
                            className="text-danger"
                            onClick={onClose}>
                            <CancelIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <RctCollapsibleCard>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row align-items-center">
                                <div className="col-md-6 col-sm-12">
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="designation">
                                            Code
                                        </InputLabel>
                                        <InputComponent
                                            id="designation"
                                            isRequired
                                            errors={errors}
                                            register={register}
                                            name={'code'}
                                            className="input-lg"
                                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                        />
                                        <span className="has-icon"><i className="ti-pencil"/></span>
                                    </FormGroup>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="designation">
                                            Nom
                                        </InputLabel>
                                        <InputComponent
                                            id="designation"
                                            isRequired
                                            errors={errors}
                                            register={register}
                                            name={'label'}
                                            className="input-lg"
                                            // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                        />
                                        <span className="has-icon"><i className="ti-pencil"/></span>
                                    </FormGroup>
                                </div>
                            </div>

                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="description">
                                    <IntlMessages id="widgets.description"/>
                                </InputLabel>
                                <InputComponent
                                    id="description"
                                    isRequired
                                    errors={errors}
                                    register={register}
                                    name={'description'}
                                    className="input-lg"
                                    // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                />
                                <span className="has-icon"><i className="ti-pencil"/></span>
                            </FormGroup>

                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="defaultPrice">
                                    Prix par defaut
                                </InputLabel>
                                <InputComponent
                                    id="defaultPrice"
                                    errors={errors}
                                    register={register}
                                    name={'defaultPrice'}
                                    className="input-lg"
                                    // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                />
                                <span className="has-icon"><i className="ti-pencil"/></span>
                            </FormGroup>

                            <div className="row">
                                <div className="col-md-4 col-sm-6">
                                    <FormControl fullWidth>
                                        <InputComponent
                                            isRequired
                                            className="mt-0"
                                            errors={errors}
                                            control={control}
                                            register={register}
                                            componentType="select"
                                            id="isAvailable"
                                            name={'isAvailable'}
                                            // defaultValue={data[0]}
                                            as={<FormControlLabel control={
                                                <Checkbox
                                                    color="primary"
                                                    checked={isAvailableWatch}
                                                    onChange={() => setValue('isAvailable', !isAvailableWatch)}
                                                />
                                            } label={"Disponible ?"}
                                            />}
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <FormControl fullWidth>
                                        <InputComponent
                                            isRequired
                                            className="mt-0"
                                            errors={errors}
                                            control={control}
                                            register={register}
                                            componentType="select"
                                            id="isDefaultPfm"
                                            name={'isDefaultPfm'}
                                            // defaultValue={data[0]}
                                            as={<FormControlLabel control={
                                                <Checkbox
                                                    color="primary"
                                                    checked={isDefaultPfmWatch}
                                                    onChange={() => setValue('isDefaultPfm', !isDefaultPfmWatch)}
                                                />
                                            } label={"Par defaut pour ?"}
                                            />}
                                        />
                                    </FormControl>
                                </div>

                                <div className="col-md-4 col-sm-6">
                                    <FormControl fullWidth>
                                        <InputComponent
                                            isRequired
                                            className="mt-0"
                                            errors={errors}
                                            control={control}
                                            register={register}
                                            componentType="select"
                                            id="isDefaultMember"
                                            name={'isDefaultMember'}
                                            // defaultValue={data[0]}
                                            as={<FormControlLabel control={
                                                <Checkbox
                                                    color="primary"
                                                    checked={isDefaultMemberWatch}
                                                    onChange={() => setValue('isDefaultMember', !isDefaultMemberWatch)}
                                                />
                                            } label={"Par defaut pour membre ?"}
                                            />}
                                        />
                                    </FormControl>
                                </div>
                            </div>

                            <CustomAsyncComponent
                                loading={categoryProducts.loading}
                                data={categoryProducts.data}
                                onRetryClick={fetchCategoryProducts}
                                component={data => (
                                    <div className="form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="categoryProductId-helper">
                                                Categorie produit
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                className="mt-0"
                                                errors={errors}
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                name={'categoryProductId'}
                                                defaultValue={data[0] ? data[0].id : undefined}
                                                as={<Select input={<Input name="categoryProductId" id="categoryProductId-helper" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            />

                            <CustomAsyncComponent
                                loading={catalogTypes.loading}
                                data={catalogTypes.data}
                                onRetryClick={fetchCatalogTypes}
                                component={data => (
                                    <div className="form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="catalogId-helper">
                                                Catalog produit
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                className="mt-0"
                                                errors={errors}
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                name={'catalogId'}
                                                defaultValue={data[0] ? data[0].id : undefined}
                                                as={<Select input={<Input name="catalogId" id="catalogId-helper" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            />

                            <FormGroup className="mb-15">
                                <Button
                                    // type="submit"
                                    color="primary"
                                    disabled={loading}
                                    variant="contained"
                                    className="text-white font-weight-bold mr-3"
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    <IntlMessages id="button.submit" />
                                </Button>
                            </FormGroup>
                        </Form>
                    </RctCollapsibleCard>
                </DialogContent>
            </Dialog>
        </>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser, catalogTypes, categoryProducts}) => {
    return {loading: requestGlobalLoader, authUser: authUser.data, catalogTypes: catalogTypes, categoryProducts: categoryProducts};
};

export default connect(mapStateToProps, {getProductTypes, getCategoryProducts, getCatalogsOfOneType, setRequestGlobalAction })(injectIntl(CategoryProductsCreate));

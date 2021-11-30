import React from 'react';
import {Form, FormGroup} from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {setRequestGlobalAction, createCatalog, getCategoryProducts, createCategoryProducts} from "Actions";
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

const CategoryProductsCreate = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { categoryProducts, authUser, catalog, loading, intl, onClose, show, setRequestGlobalAction, getCategoryProducts } = props;

    const { control, register, errors, handleSubmit, setValue, watch} = useForm({
        defaultValues: {
            isAvailable: false,
        }
    });

    const isAvailableWatch = watch('isAvailable');

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);

        const _data = {...data};

        if (!_data.parentId) {
            delete _data.parentId;
        }

        createCategoryProducts(_data, authUser.user.branch.id)
            .then(() => {
                NotificationManager.success("Catégorie de produits créée avec succès");
                getCategoryProducts(authUser.user.branch.id);
                onClose();
            })
            .catch((error) => {
                console.log("error => ", JSON.stringify(error));
                NotificationManager.error("Une erreur est survenue");
                // console.log("error => ", error.message);
            })
            .finally(() => setRequestGlobalAction(false));
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
                        Creation d'une catégorie de produit
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

                            <div className="form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="parentId-helper">
                                        Catégorie parent
                                    </InputLabel>
                                    <InputComponent
                                        className="mt-0"
                                        errors={errors}
                                        name={'parentId'}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        defaultValue={categoryProducts[0] ? categoryProducts[0].id : undefined }
                                        as={<Select input={<Input name="parentId" id="parentId-helper" />}>
                                            <MenuItem value={'none'} className="center-hor-ver">
                                                Aucun
                                            </MenuItem>
                                            {categoryProducts.map((item, index) => (
                                                <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                    {item.label}
                                                </MenuItem>
                                            ))}
                                        </Select>}
                                    />
                                </FormControl>
                            </div>

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

const mapStateToProps = ({ requestGlobalLoader, authUser}) => {
    return {loading: requestGlobalLoader, authUser: authUser.data};
};

export default connect(mapStateToProps, {getCategoryProducts, setRequestGlobalAction })(injectIntl(CategoryProductsCreate));

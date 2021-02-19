import {connect} from "react-redux";
import React, {useEffect, useState} from 'react';
import {Form, FormGroup} from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {setRequestGlobalAction, getUserPermissions, getAllNetworkProfileWithBranch} from "Actions";
import {NotificationManager} from "react-notifications";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, withStyles} from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from "@material-ui/core/IconButton";
import {createMandateModel, getAccountsByBranch} from "Actions/independentActions";
import {getUserProfiles} from "Actions/GeneralActions";
import {ERROR_500} from "Constants/errors";
import ObjectSwitcher from "Components/ObjectSwitcher";
import RangeDate from "Components/RangeDate";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";

const Create = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { mandateTypeId, userPermissions, getUserPermissions, authUser, loading, intl, onClose, show, setRequestGlobalAction, networkProfile, getAllNetworkProfileWithBranch } = props;

    const [permissionsSelected, setPermissionsSelected] = useState([]);

    const [profiles, setProfiles] = useState([]);
    const [profilesLoading, setProfilesLoading] = useState(true);

    const { control, register, errors, handleSubmit, setValue, watch} = useForm();

    useEffect(() => {
        // getAllNetworkProfileWithBranch(authUser.branchId);
        // if (userPermissions.data === null) {
        //     loadData();
        // }
        
        getAccountsByBranch(authUser.branchId).then(data => {
            setProfiles(data);
            loadData();
        }).finally(() => setProfilesLoading(false))
    }, []);

    const loadData = () => {
        getUserPermissions(authUser.user.branch.id, authUser.userType);
    };

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);

        const _data = {...data};

        _data.mandatTypeId = mandateTypeId;
        _data.permissions = JSON.stringify(permissionsSelected.map(i => i.id));

        createMandateModel(_data, authUser.user.branch.id)
            .then(() => {
                NotificationManager.success("Model de mandat créée avec succès");
                onClose();
            })
            .catch((error) => {
                NotificationManager.error(ERROR_500);
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
                        Creation d'un model de mandat
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
                            <div className="row">
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left" htmlFor="designation">
                                        Désignation
                                    </InputLabel>
                                    <InputComponent
                                        id="designation"
                                        isRequired
                                        errors={errors}
                                        register={register}
                                        name={'designation'}
                                        className="input-lg"
                                        // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                    />
                                    <span className="has-icon"><i className="ti-pencil"/></span>
                                </FormGroup>

                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left" htmlFor="description">
                                        <IntlMessages id="widgets.description"/>
                                    </InputLabel>
                                    <InputComponent
                                        id="description"
                                        errors={errors}
                                        register={register}
                                        name={'description'}
                                        className="input-lg"
                                        // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                    />
                                    <span className="has-icon"><i className="ti-pencil"/></span>
                                </FormGroup>
                            </div>

                            <CustomAsyncComponent
                                data={profiles}
                                loading={profilesLoading}
                                component={data => (
                                    <div className="form-group text-left mb-3">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="networkProfile">
                                                Profile réseau
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                errors={errors}
                                                className="mt-0"
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                name={'networkProfileId'}
                                                defaultValue={data[0] ? data[0].id : undefined}
                                                as={<Select input={<Input name="networkProfile" id="networkProfile" />}>
                                                    {data.map((item, index) => {
                                                        return (
                                                            <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                                {item.label}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            />

                            <RangeDate
                                watch={watch}
                                errors={errors}
                                register={register}
                                endDateName={"endDate"}
                                startDateName={"startDate"}
                            />

                            <ObjectSwitcher
                                loading={userPermissions.loading}
                                data={userPermissions.data}
                                label={"Permissions"}
                                onRetryClick={loadData}
                                onItemsChanged={items => setPermissionsSelected(items)}
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

const mapStateToProps = ({ requestGlobalLoader, authUser, userPermissions, networkProfile}) => {
    return {loading: requestGlobalLoader, authUser: authUser.data, userPermissions: userPermissions, networkProfile};
};

export default connect(mapStateToProps, {getUserProfiles, getUserPermissions, getAllNetworkProfileWithBranch, setRequestGlobalAction })(injectIntl(Create));

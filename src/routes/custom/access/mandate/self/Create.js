import React, {useEffect, useState} from 'react';
import {Form, FormGroup} from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {NotificationManager} from "react-notifications";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {connect} from "react-redux";
import {getAvailableItems} from "Helpers/helpers";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, withStyles} from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from "@material-ui/core/IconButton";
import {createMandate, getMandate, getMandateType, getMandateModel, getBranchUsers, getUsersByOrganisation, setRequestGlobalAction} from "Actions";
import {ERROR_500} from "Constants/errors";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import SingleTitleText from "Components/SingleTitleText";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { findUsersByOrganisation } from 'Actions/independentActions'

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Create = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));    
    
    const [users, setUsers] = useState([]);
    // const [usersLoading, setUsersLoading] = useState(true);

    const [selectedMandateType, setSelectedMandateType] = useState("");

    const { getMandateType, mandateType, mandateModel, getMandateModel, authUser, loading, onClose, show, getMandate, setRequestGlobalAction } = props;

    const { control, register, errors, handleSubmit } = useForm();

    useEffect(() => {
        findUsersByOrganisation(authUser.id).then(data => {
            console.log(data)
            setUsers(data);
        })
        getMandateType(authUser.branchId)
            .then(result => {
                if (result && result.length > 0) onMandateTypeChange(result[0].id);
            });
    }, []);

    // const loadUsers = async () => {
    //     try {
    //         let result = await getUsersByOrganisation(authUser.id);
    //         setUsers(result);
    //         console.log('Les valeurs sont => ', result)
    //     } catch (e) {
    //         console.log(e)
    //     }
    //     setUsersLoading(false);
    // };


    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);
        createMandate(data, authUser.user.branch.id)
            .then(() => {
                NotificationManager.success("Mandat crée avec succès");
                getMandate(authUser.user.branch.id);
                onClose();
            })
            .catch((error) => {
                NotificationManager.error("Le numéro de service est déja existant");
            })
            .finally(() => setRequestGlobalAction(false));
    };

    const setMandateModel = (mandateType) => {
        getMandateModel(mandateType, authUser.branchId);
    };

    const onMandateTypeChange = (newValue) => {
          if (selectedMandateType !== newValue) {
              setSelectedMandateType(newValue);
              setMandateModel(newValue);
          }
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
                        Creation d'un mandat
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
                        {mandateType.loading ? (
                            <RctSectionLoader/>
                        ) : (!mandateType.data || (mandateType.data && mandateType.data.length === 0)) ? (
                            <SingleTitleText
                                text="Veuillez d'abord créer un type de mandat"
                            />
                        ) : (
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <CustomAsyncComponent
                                    data={mandateType.data}
                                    loading={mandateType.loading}
                                    component={data => (
                                        <div className="form-group text-left mb-3">
                                            <FormControl fullWidth>
                                                <InputLabel className="text-left" htmlFor="operator-helper">
                                                    Type de mandat
                                                </InputLabel>
                                                <Select
                                                    value={selectedMandateType}
                                                    onChange={event => onMandateTypeChange(event.target.value)}
                                                    input={<Input name="operator" id="operator-helper" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    )}
                                />

                                <CustomAsyncComponent
                                    data={mandateModel.data}
                                    loading={mandateModel.loading}
                                    component={data => (
                                        <div className="form-group text-left my-3">
                                            <FormControl fullWidth>
                                                <InputLabel className="text-left" htmlFor="mandateModelId">
                                                    Model de mandat
                                                </InputLabel>
                                                <InputComponent
                                                    isRequired
                                                    errors={errors}
                                                    className="mt-0"
                                                    control={control}
                                                    register={register}
                                                    name={'mandateModelId'}
                                                    componentType="select"
                                                    defaultValue={data[0] ? data[0].id : undefined}
                                                    as={<Select input={<Input name="mandateModelId" id="mandateModelId" />}>
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

                                <CustomAsyncComponent
                                    data={users}
                                    loading={false}
                                    component={data => {
                                        return(
                                        <div className="form-group text-left my-3">
                                            <FormControl fullWidth>
                                                <InputLabel className="text-left" htmlFor="userId-helper">
                                                    Utilisateurs
                                                </InputLabel>
                                                <InputComponent
                                                    isRequired
                                                    errors={errors}
                                                    className="mt-0"
                                                    control={control}
                                                    register={register}
                                                    name={'userId'}
                                                    componentType="select"
                                                    defaultValue={data[0] ? data[0].id : undefined}
                                                    as={<Select input={<Input name="userId" id="userId-helper" />}>
                                                        {data.map((item, index) => {
                                                            return (
                                                                <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                                    {item.firstName} {item.lastName}
                                                                </MenuItem>
                                                            )
                                                        })}
                                                    </Select>}
                                                />
                                            </FormControl>
                                        </div>
                                    )}}
                                />

                                <FormGroup className="has-wrapper my-3">
                                    <InputLabel className="text-left" htmlFor="serviceNumber">
                                        Service number
                                    </InputLabel>
                                    <InputComponent
                                        isRequired
                                        errors={errors}
                                        id="serviceNumber"
                                        register={register}
                                        className="input-lg"
                                        name={'serviceNumber'}
                                        // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                    />
                                    <span className="has-icon"><i className="ti-pencil"/></span>
                                </FormGroup>

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
                        )}
                    </RctCollapsibleCard>
                </DialogContent>
            </Dialog>
        </>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser , mandateType, mandateModel, users}) => {
    return {loading: requestGlobalLoader, authUser: authUser.data, mandateType, mandateModel, users };
};


const useStyles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    /*menuButton: {
        marginRight: theme.spacing(2),
    },*/
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});

export default connect(mapStateToProps, {getMandateType, getMandate, getMandateModel, getBranchUsers, getUsersByOrganisation, setRequestGlobalAction })
(withStyles(useStyles, { withTheme: true })(injectIntl(Create)));

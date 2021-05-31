import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Input as InputStrap} from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {setRequestGlobalAction, getUserPermissions} from "Actions";
import {NotificationManager} from "react-notifications";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {connect} from "react-redux";
import {getAvailableItems} from "Helpers/helpers";

// Material
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, withStyles} from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {createUserProfile} from "Actions/independentActions";
import {getUserProfiles} from "Actions/GeneralActions";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import {ERROR_500} from "Constants/errors";

const UserProfileCreate = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { classes, userPermissions, getUserPermissions, authUser, loading, intl, onClose, show, setRequestGlobalAction, getUserProfiles } = props;

    const [permissionsSelected, setPermissionsSelected] = useState([]);
    const [permissions, setPermissions] = useState({
        leftValuesSelected: [],
        rightValuesSelected: [],
    });

    const { control, register, errors, handleSubmit, setValue, watch} = useForm({
        defaultValues: {
            isAvailable: false,
        }
    });

    useEffect(() => {
        if (userPermissions.data === null) {
            getUserPermissions(authUser.user.branch.id, authUser.userType).then(() => {
                /*setPermissions({
                    leftValuesSelected: userPermissions.data,
                });*/
            })
        }
    }, []);

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);

        const _data = {...data};

        _data.type = authUser.userType;
        _data.permissions = JSON.stringify(permissionsSelected.map(i => i.id));

        createUserProfile(_data, authUser.user.branch.id)
            .then(() => {
                NotificationManager.success("Profil utilisateur créée avec succès");
                getUserProfiles(authUser.user.branch.id, authUser.userType);
                onClose();
            })
            .catch(() => null)
            .finally(() => setRequestGlobalAction(false));
    };

    const handleSelect = (position, event) => {
        const values = Array.from(event.target.selectedOptions, option => option.value);
        const _values = values.map(v => userPermissions.data.find(i => i.id === Number(v)));
        setPermissions({
            leftValuesSelected: position === 'left' ? _values : [...permissions.leftValuesSelected],
            rightValuesSelected: position === 'left' ? [...permissions.rightValuesSelected] : _values,
        });
    };

    const handleOnSwitchPressed = position => {
        let dataToSend = permissions[position === 'left' ? 'leftValuesSelected' : 'rightValuesSelected'];

        if (dataToSend.length === 0) {
            NotificationManager.warning("Vous devrier d'abord selectionner un éléments dans la liste");
            return;
        }

        if (position === 'left') {
            setPermissionsSelected([...permissionsSelected, ...permissions.leftValuesSelected]);
            setPermissions({
                leftValuesSelected: [],
                rightValuesSelected: [...permissions.rightValuesSelected, ...permissions.leftValuesSelected]
            });
        } else {
            setPermissionsSelected(permissionsSelected.filter(p => !permissions.rightValuesSelected.includes(p)));
            setPermissions({
                leftValuesSelected: [...permissions.rightValuesSelected, ...permissions.leftValuesSelected],
                rightValuesSelected: [],
            });
        }
    };

    const availableProducts = userPermissions.data ? getAvailableItems(userPermissions.data , permissionsSelected) : [];

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
                        Creation d'un rôle
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


                            {userPermissions.loading ? (
                                <RctSectionLoader/>
                            ) : (
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="description">
                                        Permissions
                                    </InputLabel>
                                    <div className="row">
                                        <div className="col-md-5 col-sm-5">
                                            <InputStrap
                                                type="select"
                                                name="selectMulti"
                                                id="SelectMulti"
                                                onChange={event => handleSelect('left', event)}
                                                multiple>
                                                {availableProducts.map(p => (
                                                    <option key={p.id} value={p.id}>{p.label}</option>
                                                ))}
                                            </InputStrap>
                                        </div>

                                        <div className="col-1">
                                            <IconButton
                                                edge="start"
                                                className={classes.menuButton + ' text-black mr-2'}
                                                color="inherit"
                                                onClick={() => handleOnSwitchPressed('left')}
                                                aria-label="menu">
                                                <ArrowForwardIcon />
                                            </IconButton>

                                            <IconButton
                                                edge="start"
                                                className={classes.menuButton + ' text-black'}
                                                color="inherit"
                                                onClick={() => handleOnSwitchPressed('right')}
                                                aria-label="menu">
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </div>

                                        <div className="col-md-5 col-sm-5">
                                            <InputStrap
                                                type="select"
                                                name="selectMultiRight"
                                                id="SelectMultiRight"
                                                onChange={event => handleSelect('right', event)}
                                                multiple>
                                                {permissionsSelected.map(p => (
                                                    <option key={p.id} value={p.id}>{p.label}</option>
                                                ))}
                                            </InputStrap>
                                        </div>
                                    </div>
                                </FormGroup>
                            )}

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

const mapStateToProps = ({ requestGlobalLoader, authUser, userPermissions}) => {
    return {loading: requestGlobalLoader, authUser: authUser.data, userPermissions: userPermissions};
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


export default connect(mapStateToProps, {getUserProfiles, getUserPermissions, setRequestGlobalAction })
(withStyles(useStyles, { withTheme: true })(injectIntl(UserProfileCreate)));

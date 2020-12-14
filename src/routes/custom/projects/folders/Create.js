import { projects } from "Data";
import {connect} from "react-redux";
import {createFolder} from "Actions";
import {injectIntl} from 'react-intl';
import {useForm} from "react-hook-form";
import {PROJECTS} from "Url/frontendUrl";
import {ERROR_500} from "Constants/errors";
import {Form, FormGroup} from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from 'react';
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select/Select";
import InputComponent from "Components/InputComponent";
import {NotificationManager} from "react-notifications";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import {getInitialisationOptions, setRequestGlobalAction} from "Actions";

const Create = props => {
    const { authUser, history, intl, getInitialisationOptions, setRequestGlobalAction } = props;

    const [oldFolderType, setOldFolderType] = useState(projects.initialisationOptions[0].value);
    const [initializationId, setInitializationId] = useState('');

    const [initialisationData, setInitialisationData] = useState({
        data: null,
        error: null,
        loading: true
    });

    const { register, errors, handleSubmit } = useForm();

    useEffect(() => {
        loadData(oldFolderType);
    }, []);

    const loadData = (type) => {
        setInitialisationData({
            data: null,
            error: null,
            loading: true
        });
        getInitialisationOptions(type, authUser.branchId)
            .then(result => {
                setInitialisationData({
                    data: result,
                    error: null,
                    loading: false
                });
                if (result && result[0]) {
                    setInitializationId(result[0].id);
                }
            })
            .catch(error => {
                setInitialisationData({
                    data: null,
                    error: error,
                    loading: false
                });
            });
    };

    const onFolderTypeChange = (newValue) => {
        if (newValue !== oldFolderType) {
            loadData(newValue);
            setOldFolderType(newValue);
        }
    };

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);
        const _data = {
            ...data,
            userId: authUser.user.id,
            branchId: authUser.user.branch.id,
            folderType: oldFolderType,
            initializationId
        };
        createFolder(_data)
            .then(() => {
                NotificationManager.success("Projet crée avec succès");
                history.push(PROJECTS.FOLDERS.LIST);
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => setRequestGlobalAction(false));
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-sm-12 mb-20">
                        <FormControl fullWidth>
                            <InputLabel className="text-left" htmlFor="type">
                                Type
                            </InputLabel>
                            <Select
                                value={oldFolderType}
                                onChange={event => onFolderTypeChange(event.target.value)}
                                input={<Input name="type" id="type" />}>
                                {projects.initialisationOptions.map((item, index) => (
                                    <MenuItem key={index} value={item.value} className="center-hor-ver">
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <CustomAsyncComponent
                            loading={initialisationData.loading}
                            data={initialisationData.data}
                            onRetryClick={() => loadData(oldFolderType)}
                            component={data => (
                                <div className="form-group text-left">
                                    <FormControl fullWidth>
                                        <InputLabel className="text-left" htmlFor="registrationType-helper">
                                            Options d'initialisations
                                        </InputLabel>
                                        <Select
                                            value={initializationId}
                                            onChange={event => setInitializationId(event.target.value)}
                                            input={<Input name="registrationType" id="registrationType-helper" />}>
                                            {data.map((item, index) => (
                                                <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="title">
                                Titre
                            </InputLabel>
                            <InputComponent
                                isRequired
                                id="title"
                                name={'title'}
                                errors={errors}
                                register={register}
                                className="input-lg"
                                // placeholder={intl.formatMessage({id: "common.commercialName"})}
                            />
                            <span className="has-icon"><i className="ti-pencil"/></span>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="description">
                                Description
                            </InputLabel>
                            <InputComponent
                                isRequired
                                errors={errors}
                                id="description"
                                register={register}
                                name={'description'}
                                className="input-lg"
                                // placeholder={intl.formatMessage({id: "common.commercialName"})}
                            />
                            <span className="has-icon"><i className="ti-pencil"/></span>
                        </FormGroup>
                    </div>
                </div>

                <FormGroup className="mb-15">
                    <Button
                        // type="submit"
                        color="primary"
                        disabled={!initialisationData.data || (initialisationData.data && initialisationData.data.length === 0)}
                        variant="contained"
                        className="text-white font-weight-bold mr-3"
                        onClick={handleSubmit(onSubmit)}
                    >
                        <IntlMessages id="button.submit" />
                    </Button>
                </FormGroup>
            </Form>
        </>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return {
        authUser: authUser.data,
        loading: requestGlobalLoader,
    };
};

export default connect(mapStateToProps, {getInitialisationOptions, setRequestGlobalAction })(injectIntl(Create));

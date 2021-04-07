import { projects } from "Data";
import ReactQuill from 'react-quill';
import { connect } from "react-redux";
import { createFolder } from "Actions";
import { injectIntl } from 'react-intl';
import { useForm } from "react-hook-form";
import { PROJECTS } from "Url/frontendUrl";
import { ERROR_500 } from "Constants/errors";
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from 'react';
import Select from "@material-ui/core/Select/Select";
import InputComponent from "Components/InputComponent";
import { NotificationManager } from "react-notifications";
import FormControl from "@material-ui/core/FormControl";
import SingleTitleText from "Components/SingleTitleText";
import { Form, FormGroup, Input as FormItem } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { getInitialisationOptions, setRequestGlobalAction, getUsersBooks, getCurrencies } from "Actions";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['clean'],
        [{ 'align': [] }],
        ['code-block']
    ],
};

const formats = [
    'header',
    'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'align',
    'code-block'
];

const Create = props => {
    const { authUser, history, intl, getInitialisationOptions, setRequestGlobalAction } = props;

    const [oldFolderType, setOldFolderType] = useState(projects.initialisationOptions[0].value);
    const [initializationId, setInitializationId] = useState('');
    const [worksData, setWorksData] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    const [initialisationData, setInitialisationData] = useState({
        data: null,
        error: null,
        loading: true
    });

    const [file, setFile] = useState(null);

    const { register, errors, handleSubmit, control } = useForm();

    useEffect(() => {
        fetchCurrencies();
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

    const fetchCurrencies = () => {
        getCurrencies()
            .then(result => {
                setCurrencies(result)
            });
    };

    const onFolderTypeChange = (newValue) => {
        if (newValue !== oldFolderType) {
            if (newValue != 'PERSONNAL_IDEA') {
                loadData(newValue);
                setOldFolderType(newValue);
            } else {
                setRequestGlobalAction(true)
                getUsersBooks('PERSONNAL_IDEA').then(data => {
                    setOldFolderType(newValue);
                    setInitialisationData({
                        data: data,
                        error: null,
                        loading: false
                    })
                }).finally(() => {
                    setRequestGlobalAction(false)
                })
            }
        }
    };

    const onSetWorks = (id, value) => {
        // console.log('VALUE => ', value, id)
        let data = worksData.filter(w => w.id != id);
        data.push({ id, value });
        // console.log(data)
        setWorksData(data);
        // console.log(worksData);
    };

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);
        const works = worksData.map(i => {
            const id = Number(i.id);
            // delete data[i[0]];
            return {
                id,
                content: i.value
            }
        });

        const _data = {
            ...data,
            file,
            userId: authUser.user.id,
            branchId: authUser.user.branch.id,
            folderType: oldFolderType,
            community_id: props.communitySpace
        };

        if (oldFolderType == 'PERSONNAL_IDEA') {
            _data.ideaId = initializationId;
        } else {
            _data.works = JSON.stringify(works),
                _data.initializationId = initializationId;
        }

        createFolder(_data, { fileData: ['file'], multipart: true })
            .then(() => {
                NotificationManager.success("Projet crée avec succès");
                history.push(PROJECTS.FOLDERS.LIST);
            })
            .catch(() => {
                NotificationManager.error("Projet déjà existant");
            })
            .finally(() => setRequestGlobalAction(false));
    };

    const getWorks = () => {
        if (initialisationData.data) {
            const item = initialisationData.data.find(i => i.id === initializationId);
            return item ? item.works : null;
        }
        return null;
    };

    const works = getWorks();

    return (
        <>
            <div className="event-show" style={{ marginTop: '7rem' }}>
                <div className="event-show-header mb-30">
                    <div>
                        <h3 className="text-black event-title">
                            Création d'un projet
                    </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 pr-md-40">
                        <RctCollapsibleCard>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <FormGroup className="has-wrapper">
                                            <InputLabel className="text-left bold" style={{ color: 'black', fontSize: '1.3em' }} htmlFor="title">
                                                Titre du projet
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
                                            {/* <span className="has-icon"><i className="ti-pencil" /></span> */}
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row align-items-center">
                                    <div className="col-md-6 col-sm-12">
                                        <FormGroup className="has-wrapper">
                                            <InputLabel className="text-left" htmlFor="amount">
                                                Besoin estimé
                                        </InputLabel>
                                            <InputComponent
                                                id="amount"
                                                errors={errors}
                                                register={register}
                                                name={'amount'}
                                                className="input-lg"
                                                type='number'
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <CustomAsyncComponent
                                            loading={false}
                                            data={currencies}
                                            component={data => (
                                                <div className="form-group text-left">
                                                    <FormControl fullWidth>
                                                        <InputLabel className="text-left" htmlFor="currency">
                                                            Devise
                                                    </InputLabel>
                                                        <InputComponent
                                                            isRequired
                                                            className="mt-0"
                                                            errors={errors}
                                                            control={control}
                                                            register={register}
                                                            componentType="select"
                                                            name={'currency'}
                                                            defaultValue={data[0]}
                                                            as={<Select input={<Input name="price_currency" id="currency" />}>
                                                                {data.map((item, index) => (
                                                                    <MenuItem key={index} value={item.code} className="center-hor-ver">
                                                                        {item.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>}
                                                        />
                                                    </FormControl>
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12 mb-20">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" style={{ color: 'black', fontSize: '1.3em' }} htmlFor="type">
                                                Type du projet
                                        </InputLabel>
                                            <Select
                                                value={oldFolderType}
                                                onChange={event => onFolderTypeChange(event.target.value)}
                                                input={<Input name="type" id="type" />}>
                                                {[...projects.initialisationOptions, { name: 'Idée personnel', value: 'PERSONNAL_IDEA' }].map((item, index) => (
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
                                                        <InputLabel className="text-left" style={{ color: 'black', fontSize: '1.3em' }} htmlFor="registrationType-helper">
                                                            Options d'initialisation
                                                    </InputLabel>
                                                        <Select
                                                            value={initializationId}
                                                            onChange={event => setInitializationId(event.target.value)}
                                                            input={<Input name="registrationType" id="registrationType-helper" />}>
                                                            {data.map((item, index) => (
                                                                <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                                    {item.name ? item.name : item.title}
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
                                    {initialisationData.loading ? (
                                        <RctSectionLoader />
                                    ) : !works && initializationId === '' ? (
                                        <SingleTitleText
                                            text={"Veuillez selectionner une options d'initialisation"}
                                        />
                                    ) : !works ? null : works.map((work, index) => {
                                        const key = initializationId + index;
                                        const label = `${work.book.id}-content`;
                                        return (
                                            <div key={key} className="col-sm-12">
                                                <FormGroup className="has-wrapper">
                                                    <InputLabel className="text-left" style={{ color: 'black', fontSize: '1.3em' }} htmlFor={label}>
                                                        {work.content}
                                                    </InputLabel>
                                                    <InputLabel className="text-left" htmlFor={label}>
                                                        {work.description}
                                                    </InputLabel>
                                                    {
                                                        work.editable ?
                                                            <ReactQuill modules={modules} name={`${work.book.id}`} onChange={(e) => onSetWorks(`${work.book.id}`, e)} formats={formats} placeholder="Entrez votre contenu..." />
                                                            : null}
                                                </FormGroup>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="row">
                                    <div className="col-sm-12 col-md-12">
                                        <FormGroup fullWidth>
                                            <InputLabel className="text-left" style={{ color: 'black', fontSize: '1.3em' }} htmlFor="file">
                                                Document du projet
                                        </InputLabel>
                                            <Input
                                                id="File"
                                                type="file"
                                                name="file"
                                                onChange={event => setFile(event.target.files[0])}
                                            />
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
                        </RctCollapsibleCard>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace }) => {
    return {
        authUser: authUser.data,
        loading: requestGlobalLoader,
        communitySpace: communitySpace.data
    };
};

export default connect(mapStateToProps, { getInitialisationOptions, setRequestGlobalAction })(injectIntl(Create));

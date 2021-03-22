import { projects } from "Data";
import ReactQuill from 'react-quill';
import { connect } from "react-redux";
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
import FormControl from "@material-ui/core/FormControl";
import SingleTitleText from "Components/SingleTitleText";
import { NotificationManager } from "react-notifications";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { Form, FormGroup, Input as FormItem } from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { getInitialisationOptions, setRequestGlobalAction, updateFolderData, getOneProjectFolderByGroup } from "Actions";

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

const Update = props => {

    const { authUser, history, intl, getInitialisationOptions, setRequestGlobalAction } = props;

    const [oldFolderType, setOldFolderType] = useState(projects.initialisationOptions[0].value);
    const [initializationId, setInitializationId] = useState('');
    const [worksData, setWorksData] = useState([]);

    const [initialisationData, setInitialisationData] = useState({
        data: null,
        error: null,
        loading: true
    });    
    
    const [projectFolder, setProjectFolder] = useState({});

    const [file, setFile] = useState(null);

    const { register, errors, handleSubmit, setValue } = useForm();

    useEffect(() => {
        // loadData();
        loadProject();
    }, []);

    const loadProject = () => {
        setProjectFolder([]);
        getOneProjectFolderByGroup(props.communitySpace)
            .then(result => {
                setProjectFolder(result.project);
            })
            .catch(() => {
                setProjectFolder({});
            })
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
            return {
                id,
                content: i.value
            }
        });

        const _data = {
            ...data,
            works: JSON.stringify(works),
        };

        updateFolderData(projectFolder.id, _data, { fileData: ['file'], multipart: true })
            .then(() => {
                NotificationManager.success("Projet modifié avec succès");
                history.push(PROJECTS.FOLDERS.LIST);
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
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
        <div style={{ padding: 24 }}>
            <PageTitleBar
                title={"Edition de projet"}
                style={{ marginTop: '4rem' }}
            />
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
                                            defaultValue={projectFolder ? projectFolder.title : ''}
                                            errors={errors}
                                            register={register}
                                            className="input-lg"
                                        />
                                    </FormGroup>
                                </div>
                            </div>

                            <div className="row">
                                { !projectFolder ? null : !projectFolder.works ? null : projectFolder.works.sort((a, b) => a.id < b.id ? -1 : 1).map((work, index) => {
                                    const key = initializationId + index;
                                    const label = `${work.id}-content`;
                                    return (
                                        <div key={key} className="col-sm-12">
                                            <FormGroup className="has-wrapper">
                                                <InputLabel className="text-left" style={{ color: 'black', fontSize: '1.3em' }} htmlFor={label}>
                                                    {work.book.title}
                                                </InputLabel>
                                                <InputLabel className="text-left" htmlFor={label}>
                                                    Description: {work.book.description}
                                                </InputLabel>
                                                <ReactQuill defaultValue={work.content} modules={modules} name={`${work.id}`} onChange={(e) => onSetWorks(`${work.id}`, e)} formats={formats} placeholder="Entrez votre contenu..." />
                                            </FormGroup>
                                        </div>
                                    )
                                })}
                            </div>

                            <FormGroup className="mb-15">
                                <Button
                                    // type="submit"
                                    color="primary"
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
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser, communitySpace }) => {
    return {
        authUser: authUser.data,
        loading: requestGlobalLoader,
        communitySpace: communitySpace.data
    };
};

export default connect(mapStateToProps, { getInitialisationOptions, setRequestGlobalAction })(injectIntl(Update));

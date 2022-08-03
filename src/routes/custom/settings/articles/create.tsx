import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { SETTING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import SettingService from 'Services/settings';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean'],
        [{ 'align': [] }],
        ['code-block']
    ],
};

const formats = [
    'header',
    'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'align',
    'code-block'
];

const Create = (props) => {

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState(null);
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        getTopics();
    }, []);

    const onSubmit = () => {

        if(!title || !description || !author || !content || !file) {
            NotificationManager.error("Toutes les informations sont obligatoires");
            return;
        }
        props.setRequestGlobalAction(true);

        let data: any = {
            title, description, author, content, cover: file
        }

        if(topic) data.topic_id = topic.id;

        SettingService.createArticle(data, { fileData: ['cover'], multipart: true }).then(() => {
            NotificationManager.success("L'article a été créé avec succès");
            props.history.push(SETTING.ARTICLE.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création de l'article");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }
    
    const getTopics = () => {
        props.setRequestGlobalAction(true);
        SettingService.getBlogTopics().then((response) => {
            setTopics(response);
        }).catch((err) => {
            setTopics([]);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Création d'un article"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="title">
                            Titre
                        </InputLabel>
                        <InputStrap
                            required
                            id="title"
                            type="text"
                            name='title'
                            className="input-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="author">
                            Auteur
                        </InputLabel>
                        <InputStrap
                            required
                            id="author"
                            type="text"
                            name='author'
                            className="input-lg"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </FormGroup>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Thème
                        </InputLabel>
                        <Autocomplete
                            value={topic}
                            options={topics}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setTopic(item);
                            }}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Photo de couverture
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionner la photo de couverture"
                            handleChange={(file) => {
                                setFile(file);
                            }} name="file" types={fileTypes} />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Contenu
                        </InputLabel>
                        <ReactQuill value={content} modules={modules} onChange={(e) => setContent(e)} formats={formats} />
                    </FormGroup>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Create));
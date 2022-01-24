import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import { GROUP, HOME } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

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

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const Create = (props) => {

    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [group, setGroup] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        getGroup();
    }, []);

    const getGroup = () => {
        props.setRequestGlobalAction(true),
            GroupService.getGroupDetails(props.authUser.referralId)
                .then(response => {
                    setGroup(response);
                    let titleDetails = response.details.find(d => d.detailsType === 'TITLE');
                    let descriptionDetails = response.details.find(d => d.detailsType === 'DESCRIPTION');
                    setTitle(titleDetails ? titleDetails.value : '');
                    setDescription(descriptionDetails ? descriptionDetails.value : '')
                })
                .catch(err => {
                    console.log(err);
                    props.history.push(HOME);
                })
                .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        props.setRequestGlobalAction(true);

        let data: any = {
            image: file,
            title: title,
            description: description
        }

        GroupService.updateGroupDetails(data, { fileData: ['image'], multipart: true }).then(() => {
            NotificationManager.success("Le groupe a été mis à jour avec succès");
            props.history.push(GROUP.ADMINISTRATION.MEMBER.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la mise a jour du groupe");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Paramètres du groupe"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="title">
                            Titre
                        </InputLabel>
                        <InputStrap
                            id="title"
                            type="text"
                            name='title'
                            className="input-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="title">
                            Image
                        </InputLabel>
                        <FileUploader
                            class="mw-100"
                            label="Sélectionner l'image de votre groupe ici"
                            handleChange={(file) => {
                                setFile(file);
                                console.log(file)
                            }} name="file" types={fileTypes} />
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <ReactQuill value={description} modules={modules} onChange={(e) => setDescription(e)} formats={formats} />
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

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Create));
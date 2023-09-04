import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import { GROUP, HOME } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import SettingService from 'Services/settings';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import PartnershipService from 'Services/partnerships';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
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
    const [partners, setPartners] = useState([]);
    const [partner, setPartner] = useState(null);
    const [userFiles, setUserFiles] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedUserFiles, setSelectedUserFiles] = useState([]);

    useEffect(() => {
        getGroup();
        getUserFiles();
        getPartnerships();
    }, []);

    useEffect(() => {
        if(userFiles && group) {
            setSelectedUserFiles(userFiles.filter(piece => group.joinRequestPieces?.includes(piece.reference.trim())));
        }
    }, [userFiles, group]);

    useEffect(() => {
        if(partners && group) {
            setPartner(partners.find(p => p.reference === group.supervisorReference));
        }
    }, [partners, group]);

    const getPartnerships = () => {
        props.setRequestGlobalAction(true);
        PartnershipService.getPartnerships({ type: 'OPERATOR' })
        .then((response) => {
            setPartners(response);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getUserFiles = () => {
        props.setRequestGlobalAction(true),
        SettingService.getUserFileTypes()
        .then(response => {
            setUserFiles(response);
            getGroup();
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getGroup = () => {
        props.setRequestGlobalAction(true),
            GroupService.getGroupDetails(props.authUser.referralId)
                .then(response => {
                    setGroup(response);
                    let titleDetails = response.details.find(d => d.detailsType === 'TITLE');
                    let descriptionDetails = response.details.find(d => d.detailsType === 'DESCRIPTION');
                    setTitle(titleDetails ? titleDetails.value : '');
                    setDescription(descriptionDetails ? descriptionDetails.value : '');
                    
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
            description: description,
        }

        if(partner) {
            data.supervisorReference = partner.reference;
        }

        if(selectedUserFiles.length > 0) {
            data.pieces = selectedUserFiles.map(p => p.reference);
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
                            classes="mw-100"
                            label="Sélectionner l'image de votre groupe ici"
                            handleChange={(file) => {
                                setFile(file);
                            }} name="file" types={fileTypes} />
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <ReactQuill value={description} modules={modules} onChange={(e) => setDescription(e)} formats={formats} />
                    </FormGroup>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Dossier utilisateur pour demande d'adhésion
                        </InputLabel>
                        <Autocomplete
                            multiple
                            options={userFiles}
                            id="combo-box-demo"
                            value={selectedUserFiles}
                            onChange={(__, items) => {
                                setSelectedUserFiles(items);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Opérateur de supervision
                        </InputLabel>
                        <Autocomplete
                            options={partners}
                            id="combo-box-demo"
                            value={partner}
                            onChange={(__, item) => {
                                setPartner(item);
                            }}
                            getOptionLabel={(option) => option.partnershipDetails.find(pd => pd.type === 'COMMERCIAL_NAME').value}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>


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
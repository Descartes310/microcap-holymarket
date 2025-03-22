import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const Create = (props) => {

    const [file, setFile] = useState(null);
    const [label, setLabel] = useState(null);
    const [group, setGroup] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        getGroup();
    }, []);

    const getGroup = () => {
        props.setRequestGlobalAction(true),
        GroupService.getGroupDetails(props.authUser.referralId)
        .then(response => {
            setGroup(response);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(!label || !file) {
            return
        }

        props.setRequestGlobalAction(true);

        let data: any = {
            label: label,
            avatar: file,
            description: description,
            reference: group.reference
        }

        GroupService.createClan(data, { fileData: ['avatar'], multipart: true }).then(() => {
            NotificationManager.success("Le clan a été créé avec succès");
            props.history.push(GROUP.COMMUNITY.CLAN.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création du clan");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Création de clan"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Nom
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            value={label}
                            className="input-lg"
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="description"
                            name='description'
                            value={description}
                            className="input-lg"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="title">
                            Image
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionner l'image de votre clan ici"
                            handleChange={(file) => {
                                setFile(file);
                            }} name="file" types={fileTypes} 
                        />
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
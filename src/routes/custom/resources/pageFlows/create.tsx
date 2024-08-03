import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { RESOURCES } from 'Url/frontendUrl';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import PageFlowService from 'Services/page-flows';
import Checkbox from "@material-ui/core/Checkbox";
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

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

    const [link, setLink] = useState('');
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [hasLink, setHasLink] = useState<boolean>(false);

    const onSubmit = () => {
        if (!label || !description || (hasLink && !link)) {
            NotificationManager.error('Veuillez correctement renseigner le formulaire');
            return;
        }

        let data: any = {
            label, description, link
        };

        props.setRequestGlobalAction(true);
        PageFlowService.create(data)
            .then((response) => {
                props.history.push(RESOURCES.PAGE_FLOWS.LIST);
                NotificationManager.success("L'opération s'est déroulée avec succès");
            })
            .catch((error) => {
                NotificationManager.error("Une erreur s'est produite");
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }


    return (
        <>
            <PageTitleBar
                title={"Création de la page"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <ReactQuill value={description} modules={modules} onChange={(e) => setDescription(e)} formats={formats} />
                    </FormGroup>

                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={hasLink}
                                onChange={(e) => setHasLink(e.target.checked)}
                            />
                        } label={'Page finale'}
                        />
                    </FormGroup>

                    { hasLink && (
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="link">
                                Lien de destination
                            </InputLabel>
                            <InputStrap
                                required
                                id="link"
                                type="text"
                                name='link'
                                value={link}
                                className="input-lg"
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </FormGroup>
                    )}

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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));
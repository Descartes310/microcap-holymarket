import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import PageFlowService from 'Services/page-flows';
import Checkbox from "@material-ui/core/Checkbox";
import React, { useEffect, useState } from 'react';
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

const Update = (props) => {

    const [link, setLink] = useState('');
    const [label, setLabel] = useState('');
    const [page, setPage] = useState(null);
    const [description, setDescription] = useState('');
    const [hasLink, setHasLink] = useState<boolean>(false);

    useEffect(() => {
        findPage();
    }, [props.match.params.id]);

    const findPage = () => {
        props.setRequestGlobalAction(true);
        PageFlowService.find(props.match.params.id)
        .then(response => {
            setPage(response);
            setLink(response.link);
            setLabel(response.label);
            setDescription(response.description);
            setHasLink(response.link !== null)
        })
        .catch(err => {
            console.log(props.history)
            props.history.goBack();
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {
        if (!label || !description || (hasLink && !link)) {
            NotificationManager.error('Veuillez correctement renseigner le formulaire');
            return;
        }

        let data: any = {
            label, description, link
        };

        props.setRequestGlobalAction(true);
        PageFlowService.update(props.match.params.id, data)
            .then((response) => {
                props.history.goBack();
                NotificationManager.success("L'opération s'est déroulée avec succès");
            })
            .catch((error) => {
                NotificationManager.error("Une erreur s'est produite");
                console.log(error)
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
                            Enregistrer
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Update));
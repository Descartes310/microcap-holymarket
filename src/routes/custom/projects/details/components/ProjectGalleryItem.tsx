import { connect } from 'react-redux';
import React, { Component } from 'react';
import ProjectService from "Services/projects";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button} from 'reactstrap';


const coverTypes = ["JPG", "PNG", "GIF", "JPEG"];
const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "PDF", "MP4", "DOC", "DOCX", "XLSX", "XLS"];

class GalleryItemModal extends Component<any, any> {
  
    state = {
        file: null,
        cover: null,
        label: null,
        message: null,
        project: null,
        projectItem: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        this.getProject();
    }

    getProject = () => {
        this.props.setRequestGlobalAction(true)
        ProjectService.getProjectById(this.props.id)
        .then(response => {
            this.setState({ project: response });
        })
        .catch((error) => {
            this.setState({ project: null });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {

        const { label, file, cover, message, projectItem } = this.state;

        if(!label || !file || !cover || !projectItem || !message) {
            return
        }

        this.props.setRequestGlobalAction(true);

        let data = { label, cover, file, message, type: "ILLUSTRATION", project_item_id: projectItem.id}


        ProjectService.createProjectActivity(this.props.id, data, { fileData: ['file', 'cover'], multipart: true })
        .then(() => {
            NotificationManager.success('L\'activité a été créée avec succès');
            this.props.onClose();
        }).catch((error) => {
            console.log(error);
            NotificationManager.error('Une erreur est survenue lors de la création de l\'activité');
        }).finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })

    }

    render() {

        const { onClose, show, title }: any = this.props;
        const { label, projectItem, message, project } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <RctCardContent>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Désignation
                            </InputLabel>
                            <InputStrap
                                required
                                id="label"
                                type="text"
                                name='label'
                                className="input-lg"
                                value={label}
                                onChange={(e) => this.setState({ label: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="message">
                                Description
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                id="message"
                                name='message'
                                value={message}
                                className="input-lg"
                                onChange={(e) => this.setState({ message: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Ouvrage
                            </InputLabel>
                            <Autocomplete
                                value={projectItem}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    this.setState({ projectItem: item });
                                }}
                                getOptionLabel={(option) => option.label}
                                options={project ? project.items.map(i => i.projectItem) : []}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="file">
                                Fichier
                            </InputLabel>
                            <FileUploader
                                classes="mw-100"
                                label="Sélectionner votre fichier ici"
                                handleChange={(file) => {
                                    this.setState({ file });
                                }} name="file" types={fileTypes} />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="cover">
                                Couverture
                            </InputLabel>
                            <FileUploader
                                classes="mw-100"
                                label="Sélectionner votre couverture ici"
                                handleChange={(cover) => {
                                    this.setState({ cover });
                                }} name="cover" types={coverTypes} />
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Créer l'élément
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default connect(() => { }, { setRequestGlobalAction })(GalleryItemModal);
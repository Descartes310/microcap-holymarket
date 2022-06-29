import { useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ProjectService from 'Services/projects';
import React, { useState, useEffect } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import { Form, FormGroup, Input } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from "react-notifications";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const AddItemToInitialization = (props) => {

    const theme = useTheme();
    const [label, setLabel] = useState('');
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);
    const [editable, setEditable] = useState(true);
    const [mandatory, setMandatory] = useState(true);
    const [description, setDescription] = useState('');
    const [maxOccurence, setMaxOccurence] = useState(1);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        getProjectItems();
    }, []);

    useEffect(() => {
        if (item) {
            setLabel(item.label);
            setDescription(item.description);
        }
    }, [item]);

    const getProjectItems = () => {
        ProjectService.getProjectItems(['SIMPLE', 'COMPLEX'])
            .then((response) => setItems(response))
            .catch((err) => {
                console.log(err);
            })
    }

    const onSubmit = (data: any) => {
        if (!item || !label || !description) {
            NotificationManager.error("Vous devez corrctement remplir le formulaire");
            return;
        }
        props.onSave({ projectItemId: item.id, label, description, maximum_occurence: maxOccurence, editable, mandatory });
        setItem(null);
    };

    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            open={props.show}
            disableBackdropClick
            disableEscapeKeyDown
            fullScreen={fullScreen}
            onClose={props.onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <div className="row justify-content-between align-items-center">
                    Ajouter un ouvrage
                    <IconButton
                        color="primary"
                        aria-label="close"
                        className="text-danger"
                        onClick={props.onClose}>
                        <CancelIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <Form onSubmit={onSubmit}>
                    <div className="w-100">

                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Ouvrages disponibles
                            </InputLabel>
                            <Autocomplete
                                value={item}
                                id="combo-box-demo"
                                options={items}
                                onChange={(__, data) => {
                                    setItem(data);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        {item && (
                            <>
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="label">
                                        Etiquette
                                    </InputLabel>
                                    <Input
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
                                    <Input
                                        required
                                        id="description"
                                        type="text"
                                        name='description'
                                        className="input-lg"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="maxOccurence">
                                        Nombre maximal d'occurence
                                    </InputLabel>
                                    <Input
                                        required
                                        id="maxOccurence"
                                        type="number"
                                        name='maxOccurence'
                                        className="input-lg"
                                        value={maxOccurence}
                                        onChange={(e) => setMaxOccurence(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup className="col-sm-12 has-wrapper">
                                    <FormControlLabel control={
                                        <Checkbox
                                            color="primary"
                                            checked={editable}
                                            onChange={() => setEditable(!editable)}
                                        />
                                    } label={'Ouvrage éditable'}
                                    />
                                </FormGroup>

                                <FormGroup className="col-sm-12 has-wrapper">
                                    <FormControlLabel control={
                                        <Checkbox
                                            color="primary"
                                            checked={mandatory}
                                            onChange={() => setMandatory(!mandatory)}
                                        />
                                    } label={'Ouvrage obligatoire'}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-15">
                                    <Button
                                        color="primary"
                                        onClick={onSubmit}
                                        variant="contained"
                                        className="text-white font-weight-bold mr-3"
                                    >
                                        Ajouter
                                    </Button>
                                </FormGroup>
                            </>
                        )}
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddItemToInitialization;
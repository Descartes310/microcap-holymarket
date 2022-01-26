import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import { withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
const Create = () => {

    const [code, setCode] = useState('');
    const [file, setFile] = useState(null);
    const [label, setLabel] = useState('');
    const [isAccount, setIsAccount] = useState(false);
    const [isAggregation, setIsAggregation] = useState(false);
    const [description, setDescription] = useState('');
    const [minAccountbalance, setMinAccountBalance] = useState(null);
    const [maxAccountBalance, setMaxAccountBalance] = useState(null);
    const [hasComplementaryProducts, setHasComplementaryProducts] = useState(null);

    const onSubmit = () => {
        console.log('Press');
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit} className="pt-20">
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Nom du produit
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
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Code produit
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
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Description produit
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
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Prix par défaut
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
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Devise
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
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="title">
                            Image du produit
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionner l'image de votre produit ici"
                            handleChange={(file) => {
                                setFile(file);
                            }} name="file" types={fileTypes} />
                    </FormGroup>
                    <div className="row">
                        <div className="col-md-4 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Catégorie du produit
                            </InputLabel>
                            <Autocomplete
                                options={[]}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    //setCommercialOperation(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <div className="col-md-4 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Nature du produit
                            </InputLabel>
                            <Autocomplete
                                options={[]}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    //setCommercialOperation(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <div className="col-md-4 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Portée du produit
                            </InputLabel>
                            <Autocomplete
                                options={[]}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    //setCommercialOperation(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    </div>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={isAccount}
                                onChange={() => setIsAccount(!isAccount)}
                            />
                        } label={'Associer le produit a une unité de décompte'}
                        />
                    </FormGroup>
                    {isAccount && (
                        <>
                            <div className="row">
                                <div className="col-md-4 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        Devise du compte
                                    </InputLabel>
                                    <Autocomplete
                                        options={[]}
                                        id="combo-box-demo"
                                        onChange={(__, item) => {
                                            //setCommercialOperation(item);
                                        }}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        Plancher du compte
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
                                </div>
                                <div className="col-md-4 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        Plafond du compte
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
                                </div>
                            </div>
                            <FormGroup className="col-sm-12 has-wrapper">
                                <FormControlLabel control={
                                    <Checkbox
                                        color="primary"
                                        checked={isAggregation}
                                        onChange={() => setIsAggregation(!isAggregation)}
                                    />
                                } label={'Associer des comptes à consolider'}
                                />
                            </FormGroup>
                            {
                                isAggregation && (
                                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        Sélectionnez les comptes à aggreger
                                    </InputLabel>
                                    <Autocomplete
                                        options={[]}
                                        id="combo-box-demo"
                                        onChange={(__, item) => {
                                            //setCommercialOperation(item);
                                        }}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </div>
                                )
                            }
                        </>
                    )}

                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={hasComplementaryProducts}
                                onChange={() => setHasComplementaryProducts(!hasComplementaryProducts)}
                            />
                        } label={'Associer des produits complémentaires'}
                        />
                    </FormGroup>

                    {
                        hasComplementaryProducts && (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Sélectionnez les produits à associer
                            </InputLabel>
                            <Autocomplete
                                options={[]}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    //setCommercialOperation(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        )
                    }
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

const styles = {
    jXFcHa: {
        maxWidth: '100%',
    }
};

export default withStyles(styles)(Create);
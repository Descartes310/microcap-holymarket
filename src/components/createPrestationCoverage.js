import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class CreatePrestationCoverageModal extends Component {
  
    state = {
        label: null,
        coverage: null,
        effect: null,
        coverages: [],
        effects: [],
        isCreation: false,
        mandatory: false,
        description: null,
        files: [],
        addEffect: false
    }

    constructor(props) {
        super(props);
    }    

    componentDidMount() {
        this.getCoverages();
        this.getEffects();
        this.getFiles();
    }

    getCoverages = () => {
        this.props.setRequestGlobalAction(true),
        BankService.getAvailableCoverages(this.props.prestation.id)
        .then(response => this.setState({ coverages: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getEffects = () => {
        this.props.setRequestGlobalAction(true),
        BankService.getEffects(this.props.prestation.id)
        .then(response => this.setState({ effects: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getFiles = () => {
        this.props.setRequestGlobalAction(true),
        BankService.getCoverageToPrestations(this.props.prestation.id)
        .then(response => this.setState({ files: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {

        const { addEffect, description, mandatory, coverage, effect } = this.state;

        if(!coverage && !effect) {
            NotificationManager.error("La couverture est obligatoire");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let data = {description, mandatory};

        if(addEffect && effect) {
            data.coverageId = effect.id;
            data.type = 'EFFECT';
        } else {
            data.coverageId = coverage.id;
            data.type = 'COVERAGE';
        }

        BankService.addCoverageToPrestation(this.props.prestation.id, data).then(() => {
            NotificationManager.success("La couverture a été ajoutée avec succès");
        }).catch((err) => {
            NotificationManager.error("Une erreur est survenu lors de l'ajout de la couverture");
        }).finally(() => {
            this.props.onClose();
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { coverages, description, mandatory, coverage, effects, effect, files, isCreation, addEffect } = this.state;

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
                { isCreation ? (
                <RctCardContent>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={addEffect}
                                onChange={() => this.setState({ addEffect: !addEffect })}
                            />
                        } label={'Ajouter un effet'}
                        />
                    </FormGroup>
                    { !addEffect ? (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Couverture
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                options={coverages}
                                value={coverage}
                                onChange={(__, item) => {
                                    this.setState({ coverage: item });
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>  
                    ) : (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Effet
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                options={effects}
                                value={effect}
                                onChange={(__, item) => {
                                    this.setState({ effect: item });
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    )}
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
                            onChange={(e) => this.setState({ description: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={mandatory}
                                onChange={() => this.setState({ mandatory: !mandatory })}
                            />
                        } label={'Obligatoire'}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Ajouter la couverture
                        </Button>
                    </FormGroup>
                </RctCardContent>
            ) : (
                <CustomList
                    loading={false}
                    list={files}
                    itemsFoundText={n => `${n} couvertures trouvées`}
                    onAddClick={() => this.setState({ isCreation: true })}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucune couverture trouvée
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Désignation</th>
                                                <th className="fw-bold">Description</th>
                                                <th className="fw-bold">Obligatoire</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <p className="m-0 text-dark">{item.description}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <p className="m-0 text-dark">{item.mandatory ? 'Oui' : 'Non'}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                />
            )}
            </DialogComponent>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(CreatePrestationCoverageModal)));
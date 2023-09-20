import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import AssetService from 'Services/assets';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class ComposeAssetItemModal extends Component {
  
    state = {
        assets: [],
        label: null,
        description: null,
        selectedAssets: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getComposableAssets();
    }

    getComposableAssets = () => {
        this.props.setRequestGlobalAction(true);
        AssetService.getComposable(this.props.asset.reference)
        .then(response => {
            this.setState({ assets: response });
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    onSubmit = () => {

        const { label, description, selectedAssets } = this.state;

        if(!label || selectedAssets.length <= 0) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        this.props.setRequestGlobalAction(true);
        AssetService.createComposable(this.props.asset.reference, {
            label, description, asset_references: selectedAssets.map(a => a.reference)
        })
        .then(() => {
            NotificationManager.success("La création est terminée");
            this.props.onClose();
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue");
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { label, description, selectedAssets, assets } = this.state;
        const { onClose, show, title, asset } = this.props;

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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Désignation
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="label"
                            className="input-lg"
                            name='label'
                            value={label}
                            onChange={(e) => this.setState({ label: e.target.value })}
                        />
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            type="textarea"
                            id="description"
                            className="input-lg"
                            name='description'
                            value={description}
                            onChange={(e) => this.setState({ description: e.target.value })}
                        />
                    </FormGroup>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                           Valeurs résiduelles disponibles
                        </InputLabel>
                        <Autocomplete
                            multiple
                            id="combo-box-demo"
                            value={selectedAssets}
                            options={assets}
                            onChange={(__, items) => {
                                this.setState({ selectedAssets: items });
                            }}
                            getOptionLabel={(option) => option.series.label+": "+getPriceWithCurrency(option.residualWorth, option.parent.currency)+" | Série: "+option.series.number}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Valider la composition: {getPriceWithCurrency(selectedAssets.reduce((worth, item) => worth + item.residualWorth, 0), asset.parent.currency)}
                        </Button>
                    </FormGroup>
                </RctCardContent>
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(ComposeAssetItemModal)));
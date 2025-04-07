import { connect } from 'react-redux';
import { SETTING } from 'Url/frontendUrl';
import {Form, FormGroup} from 'reactstrap';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import SettingService from 'Services/settings';
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import UserAccountTypeService from 'Services/account-types';

const Update = (props) => {

    const [profiles, setProfiles] = useState([]);
    const [marketProfiles, setMarketProfiles] = useState([]);

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = () => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypes()
        .then(response => {
            setProfiles(response.filter(p => p.show));
            getProfiles()
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getProfiles = () => {
        props.setRequestGlobalAction(true);
        SettingService.getAuthorizedProfiles().then((response) => {
            setMarketProfiles(response.filter(p => p.scope === 'MARKET').map(p => p.userAccountType));
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors du chargement");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {
        SettingService.updateAuthorizedProfiles({market_profiles: marketProfiles.map(p => p.reference).join(",")}).then(() => {
            NotificationManager.success("Profiles enregistrés avec succès");
            getTypes();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la mise à jour");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }


    return (
        <>
            <PageTitleBar
                title={"Gestion des profiles autorisés"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Profiles autorisés pour possèder un marché MicroCap
                        </InputLabel>
                        <Autocomplete
                            multiple
                            value={marketProfiles}
                            options={profiles}
                            id="combo-box-demo"
                            onChange={(__, items) => {
                                setMarketProfiles(items);
                            }}
                            getOptionLabel={(option) => option.label}
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
                            Enregistrer
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));
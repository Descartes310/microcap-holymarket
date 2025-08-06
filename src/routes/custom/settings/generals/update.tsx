import { connect } from 'react-redux';
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
import { FileUploader } from 'react-drag-drop-files';

const Update = (props) => {

    const [cgu, setCgu] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [psgProfiles, setPsgProfiles] = useState([]);
    const [legalMention, setLegalMention] = useState(null);
    const [marketProfiles, setMarketProfiles] = useState([]);
    const [brokerProfiles, setBrokerProfiles] = useState([]);
    const [communityProfiles, setCommunityProfiles] = useState([]);

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
        SettingService.getGeneralConfigs().then((response) => {
            setMarketProfiles(response.authorizedProfiles.filter(p => p.scope === 'MARKET').map(p => p.userAccountType));
            setPsgProfiles(response.authorizedProfiles.filter(p => p.scope === 'PSGAV').map(p => p.userAccountType));
            setBrokerProfiles(response.authorizedProfiles.filter(p => p.scope === 'BROKER').map(p => p.userAccountType));
            setCommunityProfiles(response.authorizedProfiles.filter(p => p.scope === 'COMMUNITY').map(p => p.userAccountType));
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors du chargement");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {
        let datas: any = {
            market_profiles: marketProfiles.map(p => p.reference).join(","), 
            psg_profiles: psgProfiles.map(p => p.reference).join(","),
            broker_profiles: brokerProfiles.map(p => p.reference).join(","),
            community_profiles: communityProfiles.map(p => p.reference).join(","),
        };

        if(cgu) {
            datas.cgu = cgu;
        }
        if(legalMention) {
            datas.legal_mention = legalMention;
        }

        SettingService.updateGeneralSettings(datas, { fileData: ['cgu', 'legal_mention'], multipart: true }).then(() => {
            NotificationManager.success("Paramètres enregistrés avec succès");
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
                title={"Paramètres généraux"}
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
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Profiles autorisés pour prestation de guichet
                        </InputLabel>
                        <Autocomplete
                            multiple
                            value={psgProfiles}
                            options={profiles}
                            id="combo-box-demo"
                            onChange={(__, items) => {
                                setPsgProfiles(items);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Profiles autorisés pour courtage
                        </InputLabel>
                        <Autocomplete
                            multiple
                            value={brokerProfiles}
                            options={profiles}
                            id="combo-box-demo"
                            onChange={(__, items) => {
                                setBrokerProfiles(items);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Profiles autorisés pour communauté
                        </InputLabel>
                        <Autocomplete
                            multiple
                            value={communityProfiles}
                            options={profiles}
                            id="combo-box-demo"
                            onChange={(__, items) => {
                                setCommunityProfiles(items);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            CGU
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionner les CGUs ici"
                            handleChange={(file) => {
                                setCgu(file);
                            }} name="file" types={["PDF"]} />
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Mentions légales
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionner les mentions légales ici"
                            handleChange={(file) => {
                                setLegalMention(file);
                            }} name="file" types={["PDF"]} />
                    </FormGroup>

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
import { connect } from 'react-redux';
import { FUNDING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import FundingService from 'Services/funding';
import SettingService from 'Services/settings';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import AddInvestmentSetting from '../../components/AddInvestmentSetting';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [items, setItems] = useState([]);
    const [values, setValues] = useState([]);
    const [politics, setPolitics] = useState([]);
    const [politic, setPolitic] = useState(null);
    const [description, setDescription] = useState('');
    const [showAddValueBox, setShowAddValueBox] = useState(false);    

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        props.setRequestGlobalAction(true),
        FundingService.getFundingPolitics()
        .then(response => setPolitics(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    useEffect(() => {
        getInvestmentSettingItems();
    }, []);

    const getInvestmentSettingItems = () => {
        props.setRequestGlobalAction(true);
        SettingService.getInvestmentSettings({perimeter: 'STRATEGY'})
            .then((response) => setItems(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const onSubmit = () => {
        if (!label || !description || values.length <= 0 || !politic) {
            NotificationManager.error('Le formulaire est mal renseigné')
            return;
        }

        var data: any = {
            label, description, politic_reference: politic.reference, values: JSON.stringify(values.map(v => {return {reference: v.setting.reference, value: v.value}}))
        }

        props.setRequestGlobalAction(true);

        FundingService.createFundingStrategy(data).then(() => {
            NotificationManager.success('Stratégie créé avec succès');
            props.history.push(FUNDING.INVESTMENT.STRATEGY.LIST);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Une erreur est survenues à la création de la stratégie');
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
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
                        <InputStrap
                            required
                            id="description"
                            type="text"
                            name='description'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Politiques
                        </InputLabel>
                        <Autocomplete
                            value={politic}
                            id="combo-box-demo"
                            onChange={(__, i) => {
                                setPolitic(i)
                            }}
                            options={politics}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <InputLabel className="text-left">
                        Liste des paramètres
                    </InputLabel>
                    <CustomList
                        list={values}
                        loading={false}
                        itemsFoundText={n => `${n} paramètres trouvé`}
                        onAddClick={() => setShowAddValueBox(true)}
                        renderItem={list => (
                            <>
                                {list && list.length === 0 ? (
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucune paramètres trouvé
                                        </h4>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="fw-bold">Intitulé</th>
                                                    <th className="fw-bold">Valeur</th>
                                                    <th className="fw-bold">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item?.setting.label}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item?.value}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                onClick={() => {
                                                                    setValues([...values.filter(v => v.setting != item.setting && v.value != item.value)])
                                                                }}
                                                                className="btn-danger text-white font-weight-bold mr-3"
                                                            >
                                                                Supprimer
                                                            </Button>
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

            { showAddValueBox && (
                <AddInvestmentSetting
                    show={showAddValueBox}
                    onClose={() => setShowAddValueBox(!showAddValueBox)}
                    onSubmit={(item) => {
                        setValues([...values, item]);
                        setShowAddValueBox(false)
                    }}
                    items={items.filter(i => !values.map(v => v.setting.id).includes(i.id))}
                />
            )}
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProductService from 'Services/products';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import TimeFromMoment from 'Components/TimeFromMoment';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { FormGroup, Input as InputStrap } from 'reactstrap';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const List = (props) => {

    const [tickets, setTickets] = useState([]);
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [bondNumber, setBondNumber] = useState(null);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [method, setMethod] = useState({label: "Rechercher par numéro de bond", value: "NUMBER"});

    useEffect(() => {
        if(selectedTickets.length > 0) {
            props.updateAmount(selectedTickets);
        }
    }, [selectedTickets])

    const searchTickets = () => {
        if(method?.value == 'NUMBER') {
            findTicketByCode();
        }
        if(method?.value == 'PERIOD') {
            findTicketByPeriod();
        }
    }

    const findTicketByCode = () => {
        props.setRequestGlobalAction(false);
        ProductService.findTicketByCode(bondNumber)
        .then((response) => {
            if(selectedTickets.filter(st => st.id == response.id).length <= 0) {
                setTickets([response, ...selectedTickets]);
            } else {
                NotificationManager.warning("Le ticket est déjà sélectionné");
            }
        })
        .catch((err) => {
            NotificationManager.error("Le numéro du ticket est innexistant");
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const findTicketByPeriod = () => {
        props.setRequestGlobalAction(false);
        ProductService.findTicketByPeriod({referral_code: props.referralCode, start_date: startDate, end_date: endDate})
        .then((response) => {
            setTickets([...response.filter(t => !selectedTickets.includes(t)), ...selectedTickets]);
        })
        .catch((err) => {
            NotificationManager.error("Le numéro du ticket est innexistant");
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <div>
            <div className='d-flex direction-column align-items-stretch'>
                <div className="has-wrapper mr-20" style={{ flex: 1 }}>
                    <Autocomplete
                        id="combo-box-demo"
                        value={method}
                        options={[
                            {label: "Rechercher par numéro de bond", value: "NUMBER"},
                            {label: "Rechercher par période de versement", value: "PERIOD"}
                        ]}
                        onChange={(__, item) => {
                            setMethod(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div> 
                {
                    method?.value == 'NUMBER' && (
                    <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                        <InputStrap
                            required
                            type="text"
                            id="setBondNumber"
                            name='setBondNumber'
                            value={bondNumber}
                            placeholder="Numéro du bond"
                            className="input-lg"
                            onChange={(e) => setBondNumber(e.target.value)}
                        />
                    </FormGroup>
                )}
                {
                    method?.value == 'PERIOD' && (
                        <div className='d-flex direction-column align-items-stretch' style={{ flex: 1 }}>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputStrap
                                    type="date"
                                    id="startDate"
                                    name='startDate'
                                    value={startDate}
                                    className="input-lg"
                                    placeholder="Date de début"
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputStrap
                                    type="date"
                                    id="endDate"
                                    name='endDate'
                                    value={endDate}
                                    className="input-lg"
                                    placeholder="Date de fin"
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                    )}
                <FormGroup className="has-wrapper">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            searchTickets();
                        }}
                        className="text-white font-weight-bold h-100"
                    >
                        Rechercher
                    </Button>
                </FormGroup>
            </div>
            { tickets.length > 0 && (
                <CustomList
                    loading={false}
                    list={tickets}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun ticket trouvé
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="w-5">Sélectionner</th>
                                                <th className="fw-bold">Propriétaire</th>
                                                <th className="fw-bold">Code</th>
                                                <th className="fw-bold">Montant</th>
                                                <th className="fw-bold">Date d'échéance</th>
                                                <th className="fw-bold">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={selectedTickets.map(t => t.id).includes(item.id)}
                                                                            onChange={() => {
                                                                                if(selectedTickets.map(t => t.id).includes(item.id)) {
                                                                                    setSelectedTickets([...selectedTickets.filter(t => t.id !== item.id)]);
                                                                                } else {
                                                                                    setSelectedTickets([...selectedTickets, item])
                                                                                }
                                                                            }}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.user?.userName}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.code}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.amount, item.currency)}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">
                                                                    <TimeFromMoment time={item.date} showFullDate />
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">
                                                                    { item.status == 'USED' ? 'Reglé' : 'En attente' }
                                                                </h4>
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
        </div>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
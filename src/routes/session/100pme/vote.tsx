import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import { injectIntl } from "react-intl";
import AppConfig from 'Constants/AppConfig';
import IntlMessages from "Util/IntlMessages";
import AppBar from '@material-ui/core/AppBar';
import { InputLabel } from '@material-ui/core';
import { voteOptions } from './components/data';
import Toolbar from '@material-ui/core/Toolbar';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import {HOME, AUTH, LANDING, PME_PROJECT, joinUrlWithParamsId} from "Url/frontendUrl";
import SystemService from 'Services/systems';

const COUNTRIES = [{value: "CM", label: "Cameroun"}, {value: "FR", label: "France"}];

const Vote = (props) => {
    
    const countryParam = new URLSearchParams(props.location.search).get("country");
    const cityParam = new URLSearchParams(props.location.search).get("city");

    const [city, setCity] = useState(null);
    const [cities, setCities] = useState([]);
    const [option, setOption] = useState(null);
    const [locality, setLocality] = useState(null);
    const [selectingCity, setSelectingCity] = useState(true);
    const [country, setCountry] = useState(countryParam ? COUNTRIES.find(c => c.value === countryParam) : null);
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
        if(countryParam) {
            localStorage.setItem("PME_COUNTRY", countryParam);
        }
    }, []);

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        SystemService.getProducts()
        .then((response) => {
            setProducts(response);
        }).catch((err) => {
            setProducts([]);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    useEffect(() => {
        if(country) {
            getCities(country);
        }
    }, [country]);

    const getCities = async (country) => {
        props.setRequestGlobalAction(true);
        const url = `${AppConfig.api.baseUrl}api/pme-votes/cities?country=${country?.value}`;
        try {
          const response = await fetch(url);
          const json = await response.json();
          setCities(json);
          if(cityParam) {
            setCity(json.find(c => c.id == cityParam));
            localStorage.setItem("PME_CITY", JSON.stringify(json.find(c => c.id == cityParam)));
          }
        } catch (error) {
          console.error(error);
          setCities([]);
        }
        props.setRequestGlobalAction(false);
    }

    const onUserSignUp = () => {
        props.history.push(AUTH.REGISTER);
    };

    const onDiscoverClick = () => {
        props.history.push(LANDING.HOME);
    };

    return (
        <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
                <AppBar position="static" className="session-header">
                    <Toolbar>
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <div className="session-logo">
                                    <Link to={HOME}>
                                        <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                    </Link>
                                </div>
                                <div className="center-hor-ver" style={{ marginRight: '10%' }}>
                                    <Button variant="contained" className="btn-light mr-2 p-10" onClick={onUserSignUp}>
                                        <IntlMessages id="auth.signup" />
                                    </Button>
                                    <Button variant="contained" className="btn-primary mr-2 p-10" onClick={onDiscoverClick}>
                                        Tout Microcap
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="session-inner-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="center-hor-ver session-body d-flex flex-column">
                                    <div className="session-head mb-10 text-center">
                                        <h1 className="p-20">Voter</h1>
                                        {/* This text is just a work around to add the width of the form input */}
                                        <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                    </div>
                                    <div className="row w-100 d-flex justify-content-around flex-column">
                                        {selectingCity ? (
                                            <div>
                                                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                                    <InputLabel className="text-left">
                                                        Pays
                                                    </InputLabel>
                                                    <Autocomplete
                                                        value={country}
                                                        id="combo-box-demo"
                                                        onChange={(__, item: any) => {
                                                            setCountry(item);
                                                            if(item) {
                                                                localStorage.setItem("PME_COUNTRY", item.value);
                                                            } else {
                                                                localStorage.removeItem("PME_COUNTRY");
                                                            }
                                                        }}
                                                        options={COUNTRIES}
                                                        getOptionLabel={(option) => option.label}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                    />
                                                </div>
                                                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                                    <InputLabel className="text-left">
                                                        Ma ville
                                                    </InputLabel>
                                                    <Autocomplete
                                                        value={city}
                                                        id="combo-box-demo"
                                                        onChange={(__, item) => {
                                                            setCity(item);
                                                            if(item) {
                                                                localStorage.setItem("PME_CITY", JSON.stringify(item));
                                                            } else {
                                                                localStorage.removeItem("PME_CITY");
                                                            }
                                                        }}
                                                        options={cities}
                                                        getOptionLabel={(option) => option.name}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                    />
                                                </div>
                                                <FormGroup className="has-wrapper">
                                                    <InputLabel className="text-left" htmlFor="locality">
                                                        Localité
                                                    </InputLabel>
                                                    <Input
                                                        required
                                                        id="locality"
                                                        type="text"
                                                        name='locality'
                                                        className="input-lg"
                                                        value={locality}
                                                        onChange={(e) => {
                                                            setLocality(e.target.value);
                                                            localStorage.setItem("PME_LOCALITY", e.target.value);
                                                        }}
                                                    />
                                                </FormGroup>
                                                <FormGroup className="mb-25">
                                                    <Button
                                                        color="primary"
                                                        disabled={!city || !locality}
                                                        className="w-100 ml-0 mt-15 text-white"
                                                        onClick={() => {
                                                            if(products.length > 0) {
                                                                props.history.push(joinUrlWithParamsId(PME_PROJECT.VOTE_PRODUCT, 1));
                                                            } else {
                                                                setSelectingCity(false);
                                                            }

                                                        }}
                                                    >
                                                        Continuer
                                                    </Button>
                                                </FormGroup>
                                            </div>
                                        ) :
                                        (    <div>
                                                {voteOptions.map(vo => (
                                                    <FormGroup check className="mb-25">
                                                        <Label check>
                                                            <Input
                                                                type="radio"
                                                                value={vo.value}
                                                                name="vote-option"
                                                                onChange={(e) => {
                                                                    setOption(e.target.value);
                                                                }}
                                                            />
                                                            <div className="ml-10">
                                                                <p className="mb-5 text-black" style={{ fontSize: '1.1rem' }}>{vo.label}</p>
                                                            </div>
                                                        </Label>
                                                    </FormGroup>
                                                ))}
                                                <FormGroup className="mb-25">
                                                    <Button
                                                        color="primary"
                                                        disabled={!option}
                                                        className="w-100 ml-0 mt-15 text-white"
                                                        onClick={() => {
                                                            if(option === 'VOTE') {
                                                                props.history.push(joinUrlWithParamsId(PME_PROJECT.VOTE_OPTION_2, voteOptions.find(vo => vo.value === option).id));
                                                            } else {
                                                                props.history.push(joinUrlWithParamsId(PME_PROJECT.VOTE_OPTION, voteOptions.find(vo => vo.value === option).id));
                                                            }
                                                        }}
                                                    >
                                                        Continuer
                                                    </Button>
                                                </FormGroup>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </QueueAnim>
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(injectIntl(Vote));

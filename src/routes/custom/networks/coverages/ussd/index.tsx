import { connect } from 'react-redux';
import UserService from 'Services/users';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [reference, setReference] = useState('');
    const [menus, setMenus] = useState([]);
    const [menu, setMenu] = useState(null);
    const [value, setValue] = useState(null);

    const onSubmit = () => {
        if(menu != null) {
            if(menu.editable && !value) {
                return;
            }
            props.setRequestGlobalAction(true);
            UserService.getUssdMenus(`${menu.editable ? menu.baseUrl+value : menu.baseUrl}`)
            .then(response => {
                if(typeof response === 'boolean') {
                    setMenu(null);
                    setValue(null);
                    setMenus([]);
                    setReference('');
                    alert('Opération terminée');
                } else {
                    setMenu(null);
                    setValue(null);
                    setMenus(response);
                }
            })
            .finally(() => props.setRequestGlobalAction(false));
        }
        if(reference && !menu && menus.length <= 0) {
            props.setRequestGlobalAction(true);
            UserService.getUssdAuth(reference)
            .then(response => setMenus(response))
            .finally(() => props.setRequestGlobalAction(false));
        }
    } 


    return (
        <>
            <PageTitleBar
                title={"Test UUSD"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    { menus.length <= 0 && (
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="reference">
                                Reference utilisateur
                            </InputLabel>
                            <InputStrap
                                id="reference"
                                type="text"
                                name='reference'
                                className="input-lg"
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                            />
                        </FormGroup>
                    )}
                    
                    { menus.length > 0 && (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Menus
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                options={menus}
                                value={menu}
                                onChange={(__, item) => {
                                    setMenu(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    )}

                    { menu && menu.editable && (
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="value">
                                Valeur
                            </InputLabel>
                            <InputStrap
                                id="value"
                                type="text"
                                name='value'
                                className="input-lg"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </FormGroup>
                    )}

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            onSubmit();
                        }}
                        className="text-white font-weight-bold bg-blue mr-10"
                    >
                        Valider
                    </Button>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));
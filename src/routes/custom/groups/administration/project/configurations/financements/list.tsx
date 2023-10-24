import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProjectService from 'Services/projects';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import PropertyTable from 'Components/PropertyTable';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { joinUrlWithParamsId, GROUP } from 'Url/frontendUrl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const List = (props) => {

    const [attributes, setAttributes] = useState([]);
    const [attribute, setAttribute] = useState(null);

    useEffect(() => {
        getAttributes();
    }, []);

    const getAttributes = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getAttributes().then(response => {
            setAttributes(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }


    const goToUpdate = () => {
        props.push(joinUrlWithParamsId(GROUP.ADMINISTRATION.PROJECT.CONFIGURATION.FINANCEMENT.UPDATE, attribute.id));
    }

    return (
        <RctCardContent>
            <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                <InputLabel className="text-left">
                    Liste des attributess
                </InputLabel>
                <Autocomplete
                    id="combo-box-demo"
                    value={attribute}
                    options={attributes}
                    onChange={(__, item) => {
                        setAttribute(item);
                    }}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
            </div>
            { attribute && (
                <PropertyTable 
                    reference={attribute?.reference}
                />
            )}
            {/* { attribute && ( */}
            <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        goToUpdate();
                    }}
                    className="text-white font-weight-bold"
                >
                    Ajouter
                </Button>
            </div>
            {/* )} */}
        </RctCardContent>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));

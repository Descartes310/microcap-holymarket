import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import ProjectService from 'Services/projects';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const Update = (props) => {

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

    return (
        <RctCardContent>
            <p>Mise a jour des infos</p>
        </RctCardContent>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));
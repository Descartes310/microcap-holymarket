import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TerritoryService from 'Services/territories';
import { translateTerritoryType } from 'Helpers/helpers';
import { NETWORK, joinUrlWithParamsId } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const Setting = (props) => {

    const [territories, setTerritories] = useState([]);

    useEffect(() => {
        getTerritories();
    }, [props.match.params.id]);

    const getTerritories = () => {
        props.setRequestGlobalAction(true);
        TerritoryService.getTerritoryChild({ id: props.match.params.id })
        .then(response => {
            setTerritories(response);
        })
        .catch(err => {
            console.log(err);
            props.history.back();
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            {/* <PageTitleBar
                title={"Liste des térritoires"}
            /> */}
            
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Setting));
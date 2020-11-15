import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {FormGroup, Input as InputStrap} from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {NotificationManager} from "react-notifications";
import {getAvailableItems} from "Helpers/helpers";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import FetchFailedComponent from "Components/FetchFailedComponent";

const ObjectSwitcher = props => {
    const { loading, label, data, onRetryClick, onItemsChanged } = props;

    const [permissionsSelected, setPermissionsSelected] = useState([]);
    const [permissions, setPermissions] = useState({
        leftValuesSelected: [],
        rightValuesSelected: [],
    });

    const handleSelect = (position, event) => {
        const values = Array.from(event.target.selectedOptions, option => option.value);
        const _values = values.map(v => data.find(i => i.id === Number(v)));
        setPermissions({
            leftValuesSelected: position === 'left' ? _values : [...permissions.leftValuesSelected],
            rightValuesSelected: position === 'left' ? [...permissions.rightValuesSelected] : _values,
        });
    };

    const handleOnSwitchPressed = position => {
        let dataToSend = permissions[position === 'left' ? 'leftValuesSelected' : 'rightValuesSelected'];

        if (dataToSend.length === 0) {
            NotificationManager.warning("Vous devrier d'abord selectionner un éléments dans la liste");
            return;
        }
        let newItems = [];
        if (position === 'left') {
            newItems = [...permissionsSelected, ...permissions.leftValuesSelected];
            setPermissionsSelected(newItems);
            setPermissions({
                leftValuesSelected: [],
                rightValuesSelected: [...permissions.rightValuesSelected, ...permissions.leftValuesSelected]
            });
        } else {
            newItems = permissionsSelected.filter(p => !permissions.rightValuesSelected.includes(p));
            setPermissionsSelected(newItems);
            setPermissions({
                leftValuesSelected: [...permissions.rightValuesSelected, ...permissions.leftValuesSelected],
                rightValuesSelected: [],
            });
        }

        onItemsChanged(newItems);
    };

    const availableProducts = data ? getAvailableItems(data , permissionsSelected) : [];

    if (loading) {
        return (<RctSectionLoader/>);
    }

    if (!data) {
        return (<FetchFailedComponent _onRetryClick={onRetryClick} /> )
    }

    return (
        <>

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="description">
                    {label}
                </InputLabel>
                <div className="row">
                    <div className="col-md-5 col-sm-5">
                        <InputStrap
                            type="select"
                            name="selectMulti"
                            id="SelectMulti"
                            onChange={event => handleSelect('left', event)}
                            multiple>
                            {availableProducts.map(p => (
                                <option key={p.id} value={p.id}>{p.label}</option>
                            ))}
                        </InputStrap>
                    </div>

                    <div className="col-1">
                        <IconButton
                            edge="start"
                            className={'text-black mr-2'}
                            style={{
                                marginLeft: -12,
                                marginRight: 20,
                            }}
                            color="inherit"
                            onClick={() => handleOnSwitchPressed('left')}
                            aria-label="menu">
                            <ArrowForwardIcon />
                        </IconButton>

                        <IconButton
                            edge="start"
                            className={'text-black'}
                            style={{
                                marginLeft: -12,
                                marginRight: 20,
                            }}
                            color="inherit"
                            onClick={() => handleOnSwitchPressed('right')}
                            aria-label="menu">
                            <ArrowBackIcon />
                        </IconButton>
                    </div>

                    <div className="col-md-5 col-sm-5">
                        <InputStrap
                            type="select"
                            name="selectMultiRight"
                            id="SelectMultiRight"
                            onChange={event => handleSelect('right', event)}
                            multiple>
                            {permissionsSelected.map(p => (
                                <option key={p.id} value={p.id}>{p.label}</option>
                            ))}
                        </InputStrap>
                    </div>
                </div>
            </FormGroup>
        </>
    );
};

ObjectSwitcher.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
    label: PropTypes.string.isRequired,
    onRetryClick: PropTypes.any,
    onItemsChanged: PropTypes.func.isRequired,
};

export default ObjectSwitcher;

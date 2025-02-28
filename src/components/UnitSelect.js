import { FormGroup } from 'reactstrap';
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import UnitService from 'Services/units';
import { withRouter } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class UnitSelect extends Component {

    state = {
        unit: null,
        units: []
    }
  
     constructor(props) {
        super(props);
        this.getUnits();
     }

     getUnits = () => {
        UnitService.getUnits()
        .then((response) => {
            this.setState({ units: response });
        }).catch((err) => {
            console.log(err);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.initialValue !== this.props.initialValue || prevState.units !== this.state.units) {
            if (this.props.initialValue && this.state.units.length > 0) {
                const matchedUnit = this.state.units.find(u => u.code === this.props.initialValue);
                if (matchedUnit) {
                    this.setState({ unit: matchedUnit }, () => {
                        this.props.onChange(this.state.unit);
                    });
                }
            }
        }
    }
  
    render() {

        const { unit, units } = this.state;
        const { label, onChange, isCurrency, className } = this.props;

        return (
            <FormGroup className={className ?? "col-md-6 col-sm-12 has-wrapper"}>
                <InputLabel className="text-left">
                    {label}
                </InputLabel>
                <Autocomplete
                    value={unit}
                    id="combo-box-demo"
                    onChange={(__, item) => {
                        this.setState({ unit: item }, () => {
                            onChange(item);
                        });
                    }}
                    getOptionLabel={(option) => option.label}
                    options={isCurrency ? units.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase())) : units}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
            </FormGroup>
        );
    }
}

export default withRouter(injectIntl(UnitSelect));
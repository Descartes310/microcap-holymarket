import React, { Component } from 'react';
import { connect } from "react-redux";

/**
 * Display amount in target currency
 * @param amount
 * @param currency
 * @returns {*}
 * @constructor
 */
class AmountCurrency extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    getAmount(amount, from, to = null) {
        if (from)
            if (to) {
                let from_currency = this.props.settings.currencies.filter(c => c.code == from)[0];
                let to_currency = this.props.settings.currencies.filter(c => c.code == to)[0];
                let main_amount = amount * from_currency.value;
                console.log('MID1 => ', main_amount);
                console.log('END1 => ', main_amount / to_currency.value);
                return main_amount / to_currency.value;
            } else {
                let from_currency = this.props.settings.currencies.filter(c => c.code == from)[0];
                let to_currency = this.props.settings.currencies.filter(c => c.main == true)[0];
                let main_amount = amount * from_currency.value;
                console.log('MID2 => ', main_amount);
                console.log('END2 => ', main_amount / to_currency.value);
                return main_amount / to_currency.value;
            }
        else {
            let from_currency = this.props.settings.currencies.filter(c => c.main == true)[0];
            let to_currency = this.props.settings.currencies.filter(c => c.main == true)[0];
            let main_amount = amount * from_currency.value;
            console.log('MID3 => ', main_amount);
            console.log('END3 => ', main_amount / to_currency.value);
            return main_amount / to_currency.value;
        }
    }

    getCurrency(from, to) {
        if (currency) {
            let from_currency = this.props.settings.currencies.filter(c => c.code == from)[0];
            let to_currency = this.props.settings.currencies.filter(c => c.code == to)[0];
            let main_currency = this.props.settings.currencies.filter(c => c.main == true)[0];
            let main_amount = this.props.amount * from_currency.value;
            let to_amount = main_amount * to_currency.value;
        } else {

        }
    }

    render() {
        const { className, styles, amount, from, to } = this.props;
        return (
            <p className={className} style={styles} >
                {this.getAmount(amount, from, to).toFixed(2)} {to ? to : 'EUR'}
            </p >
        );
    }
};

const mapStateToProps = ({ authUser, settings }) => {
    return {
        authUser: authUser.data,
        settings
    }
};

export default connect(mapStateToProps, {})(AmountCurrency);

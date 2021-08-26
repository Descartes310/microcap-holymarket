    import React, { Component } from 'react';
import { connect } from "react-redux";
import { AUTH } from "../urls/frontendUrl";
import { withRouter } from "react-router-dom";

/**
 * Display amount in target currency
 * @param amount
 * @param currency
 * @returns {*}
 * @constructor
 */
class AmountCurrency extends Component {

    state = {
        to: null
    }

    formatter = null;
    
    constructor(props) {
        super(props);
        if (this.props.authUser == null) {
            this.props.history.push(AUTH.LOGIN);
        } else {
            this.formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: this.state.to ? this.state.to : this.props.authUser.user.currency.code,
                minimumFractionDigits: 2
            })
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        if (this.props.to != prevProps.to) {
            this.forceUpdate();
            this.formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: this.props.to ? this.props.to : this.props.authUser.user.currency.code,
                minimumFractionDigits: 2
            })
        }
    }

    getAmount(amount, from, to = null) {
        if (from)
            if (to) {
                let from_currency = this.props.settings.currencies.filter(c => c.code == from)[0];
                if (!from_currency)
                    from_currency = { code: 'EUR', value: 1 };
                let to_currency = this.props.settings.currencies.filter(c => c.code == to)[0];
                let main_amount = amount * from_currency.value;
                return main_amount / to_currency.value;
            } else {
                let from_currency = this.props.settings.currencies.filter(c => c.code == from)[0];
                if (!from_currency)
                    from_currency = { code: 'EUR', value: 1 };
                let to_currency = null;
                if (this.props.authUser.user.currency)
                    to_currency = this.props.authUser.user.currency;
                else
                    to_currency = this.props.settings.currencies.filter(c => c.main == true)[0];

                let main_amount = amount * from_currency.value;
                return main_amount / to_currency.value;
            }
        else {
            let from_currency = this.props.settings.currencies.filter(c => c.main == true)[0];
            if (!from_currency)
                from_currency = { code: 'EUR', value: 1 };
            let to_currency = null;
            if (this.props.authUser.user.currency)
                to_currency = this.props.authUser.user.currency;
            else
                to_currency = this.props.settings.currencies.filter(c => c.main == true)[0];

            let main_amount = amount * from_currency.value;
            return main_amount / to_currency.value;
        }
    }

    getAmounts(amounts, to = null) {
        if (to) {
            let amount = 0;
            let from_currency = null;
            let to_currency = this.props.settings.currencies.filter(c => c.code == to)[0];
            amounts.forEach(a => {
                from_currency = this.props.settings.currencies.filter(c => c.code == a.currency)[0];
                let main_amount = 0;
                if (!from_currency)
                    from_currency = { code: 'EUR', value: 1 };
                if (a.quantity)
                    main_amount = (a.amount * a.quantity) * from_currency.value;
                else
                    main_amount = a.amount * from_currency.value;

                amount = amount + (main_amount / to_currency.value);
            });
            return amount;
        } else {
            let amount = 0;
            let from_currency = null;
            let to_currency = null;

            if (this.props.authUser.user.currency)
                to_currency = this.props.authUser.user.currency;
            else
                to_currency = this.props.settings.currencies.filter(c => c.main == true)[0];

            amounts.forEach(a => {
                from_currency = this.props.settings.currencies.filter(c => c.code == a.currency)[0];
                let main_amount = 0;
                if (!from_currency)
                    from_currency = { code: 'EUR', value: 1 };
                if (a.quantity != null)
                    main_amount = (a.amount * a.quantity) * from_currency.value;
                else
                    main_amount = a.amount * from_currency.value;

                amount = amount + (main_amount / to_currency.value);
            });
            return amount;
        }
    }

    getCurrency(to) {
        if (to) {
            return to
        } else {
            if (this.props.authUser.user.currency)
                return this.props.authUser.user.currency.code;
            else
                return this.props.settings.currencies.filter(c => c.main == true)[0].code;
        }
    }


    render() {
        const { className, styles, amount, from, to, quantity, amounts, notShowCurrency, unit } = this.props;
        return (
            <>
                {this.props.authUser != null ?

                    unit != null ?
                        <span className={className} style={styles} >
                            {amount} {unit.code}
                        </span>
                        :
                        amount != null ?
                            <span className={className} style={styles} >
                                {
                                    quantity ?
                                        !notShowCurrency ? this.formatter.format(this.getAmount(amount, from, to).toFixed(2) * quantity) : this.getAmount(amount, from, to).toFixed(2) * quantity
                                        :
                                        !notShowCurrency ? this.formatter.format(this.getAmount(amount, from, to).toFixed(2)) : this.getAmount(amount, from, to).toFixed(2)
                                }
                            </span>
                            :
                            <span className={className} style={styles} >
                                { !notShowCurrency ? this.formatter.format(this.getAmounts(amounts, to).toFixed(2)) : this.getAmounts(amounts, to).toFixed(2)}
                            </span>
                    :
                    null

                }
            </>
        );
    }
};

const mapStateToProps = ({ authUser, settings }) => {
    return {
        authUser: authUser.data,
        settings
    }
};

export default connect(mapStateToProps, {})(withRouter(AmountCurrency));

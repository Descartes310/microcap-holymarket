/**
 * Checkout Page
 */
import React, { Component } from 'react';

//Components
import CheckoutForm from './CheckoutForm';
import CheckoutItem from './CheckoutItem';

// Card Component
import { RctCard, RctCardContent } from 'Components/RctCard';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import {getOrder} from "Actions/independentActions";

import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import { setRequestGlobalAction} from "Actions";
import {deleteItemFromCart, onAddItemToCart } from "Actions/CartActions";
import {NotificationManager} from "react-notifications";
import {ERROR_500} from "Constants/errors";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import FetchFailedComponent from "Components/FetchFailedComponent";

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.orderId = this.props.match.params.id;
        this.state = {
            order: undefined
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getOrder(this.orderId)
            .then(order => {
                this.setState({order: order});
            })
            .catch(() => {
                this.setState({order: null});
            })
            .finally(() => this.props.setRequestGlobalAction(false));
    };


    render() {
        const { match, requestGlobalLoader } = this.props;

        if (this.state.order === undefined) {
            return (<RctSectionLoader/>);
        }

        if (this.state.order === null) {
            return <FetchFailedComponent _onRetryClick={this.loadData} />
        }

        return (
            <div className="checkout-wrap">
                <PageTitleBar title="Paiement" match={match} />
                <RctCard customClasses="overflow-hidden">
                    <RctCardContent noPadding>
                        <div className="row no-gutters">
                            <div className="col-lg-8 col-md-6 col-sm-12">
                                <CheckoutForm order={this.state.order} />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <CheckoutItem order={this.state.order} />
                            </div>
                        </div>
                    </RctCardContent>
                </RctCard>
            </div>
        )
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, cart, authUser  }) => {
    return {
        requestGlobalLoader,
        authUser: authUser.data,
        cart
    }
};

export default connect(mapStateToProps, {onAddItemToCart, deleteItemFromCart, setRequestGlobalAction})
((withRouter(injectIntl(Checkout))));

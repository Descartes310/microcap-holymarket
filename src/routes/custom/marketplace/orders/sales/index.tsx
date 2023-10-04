import { connect } from 'react-redux';
import Sales from './components/sales';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import PaymentForm from './components/paymentForm';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { setRequestGlobalAction, onClearCart } from 'Actions';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import OrderService from 'Services/orders';
import { MARKETPLACE } from 'Url/frontendUrl';

class Payments extends Component<any, any> {

    state = {
        order: null
    }

    componentDidMount() {
        this.findOrder();
     }

    findOrder = () => {
        this.props.setRequestGlobalAction(true);
        OrderService.findOrder(this.props.match.params.id).then((response) => {
           this.setState({order: response});
        }).catch(() => {
           this.props.history.push(MARKETPLACE.ORDERS);
        }).finally(() => {
           this.props.setRequestGlobalAction(false);
        });
     }

    render() {
        const { order } = this.state;
        const { match } = this.props;
        return (
            <>
                <PageTitleBar title={'Mes paiements'} match={match} />

                <RctCard customClasses="overflow-hidden">
                    <RctCardContent noPadding>
                        <div className="row no-gutters">
                            <div className={['CONFIRMED', 'PAYING'].includes(order?.status) ? 'col-lg-9 col-md-8 col-sm-12' : 'col-lg-12 col-md-12 col-sm-12'} style={{ padding: 20 }}>
                                <Sales />
                            </div>
                            { ['CONFIRMED', 'PAYING'].includes(order?.status) && (
                                <div className={`col-lg-3 col-md-4 col-sm-12`} style={{ padding: 20 }}>
                                    <PaymentForm order={order} />
                                </div>
                            )}
                        </div>
                    </RctCardContent>
                </RctCard>
            </>
        )
    }
}

const mapStateToProps = ({ cart }) => {
    return { cart };
}

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Payments));
import { Button } from "reactstrap";
import { connect } from "react-redux";
import React, { Component } from 'react';
import ProductService from "Services/products";
import NotificationService from "Services/notifications";
import DialogComponent from "Components/DialogComponent";
import { setRequestGlobalAction, onAddItemToCart } from "Actions";
import CodevStep3 from 'Routes/custom/marketplace/shop/components/codev/step3';
import CodevStep4 from 'Routes/custom/marketplace/shop/components/codev/step4';

class CodevInvitationBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            product: null,
            loading: false,
            showCodevStep3: false,
            showCodevStep4: false
        }
    }

    addToCart = (cartItem, e = null) => {
		this.setState({ loading: true });
		if(this.state.data)
			cartItem.customInfos = this.state.data;

		this.props.onAddItemToCart(cartItem);
		if(e) e.preventDefault();
		this.setState({ loading: false, product: null, data: null });
		if(cartItem?.customInfos?.type == 'CODEV') {
			if(cartItem.customInfos.line)
				ProductService.createLineBooking({line_references: [cartItem.customInfos.line.reference]});
			if(cartItem.customInfos.indivision)
				ProductService.createIndivisionBooking({indivision_references: [cartItem.customInfos.indivision.reference], dates: cartItem.customInfos.dates});
		}
        this.markAsTreat();
        this.props.onClose();
	}

    markAsTreat = () => {
        this.props.setRequestGlobalAction(true);
        NotificationService.markNotificationAsTreat(this.props.notification.id).finally(() => {
            this.props.setRequestGlobalAction(false);
            this.props.reloadNotifications();
        });
    };

    findGlobalLineData = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getLineGlobalInfo({line_reference: this.props.codevLine})
        .then(response => {
            this.setState({ data: {
                type: 'CODEV',
                line: response.line,
                selectedDate: response.tirage,
                subscriptionType: 'INDIVISION',
                indivision: response.indivision,
                line_reference: response.line.reference,
                productReference: response.product.reference,
            }, showCodevStep3: true, product: response.product })
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { notification } = this.props;
        const { showCodevStep3, showCodevStep4, product, data } = this.state;

        return (
            <DialogComponent
                title="Vous etes invités à un plan codev"
                onClose={this.props.onClose}
                show={this.props.show}
            >
                <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                    <div>
                        <p>Vous êtes invité à participer au plan de codeveloppement de {notification?.details?.find(nd => nd.type === "CODEV_INDIVISION_NAME")?.value}</p>
                        <p>Vous devez renseigner les montants et les rythmes de votre participation financière. 
                            Le ticket de participation est de {notification?.details?.find(nd => nd.type === "CODEV_INDIVISION_AMOUNT")?.value} EUR par période de versement.</p>
                        <p>Choisissez pour chaque date de versement, le nombre de ickets nécessire pour atteindre 
                            le montant souhaité pour votre participation financière au plan</p>
                    </div>
                    <Button
                        color="primary"
                        className="text-white mr-2"
                        onClick={() => this.findGlobalLineData()}
                    >
                        Continuer
                    </Button>
                </div>

                { showCodevStep3 && (
					<CodevStep3 
						data={data}
						product={product}
						show={showCodevStep3}
						onClose={() => this.setState({ showCodevStep3: false })}
						onSubmit={(data) => {
							this.setState({ data: data, showCodevStep3: false, showCodevStep4: true });
						}}
					/>
				)}
				{ showCodevStep4 && (
					<CodevStep4
						data={data}
						product={product}
						show={showCodevStep4}
						onClose={() => this.setState({ showCodevStep4: false })}
						onSubmit={(data) => {
							this.setState({ data: data,  showCodevStep3: false , showCodevStep4: false }, () => {
								this.addToCart(this.state.product);
							});
						}}
					/>
				)}
            </DialogComponent>
        );
    }
}

export default connect(({ cart }) => { return { cart }}, { setRequestGlobalAction, onAddItemToCart })(CodevInvitationBox);

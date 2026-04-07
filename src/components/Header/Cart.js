import { Badge } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NatureType from "Enums/NatureType";
import IntlMessages from 'Util/IntlMessages';
import { CART } from "Url/frontendUrl";
import { deleteItemFromCart } from "Actions";
import { getFilePath } from "Helpers/helpers";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import IconButton from '@material-ui/core/IconButton';
import { textTruncate, getPriceWithCurrency } from "Helpers/helpers";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

class Carts extends Component {
	state = {
		showWarningBox: false,
		itemToRemove: null,
	};

	getSubName = (item) => {
		if (item.nature === NatureType.SERVICE) {
			return "Service";
		} else {
			return "Achat"
		}
	};

	//Is Cart Empty
	isCartEmpty() {
		const { cart } = this.props;
		if (cart.count() === 0) {
			return true;
		}
	}

	//Get Total Price
	getTotalPrice() {
		const { cart } = this.props;
		let totalPrice = 0;
		if(cart.count() === 0) return 0;
		totalPrice = cart.items.map(ci => ci.price * ci.quantity).reduce((sum, current) => sum + current);
		return totalPrice.toFixed(2);
	}

	render() {
		const { cart, deleteItemFromCart } = this.props;
		return (
			<UncontrolledDropdown nav className="list-inline-item cart-dropdown z-9999999">
				<DropdownToggle nav className="p-0">
					<Tooltip title="Shopping Cart" placement="bottom">
						<IconButton aria-label="bag">
							<i className="zmdi zmdi-shopping-cart"></i>
							<Badge
								color="success"
								className="badge-xs badge-top-right"
							>
								{cart.count()}
							</Badge>
						</IconButton>
					</Tooltip>
				</DropdownToggle>
				<DropdownMenu right>
					<div className="dropdown-content">
						<div className="dropdown-top d-flex justify-content-between rounded-top bg-primary">
							<span className="text-white font-weight-bold">
								Panier
							</span>
						</div>
						{this.isCartEmpty() ? (
							<div className="text-center p-4">
								<span className="d-block font-3x mb-15 text-danger"><i className="zmdi zmdi-shopping-cart"></i></span>
								<h3><IntlMessages id="components.CartEmptyText" /></h3>
							</div>
						) : (
							<Fragment>
								<Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={280} autoHide>
									<ul className="list-unstyled dropdown-list">
										{cart.items.map((cart, key) => (
											<li className="d-flex justify-content-between" key={key}>
												<div className="media overflow-hidden w-75">
													<div className="mr-15">
														<img src={cart.image ? getFilePath(cart.image) : require('Assets/img/product.png')} alt="products" className="media-object" width="63" height="63" />
													</div>
													<div className="media-body">
														<span className="fs-14 d-block">{textTruncate(cart.label, 25)}</span>
														<span className="fs-12 d-block text-muted">{textTruncate(cart.description, 50)}</span>
													</div>
												</div>
												<div className="text-center">
													<span className="text-muted fs-12 d-block mb-10">{getPriceWithCurrency(cart.price, cart.currency)} X {cart.quantity}</span>
													<button
														type="button"
														className="hover-close rct-link-btn"
														onClick={() => deleteItemFromCart(cart)}>
														<i className="ti-close"></i>
													</button>
												</div>
											</li>
										))}
									</ul>
								</Scrollbars>
								<div className="dropdown-foot d-flex justify-content-between align-items-center p-2 bg-white rounded-bottom">
									<div>
										<Button
											variant="contained"
											component={Link}
											color="primary"
											to={CART}
											className="mr-10 btn-xs bg-blue text-white"
										>
											Voir le panier
										</Button>
									</div>
									<span className="fw-normal text-dark font-weight-bold font-xs">
										<IntlMessages id="widgets.total" /> {getPriceWithCurrency(this.getTotalPrice(), cart.items[0]?.currency)}
									</span>
								</div>
							</Fragment>
						)
						}
					</div>
				</DropdownMenu>
			</UncontrolledDropdown>
		)
	}
}

// map state to props
const mapStateToProps = ({ cart }) => {
	return { cart };
}

export default withRouter(connect(mapStateToProps, {
	deleteItemFromCart
})(Carts));

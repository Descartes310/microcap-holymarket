/**
 * Cart Component
 */
import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { Badge } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from "react-router-dom";

//Helper
import { textTruncate, getAppLayout } from "Helpers/helpers";

//Actions
import { deleteItemFromCart } from "Actions/CartActions";

//intl Messages
import IntlMessages from 'Util/IntlMessages';
import UserAvatar from "Components/UserAvatar";
import SweetAlert from "react-bootstrap-sweetalert";
import NatureType from "Enums/NatureType";
import { STORE } from "Url/frontendUrl";
import AmountCurrency from "Components/AmountCurrency";
import { getFilePath } from "Helpers/helpers";

class Carts extends Component {
	state = {
		showWarningBox: false,
		itemToRemove: null,
	};

	onWantToRemoveItem = (item) => {
		this.setState({ itemToRemove: item, showWarningBox: true });
	};

	onRemoveItemFromCart = (item) => {
		// this.props.deleteItemFromCart(this.state.itemToRemove.id);
		this.props.deleteItemFromCart(item);
	};

	getSubName = (item) => {
		if (item.nature === NatureType.SERVICE) {
			return "Service";
		} else {
			return "Achat"
		}
	};

	render() {
		const { cart, deleteItemFromCart, location } = this.props;
		const { showWarningBox } = this.state;

		return (
			<UncontrolledDropdown nav className="list-inline-item cart-dropdown">
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
							{/*<Badge color="warning">4 NEW</Badge>*/}
						</div>
						{cart.isCartEmpty() ? (
							<div className="text-center p-4">
								<span className="d-block font-3x mb-15 text-danger"><i className="zmdi zmdi-shopping-cart"></i></span>
								<h3><IntlMessages id="components.CartEmptyText" /></h3>
							</div>
						) : (
								<Fragment>
									<Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={280} autoHide>
										<ul className="list-unstyled dropdown-list">
											{cart.items.map((cartItem, key) => (
												<li className="d-flex justify-content-between" key={key}>
													<div className="media overflow-hidden w-75">
														<div className="mr-15">
															<UserAvatar
																avatar={getFilePath(cartItem.image)}
																name={cartItem.name}
																className="media-object"
																width="63"
																height="63"
															/>
														</div>
														<div className="media-body">
															<span className="fs-14 d-block">{textTruncate(cartItem.name, 25)}</span>
															{/* <span className="fs-12 d-block text-muted">{textTruncate(cartItem.description, 50)}</span> */}
															<span className="fs-12 d-block" style={{ fontWeight: 'bold' }}><AmountCurrency amount={cartItem.price} from={cartItem.currency} /> &times; {cartItem.quantity}</span>
														</div>
													</div>
													<div className="text-center">
														<button
															type="button"
															className="hover-close rct-link-btn"
															onClick={() => this.onRemoveItemFromCart(cartItem)}>
															<i className="ti-close" />
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
												to={STORE.CART}
												color="primary"
												className="mr-10 btn-xs bg-blue text-white"
											>
												Voir le panier
											</Button>
										</div>
										<span className="fw-normal text-dark font-weight-bold font-xs">
											Total: <AmountCurrency amounts={cart.items.map((e) => {
											return { amount: e.price, currency: e.currency, quantity: e.quantity }
										})} styles={{ fontWeight: 'bold' }} />
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

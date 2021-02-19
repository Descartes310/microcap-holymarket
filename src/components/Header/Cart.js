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
import {STORE} from "Url/frontendUrl";

class Carts extends Component {
	state = {
		showWarningBox: false,
		itemToRemove: null,
	};

	onWantToRemoveItem = (item) => {
		this.setState({itemToRemove: item, showWarningBox: true});
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
																avatar={cartItem.image}
																name={cartItem.name}
																className="media-object"
																width="63"
																height="63"
															/>
														</div>
														<div className="media-body">
															<span className="fs-14 d-block">{textTruncate(cartItem.name, 25)}</span>
															<span className="fs-12 d-block text-muted">{textTruncate(cartItem.description, 50)}</span>
															{/*<span className="fs-12 d-block text-muted">{cartItem}</span>*/}
														</div>
													</div>
													<div className="text-center">
														<span className="text-muted fs-12 d-block mb-10">$ {cartItem.price} X {cartItem.quantity}</span>
														{/* <a
															href="javascript:void(0);"
															className="hover-close"
															onClick={() => deleteItemFromCart(cart)}>
															<i className="ti-close"></i>
														</a> */}
														<button
															type="button"
															className="hover-close rct-link-btn"
															onClick={() => this.onRemoveItemFromCart(cartItem)}>
															<i className="ti-close"/>
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
											{/* <Button
												variant="contained"
												component={Link}
												to={`/${getAppLayout(location)}/ecommerce/checkout`}
												color="primary"
												className="btn-xs bg-primary text-white"
											>
												Payer
											</Button> */}
										</div>
										<span className="fw-normal text-dark font-weight-bold font-xs">
											Total: $ {cart.getTotalPrice()}
											{/*<IntlMessages id="widgets.total" /> $ {this.getTotalPrice()}*/}
										</span>
									</div>
									{/*<SweetAlert
										type="danger"
										show={showWarningBox}
										showCancel
										showConfirm
										title={"Confirmation"}
										customButtons={(
											<>
												<Button
													color="blue"
													variant="outlined"
													onClick={() => this.setState({showWarningBox: false})}
													className="text-white bg-blue font-weight-bold mr-3"
												>
													<IntlMessages id="button.cancel" />
												</Button>
												<Button
													color="primary"
													variant="contained"
													className="bg-danger text-white font-weight-bold"
													onClick={() => this.onRemoveItemFromCart()}
												>
													<IntlMessages id="button.delete" />
												</Button>
											</>
										)}
										onConfirm={() => this.onRemoveItemFromCart()}
									>
										<IntlMessages id="branch.alert.deleteText" />
									</SweetAlert>*/}
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

import { connect } from 'react-redux';
import React, { Component } from 'react';
import UnitService from 'Services/units';
import { Scrollbars } from 'react-custom-scrollbars';
import { setCurrency, setCurrencies } from 'Actions';
import { DropdownToggle, DropdownMenu, Dropdown } from 'reactstrap';

class Currencies extends Component {

	state = {
		langDropdownOpen: false,
		currencies: []
	}

	componentDidMount() {
		this.getCurrencies();
	}

	// function to toggle dropdown menu
	toggle = () => {
		this.setState({
			langDropdownOpen: !this.state.langDropdownOpen
		});
	}

	getCurrencies() {
        UnitService.getCurrencies()
        .then((response) => {
			this.setState({ currencies: response });
			this.props.setCurrencies(response);
		})
	}

	// on change currency
	onChangeCurrency(cu) {
		this.setState({ langDropdownOpen: false });
		this.props.setCurrency(cu);
	}	

	render() {
		const { currency } = this.props;
		const { currencies } = this.state;
		return (
			<Dropdown nav className="list-inline-item language-dropdown tour-step-5" isOpen={this.state.langDropdownOpen} toggle={this.toggle}>
				<DropdownToggle caret nav className="header-icon language-icon">
					{currency?.code}
				</DropdownToggle>
				<DropdownMenu>
					<div className="dropdown-content">
						<div className="dropdown-top d-flex justify-content-between rounded-top bg-primary">
							<span className="text-white font-weight-bold">Dévises</span>
						</div>
						<Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={280}>
							<ul className="list-unstyled mb-0 dropdown-list">
								{currencies.map((c, key) => (
									<li key={key} onClick={() => this.onChangeCurrency(c)}>
										<a href="#" onClick={e => e.preventDefault()}>
											{c.label}
										</a>
									</li>
								))}
							</ul>
						</Scrollbars>
					</div>
				</DropdownMenu>
			</Dropdown>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return settings
};

export default connect(mapStateToProps, {
	setCurrency,
	setCurrencies
})(Currencies);

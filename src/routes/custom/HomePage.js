import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class HomePage extends Component {

	state = {
		showActivationBox: false
	}

	constructor(props) {
        super(props);
	}

	render() {

		return (
			<div className="full-height col-sm-12 col-md-9 col-lg-7 mx-auto text-center d-flex align-items-center justify-content-center">
				
			</div>
		)
	}
}
const mapStateToProps = ({ authUser }) => {
	return {
		authUser: authUser.data
	}
};

export default connect(mapStateToProps, {})(withRouter((injectIntl(HomePage))));

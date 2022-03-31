import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class HomePage extends Component {

	constructor(props) {
        super(props);
	}

	render() {
		const { match } = this.props;
		return (
			<div className="full-height col-sm-12 col-md-9 col-lg-7 mx-auto text-center">
				<h1 className="mb-20">
					Welcome to microcap
				</h1>
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

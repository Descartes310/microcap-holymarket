import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import {NOTIFICATIONS} from "Url/frontendUrl";

class HomePage extends Component {

	constructor(props) {
        super(props);
	}

	render() {
		const { match, authUser, history } = this.props;
		return (
			<div className="full-height col-sm-12 col-md-9 col-lg-7 mx-auto text-center d-flex align-items-center justify-content-center">
				{
					!authUser?.active ? 
					<div>
						<h1>Confirmez votre compte pour commencer, cliquez sur le bouton ci-dessous</h1>
						<Button
							color="primary"
							variant="contained"
							onClick={() => {
								history.push(NOTIFICATIONS.LIST);
							}}
							className={"text-white font-weight-bold mt-20"}
						>
							Confirmer mon compte
						</Button>
					</div> : 
					<h1 className="mb-20">
						Bienvenue sur MicroCap
					</h1>
				}
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

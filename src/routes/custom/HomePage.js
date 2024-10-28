import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { NOTIFICATIONS, PROFILE, GROUP } from "Url/frontendUrl";

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
									history.push(`${NOTIFICATIONS.LIST}?action=activate`);
								}}
								className={"text-white font-weight-bold mt-20"}
							>
								Confirmer mon compte
							</Button>
						</div> 
					: 
					!authUser?.authenticate ? 
						<div>
							<h1>
								Vous devez renseigner votre dossier utilisateur et attendre d'être authentifier.
								Veuillez cliquer sur le bouton ci-dessous pour commencer à renseigner vos pièces.</h1>
							<Button
								color="primary"
								variant="contained"
								onClick={() => {
									history.push(`${PROFILE.USER.CARD}?href=folder`);
								}}
								className={"text-white font-weight-bold mt-20"}
							>
								Renseigner mon dossier
							</Button>
						</div>
					: 
					(!authUser?.membershipNumber && !authUser.referralTypes.includes('PROJECT'))  ? 
						<div>
							<h1>
								Vous devez rejoindre une communauté pour obtenir un numéro d'adhésion.</h1>
							<Button
								color="primary"
								variant="contained"
								onClick={() => {
									history.push(`${GROUP.COMMUNITY.SPACE.ALL}`);
								}}
								className={"text-white font-weight-bold mt-20"}
							>
								Rechercher une communauté
							</Button>
						</div>
					:
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

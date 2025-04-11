import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { PROFILE, GROUP } from "Url/frontendUrl";
import ActivationBox from './notifications/ActivationBox';

class HomePage extends Component {

	state = {
		showActivationBox: false
	}

	constructor(props) {
        super(props);
	}

	render() {
		const { authUser, history } = this.props;
		const { showActivationBox } = this.state;

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
									this.setState({showActivationBox: true});
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
				{ showActivationBox && (
					<ActivationBox
						show={showActivationBox}
						pdfURL={'http://www.africau.edu/images/default/sample.pdf'}
						onClose={() => {
							this.setState({showActivationBox: false});
							window.location.reload();
						}}
					/>
				)}
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

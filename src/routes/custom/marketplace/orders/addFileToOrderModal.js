import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import UserService from 'Services/users';
import { PROFILE } from 'Url/frontendUrl';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import { getFilePath } from 'Helpers/helpers';
import SettingService from 'Services/settings';
import { FormGroup, Button } from 'reactstrap';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from "react-notifications";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class AddFileToOrderModal extends Component {

    state = {
        files: [],
        file: null,
        order: null,
        agencies: [],
        agency: null,
        userFiles: [],
        userFile: null,
        orderUserFiles: [],
     }
  
     constructor(props) {
        super(props);
     }

     componentDidMount() {
        this.findOrder();
     }

    getBankAgencies () {
        this.props.setRequestGlobalAction(true);
        UserService.getInstitutions({type: 'BANK_AGENCY', order_reference: this.state.order.reference})
        .then(response => this.setState({ agencies: response, agency: response.find(a => a.id == this.state.order.bankAgencyId) }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

     findOrder = () => {
        this.props.setRequestGlobalAction(true),
        OrderService.findOrder(this.props.order.id)
        .then(response => {
            this.setState({ order: response }, () => {
                this.getUserFileTypes();
                this.getUserFiles();
                if(this.state.order.mirrorAccount) {
                    this.getBankAgencies()
                }
            });
        })
        .catch((err) => {
            NotificationManager.error("Une erreur est survenue, veuillez réessayer plus tard");
            this.props.onClose();
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getUserFiles = () => {
        UserService.getMyFiles({referral_code: this.state.order.referralCode})
        .then(files => {
            this.setState({ files });
        })
        .catch((error) => {
            this.setState({ files: [] });
        });
    };

    getUserFileTypes = () => {
        this.props.setRequestGlobalAction(true);
        SettingService.getUserFileTypes()
        .then(response => {
            this.setState({ userFiles: response, orderUserFiles: response.filter(file => this.state.order.pieces?.includes(file.reference)) });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {
        if(!this.state.agency) {
            NotificationManager.error("Veuillez renseigner les informations");
            return;
        }

        const verifiedPieces = this.state.files.filter(f => f.value != null && f.status).map(f => f.source);
        const pieceNotVerified = this.state.orderUserFiles.find(file => !verifiedPieces.includes(file.reference));

        if(pieceNotVerified) {
            NotificationManager.error("Votre dossier n'est pas complet");
            return;
        }

        this.props.setRequestGlobalAction(true);
        
        let data = {
            agencyId: this.state.agency.id
        };

        OrderService.addFileToOrder(this.state.order.id, data, {})
        .then(() => {
            this.setState({ file: null, userFile: null })
            NotificationManager.success("Cette pièce a été envoyée avec succès");
        }).catch(() => {
            NotificationManager.error("Une erreur est survenue, la taille maximum de fichier autorisée est 1MB");
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { orderUserFiles, files, agencies, agency, order } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <RctCardContent>
                    <h2>Note d'information:</h2>
                    <ul className="pl-30">
                        <li>Si vous avez des pièces manquantes, renseignez-les dans votre <a href={`${PROFILE.USER.CARD}#folder`}>dossier utilisateur ici</a></li>    
                        <li>Si vous avez des pièces non vérifiée, rapprochez vous d'un guichet MicroCap pour leur vérification</li>    
                    </ul>
                    <div className="table-responsive mt-30 mb-30">
                        <table className="table table-bordered table-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="fw-bold">Titre</th>
                                    <th className="fw-bold">Spéciment</th>
                                    <th className="fw-bold">Mon document</th>
                                    <th className="fw-bold">Status</th>
                                    <th className="fw-bold">Décision</th>
                                </tr>
                            </thead>
                            <tbody>
                                { orderUserFiles.map(file => (
                                    <tr>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className={`m-0 fw-bold`}>
                                                        {file.label}
                                                    </h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    { file.sample && (
                                                        <span onClick={() => window.open(getFilePath(file.sample), 'blank')} className="cursor-pointer text-black">
                                                            Consulter spéciment
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    { files.find(f => f.source == file.reference)?.value && (
                                                        <span onClick={() => window.open(getFilePath(files.find(f => f.source == file.reference).value), 'blank')} className="cursor-pointer text-black">
                                                            Consulter le document
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    {files.find(f => f.source == file.reference)?.status ? 'Vérifié' : 'Non vérifié'}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="user-status-pending d-flex flex-row align-items-center" style={{ position: 'relative' }}>
                                                    <div className={`user-status-pending-circle rct-notify mr-10`} style={{
                                                        background: files.find(f => f.source == file.reference)?.status ? 'green' : 'red'
                                                    }} />
                                                    {files.find(f => f.source == file.reference)?.status ? 'Eligible' : 'Non éligible'}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    { order?.mirrorAccount && (
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Domiciliation
                            </InputLabel>
                            <Autocomplete
                                value={agency}
                                options={agencies}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    this.setState({ agency: item });
                                }}
                                getOptionLabel={(option) => option.label+" ("+option.code+")"}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    )}

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Envoyer les pièces et enregistrer
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(AddFileToOrderModal)));
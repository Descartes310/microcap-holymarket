import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import BankService from 'Services/banks';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';

class CreatePrestationDetailsModal extends Component {
  
    state = {
        details: [],
        label: null,
        description: null,
        isCreation: false,
    }

    constructor(props) {
        super(props);
        this.getDetails();
    }

    getDetails = () => {
        BankService.getPrestationDetails(this.props.prestation.id).then((details) => {
            this.setState({ details });
        }).catch((err) => {
            this.setState({ details: [] });
            NotificationManager.error("Une erreur est survenue");
        }).finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    onSubmit = () => {

        const { label, description } = this.state;

        if(!label) {
            NotificationManager.error("La désignation est obligatoire");
            return;
        }

        this.props.setRequestGlobalAction(true);

        let data = {label, description};

        BankService.addDetailsToPrestation(this.props.prestation.id, data).then(() => {
            this.getDetails();
            NotificationManager.success("Le détails a été créé avec succès");
        }).catch((err) => {
            NotificationManager.error("Une erreur est survenu lors de la création du details");
        }).finally(() => {
            this.setState({ isCreation: false });
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { label, description, isCreation, details } = this.state;

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
             { isCreation ? (
                <RctCardContent>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="label"
                            name='label'
                            value={label}
                            className="input-lg"
                            onChange={(e) => this.setState({ label: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="description"
                            name='description'
                            value={description}
                            className="input-lg"
                            onChange={(e) => this.setState({ description: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Créer le détails
                        </Button>
                    </FormGroup>
                </RctCardContent>
            ) : (
                <CustomList
                    loading={false}
                    list={details}
                    itemsFoundText={n => `${n} détails trouvés`}
                    onAddClick={() => this.setState({ isCreation: true })}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun détails trouvé
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Désignation</th>
                                                <th className="fw-bold">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <p className="m-0 text-dark">{item.description}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                />
            )}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(CreatePrestationDetailsModal)));
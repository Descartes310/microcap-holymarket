import { connect } from 'react-redux';
import { FormGroup } from 'reactstrap';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Indivision from './createIndivision.tsx';

class CodevStep2 extends Component {

    state = {
        lines: [],
        product: null,
        checkAll: 'none',
        selectedLine: null,
        showCreateIndivision: false,
    }

    constructor(props) {
        super(props);
    }

    render() {

        const { onClose, show } = this.props;
        const { selectedLine, lines, showCreateIndivision } = this.state;

        return (
            <>
                {showCreateIndivision
                    ? <Indivision
                        data={this.props.data}
                        show={showCreateIndivision}
                        onClose={() => {
                            this.setState({ showCreateIndivision: false });
                        }}
                        onValidate={(indivision) => {
                            let data = {
                                ...this.props.data, ...indivision, newIndivision: true
                            }
                            this.props.onSubmit(data); 
                        }}
                    /> :
                    <DialogComponent
                        show={show}
                        onClose={onClose}
                        size="md"
                        title={(
                            <h3 className="fw-bold">
                                Indivisions
                            </h3>
                        )}
                    >
                        <RctCardContent>
                            <CustomList
                                list={lines}
                                loading={false}
                                onAddClick={() => this.setState({ showCreateIndivision: true })}
                                itemsFoundText={n => `${n} lignes trouvées`}
                                renderItem={list => (
                                    <>
                                        {list && list.length === 0 ? (
                                            <div className="d-flex justify-content-center align-items-center py-50">
                                                <h4>
                                                    Aucunes lignes trouvées
                                                </h4>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th className="w-5">
                                                                Sélectionner
                                                            </th>
                                                            <th className="fw-bold">Référence</th>
                                                            <th className="fw-bold">Nom</th>
                                                            <th className="fw-bold">Montant</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list && list.map((item, key) => (
                                                            <tr key={key} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        checked={selectedLine?.id == item.id}
                                                                                        onChange={() => this.setState({ selectedLine: item })}
                                                                                        color="primary"
                                                                                    />
                                                                                }
                                                                                label=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.reference}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.denomination}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.amount} EUR</h4>
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
                            <FormGroup className="float-right mb-20">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => { this.onValidate() }}
                                    className="text-white font-weight-bold mb-20"
                                >
                                    Soumettre
                                </Button>
                            </FormGroup>
                        </RctCardContent>

                    </DialogComponent>
                }
            </>

        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(CodevStep2));
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import Printer, { print } from 'react-pdf-print';
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";
import { getProductDetailsByName, getTimeUnitByValue } from "Helpers/datas";

class PrintDetails extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { onClose, show, title, product } = this.props;

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

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => print(["printable"])}
                        className="text-white font-weight-bold mb-20"
                    >
                        Imprimer
                    </Button>

                    <Printer>
                        <div id="printable" style={{ width:'210mm', height: '297mm' }}>
                            <br /><br />
                            <h2 style={{ marginLeft: "5%" }}>Fiche technique du document</h2>
                            <br />
                            <table className='table table-striped table-bordered' style={{ width: '90%', marginLeft: '5%' }}>
                                <thead>
                                    <th>Nom du détails</th>
                                    <th>Valeur courante</th>
                                </thead>
                                <tbody>
                                    {product?.details.map(details => (
                                        <tr>
                                            <td>{getProductDetailsByName(details.type)?.label}</td>
                                            { details.type == 'DEPOSITPERIOD' ?
                                                <td>{getTimeUnitByValue(details.value)?.label}</td> :
                                                <td>{details.value}</td>
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Printer>
                </RctCardContent>
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(PrintDetails));
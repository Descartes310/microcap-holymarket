import { connect } from 'react-redux';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProductService from "Services/products";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import ChangeTicketGroup from './changeTicketGroup';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import ChangeTicketExigibility from './changeTicketExigibility';

class CodevPrevisions extends Component {

    state = {
        tickets: [],
        lines: [],
        line: null,
        startDate: null,
        endDate: null,
        showExigibilityModal: false,
        showTicketGroupModal: false,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getLines();
    }

    getLines = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getLineByAccount({account_reference: this.props.reference}).then(response => {
            this.setState({lines: response});
        }).catch((err) => {
            console.log(err);
            this.setState({lines: []});
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }
    
    searchTickets = () => {
        if(!this.state.line) {
            NotificationManager.error('Selectionnez une ligne');
            return;
        }
        this.props.setRequestGlobalAction(true);
        let data = {line_reference: this.state.line.reference}
        if(this.state.startDate) {
            data.start_date = this.state.startDate;
        }
        if(this.state.endDate) {
            data.end_date = this.state.endDate;
        }
        ProductService.getTickets(data).then(response => {
            this.setState({tickets: response});
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { tickets, lines, line, startDate, endDate, showExigibilityModal, showTicketGroupModal } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="lg"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <RctCardContent>
                    <div className='d-flex direction-column align-items-stretch'>
                        <div className="has-wrapper mr-20" style={{ flex: 1 }}>
                            <Autocomplete
                                id="combo-box-demo"
                                value={line}
                                options={lines}
                                onChange={(__, item) => {
                                    this.setState({ line: item, tickets: [] });
                                }}
                                getOptionLabel={(option) => `Date de tirage: ${option.date}`}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <div className='d-flex direction-column align-items-stretch' style={{ flex: 1 }}>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputStrap
                                    type="date"
                                    id="startDate"
                                    name='startDate'
                                    value={startDate}
                                    className="input-lg"
                                    placeholder="Date de début"
                                    onChange={(e) => this.setState({ startDate: e.target.value, tickets: [] })}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputStrap
                                    type="date"
                                    id="endDate"
                                    name='endDate'
                                    value={endDate}
                                    className="input-lg"
                                    placeholder="Date de fin"
                                    onChange={(e) => this.setState({ endDate: e.target.value, tickets: [] })}
                                />
                            </FormGroup>
                        </div>
                        <FormGroup className="has-wrapper">
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    this.searchTickets();
                                }}
                                className="text-white font-weight-bold h-100"
                            >
                                Rechercher
                            </Button>
                        </FormGroup>
                    </div>
                    <div className='d-flex direction-column justify-content-between'>
                        <div><p>{tickets.length} bonds trouvés</p></div>
                        <div className='d-flex direction-column'>
                            <FormGroup className="has-wrapper">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    disabled={tickets.length <= 0 || !line}
                                    onClick={() => {
                                        this.setState({showExigibilityModal: true})
                                    }}
                                    className="text-white font-weight-bold h-100"
                                >
                                    Date d'exigibilité
                                </Button>
                            </FormGroup>
                            <FormGroup className="has-wrapper ml-10">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    disabled={tickets.length <= 0 || !line}
                                    onClick={() => {
                                        this.setState({showTicketGroupModal: true})
                                    }}
                                    className="text-white font-weight-bold h-100"
                                >
                                    Créer des mega-bonds
                                </Button>
                            </FormGroup>
                        </div>
                    </div>
                    <table className='table table-striped table-bordered' style={{ width: '100%' }}>
                        <thead>
                            <th>Code</th>
                            <th>Exigibilité</th>
                            <th>Echéance</th>
                            <th>Montant</th>
                            <th>Status</th>
                        </thead>
                        <tbody>
                            {tickets.map(ticket => (
                                <tr>
                                    <td>{ticket.code}</td>
                                    <td>{ticket.exigibilityDate}</td>
                                    <td>{ticket.date}</td>
                                    <td>{getPriceWithCurrency(ticket.amount, ticket.currency)}</td>
                                    <td>{ticket.status && ticket.paymentDate ? 'Payé le '+ticket.paymentDate : 'Non payé'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </RctCardContent>
                { showExigibilityModal && line && tickets.length > 0 && (
                    <ChangeTicketExigibility
                        show={showExigibilityModal}
                        onClose={(reload) => {
                            this.setState({showExigibilityModal: false})
                            if(reload) {
                                this.searchTickets();
                            }
                        }}
                        lineReference={line.reference}
                        startDate={startDate}
                        endDate={endDate}
                    />
                )}
                { showTicketGroupModal && line && tickets.length > 0 && (
                    <ChangeTicketGroup
                        show={showTicketGroupModal}
                        onClose={(reload) => {
                            this.setState({showTicketGroupModal: false})
                            if(reload) {
                                this.searchTickets();
                            }
                        }}
                        lineReference={line.reference}
                        startDate={startDate}
                        endDate={endDate}
                    />
                )}
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(CodevPrevisions));
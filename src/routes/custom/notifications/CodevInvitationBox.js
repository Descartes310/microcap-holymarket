import { Button } from "reactstrap";
import { connect } from "react-redux";
import React, { Component } from 'react';
import UserService from "Services/users";
import { convertDate } from 'Helpers/helpers';
import ProductService from "Services/products";
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import NotificationService from "Services/notifications";
import DialogComponent from "Components/DialogComponent";
import { FormGroup, Input as InputStrap } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { setRequestGlobalAction, onAddItemToCart } from "Actions";

class CodevInvitationBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alias: null,
            aliases: [],
            dates: [],
            tickets: [],
            product: null,
            endDate: null,
            startDate: null,
            selectedTickets: [],
        }
    }

    componentDidMount() {
        this.findGlobalLineData();
        this.getAliases();
    }

    getAliases = () => {
        UserService.getContacts().then((contacts) => {
            this.setState({ aliases: contacts.filter(c => c.type === 'ALIAS') });
        });
    }

    markAsTreat = () => {
        this.props.setRequestGlobalAction(true);
        NotificationService.markNotificationAsTreat(this.props.notification.id).finally(() => {
            this.props.setRequestGlobalAction(false);
            this.props.reloadNotifications();
        });
    };

    findTickets = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getTicketsByIndivision({show: false, reference: this.state.indivision.reference})
        .then(response => {
            this.setState({ tickets: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findGlobalLineData = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getLineGlobalInfo({line_reference: this.props.notification?.details?.find(nd => nd.type === "CODEV_LINE_REF")?.value})
        .then(response => {
            this.setState({
                indivision: response.indivision,
                product: response.product 
            });

            let period = response.product.details.find(d => d.type == 'DEPOSIT_PERIOD')?.value;
            let depositStartDate = response.product.details.find(d => d.type == 'START_DEPOSIT_DATE')?.value;
            let cycleTime = response.product.details.find(d => d.type == 'CYCLE_TIME')?.value;

            let tmpDates = [];
            let date = new Date(depositStartDate);

            for (let index = 0; index < Number(cycleTime); index++) {

                tmpDates.push(convertDate(date, "YYYY-MM-DD"));
                switch (period) {
                    case "DAYS":
                        date.setDate(date.getDate() + 1);
                        break;
                    case "WEEKS":
                        date.setDate(date.getDate() + 7);
                        break;
                    case "MONTHS":
                        date.setDate(date.getDate() + 30);
                        break;
                    default:
                        date.setDate(date.getDate() + 1);
                        break;
                }
            }

            this.setState({product: response, dates: tmpDates, startDate: depositStartDate, endDate: tmpDates[tmpDates.length-1]});
            this.findTickets();
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {
        if(this.state.selectedTickets.length <= 0) {

        }
        let datas = {
            tickets: this.state.selectedTickets.map(t => t.reference)
        }
        if(this.state.alias) datas.alias = this.state.alias.value;

        //console.log(datas);

        this.props.setRequestGlobalAction(true)
        ProductService.createSubscriber(datas)
        .then(() => {
            this.props.onClose();
            this.markAsTreat();
        })
        .finally(() => this.props.setRequestGlobalAction(false))

    }

    render() {

        const { show, onClose } = this.props;
        const { data, startDate, endDate, tickets, selectedTickets, aliases, dates, alias } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Rythme des versements
                    </h3>
                )}
            >
                <RctCardContent>
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                        <InputLabel className="text-left" htmlFor="startDate">
                            Alias à utiliser
                        </InputLabel>
                        <Autocomplete
                            value={alias}
                            options={aliases}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                this.setState({ alias: item });
                            }}
                            getOptionLabel={(option) => option.value}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>

                    <h4>Filtre</h4>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="startDate">
                                Date de début
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                className="input-lg"
                                id="startDate"
                                name='startDate'
                                value={startDate}
                                onChange={(e) => this.setState({ startDate: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="endDate">
                                Date de fin
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                id="endDate"
                                name='endDate'
                                value={endDate}
                                className="input-lg"
                                onChange={(e) => this.setState({ endDate: e.target.value })}
                            />
                        </FormGroup>
                    </div>
                    <table className='table table-bordered'>
                        <thead>
                            <th>Date de versement</th>
                            <th>Tickets</th>
                        </thead>
                        <tbody>
                            { dates.filter(d => d >= startDate && d <= endDate).map(d => (
                                <tr>
                                    <td>{d}</td>
                                    <td>
                                        <div className="col-md-12 col-sm-12">
                                            <Autocomplete
                                                multiple
                                                id="combo-box-demo"
                                                onChange={(__, items) => {
                                                    this.setState({ selectedTickets: [...selectedTickets.filter(t => !tickets.filter(s => s.date === d).includes(t)), ...items]});
                                                }}
                                                getOptionLabel={(option) => 'Code de tiquet: '+option.code}
                                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                options={tickets.filter(s => s.date === d)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <FormGroup className="float-right mb-20">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                this.onSubmit(); 
                            }}
                            className="text-white font-weight-bold mb-20"
                        >
                            Continuer
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default connect(({ cart }) => { return { cart }}, { setRequestGlobalAction, onAddItemToCart })(CodevInvitationBox);

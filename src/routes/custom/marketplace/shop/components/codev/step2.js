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
        selectedLines: [],
        showCreateIndivision: false,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.product) {
            this.findProduct();
        }
    }

    findProduct = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.findProduct(this.props.product.reference)
            .then(response => {
                if (response.details.length <= 0) {
                    NotificationManager.error('Produit non configuré');
                    this.props.onClose();
                }
                this.setState({ product: response }, () => this.computeLines());
            })
            .finally(() => this.props.setRequestGlobalAction(false))
    }

    computeLines = () => {
        let lines = [];
        let lineCount = Number(this.state.product?.details.find(d => d.type === 'LINEGROUP').value);

        for (let index = 1; index <= lineCount; index++) {
            let line = { label: 'Ligne numéro ' + index, id: index };
            lines.push(line);
        }

        this.setState({ lines });
    }

    onToggle = (lineIds) => {
        let newLines = [...this.state.selectedLines];
        lineIds.forEach(userId => {
            if (newLines.includes(userId)) {
                newLines = newLines.filter(u => u !== userId);
            } else newLines.push(userId);
        });
        this.setState({ selectedLines: newLines });
    };

    onCheckerAll = () => {
        if (this.state.checkerAll !== 'all') {
            this.setState({ checkAll: 'all' });
            this.onToggle([...this.state.lines.map(o => o.id)]);
        } else {
            this.setState({ checkAll: 'none' });
            this.setState({ selectedLines: [] });
        }
    };

    onValidate = () => {
        const { selectedLines } = this.state;

        if (selectedLines.length <= 0) {
            NotificationManager.error('Le formulaire est mal renseigné');
            return;
        }

        let data = {
            ...this.props.data, selectedLines
        }

        this.props.onSubmit(data);
    }

    render() {

        const { onClose, show, } = this.props;
        const { selectedLines, lines, showCreateIndivision } = this.state;

        return (
            <>
                {showCreateIndivision
                    ? <Indivision
                        show={showCreateIndivision}
                        onClose={() => this.setState({ showCreateIndivision: false })}
                    /> :
                    <DialogComponent
                        show={show}
                        onClose={onClose}
                        size="md"
                        title={(
                            <h3 className="fw-bold">
                                Configuration du produit
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
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            indeterminate={selectedLines.length > 0 && selectedLines.length < lines.length}
                                                                            checked={selectedLines.length > 0}
                                                                            onChange={(e) => this.onCheckerAll()}
                                                                            value="all"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label="Tous"
                                                                />
                                                            </th>
                                                            <th className="fw-bold">Nom de ligne</th>
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
                                                                                        checked={selectedLines.includes(item.id)}
                                                                                        onChange={() => this.onToggle([item.id])}
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
                                                                            <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
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
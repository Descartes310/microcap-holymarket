import { connect } from "react-redux";
import { FormGroup } from "reactstrap";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { getComplexBooks } from "Actions";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

const COLUMNS = 5;
const LABELS = ["LIBELLE", "CODE", "AMOUNT"];;
class ComplexTable extends Component {
    static contextType = AbilityContext;

    state = {
        datas: [],
        values: [],
        numberOfColumns: 1,
        numberOfColumnsArray: [],
        bookDetails: [] // {value: x, x: x, y: y, type: x}
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getBooks();
        this.setState({ values: this.props.values });
    }

    getBooks = () => {
        getComplexBooks().then(datas => {
            this.setState({ datas });
            this.getTotalColumns(datas);

        })
    };

    getTotalColumns = (datas) => {
        this.setState({ numberOfColumnsArray: [], numberOfColumns: 1 });
        let result = this.getMaxIndex(datas);
        Array(this.getMaxFromArray(result[1])).fill(0).map((__, level) => {
            let maxColumn = this.getMaxFromLevel(datas, level);
            this.setState({ numberOfColumnsArray: [...this.state.numberOfColumnsArray, ...Array(maxColumn).fill(maxColumn)] });
        });
        this.setState({ numberOfColumns: result[0] });
    }

    fillDefaultValues = (data) => {
        this.setState({ bookDetails: [...this.state.bookDetails, data] });
        return data;
    }

    getMaxFromArray = (array) => {
        return Math.min.apply(null, array);
    }

    getMaxIndex = (datas) => {
        let rows = 1;
        let arrays = Array.from(datas.length).fill(0);
        datas.map((d, index) => {
            let localRows = 0;
            d.books.forEach(b => {
                localRows = localRows + this.getRowsNumber(b.parent.id, b.id);
            });
            arrays[index] = localRows;
            if (localRows >= rows) {
                rows = localRows;
            }
        });
        return [rows, arrays];
    }

    getMaxFromLevel = (datas, level) => {
        let max = 1;
        datas.map((d, __) => {
            let localRows = 0;
            if (d.books[level]) {
                localRows = this.getRowsNumber(d.books[level].parent.id, d.books[level].id);
            }
            if (localRows >= max) {
                max = localRows;
            }
        });
        return max;
    }

    getRowsNumber = (x, y) => {
        let max = 1;
        let values = this.state.values.filter(v => v.x == x && v.y == y);
        LABELS.forEach(type => {
            if (max <= values.filter(b => b.type == type).length) {
                max = values.filter(b => b.type == type).length;
            }
        });
        return max;
    }

    addRow = (x, y, type, value, position) => {
        let currentData = this.state.bookDetails.find(bd => bd.x === x && bd.y === y && bd.type === type);
        let otherDatas = this.state.bookDetails;
        currentData = {
            value: ' ',
            x: x,
            y: y,
            type: 1,
            position
        }
        otherDatas.push(currentData);
        this.setState({ bookDetails: [...this.state.bookDetails, currentData] });
        this.props.onSubmit(this.state.bookDetails);
    }

    editRow = (x, y, type, value, position) => {
        let currentData = this.state.bookDetails.find(bd => bd.x === x && bd.y === y && bd.type === type);
        let otherDatas = this.state.bookDetails;
        currentData = {
            value: value,
            x: x,
            y: y,
            type: type,
            position
        }
        this.setState({ bookDetails: [...this.state.bookDetails, currentData] });
    }

    getValueFromCordinates = (d2, index, position = 0) => {
        try {
            let value = this.state.values ? this.state.values.length > 0 ?
                this.state.values.filter(v => v.x == this.state.datas[Math.floor(d2 / COLUMNS)].books[index].parent.id && v.y == this.state.datas[Math.floor(d2 / COLUMNS)].books[index].id && v.type == this.getTypeString(d2 % COLUMNS))[position] ?
                    this.state.values.filter(v => v.x == this.state.datas[Math.floor(d2 / COLUMNS)].books[index].parent.id && v.y == this.state.datas[Math.floor(d2 / COLUMNS)].books[index].id && v.type == this.getTypeString(d2 % COLUMNS))[position].value
                    : null
                : null
                : null;
            return value;
        } catch (exception) {
            return null;
        }
    }

    //trouve la position du prochain niveau 2 et la position du premier de la fusion des colonnes
    getSubtitleFromIndex = (i) => {
        let index = 0;
        let result = 0;
        let lastIndex = index;
        let lastItem = this.state.numberOfColumnsArray[i];
        while (index < i) {
            let item = this.state.numberOfColumnsArray[index];
            if (i - index < item)
                break;
            lastItem = item;
            lastIndex = index;
            index = index + item;
            result = result + 1;
        }
        return [result, index];
    }

    getNumberOfBookFromCordinates = (d2, index) => {
        try {
            let books = this.state.values ? this.state.values.length > 0 ?
                this.state.values.filter(v => v.x == this.state.datas[Math.floor(d2 / COLUMNS)].books[index].parent.id && v.y == this.state.datas[Math.floor(d2 / COLUMNS)].books[index].id)
                : []
                : [];
            let max = 1;
            LABELS.forEach(type => {
                if (max <= books.filter(b => b.type == type).length) {
                    max = books.filter(b => b.type == type).length;
                }
            });
            return max;
        } catch (e) {
            return 1;
        }
    }

    getTypeString = (id) => {
        switch (id) {
            case 1:
                return "LIBELLE"
            case 2:
                return "CODE"
            case 3:
                return "AMOUNT"
            default:
                return "LIBELLE"
        }
    }

    render() {
        const { datas, numberOfColumns, numberOfColumnsArray, values } = this.state;
        return (
            <RctCollapsibleCard>
                <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
                    <div className="table-responsive">
                        {this.props.edit ?
                            <>
                                <table className="table table-hover table-bordered table-middle mb-0">
                                    <thead>
                                        <tr>
                                            {datas.map(data => (
                                                <th colSpan={COLUMNS}>{data.name}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            className="cursor-pointer"
                                        >
                                            {Array.from(Array(datas.length).keys()).map((d2, index2) => (
                                                <>
                                                    <td>
                                                        <div className="media">
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Libellé</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Codes poste</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Montant</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Action</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </>
                                            ))}
                                        </tr>
                                        {Array.from(Array(numberOfColumns).keys()).map((d, index) => (
                                            <tr
                                                key={index}
                                                className="cursor-pointer"
                                            >
                                                {Array.from(Array(datas.length * COLUMNS).keys()).map((d2, index2) => {
                                                    return (
                                                        <>
                                                            {(d2 % (COLUMNS)) == 0 && index - this.getSubtitleFromIndex(index)[1] == 0 && (
                                                                <td rowSpan={numberOfColumnsArray[index]} key={index2}>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{datas[Math.floor(d2 / (COLUMNS - 1))] ? datas[Math.floor(d2 / (COLUMNS - 1))].books[this.getSubtitleFromIndex(index)[0]] ? datas[Math.floor(d2 / (COLUMNS - 1))].books[this.getSubtitleFromIndex(index)[0]].title : '' : ''}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            )}
                                                            {(d2 % (COLUMNS)) == (COLUMNS - 1) && (
                                                                <td rowSpan={1} key={index2}>
                                                                    <div className="media d-flex justify-content-center align-items-center">
                                                                        <i className="zmdi zmdi-delete" onClick={() =>
                                                                            this.props.onDeleteComplexBook([{
                                                                                x: datas[Math.floor(d2 / COLUMNS)].books[this.getSubtitleFromIndex(index)[0]].parent.id,
                                                                                y: datas[Math.floor(d2 / COLUMNS)].books[this.getSubtitleFromIndex(index)[0]].id,
                                                                                type: d2 % COLUMNS,
                                                                                value: null,
                                                                                position: index - this.getSubtitleFromIndex(index)[1]
                                                                            }])} style={{ fontSize: '1.7em', color: 'red' }}></i>
                                                                        {numberOfColumnsArray[index] == (index - this.getSubtitleFromIndex(index)[1]) + 1 && (
                                                                            <i
                                                                                onClick={() => this.addRow(
                                                                                    datas[Math.floor(d2 / COLUMNS)].books[this.getSubtitleFromIndex(index)[0]].parent.id,
                                                                                    datas[Math.floor(d2 / COLUMNS)].books[this.getSubtitleFromIndex(index)[0]].id,
                                                                                    1,
                                                                                    null,
                                                                                    index + 1 - this.getSubtitleFromIndex(index)[1])}
                                                                                className="zmdi zmdi-plus" style={{ fontSize: '2em', color: 'blue', marginLeft: 10 }}></i>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            )}
                                                            {(d2 % (COLUMNS)) != 0 && (d2 % (COLUMNS)) != (COLUMNS - 1) && (
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                defaultValue={this.getValueFromCordinates(d2, this.getSubtitleFromIndex(index)[0], index - this.getSubtitleFromIndex(index)[1])}
                                                                                onBlur={(e) => this.editRow(datas[Math.floor(d2 / COLUMNS)].books[this.getSubtitleFromIndex(index)[0]].parent.id, datas[Math.floor(d2 / COLUMNS)].books[this.getSubtitleFromIndex(index)[0]].id, d2 % COLUMNS, e.target.value, index - this.getSubtitleFromIndex(index)[1])}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            )}
                                                        </>
                                                    )
                                                })
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <FormGroup style={{ marginTop: 50 }}>
                                    <Button
                                        // type="submit"
                                        color="primary"
                                        // disabled={loading}
                                        variant="contained"
                                        className="text-white font-weight-bold mr-3"
                                        onClick={() => { this.props.onSubmit(this.state.bookDetails) }}
                                    >
                                        Enregistrer
                                    </Button>
                                </FormGroup>
                            </>
                            :
                            <table className="table table-hover table-bordered table-middle mb-0">
                                <thead>
                                    <tr>
                                        {datas.map(data => (
                                            <th colSpan={(COLUMNS)}>{data.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        className="cursor-pointer"
                                    >
                                        {Array.from(Array(datas.length).keys()).map((d2, index2) => (
                                            <>
                                                <td>
                                                    <div className="media">
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Libellé</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Codes poste</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Montant</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark"></h4>
                                                        </div>
                                                    </div>
                                                </td>
                                            </>
                                        ))}
                                    </tr>
                                    {Array.from(Array(numberOfColumns).keys()).map((d, index) => (
                                        <tr
                                            key={index}
                                            className="cursor-pointer"
                                        >
                                            {Array.from(Array(datas.length * (COLUMNS)).keys()).map((d2, index2) => {
                                                return (
                                                    <>
                                                        {(d2 % (COLUMNS)) == 0 && index - this.getSubtitleFromIndex(index)[1] == 0 && (
                                                            <td rowSpan={numberOfColumnsArray[index]} key={index2}>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{datas[Math.floor(d2 / (COLUMNS - 1))] ? datas[Math.floor(d2 / (COLUMNS - 1))].books[this.getSubtitleFromIndex(index)[0]] ? datas[Math.floor(d2 / (COLUMNS - 1))].books[this.getSubtitleFromIndex(index)[0]].title : '' : ''}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        )}
                                                        {(d2 % (COLUMNS)) == (COLUMNS-1) && (
                                                            <td rowSpan={1} key={index2}>
                                                                <div className="media d-flex justify-content-center align-items-center">
                                                                </div>
                                                            </td>
                                                        )}
                                                        {(d2 % (COLUMNS)) != 0 && (d2 % (COLUMNS)) != (COLUMNS - 1) && (
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">
                                                                            {this.getValueFromCordinates(d2, this.getSubtitleFromIndex(index)[0], index - this.getSubtitleFromIndex(index)[1])}
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        )}
                                                    </>
                                                )
                                            })
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        {Array.from(Array(datas.length).keys()).map((d2, index2) => (
                                            <>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Total</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td colSpan={(COLUMNS - 2)}>
                                                    <div className="media">
                                                    </div>
                                                </td>
                                            </>
                                        ))}
                                    </tr>
                                </tfoot>
                            </table>
                        }
                    </div>
                </div>
            </RctCollapsibleCard >
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data }
};

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});

export default connect(mapStateToProps, {})
    (withStyles(useStyles, { withTheme: true })(withRouter(injectIntl(ComplexTable))));

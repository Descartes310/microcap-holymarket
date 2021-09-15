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
class ComplexTable extends Component {
    static contextType = AbilityContext;

    state = {
        datas: [],
        numberOfColumns: 0,
        numberOfColumnsArray: [],
        bookDetails: [] // {value: x, x: x, y: y, type: x}
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks = () => {
        getComplexBooks().then(datas => {
            this.setState({ datas });
            this.getTotalColumns(datas);

        })
    };

    getTotalColumns = (datas) => {
        let totalColumns = 0;
        Array.from(Array(this.getMaxIndex()).keys()).map((d, index) => {
            let maxColumn = 0;
            Array.from(Array(datas.length * (COLUMNS - 1)).keys()).map((d2, __) => {
                let columns = this.getNumberOfBookFromCordinates(d2, index);
                if (maxColumn <= columns) {
                    maxColumn = columns;
                }
            });
            this.setState({ numberOfColumnsArray: [...this.state.numberOfColumnsArray, ...Array(maxColumn).fill(maxColumn)] });
            totalColumns = totalColumns + maxColumn;
        });
        this.setState({ numberOfColumns: totalColumns });
    }

    fillDefaultValues = (data) => {
        this.setState({ bookDetails: [...this.state.bookDetails, data] });
        return data;
    }

    getMaxIndex = (index = 0, dataSource = null) => {
        let datas = dataSource ? dataSource : this.state.datas
        let max = datas[0] ? datas[0].books.length > 0 ? datas[0].books.length : 0 : 0;
        datas.forEach(d => {
            let tmpLength = d.books.length > 0 ? d.books.length : 0;
            if (tmpLength >= max) {
                max = tmpLength;
            }
        });
        return max;
    }

    editRow = (x, y, type, value, position) => {
        if (value) {
            let currentData = this.state.bookDetails.find(bd => bd.x === x && bd.y === y && bd.type === type);
            let otherDatas = this.state.bookDetails;
            //.filter(bd => bd.x !== x || bd.y !== y || bd.type !== type);

            currentData = {
                value: value,
                x: x,
                y: y,
                type: type,
                position
            }
            otherDatas.push(currentData);
            this.setState({ bookDetails: [...otherDatas] });
        }
    }

    getValueFromCordinates = (d2, index, position = 0) => {
        // console.log("X => ", d2, " Y => ", index, " Position => ", position);
        try {
            return this.props.values ? this.props.values.length > 0 ?
                this.props.values.filter(v => v.x == this.state.datas[Math.floor(d2 / COLUMNS)].books[index].parent.id && v.y == this.state.datas[Math.floor(d2 / COLUMNS)].books[index].id && v.type == this.getTypeString(d2 % COLUMNS))[position] ?
                    this.props.values.filter(v => v.x == this.state.datas[Math.floor(d2 / COLUMNS)].books[index].parent.id && v.y == this.state.datas[Math.floor(d2 / COLUMNS)].books[index].id && v.type == this.getTypeString(d2 % COLUMNS))[position].value
                    : null
                : null
                : null
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
            if (lastItem == item && i - lastIndex < item)
                break;
            lastItem = item;
            lastIndex = index;
            index = index + item;
            result = result + 1;
        }
        console.log([i, result, index]);
        return [result, index];
    }

    getNumberOfBookFromCordinates = (d2, index) => {
        try {
            let books = this.props.values ? this.props.values.length > 0 ?
                this.props.values.filter(v => v.x == this.state.datas[Math.floor(d2 / COLUMNS)].books[index].parent.id && v.y == this.state.datas[Math.floor(d2 / COLUMNS)].books[index].id)
                : []
                : [];
            let max = 1;
            ["LIBELLE", "CODE", "AMOUNT"].forEach(type => {
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
        const { values } = this.props;
        const { datas, numberOfColumns, numberOfColumnsArray } = this.state;
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
                                                    {values && (
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Action</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    )}
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
                                                            {(d2 % (COLUMNS)) == 0 && index % numberOfColumnsArray[index] == 0 && (
                                                                <td rowSpan={numberOfColumnsArray[index]} key={index2}>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{datas[Math.floor(d2 / (COLUMNS - 1))] ? datas[Math.floor(d2 / (COLUMNS - 1))].books[this.getSubtitleFromIndex(index)[0]] ? datas[Math.floor(d2 / (COLUMNS - 1))].books[this.getSubtitleFromIndex(index)[0]].title : index + '-' + index % numberOfColumns : 'ff'}</h4>
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
                                            <th colSpan={(COLUMNS - 1)}>{data.name}</th>
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
                                            </>
                                        ))}
                                    </tr>
                                    {Array.from(Array(numberOfColumns).keys()).map((d, index) => (
                                        <tr
                                            key={index}
                                            className="cursor-pointer"
                                        >
                                            {Array.from(Array(datas.length * (COLUMNS - 1)).keys()).map((d2, index2) => {
                                                return (
                                                    <>
                                                        {(d2 % (COLUMNS - 1)) == 0 && index % numberOfColumnsArray[index] == 0 && (
                                                            <td rowSpan={numberOfColumnsArray[index]} key={index2}>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{datas[Math.floor(d2 / (COLUMNS - 1))] ? datas[Math.floor(d2 / (COLUMNS - 1))].books[this.getSubtitleFromIndex(index)[0]] ? datas[Math.floor(d2 / (COLUMNS - 1))].books[this.getSubtitleFromIndex(index)[0]].title : index + '-' + index % numberOfColumns : 'ff'}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        )}
                                                        {(d2 % (COLUMNS - 1)) != 0 && (
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

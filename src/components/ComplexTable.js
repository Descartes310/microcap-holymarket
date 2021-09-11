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


class ComplexTable extends Component {
    static contextType = AbilityContext;

    state = {
        datas: [],
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
            this.setState({ datas })
        })
    }

    getMaxIndex = (index = 0) => {
        let max = this.state.datas[0] ? this.state.datas[0].books.length > 0 ? this.state.datas[0].books.length : 0 : 0;
        this.state.datas.forEach(d => {
            let tmpLength = d.books.length > 0 ? d.books.length : 0;
            if (tmpLength >= max) {
                max = tmpLength;
            }
        });
        return max;
    }

    getMaxRowIndex = (index = 0) => {
        let max = this.state.datas[0] ? this.state.datas[0].books.length > 0 ? 1 : 0 : 0;
        // let max = this.state.datas[0] ? this.state.datas[0].books.length > 0 ? this.state.datas[0].books[index] : 0;
        this.state.datas.forEach(d => {
            let tmpLength = d.books.length > 0 ? 1 : 0;
            if (tmpLength >= max) {
                max = tmpLength;
            }
        });
        return max;
    }

    editRow = (x, y, type, value) => {
        if (value) {
            let currentData = this.state.bookDetails.find(bd => bd.x === x && bd.y === y && bd.type === type);
            let otherDatas = this.state.bookDetails.filter(bd => bd.x !== x || bd.y !== y || bd.type !== type);
            currentData = {
                value: value,
                x: x,
                y: y,
                type: type
            }
            otherDatas.push(currentData);
            this.setState({ bookDetails: otherDatas });
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
        const { datas } = this.state;
        const { values } = this.props;
        console.log(values);
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
                                                <th colSpan={4}>{data.name}</th>
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
                                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Codes poste</h4>
                                                            </div>
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
                                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Montant</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </>
                                            ))}
                                        </tr>
                                        {Array.from(Array(this.getMaxIndex()).keys()).map((d, index) => (
                                            <tr
                                                key={index}
                                                className="cursor-pointer"
                                            >
                                                {Array.from(Array(datas.length * 4).keys()).map((d2, index2) => (

                                                    (d2 % 4) == 0 && d == index ?
                                                        <td rowSpan={1} key={index2}>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{datas[Math.floor(d2 / 4)] ? datas[Math.floor(d2 / 4)].books[index] ? datas[Math.floor(d2 / 4)].books[index].title : '' : ''}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        :
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <input type="text" className="form-control" onChange={(e) => this.editRow(datas[Math.floor(d2 / 4)].books[index].parent.id, datas[Math.floor(d2 / 4)].books[index].id, d2 % 4, e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </td>
                                                ))}
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
                                        onClick={() => this.props.onSubmit(this.state.bookDetails)}
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
                                            <th colSpan={4}>{data.name}</th>
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
                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Codes poste</h4>
                                                        </div>
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
                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">Montant</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                            </>
                                        ))}
                                    </tr>
                                    {Array.from(Array(this.getMaxIndex()).keys()).map((d, index) => (
                                        <tr
                                            key={index}
                                            className="cursor-pointer"
                                        >
                                            {Array.from(Array(datas.length * 4).keys()).map((d2, index2) => (

                                                (d2 % 4) == 0 && d == index ?
                                                    <td rowSpan={1} key={index2}>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{datas[Math.floor(d2 / 4)] ? datas[Math.floor(d2 / 4)].books[index] ? datas[Math.floor(d2 / 4)].books[index].title : '' : ''}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    :
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">
                                                                    {
                                                                        values.length > 0 ?
                                                                        values.find( v => v.x == datas[Math.floor(d2 / 4)].books[index].parent.id &&  v.y == datas[Math.floor(d2 / 4)].books[index].id && v.type == this.getTypeString(d2 % 4)) ?
                                                                        values.find( v => v.x == datas[Math.floor(d2 / 4)].books[index].parent.id &&  v.y == datas[Math.floor(d2 / 4)].books[index].id && v.type == this.getTypeString(d2 % 4)).value
                                                                         : null
                                                                        : null
                                                                    }
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                            ))}
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
                                                <td colSpan={3}>
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

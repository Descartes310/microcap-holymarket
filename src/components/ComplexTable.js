import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { getComplexBooks } from "Actions";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { AbilityContext } from "Permissions/Can";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";


class ComplexTable extends Component {
    static contextType = AbilityContext;

    state = {
        datas: []
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

    render() {
        const { datas } = this.state;
        return (
            <RctCollapsibleCard>
                <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
                    <div className="table-responsive">
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
                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark">{datas[Math.ceil(d2 / 4)] ? datas[Math.ceil(d2 / 4)].books[index] ? datas[Math.ceil(d2 / 4)].books[index].title : '' : ''}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                :
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 style={{ textAlign: 'start' }} className="m-0 fw-bold text-dark"></h4>
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

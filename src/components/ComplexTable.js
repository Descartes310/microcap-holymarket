import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { AbilityContext } from "Permissions/Can";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";


class ComplexTable extends Component {

    static contextType = AbilityContext;

    state = {
        datas: [],
        flatRows: []
    };

    getMaxNumberOfRows = () => {
        let max = 0;
        if(this.props.rows) {
            for (let index = 0; index < this.props.rows.length; index++) {
                const row = this.props.rows[index];
                let numberOfValues = this.state.datas.filter(d => d.row === row && d.position === 1).length;
                max += numberOfValues;
            }
            return Math.max(max, this.props.rows.length);
        } else {
            return 0; 
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.rows !== prevProps.rows) {
            let tmpResponse = [];
            for (let index = 0; index < this.props.rows.length; index++) {
                const row = this.props.rows[index];
                let rowDatas = this.state.datas.filter(d => d.row === row && d.column === row.column && d.position === 1);
                tmpResponse = [...tmpResponse, ...rowDatas.map(rd => rd.row), row];
            }
            this.setState({ flatRows: tmpResponse });
        }
    }

    render() {
        const { columns, subColumns } = this.props;
        return (
            <RctCollapsibleCard>
                <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered table-middle mb-0">
                            <thead>
                                <tr>
                                    <th></th>
                                    {columns.map((column, index) => (
                                        <th key={index} 
                                            colSpan={1+subColumns.filter(sc => sc.column.id === column.id).length}
                                        >
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    {columns.map(column => (
                                        <>
                                            {
                                                subColumns.filter(sc => sc.column.id === column.id).map((subcolumn, index) => (
                                                    <td key={index}>{ subcolumn.label }</td>
                                                ))
                                            }
                                            <td>Actions</td>
                                        </>
                                    ))}
                                </tr>
                                { this.props.rows.map((row, i) => {
                                    return (
                                        
                                        this.state.datas.filter(d => d.row === row).length > 0 ? (
                                            <>
                                                <tr>
                                                    <td rowSpan={this.state.datas.filter(d => d.row === row).length}>{row.label}</td>
                                                    {columns.map((column) => {
                                                        return (
                                                            <>
                                                                {
                                                                    subColumns.filter(sc => sc.column.id === column.id).map((_, index) => (
                                                                        <td key={index}></td>
                                                                    ))
                                                                }
                                                                <td></td>
                                                            </>
                                                        )
                                                    })}
                                                </tr>
                                                {
                                                    this.state.datas.filter(d => d.row === row).map(d => (
                                                
                                                        <tr>
                                                            {columns.map((column) => {
                                                                return (
                                                                    <>
                                                                        {
                                                                            subColumns.filter(sc => sc.column.id === column.id).map((_, index) => (
                                                                                <td key={index}></td>
                                                                            ))
                                                                        }
                                                                        <td></td>
                                                                    </>
                                                                )
                                                            })}
                                                        </tr>
                                                    )
                                                )}
                                            </>
                                        )
                                    
                                        : (
                                            <tr>
                                                <td rowSpan={1}>{row.label}</td>
                                                {columns.map((column, i) => {
                                                    return (
                                                        <>
                                                            {
                                                                subColumns.filter(sc => sc.column.id === column.id).map((_, index) => (
                                                                    <td key={index}></td>
                                                                ))
                                                            }
                                                            <td></td>
                                                        </>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    )
                                })}

                                {/* <tr>
                                    <td>Total</td>
                                    {columns.map(column => (
                                        <>
                                            {
                                                subColumns.filter(sc => sc.column.id === column.id).map((subcolumn, index) => (
                                                    <td key={index}></td>
                                                ))
                                            }
                                            <td></td>
                                        </>
                                    ))}
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </RctCollapsibleCard >
        );
    }
}

export default withRouter(ComplexTable);

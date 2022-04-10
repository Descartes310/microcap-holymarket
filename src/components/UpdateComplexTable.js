import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProjectService from 'Services/projects';
import { AbilityContext } from "Permissions/Can";
import { FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";


class UpdateComplexTable extends Component {

    static contextType = AbilityContext;

    state = {
        rows: [],
        datas: [],
        columns: [],
        flatRows: [],
        subColumns: [],
    };

    componentDidMount() {
        ProjectService.getTableStructure(this.props.id).then((response) => {
            this.setState({  
                columns: response.columns,
                rows: response.rows,
                subColumns: response.subColumns.map(sc => { return {...sc, column: sc.parent} })
            })
        }).catch(err => {
            console.log(err);
        })
    }

    getMaxNumberOfRows = () => {
        let max = 0;
        if(this.state.rows) {
            for (let index = 0; index < this.state.rows.length; index++) {
                const row = this.state.rows[index];
                let numberOfValues = this.state.datas.filter(d => d.row === row && d.position === 1).length;
                max += numberOfValues;
            }
            return Math.max(max, this.state.rows.length);
        } else {
            return 0; 
        }
    }

    addRowValue = (row) => {
        let toAdd = [];
        for (let index = 0; index < this.state.subColumns.length; index++) {
            const subColumn = this.state.subColumns[index];
            let data = { id: new Date().getTime(), value: null, row, column: subColumn, position: this.state.datas
                .filter(d => d.row === row && d.column === this.state.subColumns[0]).length + 1 };
            toAdd.push(data);
        }
        this.setState({ datas: [...this.state.datas, ...toAdd] });
    }

    deleteRowValue = (row, position) => {
        this.setState({ datas: this.state.datas.filter(d => d.row !== row || d.position !== position) });
    }

    updateRowValue = (row, column, position, value) => {
        let cell = this.state.datas.find(d => d.row === row && d.column === column && d.position === position);
        let otherCells = this.state.datas.filter(d => d.row !== row || d.column !== column || d.position !== position);
        if(!cell)
            return;
        cell.value = value;
        this.setState({ datas: [...otherCells, cell] });
    }

    onSubmit = () => {
        console.log(this.state.datas);
    }

    render() {
        const { columns, subColumns, datas } = this.state;
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
                                            colSpan={subColumns.filter(sc => sc.column.id === column.id).length}
                                        >
                                            {column.label}
                                        </th>
                                    ))}
                                    <th>Actions</th>
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
                                        </>
                                    ))}
                                    <th></th>
                                </tr>
                                { this.state.rows.map((row, i) => {
                                    return (
                                        <>
                                             { this.state.datas.filter(d => d.row === row  && d.column === subColumns[0]).map((_, index) => (
                                                <tr>
                                                    { index === 0 && (
                                                        <td rowSpan={1+(Math.ceil(this.state.datas.filter(d => d.row === row).length/subColumns.length))}>{row.label}</td>
                                                    )}

                                                    {columns.map((column, i) => {
                                                        return (
                                                            <>
                                                                {
                                                                    subColumns.filter(sc => sc.column.id === column.id).map((subcolumn, index) => (
                                                                        <td key={index}>
                                                                            <InputStrap
                                                                                type="number"
                                                                                className="input-lg"
                                                                                onChange={(e) => this.updateRowValue(row, subcolumn, index+1, e.target.value)}
                                                                                value={this.state.datas.find(d => d.row === row && d.column === subcolumn && d.position === (index+1))?.value }
                                                                            />
                                                                        </td>
                                                                    ))
                                                                }
                                                            </>
                                                        )
                                                    })}
                                                    <td>
                                                        <div className="media d-flex justify-content-center align-items-center">
                                                            <i onClick={() => this.deleteRowValue(row, index+1)}className="zmdi zmdi-delete" style={{ fontSize: '1.7em', color: 'red', marginLeft: 10 }}></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                             ))}
                                            <tr>
                                                { this.state.datas.filter(d => d.row === row).length <= 0 && (
                                                    <td rowSpan={1}>{row.label}</td>
                                                )}

                                                {columns.map((column, i) => {
                                                    return (
                                                        <>
                                                            {
                                                                subColumns.filter(sc => sc.column.id === column.id).map((_, index) => (
                                                                    <td key={index}></td>
                                                                ))
                                                            }
                                                        </>
                                                    )
                                                })}
                                                <td>
                                                    <div className="media d-flex justify-content-center align-items-center">
                                                        <i onClick={() => this.addRowValue(row)} className="zmdi zmdi-plus" style={{ fontSize: '2em', color: 'blue' }}></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <FormGroup style={{ marginTop: '5%' }}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => this.onSubmit()}
                        className="text-white font-weight-bold"
                    >
                        Ajouter
                    </Button>
                </FormGroup>
            </RctCollapsibleCard >
        );
    }
}

export default withRouter(UpdateComplexTable);

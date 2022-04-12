import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProjectService from 'Services/projects';
import { AbilityContext } from "Permissions/Can";
import { NotificationManager } from 'react-notifications';
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
        this.getDataValues();
    }

    getDataValues = () => {
        ProjectService.getTableValues({ projectItemId: this.props.id, projectId: this.props.match.params.id }).then((response) => {
            this.setState({  
                datas: response
            });
            this.getDataStructures();
        }).catch(err => {
            console.log(err);
        });
    }

    getDataStructures = () => {
        ProjectService.getTableStructure(this.props.id).then((response) => {
            this.setState({  
                columns: response.columns,
                rows: response.rows,
                subColumns: response.subColumns.map(sc => { return {...sc, column: sc.parent} })
            });
        }).catch(err => {
            console.log(err);
        });
    }

    getMaxNumberOfRows = () => {
        let max = 0;
        if(this.state.rows) {
            for (let index = 0; index < this.state.rows.length; index++) {
                const row = this.state.rows[index];
                let numberOfValues = this.state.datas.filter(d => d.row.id === row.id && d.position === 1).length;
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
            let data = { id: new Date().getTime(), value: '', row, column: subColumn, position: this.state.datas
                .filter(d => d.row.id === row.id && d.column.id === this.state.subColumns[0].id).length + 1 };
            toAdd.push(data);
        }
        this.setState({ datas: [...this.state.datas, ...toAdd] });
    }

    deleteRowValue = (row, position) => {
        this.setState({ datas: this.state.datas.filter(d => d.row.id !== row.id || d.position !== position) });
    }

    updateRowValue = (row, column, position, value) => {
        let cell = this.state.datas.find(d => d.row.id === row.id && d.column.id === column.id && d.position === position);
        let otherCells = this.state.datas.filter(d => d.row.id !== row.id || d.column.id !== column.id || d.position !== position);
        if(!cell)
            return;
        cell.value = value;
        this.setState({ datas: [...otherCells, cell] });
    }

    onSubmit = () => {
        const { datas } = this.state;

        let data = {
            projectItemId: this.props.id,
            projectId: this.props.match.params.id,
            values: JSON.stringify(datas.map(d => { return {
                rowId: d.row.id,
                value: d.value,
                position: d.position,
                columnId: d.column.id,
            } }))
        }

        ProjectService.createTableDatas(data).then(() => {
            NotificationManager.success("Le projet a été enregistré avec succès");
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la mise a jour du projet");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    render() {
        const { columns, subColumns, datas } = this.state;
        return (
            <RctCollapsibleCard>
                <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
                    <div className="table-responsive d-flex">
                        {columns.map((column, index) => (
                            <table className="table table-hover table-bordered table-middle mb-0">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th key={index} 
                                            colSpan={subColumns.filter(sc => sc.column.id === column.id).length}
                                        >
                                            {column.label}
                                        </th>
                                        {this.props.editMode && (
                                            <th>Actions</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        {
                                            subColumns.filter(sc => sc.column.id === column.id).map((subcolumn, index) => (
                                                <td key={index}>{ subcolumn.label }</td>
                                            ))
                                        }
                                        {this.props.editMode && (
                                            <th></th>
                                        )}
                                    </tr>
                                    { this.state.rows.filter(r => r.column.id === column.id).map((row, i) => {
                                        return (
                                            <>
                                                { datas.filter(d => d.row.id === row.id  && d.column.id === subColumns[0].id).map((_, index) => (
                                                    <tr>
                                                        { index === 0 && (
                                                            <td 
                                                                rowSpan={this.props.editMode ? 
                                                                    1+(Math.ceil(datas.filter(d => d.row.id === row.id).length/subColumns.length))
                                                                    :
                                                                    (Math.ceil(datas.filter(d => d.row.id === row.id).length/subColumns.length))
                                                                }
                                                            >
                                                                {row.label}
                                                            </td>
                                                        )}

                                                        {
                                                            subColumns.filter(sc => sc.column.id === column.id).map((subcolumn, si) => (
                                                                <td key={index}>
                                                                    {this.props.editMode ?
                                                                    <InputStrap
                                                                        type="text"
                                                                        className="input-lg"
                                                                        onChange={(e) => this.updateRowValue(row, subcolumn, index+1, e.target.value)}
                                                                        value={datas.find(d => d.row.id === row.id && d.column.id === subcolumn.id && d.position === (index+1))?.value }
                                                                    />
                                                                    : 
                                                                    <p>{datas.find(d => d.row.id === row.id && d.column.id === subcolumn.id && d.position === (index+1))?.value }</p>
                                                                    }
                                                                </td>
                                                            ))
                                                        }
                                                        {this.props.editMode && (
                                                            <td>
                                                                <div className="media d-flex justify-content-center align-items-center">
                                                                    <i onClick={() => this.deleteRowValue(row, index+1)}className="zmdi zmdi-delete" style={{ fontSize: '1.7em', color: 'red', marginLeft: 10 }}></i>
                                                                </div>
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))}
                                                {this.props.editMode && (
                                                    <tr>
                                                        { datas.filter(d => d.row.id === row.id).length <= 0 && (
                                                            <td rowSpan={1}>{row.label}</td>
                                                        )}

                                                        {
                                                            subColumns.filter(sc => sc.column.id === column.id).map((_, index) => (
                                                                <td key={index}></td>
                                                            ))
                                                        }
                                                        <td>
                                                            <div className="media d-flex justify-content-center align-items-center">
                                                                <i onClick={() => this.addRowValue(row)} className="zmdi zmdi-plus" style={{ fontSize: '2em', color: 'blue' }}></i>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        ))}
                    </div>
                </div>
                { this.props.editMode && (
                    <FormGroup style={{ marginTop: '3%' }}>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.onSubmit()}
                            className="text-white font-weight-bold"
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                )}
            </RctCollapsibleCard >
        );
    }
}

export default withRouter(UpdateComplexTable);

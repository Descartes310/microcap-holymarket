import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";


class PropertyTable extends Component {

    state = {
        rows: [],
        datas: [],
        columns: [],
        flatRows: [],
        properties: [],
        subColumns: [],
    };

    componentDidMount() {
        this.getProperties();
    }

    getProperties() {
        ProjectService.getAttributeFullProperties({ attribute_reference: this.props.reference }).then(response => {
            this.setState({  
                properties: response.reverse()
            }, () => {
                this.getDataStructures();
            });
        }).catch((error) => {
            console.log(error);
        })
        .finally(() => {

        })
    }

    getDataStructures = () => {
        const { properties } = this.state;
        const allColumnIds = properties.filter(d => d.column).map(c => c.column.id);
        const allRowIds = properties.filter(d => d.row).map(r => r.row.id);
        this.setState({  
            datas: properties.filter(p => p.column && p.row),
            rows: properties.filter(p => p.column && allRowIds.includes(p.id)),
            subColumns: properties.filter(p => p.column && allColumnIds.includes(p.id)),
            columns: properties.filter(p => !p.row && !p.column && allColumnIds.includes(p.id))
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
                                        <th 
                                            key={index} 
                                            colSpan={subColumns.filter(sc => sc.column.id === column.id).length}
                                            style={{ 
                                                cursor: 'pointer', 
                                                borderColor: this.props?.selectedCells?.filter(sc => sc.column == column.id && sc.position == index && sc.type == 'COLUMN')?.length > 0 ? 'orange' : '#ebedf3', 
                                                borderWidth:  this.props?.selectedCells?.filter(sc => sc.column == column.id && sc.position == index && sc.type == 'COLUMN')?.length > 0 ? 'thick' : '1px' 
                                            }} 
                                            onClick={() => {
                                                    if(this.props?.selectable) {
                                                        this.props?.onSelected({ row: 0, column: column.id, position: index, type: 'COLUMN' });
                                                    }
                                                }
                                            }
                                        >
                                            {column.value}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        {
                                            subColumns.filter(sc => sc.column.id === column.id).map((subcolumn, index) => (
                                                <td 
                                                    key={index}
                                                    style={{ 
                                                        cursor: 'pointer', 
                                                        borderColor: this.props?.selectedCells?.filter(sc => sc.column == subcolumn.id && sc.position == index && sc.type == 'SUBCOLUMN')?.length > 0 ? 'orange' : '#ebedf3', 
                                                        borderWidth:  this.props?.selectedCells?.filter(sc => sc.column == subcolumn.id && sc.position == index && sc.type == 'SUBCOLUMN')?.length > 0 ? 'thick' : '1px' 
                                                    }} 
                                                    onClick={() => {
                                                            if(this.props?.selectable) {
                                                                this.props?.onSelected({ row: 0, column: subcolumn.id, position: index, type: 'SUBCOLUMN' });
                                                            }
                                                        }
                                                    }
                                                >
                                                    { subcolumn.value }
                                                </td>
                                            ))
                                        }
                                    </tr>
                                    { this.state.rows.filter(r => r.column.id === column.id).map((row, i) => {
                                        //console.log(row.label, column.label, subColumns[0].label);
                                        //  && subColumns.filter(sc => sc.column.id == column.id).map(c => c.id).includes(d.column.id)
                                        return (
                                            <tr>
                                                <td 
                                                    rowSpan={
                                                        (Math.ceil(datas.filter(d => d.row?.id === row.id).length/subColumns.length))
                                                    }
                                                    style={{ 
                                                        cursor: 'pointer', 
                                                        borderColor: this.props?.selectedCells?.filter(sc => sc.row == row.id && sc.column == subColumns[0].id && sc.position == i && sc.type == 'ROW')?.length > 0 ? 'orange' : '#ebedf3', 
                                                        borderWidth:  this.props?.selectedCells?.filter(sc => sc.row == row.id && sc.column == subColumns[0].id && sc.position == i && sc.type == 'ROW')?.length > 0 ? 'thick' : '1px' 
                                                    }} 
                                                    onClick={() => {
                                                            if(this.props?.selectable) {
                                                                this.props?.onSelected({ row: row.id, column: subColumns[0].id, position: i, type: 'ROW' });
                                                            }
                                                        }
                                                    }
                                                >
                                                    {row.value}
                                                </td>
                                                { datas.filter(d => d.row.id === row.id && subColumns.filter(sc => sc.column.id == column.id).map(c => c.id).includes(d.column.id)).map((data, index) => (   
                                                    <td 
                                                        key={index}
                                                    >
                                                        <p>{data.value }</p>
                                                    </td>
                                                ))}
                                            </tr>
                                        )})}
                                </tbody>
                            </table>
                        ))}
                    </div>
                </div>
            </RctCollapsibleCard >
        );
    }
}

export default withRouter(PropertyTable);

import { connect } from 'react-redux';
import { PROJECT } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProjectService from 'Services/projects';
import CustomList from "Components/CustomList";
import HandleRow from './components/handleRow';
import { setRequestGlobalAction } from 'Actions';
import ComplexTable from "Components/ComplexTable";
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import HandleColumn from './components/handleColumn';
import { NotificationManager } from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import HandleSubColumn from './components/handleSubColumn';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const Create = (props) => {

    const [row, setRow] = useState(null);
    const [rows, setRows] = useState([]);
    const [label, setLabel] = useState('');
    const [columns, setColumns] = useState([]);
    const [column, setColumn] = useState(null);
    const [isTable, setIsTable] = useState(false);
    const [subcolumns, setSubcolumns] = useState([]);
    const [subColumn, setSubColumn] = useState(null);
    const [description, setDescription] = useState('');
    const [projectItems, setProjectItems] = useState([]);
    const [showRowModal, setShowRowModal] = useState(false);
    const [showColumnModal, setShowColumnModal] = useState(false);
    const [showSubColumnModal, setShowSubColumnModal] = useState(false);
    const [selectedProjectItems, setSelectedProjectItems] = useState([]);

    useEffect(() => {
        getProjectItems();
    }, []);

    const getProjectItems = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectItems(['SIMPLE'])
        .then((response) => setProjectItems(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const handleColumn = (id: number, value: string, deletion: boolean = false) => {
        if(id) {
            if(deletion) {
                setColumns([...columns.filter(c => c.id !== id)]);
                setRows([...rows.filter(r => r.column.id !== id)]);
                setSubcolumns([...subcolumns.filter(s => s.column.id !== id)]);
            } else {
                let columnsClone = [...columns];
                let index = columns.findIndex((c => c.id === id));
                columnsClone[index].label = value;
                setColumns([...columnsClone]);
            }
        } else {
            setColumns([...columns, {label: value, id: new Date().getTime()}])
        }
    }

    const handleRow = (id: number, value: string, deletion: boolean = false) => {
        if(id) {
            if(deletion) {
                setRows([...rows.filter(r => r.id !== id)]);
            } else {
                let rowsClone = [...rows];
                let index = rows.findIndex((r => r.id === id));
                rowsClone[index].label = value;
                setRows([...rowsClone]);
            }
        } else {
            setRows([...rows, {label: value, id: new Date().getTime()}])
        }
    }

    const handleSubColumn = (id: number, value: string, column: any, deletion: boolean = false) => {
        if(id) {
            if(deletion) {
                setSubcolumns([...subcolumns.filter(s => s.id !== id)]);
            } else {
                let subcolumnsClone = [...subcolumns];
                let index = subcolumns.findIndex((sc => sc.id === id));
                subcolumnsClone[index].label = value;
                setSubcolumns([...subcolumnsClone]);
            }
        } else {
            setSubcolumns([...subcolumns, {label: value, id: new Date().getTime(), column}])
        }
    }

    const onSubmit = () => {
        if (!label)
            return;

        var data: any = {
            label: label,
            type: 'COMPLEX',
            isTable: isTable,
            ownerType: 'GENERAL',
            description: description,
        }

        if(!isTable) {
            data.projectItemsIds = selectedProjectItems.map(spi => spi.id);
        } else {
            data.rows = JSON.stringify(rows);
            data.columns = JSON.stringify(columns);
            data.subcolumns = JSON.stringify(subcolumns.map(sc => { return { label: sc.label, columnId: sc.column.id } }));
        }

        props.setRequestGlobalAction(true);

        ProjectService.createComplexProjectItem(data).then(() => {
            NotificationManager.success('Ouvrage créé avec succès');
            props.history.push(PROJECT.ITEM.COMPLEX.LIST);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.success('Une erreur est survenues lors de la création de ouvrage');
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            id="description"
                            type="text"
                            name='description'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={isTable}
                                onChange={() => setIsTable(!isTable)}
                            />
                        } label={'Ouvrage complexe en tableau'}
                        />
                    </FormGroup>
                    { !isTable ? (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Ouvrages à inclure
                            </InputLabel>
                            <Autocomplete
                                multiple
                                id="combo-box-demo"
                                options={projectItems}
                                value={selectedProjectItems}
                                onChange={(__, items) => {
                                    setSelectedProjectItems(items);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    )
                    :
                    (
                        <>
                            <CustomList
                                list={columns}
                                loading={false}
                                itemsFoundText={n => `${n} colonnes trouvées`}
                                onAddClick={() => setShowColumnModal(true)}
                                renderItem={list => (
                                    <>
                                        {list && list.length === 0 ? (
                                            <div className="d-flex justify-content-center align-items-center py-50">
                                                <h4>
                                                    Aucunes colonnes trouvées
                                                </h4>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th className="fw-bold">Label</th>
                                                            <th className="fw-bold">Edition</th>
                                                            <th className="fw-bold">Suppression</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list && list.map((item, key) => (
                                                            <tr key={key} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td onClick={() => {
                                                                    setShowColumnModal(true);
                                                                    setColumn(item);
                                                                }}>
                                                                    <p>Editer</p>
                                                                </td>
                                                                <td onClick={() => {
                                                                    handleColumn(item.id, null, true)
                                                                }}>
                                                                    <p style={{ color: 'red' }}>Supprimer</p>
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
                            <CustomList
                                list={rows}
                                loading={false}
                                itemsFoundText={n => `${n} lignes trouvées`}
                                onAddClick={() => setShowRowModal(true)}
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
                                                            <th className="fw-bold">Label</th>
                                                            <th className="fw-bold">Edition</th>
                                                            <th className="fw-bold">Suppression</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list && list.map((item, key) => (
                                                            <tr key={key} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td onClick={() => {
                                                                    setShowRowModal(true);
                                                                    setRow(item);
                                                                }}>
                                                                    <p>Editer</p>
                                                                </td>
                                                                <td onClick={() => {
                                                                    handleRow(item.id, null, true)
                                                                }}>
                                                                    <p style={{ color: 'red' }}>Supprimer</p>
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
                            <CustomList
                                list={subcolumns}
                                loading={false}
                                itemsFoundText={n => `${n} sous-colonnes trouvées`}
                                onAddClick={() => setShowSubColumnModal(true)}
                                renderItem={list => (
                                    <>
                                        {list && list.length === 0 ? (
                                            <div className="d-flex justify-content-center align-items-center py-50">
                                                <h4>
                                                    Aucunes sous-colonnes trouvées
                                                </h4>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th className="fw-bold">Label</th>
                                                            <th className="fw-bold">Colonne</th>
                                                            <th className="fw-bold">Edition</th>
                                                            <th className="fw-bold">Suppression</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list && list.map((item, key) => (
                                                            <tr key={key} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.column.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td onClick={() => {
                                                                    setShowSubColumnModal(true);
                                                                    setSubColumn(item);
                                                                }}>
                                                                    <p>Editer</p>
                                                                </td>
                                                                <td onClick={() => {
                                                                    handleSubColumn(item.id, null, null, true)
                                                                }}>
                                                                    <p style={{ color: 'red' }}>Supprimer</p>
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
                            <ComplexTable columns={columns} subColumns={subcolumns} rows={rows} />
                        </>
                    )}
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
            <HandleColumn 
                column={column}
                show={showColumnModal}
                handleColumn={handleColumn}
                title={'Gestion des colonnes'}
                onClose={() => setShowColumnModal(false)}
            />
            <HandleSubColumn 
                columns={columns}
                subColumn={subColumn}
                show={showSubColumnModal}
                handleSubColumn={handleSubColumn}
                title={'Gestion des sous colonnes'}
                onClose={() => setShowSubColumnModal(false)}
            />
            <HandleRow
                row={row}
                show={showRowModal}
                handleRow={handleRow}
                title={'Gestion des lignes'}
                onClose={() => setShowRowModal(false)}
            />
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));
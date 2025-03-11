import { connect } from 'react-redux';
import React, { useState } from 'react';
import { FUNDING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import FundingService from 'Services/funding';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import AddProspectusItem from '../../components/AddProspectusItem';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [values, setValues] = useState([]);
    const [description, setDescription] = useState('');
    const [showAddValueBox, setShowAddValueBox] = useState(false);

    const onSubmit = () => {
        if (!label || !description || values.length <= 0) {
            NotificationManager.error('Le formulaire est mal renseigné')
            return;
        }

        var data: any = {
            label, description, values: JSON.stringify(values),
            item_reference: props.authUser.referralId, item_type: 'MEMBER'
        }

        props.setRequestGlobalAction(true);

        FundingService.createFundingProspectus(data).then(() => {
            NotificationManager.success('Prospectus créé avec succès');
            props.history.push(FUNDING.INVESTMENT.PROSPECTUS.LIST);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Une erreur est survenues lors du paramètre');
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
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
                    <InputLabel className="text-left">
                        Liste des rubriques
                    </InputLabel>
                    <CustomList
                        list={values}
                        loading={false}
                        itemsFoundText={n => `${n} paramètre trouvé`}
                        onAddClick={() => setShowAddValueBox(true)}
                        renderItem={list => (
                            <>
                                {list && list.length === 0 ? (
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucune paramètre trouvé
                                        </h4>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="fw-bold">Intitulé</th>
                                                    <th className="fw-bold">Périmètre</th>
                                                    <th className="fw-bold">Article</th>
                                                    <th className="fw-bold">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item?.label}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item?.perimeter}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item?.name}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                onClick={() => {
                                                                    setValues([...values.filter(v => v.label != item.label && v.perimeter != item.perimeter)])
                                                                }}
                                                                className="btn-danger text-white font-weight-bold mr-3"
                                                            >
                                                                Supprimer
                                                            </Button>
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

            { showAddValueBox && (
                <AddProspectusItem
                    show={showAddValueBox}
                    onClose={() => setShowAddValueBox(!showAddValueBox)}
                    onSubmit={(item) => {
                        setValues([...values, item]);
                        setShowAddValueBox(false)
                    }}
                />
            )}
        </>
    );
};

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Create));
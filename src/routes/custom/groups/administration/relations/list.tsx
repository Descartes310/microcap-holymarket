import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { GROUP, joinUrlWithParamsId } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const List = (props) => {

    const [relations, setRelations] = useState([]);

    useEffect(() => {
        getRelations();
    }, []);

    const getRelations = () => {
        props.setRequestGlobalAction(true),
        GroupService.getGroupRelations()
        .then(response => setRelations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        props.history.push(GROUP.ADMINISTRATION.RELATION.CREATE);
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des liens initiaux"}
            />
            <CustomList
                loading={false}
                list={relations}
                itemsFoundText={n => `${n} lien.s trouvé.s`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun lien.s trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Nom & prénoms</th>
                                            <th className="fw-bold">Relation</th>
                                            <th className="fw-bold">Contact</th>
                                            <th className="fw-bold">Date de naissance</th>
                                            <th className="fw-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <p className="m-0">{item.firstName} {item.lastName}</p>
                                                </td>
                                                <td>
                                                    <p className="m-0">{item.relationNature}</p>
                                                </td>
                                                <td>
                                                    <p className="m-0">{item.contact}</p>
                                                </td>
                                                <td>
                                                    <p className="m-0">{item.birthdate}</p>
                                                </td>
                                                <td>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        className="text-white font-weight-bold"
                                                        onClick={() => props.history.push(joinUrlWithParamsId(GROUP.ADMINISTRATION.RELATION.UPDATE, item.reference))}
                                                    >
                                                        Editer
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
        </>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(List));
import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import Switch from "@material-ui/core/Switch";
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { getGroupTypeLabel } from 'Helpers/helpers';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const Types = (props) => {

    const [types, setTypes] = useState([]);

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = () => {
        props.setRequestGlobalAction(true),
        GroupService.getGroupTypes({})
        .then(response => setTypes(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const changeGroupTypeStatus = (group) => {
        props.setRequestGlobalAction(true),
        GroupService.setGroupTypeAsDefault(group.id, !group.default)
        .then(() => getTypes())
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        props.history.push(GROUP.TYPE.CREATE);
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des types de groupes"}
            />
            <CustomList
                loading={false}
                list={types}
                itemsFoundText={n => `${n} type.s trouvé.s`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun type.s trouvé.s
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Description</th>
                                            {/* <th className="fw-bold">Nature</th> */}
                                            <th className="fw-bold">Catégorie</th>
                                            <th className="fw-bold">Type parent</th>
                                            <th className="fw-bold">Par défaut</th>
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
                                                            <h4 className="m-0 text-dark">{item.description}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 text-dark">{item.groupCategory.label}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 text-dark">{item.parentName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Switch
                                                        aria-label="Par défaut"
                                                        checked={item.default}
                                                        onChange={() => { changeGroupTypeStatus(item) }}
                                                    />
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Types));
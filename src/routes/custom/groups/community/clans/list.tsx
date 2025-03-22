import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import { getStatusLabel } from '../../../../../data';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const Clans = (props) => {

    const [datas, setDatas] = useState([]);
    const [group, setGroup] = useState(null);

    useEffect(() => {
        getGroup();
    }, []);

    useEffect(() => {
        if(group) {
            getDatas();
        }
    }, [group])

    const getDatas = () => {
        props.setRequestGlobalAction(true),
        GroupService.getClans({reference: group.reference})
        .then(response => setDatas(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getGroup = () => {
        props.setRequestGlobalAction(true),
        GroupService.getGroupDetails(props.authUser.referralId)
        .then(response => {
            setGroup(response);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const goToCreate = () => {
        props.history.push(GROUP.COMMUNITY.CLAN.CREATE);
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des clans"}
            />
            <CustomList
                loading={false}
                list={datas}
                itemsFoundText={n => `${n} clan.s trouvé.s`}
                onAddClick={() => goToCreate()}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun clan.s trouvé.s
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Désignation</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Status</th>
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
                                                            <h4 className="m-0 text-dark">{getStatusLabel(item.status)}</h4>
                                                        </div>
                                                    </div>
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Clans));
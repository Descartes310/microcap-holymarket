import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getGroupTypeLabel } from 'Helpers/helpers';
import { GROUP, joinUrlWithParamsId } from 'Url/frontendUrl';

const All = (props) => {

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getGroups();
    }, []);

    const getGroups = () => {
        props.setRequestGlobalAction(true),
            GroupService.getCommunityDatas({ belongs: false })
                .then(response => setGroups(response))
                .finally(() => props.setRequestGlobalAction(false))
    }

    const sendRequest = (item) => {
        props.setRequestGlobalAction(true),
            GroupService.makeGroupRequest({ userReference: props.authUser.referralId, groupReference: item.groupReference, type: 'REQUEST' })
                .then(response => getGroups())
                .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <CustomList
                loading={false}
                list={groups}
                itemsFoundText={n => `${n} communauté.s trouvée.s`}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun communauté.s trouvée.s
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Nom</th>
                                            <th className="fw-bold">Type</th>
                                            <th className="fw-bold">Status</th>
                                            <th className="fw-bold">Détails</th>
                                            <th className="fw-bold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.userName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{getGroupTypeLabel(item.groupType)}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <h4 className="m-0 fw-bold text-dark">{item.status ? item.status : 'NON MEMBRE'}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <Button
                                                                size="small"
                                                                variant="contained"
                                                                onClick={() => {
                                                                    props.history.push(joinUrlWithParamsId(GROUP.DETAILS.VIEW, item.groupReference.split('_')[1]))
                                                                }}
                                                                className="btn-primary mb-10 text-white"
                                                            >
                                                                Consulter les détails
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            {!item.status ?
                                                                <Button
                                                                    size="small"
                                                                    color='primary'
                                                                    variant="contained"
                                                                    onClick={() => sendRequest(item)}
                                                                    className="mr-5 mb-10 text-white"
                                                                >
                                                                    Demander une adhésion
                                                                </Button>
                                                                : <h4 className="m-0 fw-bold text-dark">En cours...</h4>
                                                            }
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

// map state to props
const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(All));
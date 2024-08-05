import { connect } from 'react-redux';
import UserService from 'Services/users';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { RctCardContent } from 'Components/RctCard';
import { institutionMemberTypes } from '../../../../../data';
import 'react-checkbox-tree/src/scss/react-checkbox-tree.scss';
import DialogComponent from "Components/dialog/DialogComponent";
import CreateInstitutionMember from './createInstitutionMember';

const ListInstitutionMembers = (props) => {

    const [members, setMembers] = useState([]);
    const [showCreateBox, setShowCreateBox] = useState(false);
    const [showUpdateBox, setShowUpdateBox] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        getMembers();
    }, []);

    const getMembers = () => {
        props.setRequestGlobalAction(true),
        UserService.getInstitutionMembers(props.id, {})
        .then(response => setMembers(response))
        .finally(() => props.setRequestGlobalAction(false))
    }
    
    return (
        <DialogComponent
            show={props.show}
            onClose={() => props.onClose()}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Mes membres
                </h3>
            )}
        >
            <RctCardContent>
                <CustomList
                    loading={false}
                    list={members}
                    itemsFoundText={n => `${n} membre.s trouvé.s`}
                    onAddClick={() => {
                        setShowCreateBox(true);
                        setShowUpdateBox(false);
                    }}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucun membre.s trouvé.s
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Désignation</th>
                                                <th className="fw-bold">Email</th>
                                                <th className="fw-bold">Type</th>
                                                {/* <th className="fw-bold">Actions</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.name}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.email}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{institutionMemberTypes.find(t => t.value === item.type)?.name}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {/* <td>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            className="text-white font-weight-bold"
                                                            onClick={() => {
                                                                setSelectedMember(item);
                                                                setShowUpdateBox(true);
                                                                setShowCreateBox(false);
                                                            }}
                                                        >
                                                            Editer
                                                        </Button>
                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                />
            </RctCardContent>
            { showCreateBox && (
                <CreateInstitutionMember
                    show={showCreateBox} 
                    onClose={(reload) => {
                        setShowCreateBox(false);
                        if(reload) {
                            getMembers();
                        }
                    }}
                    id={props.id}
                    isUpdate={selectedMember != null}
                    memberToUpdate={selectedMember}
                />
            )}
            
        </DialogComponent>
    )
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(ListInstitutionMembers));
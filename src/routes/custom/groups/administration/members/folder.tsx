import { connect } from 'react-redux';
import { HOME } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import { getFilePath } from 'Helpers/helpers';
import {setRequestGlobalAction} from 'Actions';
import SettingService from 'Services/settings';
import React, { useState, useEffect } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";
import {
	Card,
	CardBody,
	CardTitle
} from 'reactstrap';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { fileURLToPath } from 'url';

const Folder = (props) => {

    const [userFiles, setUserFiles] = useState([]);
    const [groupMember, setGroupMember] = useState(null);

    useEffect(() => {
        getUserFiles();
        getGroupMember();
    }, []);

    const getGroupMember = () => {
        props.setRequestGlobalAction(true),
        GroupService.findGroupMember(props.match.params.id)
            .then(response => {
                setGroupMember(response);
            })
            .catch(err => {
                console.log(err);
                props.history.back();
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    const getUserFiles = () => {
        props.setRequestGlobalAction(true);
        SettingService.getUserFileTypes()
        .then(response => {
            setUserFiles(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const findFile = (piece: any) => {
        let userFile = userFiles.find(uf => piece.label === uf.reference);
        if(userFile) {
            return {label: userFile.label, sample: userFile.sample, file: piece.value, createdAt: piece.createdAt};
        }
        return null;
    }

    return (
        <>
            <PageTitleBar
                title={"Dossier membre"}
            />
            <RctCollapsibleCard>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 mb-30">
                        <Card style={{ border: 0 }}>                            
                            <CardBody>
                                <CardTitle>
                                    <h1 className='fw-bold mt-10' style={{ fontSize: '1.5rem' }}>{groupMember?.userName}</h1>
                                </CardTitle>
                                <CardBody style={{ padding: 0, paddingTop: '3%' }}>
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="fw-bold">Nom de la pièce</th>
                                                    <th className="fw-bold">Echantillon de la pièce</th>
                                                    <th className="fw-bold">Fichier téléversé</th>
                                                    <th className="fw-bold">Date d'ajout</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {groupMember && groupMember.groupMemberDetails?.filter(d => d.type === "PIECE").map((item, key) => {
                                                    let piece = findFile(item);
                                                    return (
                                                        <tr key={key} className="cursor-pointer">
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark">{piece.label}</h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark" onClick={() => window.open(getFilePath(piece.sample), 'blank')}>
                                                                            Consulter l'échantillon
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 fw-bold text-dark" onClick={() => window.open(getFilePath(piece.file), 'blank')}>
                                                                            Consulter la pièce
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="media">
                                                                    <div className="media-body pt-10">
                                                                        <h4 className="m-0 text-dark">
                                                                            <TimeFromMoment time={piece.createdAt} showFullDate />
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
								</CardBody>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </RctCollapsibleCard>
        </>
    );
}

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Folder));
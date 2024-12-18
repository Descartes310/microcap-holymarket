import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import MessageService from 'Services/messages';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from 'Components/TimeFromMoment';
import { getBroadcastTypesLabel } from 'Helpers/datas';
import { getContactTypeLabel } from '../../../../data';
import SendBroadcastMessage from '../components/sendMessage';
import { BROADCAST, joinUrlWithParamsId } from 'Url/frontendUrl';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const List = (props) => {

    const [datas, setDatas] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [showMessageBox, setShowMessageBox] = useState(false);
    const [selectedBroadcast, setSelectedBroadcast] = useState(false);

    useEffect(() => {
        getDatas();
    }, []);

    const onToggleButton = (key) => {
        let currentArray = dropdownOpen;
        currentArray[key] = !currentArray[key];
        setDropdownOpen([...currentArray]);
    }

    const getDatas = () => {
        props.setRequestGlobalAction(true),
        MessageService.getBroadcasts()
        .then(response => setDatas(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <CustomList
                list={datas}
                loading={false}
                itemsFoundText={n => `${n} liste trouvée`}
                onAddClick={() => props.history.push(BROADCAST.MINE.CREATE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucune liste trouvée
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Intitulé</th>
                                            <th className="fw-bold">Description</th>
                                            <th className="fw-bold">Type</th>
                                            <th className="fw-bold">Contact privilégié</th>
                                            <th className="fw-bold">Date de création</th>
                                            <th className="fw-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.map((item, key) => (
                                            <tr key={key} className="cursor-pointer">
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item?.title}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item?.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{getBroadcastTypesLabel(item?.type)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{getContactTypeLabel(item?.contactType)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <TimeFromMoment time={item.createdAt} showFullDate />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <ButtonDropdown isOpen={dropdownOpen[key]} toggle={() => onToggleButton(key)} className="mr-3">
                                                        <DropdownToggle caret color='primary' style={{ color: 'white', fontSize: '0.9rem' }}>
                                                            Actions
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem style={{ color: 'black' }}
                                                                onClick={() => {
                                                                    props.history.push(joinUrlWithParamsId(BROADCAST.MINE.UPDATE, item.reference))
                                                                }}
                                                            >
                                                                Editer
                                                            </DropdownItem>
                                                            <DropdownItem style={{ color: 'black' }} onClick={() => {
                                                                props.history.push(joinUrlWithParamsId(BROADCAST.MINE.MEMBERS, item.reference))
                                                            }}>
                                                                Membres
                                                            </DropdownItem>
                                                            <DropdownItem style={{ color: 'black' }} onClick={() => {
                                                                setSelectedBroadcast(item);
                                                                setShowMessageBox(true);
                                                            }}>
                                                                Communiquer
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </ButtonDropdown>
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
            { showMessageBox && (
                <SendBroadcastMessage
                    show={showMessageBox}
                    broadcast={selectedBroadcast}
                    onClose={() => {
                        setSelectedBroadcast(false);
                        setShowMessageBox(false)
                    }}
                />
            )}
        </>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));

import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import SettingService from 'Services/settings';
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from "Components/TimeFromMoment";
import { joinUrlWithParamsId, SETTING } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const List = (props) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = () => {
        props.setRequestGlobalAction(true);
        SettingService.getMessageTemplates()
        .then((response) => setMessages(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des messages"}
            />
            <CustomList
                list={messages}
                loading={false}
                itemsFoundText={n => `${n} messages trouvés`}
                onAddClick={() => props.history.push(SETTING.MESSAGE_TEMPLATE.CREATE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun message trouvé
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Titre</th>
                                            <th className="fw-bold">Contenu</th>
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
                                                            <h4 className="m-0 fw-bold text-dark">{item.title}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.content}</p>
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
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    className="text-white font-weight-bold"
                                                    onClick={() => props.history.push(joinUrlWithParamsId(SETTING.MESSAGE_TEMPLATE.UPDATE, item.reference))}
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));
import { connect } from 'react-redux';
import { SETTING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import SettingService from 'Services/settings';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

const List = (props) => {

    const [agents, setAgents] = useState([]);

    useEffect(() => {
        getAgent();
    }, [window.location.pathname]);

    const getAgent = () => {
        props.setRequestGlobalAction(true);
        SettingService.getAgents({url: window.location.origin, type: getType().value}).then(response => {
            setAgents(response);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getType = () => {
        if(window.location.pathname.includes('agent')) {
            return { label: 'Agents', value: 'AGENT' };
        } else {
            return { label: 'Pionniers', value: 'PIONIER' };
        }
    }

    const changeActive = (agent) => {
        props.setRequestGlobalAction(true);
        SettingService.updateAgentActive(agent.id)
                .then(() => getAgent())
                .finally(() => props.setRequestGlobalAction(false))
    }

    const changeMain = (agent) => {
        props.setRequestGlobalAction(true);
        SettingService.updateAgentMain(agent.id)
                .then(() => getAgent())
                .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Liste des "+getType().label}
            />
            <CustomList
                list={agents}
                loading={false}
                itemsFoundText={n => `${n} ${getType().label} trouvés`}
                onAddClick={() => props.history.push(getType().value === 'AGENT' ? SETTING.AGENT.CREATE : SETTING.PIONIER.CREATE)}
                renderItem={list => (
                    <>
                        {list && list.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center py-50">
                                <h4>
                                    Aucun {getType().label} trouvés
                                </h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="fw-bold">Name</th>
                                            <th className="fw-bold">Email</th>
                                            <th className="fw-bold">Téléphone</th>
                                            <th className="fw-bold">Actif</th>
                                            <th className="fw-bold">Principal</th>
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
                                                            <p className="m-0 text-dark">{item.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="media">
                                                        <div className="media-body pt-10">
                                                            <p className="m-0 text-dark">{item.phone}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Switch
                                                        aria-label="Actif"
                                                        checked={item.active}
                                                        onChange={() => { changeActive(item) }}
                                                    />
                                                </td>
                                                <td>
                                                    <Switch
                                                        aria-label="Principal"
                                                        checked={item.main}
                                                        onChange={() => { changeMain(item) }}
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
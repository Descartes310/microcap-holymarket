import { getFilePath } from "Helpers/helpers";
import SettingService from 'Services/settings';
import Checkbox from '@material-ui/core/Checkbox';
import React, { useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DiscoverLayout from "Routes/custom/dashboard/landing/discover/DiscoverLayout";
import TitleHeader from "Routes/custom/dashboard/landing/discover/components/TitleHeader";

const DiscoverPioner = () => {
    const [data, setData] = useState([]);
    const [manager, setManager] = useState(true);
    const [passer, setPasser] = useState(true);
    const [types, setTypes] = useState(['MANAGER', 'PASS_UP', 'PASS_LEADER', 'PASS_PREMIUM']);

    useEffect(() => {
        getAgent();
    }, [window.location.pathname]);

    const getAgent = () => {
        SettingService.getAgents({url: window.location.origin, type: 'PIONIER'}).then(response => {
            setData(response);
        })
    }

    useEffect(() => {
        if(manager) {
            setTypes([...types, 'MANAGER']);
        } else {
            setTypes([...types.filter(t => t !== 'MANAGER')]);
        }
    }, [manager]);

    useEffect(() => {
        if(passer) {
            setTypes([...types, 'PASS_UP', 'PASS_LEADER', 'PASS_PREMIUM']);
        } else {
            setTypes([...types.filter(t => !['PASS_UP', 'PASS_LEADER', 'PASS_PREMIUM'].includes(t))]);
        }
    }, [passer]);

    return (
        <DiscoverLayout
            title="Nos pionniers"
            description="MicroCap est une équipe qui permet aujourd’hui de proposer des services dont nous sommes fiers. Mais c’est d’abord un mouvement de cœur, de personnes originaires ou sympathisantes des pays du sud en général et de l’Afrique subsaharienne plus particulièrement."
        >
            <div className="session-inner-wrapper video-player-wrapper pionier-content">
                <TitleHeader title="Nos pioniers" />
                <div className="container">
                    <p className="font-lg">
                        MicroCap est une équipe qui permet aujourd’hui de proposer des services dont nous sommes fiers. Mais c’est d’abord un mouvement de cœur,
                        de personnes qui œuvrent quotidiennement pour soutenir l’entrepreneuriat des plus fragiles.
                    </p>
                    <p className="font-lg mb-50">
                        Depuis 2017, le mouvement ne cesse de grandir et compte aujourd’hui des contributeurs sur les 5 continents, des personnes
                        grâce à qui nous pouvons vous proposer ce service. Rejoint le mouvement.
                    </p>
                    <ul className="font-lg mb-50" style={{ paddingLeft: 40, fontSize: 20, listStyle: 'none' }}>
                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        checked={manager}
                                        onChange={() => setManager(!manager)}
                                    />
                                }
                                label="Pionniers dirigeant et opérationnels"
                            />
                        </li>
                        <li>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        checked={passer}
                                        onChange={() => setPasser(!passer)}
                                    />
                                }
                                label="Pionniers contributeurs financiers"
                            />
                        </li>
                    </ul>
                    <div className="row person-block">
                        {data.filter(a => a.active === true && types.includes(a.nature)).map(agent => (
                            <div className="single-item col-lg-4 col-md-5">
                                <div className="item">
                                    <div className="thumb">
                                        <div className="img-wrapper" style={{ backgroundImage: `url(${getFilePath(agent.avatar)})`, backgroundSize: 'cover' }} />
                                    </div>
                                    <div className="info">
                                        <h4>{agent.name}, <span>{agent.post}</span></h4>
                                        <p>{agent.about}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DiscoverLayout>
    );
};

export default DiscoverPioner;

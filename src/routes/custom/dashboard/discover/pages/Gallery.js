import { getFilePath } from "Helpers/helpers";
import React, { useState, useEffect } from 'react';
import { getAllProjectReactionByBranch } from "Actions/independentActions";
import DiscoverLayout from "Routes/custom/dashboard/discover/DiscoverLayout";
import TitleHeader from "Routes/custom/dashboard/discover/components/TitleHeader";

const DiscoverGallery = (props) => {
    const [data, setData] = useState(undefined);
    useEffect(() => {
        getAllProjectReactionByBranch().then(data => {
            console.log(data);
            setData(data)
        })
    }, []);

    return (
        <DiscoverLayout title="Gallerie projets">
            <div className="session-inner-wrapper">
                <TitleHeader
                    title="Gallerie projets"
                    subTitle="Decouvrez un aperçu de l'activité des projets déjà présent sur la plateforme Microcap"
                />
                <div className="container">
                    <div className="row">
                        {data && Object.keys(data).map((key, index) => (
                            <div className="container" key={index}>
                                <h1 className="font-weight-bold" style={{ fontSize: '1.5em', padding: '2%', }}>
                                    {key}
                                </h1>
                                <ul className="mb-0 list-inline attachment-wrap">
                                    {data[key].map((item, key) => (
                                        <li className="list-inline-item overlay-wrap overflow-hidden rounded">
                                            <img src={getFilePath(item.file)} className="size-120 rounded img-fluid" alt="img" />
                                            <div className="overlay-content">
                                                <a href="#" onClick={e => e.preventDefault()} className="d-flex align-items-center justify-content-center h-100 font-2x">
                                                    <i className="zmdi zmdi-download"></i>
                                                </a>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DiscoverLayout>
    );
};

export default DiscoverGallery;

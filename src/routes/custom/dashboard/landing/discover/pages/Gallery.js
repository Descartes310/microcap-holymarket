import Slider from "react-slick";
import { getFilePath } from "Helpers/helpers";
import ProjectService from 'Services/projects';
import EmptyResult from "Components/EmptyResult";
import React, { useState, useEffect } from 'react';
import HourGlassLoader from "Components/Loaders/HourGlass";
import DiscoverLayout from "Routes/custom/dashboard/landing/discover/DiscoverLayout";
import TitleHeader from "Routes/custom/dashboard/landing/discover/components/TitleHeader";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: <button type='button' className='slick-prev discover-arrow'><i className='font-2x icon-hover text-primary ti-angle-left' aria-hidden='true'/></button>,
    nextArrow: <button type='button' className='slick-next discover-arrow pull-right'><i className='font-2x icon-hover text-primary ti-angle-right' aria-hidden='true'/></button>,
};

const DiscoverGallery = (props) => {
    const [data, setData] = useState(undefined);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getActivities();
    }, []);

    const getActivities = () => {
        setLoader(true);
        ProjectService.getProjectGallery().then(response => {
            let result = response.reduce(function (r, a) {
                r[a.projectName] = r[a.projectName] || [];
                r[a.projectName].push(a);
                return r;
            }, Object.create(null));
            setData(result);
        })
        .finally(() => {
            setLoader(false);
        });
    }

    console.log(data);

    return (
        <DiscoverLayout title="Gallerie projets">
            <div className="session-inner-wrapper">
                <TitleHeader
                    title="Gallerie projets"
                    subTitle="Decouvrez un aperçu de l'activité des projets déjà présent sur la plateforme Microcap"
                />
                {loader ? (
                    <HourGlassLoader color="#FFB70F" />
                ) : !data ? (
                   <EmptyResult
                       wrapperClassName="mb-70"
                       message="Aucun projects trouvés pour le moment"
                   />
                ) : Object.keys(data).map((projectName, index) => {
                    return (
                        <div key={index} className="container gallery-item">
                            <div className="row">
                                <h2 className="gallery-title px-sm-3">
                                    <span className="text-primary">{projectName}</span>
                                </h2>
                            </div>
                            <div className="gallery-item-wrapper mb-70 mt-30">
                                <Slider {...settings}>
                                    {data[projectName].map((item, key) => (
                                        <div key={key}>
                                            <div className="gallery-item-block">
                                                <div className="row px-0" onClick={() => window.open(getFilePath(item.file), 'blank')}>
                                                    <div className="img-holder col-md-6 col-sm-12 px-0 bg-repeat-no bg-size-cover" style={{ backgroundImage: `url(${(item.cover || item.file) ? getFilePath(item.cover ? item.cover : item.file) : 'https://cdn.pixabay.com/photo/2014/05/02/21/50/laptop-336378_960_720.jpg'})`}}>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12 px-0">
                                                        <div className="gallery-item-content">
                                                            <h2>{item.label}</h2>
                                                            <p>{item.value}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    )
                })}
            </div>
        </DiscoverLayout>
    );
};

export default DiscoverGallery;

import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import FundingService from 'Services/funding';
import CustomList from "Components/CustomList";
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import TimeFromMoment from 'Components/TimeFromMoment';
import { getInvestmentPerimeterTypeLabel } from 'Helpers/helpers';

const List = (props) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        props.setRequestGlobalAction(true),
        FundingService.findFundingPolitic(props?.reference ?? props.match.params.id)
        .then(response => setData(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <div className={`${props.page ? 'm-60 pb-40' : 'mr-60'}`}>
            <div className="table-responsive">
                <table className="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th className="fw-bold">Détails</th>
                            <th className="fw-bold">Valeur</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <p className="m-0">Désignation</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <p className="m-0 text-dark">{data?.label}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <p className="m-0">Date de création</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="media">
                                    <div className="media-body pt-10">
                                        <p className="m-0 text-dark"><TimeFromMoment time={data?.createdAt} showFullDate /></p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='mt-40'>
                { data?.investmentSettingValueList?.map(item => (
                    <>
                        <div className='mb-20'>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item?.label}</h2>
                        </div>
                        <div className='ml-20 mt-20 mb-40'>
                            <p>
                                <span dangerouslySetInnerHTML={{__html: item.value}}></span>
                            </p>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));

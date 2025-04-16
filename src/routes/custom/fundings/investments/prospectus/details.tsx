import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import FundingService from 'Services/funding';
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import { RctCardContent } from 'Components/RctCard';
import TimeFromMoment from 'Components/TimeFromMoment';
import ProspectusInvestmentItem from './prospectusItem';
import { NotificationManager } from 'react-notifications';

const List = (props) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        props.setRequestGlobalAction(true),
        FundingService.findFundingProspectus(props.match.params.id)
        .then(response => setData(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <RctCardContent>
            <div>
                <div className='d-flex justify-content-between mb-60'>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Prospectus</h1>
                        <p style={{ fontSize: '1.4rem', fontStyle: 'italic' }}>{data?.label}</p>
                    </div>
                    <div>
                        { !props.notSharable ? 
                            <Button
                                color="primary"
                                variant="contained"
                                className="text-white font-weight-bold mb-20"
                                onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.origin}/prospectus/${props.match.params.id}/details`)
                                    .then(() => {
                                        window.open(`${window.location.origin}/prospectus/${props.match.params.id}/details`, '_blank');
                                        NotificationManager.success("Le lien a été copié");
                                    })
                                    .catch(err => {
                                    });
                                    
                                }}
                            >
                                Partager
                            </Button> 
                        : 
                            <h1>Date de création</h1>
                        }
                        <p><TimeFromMoment time={data?.createdAt} showFullDate /></p>
                    </div>
                </div>
                <div className='mb-40'>
                    <p><span>Description:</span> {data?.description}</p>
                </div>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>Rubriques</h1>
                    {data?.investmentProspectusItems.map(item => (
                        <ProspectusInvestmentItem investmentItem={item} />
                    ))}
                </div>
            </div>
        </RctCardContent>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));

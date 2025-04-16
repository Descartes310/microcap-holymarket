import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import ProgramDetails from "../programs/details";
import PoliticDetails from "../politics/details";
import StrategyDetails from "../strategies/details";
import { getInvestmentPerimeterTypeLabel } from 'Helpers/helpers';

const ProspectusInvestmentItem = (props) => {

    const {investmentItem} = props;

    return (
        <div className='mt-40 ml-20'>
            <div className='mb-30'>
                <span style={{ fontStyle: 'italic' }}>{getInvestmentPerimeterTypeLabel(investmentItem?.perimeter)}</span>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{investmentItem?.label}</h1>
            </div>
            <div className='ml-20'>
                <p>
                    <span dangerouslySetInnerHTML={{__html: investmentItem.description}}></span>
                </p>
            </div>
            <div className='ml-20'>
                {investmentItem?.perimeter === 'PROGRAM' && <ProgramDetails reference={investmentItem.sourceReference} />}
                {investmentItem?.perimeter === 'POLITIC' && <PoliticDetails reference={investmentItem.sourceReference} />}
                {investmentItem?.perimeter === 'STRATEGY' && <StrategyDetails reference={investmentItem.sourceReference} />}
            </div>
        </div>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(ProspectusInvestmentItem));
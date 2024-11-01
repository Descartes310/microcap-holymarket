import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import SubOrderComponent from './subOrderComponent';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

const List = (props) => {

    return (
        <>
            <PageTitleBar title={'Sous commandes'} />
            <SubOrderComponent reference={props.match.params.id} />
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));
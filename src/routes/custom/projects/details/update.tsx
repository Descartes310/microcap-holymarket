import { connect } from 'react-redux';
import { PROJECT } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import React from 'react';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    return (
        <>
            <PageTitleBar
                title={"Edition projet"}
            />
            <RctCollapsibleCard>
                
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Update));
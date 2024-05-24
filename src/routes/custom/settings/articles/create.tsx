import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import CreateArticle from 'Components/CreateArticle';
import { SETTING } from 'Url/frontendUrl';

const Create = (props) => {

    return (
        <>
            <PageTitleBar
                title={"Création d'un article"}
            />
            <RctCollapsibleCard>
                <CreateArticle personal={false} onClose={() => {
                    props.history.push(SETTING.ARTICLE.LIST);
                }}  />
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Create));
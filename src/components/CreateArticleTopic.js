import { connect } from 'react-redux';
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import CreateArticleTheme from 'Components/CreateArticleTheme';
import DialogComponent from "Components/dialog/DialogComponent";

const CreateArticleTopicModal = (props) => {

    const {show, onClose} = props;

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Créer un nouveau thème
                </h3>
            )}
        >
            <RctCardContent>
                <CreateArticleTheme defaultTitle={props.defaultTitle} personal={props.personal} onClose={() => {
                    onClose();
                }}/>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateArticleTopicModal));
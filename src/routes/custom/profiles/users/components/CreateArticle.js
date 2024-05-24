import { connect } from 'react-redux';
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";
import CreateArticle from 'Components/CreateArticle';

const CreateArticleModal = (props) => {

    const {show, onClose} = props;

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Créer un nouvel article
                </h3>
            )}
        >
            <RctCardContent>
                <CreateArticle personal={true} onClose={() => {
                    onClose();
                }}/>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateArticleModal));
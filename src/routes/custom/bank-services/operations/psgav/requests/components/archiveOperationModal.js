import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { FormGroup, Input as InputStrap } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class ArchiveOperationModal extends Component {

    state = {
        archiveReference: ''
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { onClose, show, title, archiveOperation } = this.props;
        const { archiveReference } = this.state;
        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="lg"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="reference">
                        Reference de l'archive
                    </InputLabel>
                    <InputStrap
                        required
                        type="text"
                        id="reference"
                        name='reference'
                        value={archiveReference}
                        className="input-lg"
                        onChange={(e) => this.setState({ archiveReference: e.target.value })}
                    />
                </FormGroup>

                
                <div className="d-flex justify-content-end mt-3">
                    <Button
                        color="primary"
                        variant="contained"
                        disabled={!archiveReference}
                        className="text-white font-weight-bold"
                        onClick={() => archiveOperation(archiveReference)}
                    >
                        Archiver
                    </Button>
                </div>
            </DialogComponent>
        );
    }
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(injectIntl(ArchiveOperationModal)));
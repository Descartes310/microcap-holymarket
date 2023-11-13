import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";
import UpdateComplexTable from "../../../../../../components/UpdateComplexTable";

class UpdateComplexTableModal extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {

        const { onClose, show, title, tables, projectId } = this.props;

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
                <RctCardContent>
                    {
                        tables.map((table, index) => (
                            <UpdateComplexTable key={index} projectId={projectId} id={table.id} editMode={true} showOptionsMenu={true} />
                        ))
                    }
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default withRouter(injectIntl(UpdateComplexTableModal));
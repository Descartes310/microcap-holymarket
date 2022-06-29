import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";
import GroupDetailsBox from 'Routes/custom/groups/details/components/groupDetails';

class GroupDetails extends Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {

        const { onClose, show, title, community }: any = this.props;

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
                    <div className='col-md-12'>
                        { community && (
                            <GroupDetailsBox id={community.groupReference} />
                        )}
                    </div>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default withRouter(injectIntl(GroupDetails));
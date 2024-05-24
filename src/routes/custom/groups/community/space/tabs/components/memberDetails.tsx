import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import MemberBlogBox from 'Components/MemberBlog';
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";

class MemberDetails extends Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {

        const { onClose, show, title, member }: any = this.props;

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
                        { member && (
                            <MemberBlogBox member={member} />
                        )}
                    </div>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default withRouter(injectIntl(MemberDetails));
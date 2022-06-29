import moment from 'moment';
import React, { Component } from 'react';
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";

class EventDetails extends Component {

    render() {

        const { onClose, show, event } = this.props;
        console.log(event);

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="sm"
                title={(
                    <h1 className="fw-bold">
                        {event?.title}
                    </h1>
                )}
            >
                <RctCardContent>
                    <p>
                        Début: { event ? moment(event?.start).format("YYYY-MM-DD hh:mm") : 'Non définie'}
                    </p>
                    { event?.end  && (
                        <p>
                            Fin: { event ? moment(event?.end).format("YYYY-MM-DD hh:mm") : 'Non définie'}
                        </p>
                    )}
                    <p className='mt-20'>
                        {event?.description}
                    </p>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default EventDetails;
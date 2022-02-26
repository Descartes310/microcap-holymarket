import React from 'react';
import moment from 'moment';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import DiscoverLayout from "Routes/custom/dashboard/landing/discover/DiscoverLayout";


const allViews = Object.keys(Views).map(k => Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
});

const Localizer = momentLocalizer(moment);

const Events = () => {

    document.body.style.overflow = "auto";

    return (
      <DiscoverLayout style={{ paddingTop: '24vh', backgroundColor: 'white' }}>
        <div className='container'>
          <Calendar
            localizer={Localizer}
            events={[]}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2015, 3, 1)}
            components={{
            timeSlotWrapper: ColoredDateCellWrapper,
            }}
          />
        </div>
      </DiscoverLayout>
    );
};

export default Events;

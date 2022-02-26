import moment from 'moment';
import SettingService from 'Services/settings';
import React, {useState, useEffect} from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import DiscoverLayout from "Routes/custom/dashboard/landing/discover/DiscoverLayout";


const allViews = Object.keys(Views).map(k => Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: '#FFB70F',
    },
});

const Localizer = momentLocalizer(moment);

const Events = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents();
        console.log(moment('2022-03-12').toDate());
    }, []);

    const getEvents = () => {
        SettingService.getEvents()
        .then((response) => setEvents(response))
        .catch((err) => {
            console.log(err);
        });
    }

    document.body.style.overflow = "auto";

    return (
      <DiscoverLayout style={{ paddingTop: '24vh', backgroundColor: 'white' }}>
        <div className='container mb-70'>
          <div className="showcase-card-block d-flex flex-column pb-0" style={{ padding: '0vh 10vw' }}>
            <div className='container'>
              <div className="row center-hor-ver mb-70 flex-column intro">
                <h2 className="font-weight-bold text-black text-center underline-title mb-50" data-aos="fade-right">
                    Evènements MicroCap
                </h2>
              </div>
            </div>
          </div>
          <Calendar
            localizer={Localizer}
            events={events.map(e => { 
              return { title: e.label, start: moment(e.startDate).toDate(), end: e.endDate ? moment(e.endDate).toDate() : moment(e.startDate).toDate(), desc: e.description}
            })}
            views={allViews}
            step={60}
            defaultDate={new Date()}
            components={{
            timeSlotWrapper: ColoredDateCellWrapper,
            }}
          />
        </div>
      </DiscoverLayout>
    );
};

export default Events;

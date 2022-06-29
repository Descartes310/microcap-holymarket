import moment from 'moment';
import SettingService from 'Services/settings';
import React, {useState, useEffect} from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import DiscoverLayout from "Routes/custom/dashboard/landing/discover/DiscoverLayout";
import EventDetails from "Routes/custom/dashboard/landing/discover/components/eventDetails";


const allViews = Object.keys(Views).map(k => Views[k]).filter(v => v !== 'agenda');

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: '#FFB70F',
    },
});

const Localizer = momentLocalizer(moment);

const Events = () => {

    const [event, setEvent] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = () => {
        SettingService.getEvents()
        .then((response) => setEvents(response))
        .catch((err) => {
            console.log(err);
        });
    }

    const handleSelectEvent = (event, _) =>  {
      setEvent(event);
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
              return { 
                title: e.label, 
                start: moment(e.startDate+' '+e.startTime).toDate(), 
                end: e.endDate ? moment(e.endDate+' '+e.endTime).toDate() : moment(e.startDate+' 23:59:59').toDate(), 
                description: e.description
              }
            })}
            views={allViews}
            step={60}
            defaultDate={new Date()}
            onSelectEvent={handleSelectEvent} 
            components={{
            timeSlotWrapper: ColoredDateCellWrapper,
            }}
          />
        </div>
        <EventDetails 
          show={event}
          event={event}
          onClose={() => setEvent(null)}
        />
      </DiscoverLayout>
    );
};

export default Events;

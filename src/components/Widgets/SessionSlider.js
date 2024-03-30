/**
** Session Slider
**/
import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// api
import api from 'Api';
import sessionSlider from '../../services/sessionSlider';

export default class SessionSlider extends Component {

   state = {
      sessionUsersData: null
   }

   componentDidMount() {
      this.setState({ sessionUsersData: sessionSlider });
      // this.getSessionUsersData();
   }

   // session users data
   getSessionUsersData() {
      api.get('testimonials.js')
         .then((response) => {
            this.setState({ sessionUsersData: response.data });
         })
         .catch(error => {
         })
   }

   render() {
      const settings = {
         dots: true,
         infinite: true,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: false,
         autoplay: true,
         swipe: true,
         touchMove: true,
         swipeToSlide: true,
         draggable: true
      };
      const { sessionUsersData } = this.state;
      return (
         <div className="session-slider">
            <Slider {...settings}>
               {(sessionUsersData && sessionUsersData !== null) && sessionUsersData.map((data, key) => (
                  <div>
                     <img
                        src={data.avatar}
                        alt="session-slider"
                        className="img-fluid"
                        width="377"
                        height="588"
                     />
                     <div className="rct-img-overlay">
                     </div>
                  </div>
                ))}
            </Slider>
         </div>
      );
   }
}

import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const Wrapper = styled.div`
lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid ${props => props.color};
  border-color: ${props => props.color} transparent ${props => props.color} transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
`;

const HourGlassLoader = ({show = true, color} = '#000') => {
    if (!show) return null;
    return (
        <Wrapper color={color} className="center-hor-ver mb-50">
            <div className="lds-hourglass" />
        </Wrapper>
    );
};

HourGlassLoader.propTypes = {
    show: PropTypes.bool,
};

export default HourGlassLoader;

import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import EmptyResultImg from "Assets/img/empty_result.svg";

const Wrapper = styled.div`
    img {
        width: 20rem;
    }
    
    h3 {
        font-size: 30px;
    }
`;

const EmptyResult = ({message, wrapperClassName = ''}) => {
    return (
        <Wrapper className={`center-hor-ver empty-result ${wrapperClassName}`}>
            <div className="text-center">
                <img src={EmptyResultImg} alt="" className="img-fluid"/>
                <h3 className="my-15">{message}</h3>
            </div>
        </Wrapper>
    );
};

EmptyResult.propTypes = {
    message: PropTypes.string.isRequired,
};

export default EmptyResult;

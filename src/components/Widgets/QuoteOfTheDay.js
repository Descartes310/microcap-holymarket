/**
 * Quotes Of The Day
 */
import React, { Component } from 'react';
import Slider from "react-slick";

const quotes = [
]

class QuoteOfTheDay extends Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			arrows: false
		};
		return (
			<div>
				<Slider {...settings}>
					{quotes && quotes.map((quote, key) => (
						<div key={key} className="pb-20">
							<div className="d-flex mb-25 align-items-center">
								<div className="user-img mr-25">
									<img src={quote.avatar} alt="reviewer profile" className="d-inline-block img-fluid rounded-circle" width="60" height="60" />
								</div>
								<div>
									<h5 className="mb-0">{quote.author}</h5>
									<span className="fs-12">{quote.date}</span>
								</div>
							</div>
							<p className="mb-20 text-justify">{quote.body}</p>
						</div>
					))}
				</Slider>
			</div>
		);
	}
}

export default QuoteOfTheDay;

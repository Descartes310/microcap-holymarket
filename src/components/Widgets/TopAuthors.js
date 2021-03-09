//Top Authors widget

import React, { Component } from 'react'
import Slider from "react-slick";

const topAuthors = [

]

export default class TopAuthors extends Component {
	render() {
		const settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
		};
		return (
			<div className="top-author-wrap rct-block">
				<div className="bg-primary text-white pt-4 rounded-top">
					<h4 className="mb-0 text-center">Top Authors</h4>
				</div>
				<Slider {...settings}>
					{topAuthors && topAuthors.map((author, key) => (
						<div key={author.id} className="author-detail-wrap d-flex justify-content-between flex-column">
							<div className="author-avatar bg-primary overlay-wrap mb-5">
								<div className="avatar-img">
									<img src={author.avatarSrc} width="80" height="80" className="img-fluid mx-auto rounded-circle" alt="avtar" />
								</div>
							</div>
							<div className="p-3 authors-info">
								<h5>{author.name}</h5>
								<ul className="list-unstyled author-contact-info mb-2">
									<li>
										<span className="mr-3"><i className="zmdi zmdi-phone-msg"></i></span>
										<a href="tel:123456" className="font-xs text-muted">{author.phone}</a>
									</li>
									<li>
										<span className="mr-3"><i className="zmdi zmdi-email"></i></span>
										<a href="mailto:joan_parisian@gmail.com" className="font-xs text-muted">{author.email}</a>
									</li>
									<li>
										<span className="mr-3"><i className="zmdi zmdi-pin"></i></span>
										<span className="font-xs text-muted">{author.address}</span>
									</li>
								</ul>
								<ul className="d-flex social-info list-unstyled">
									<li><a className="facebook" href="#" onClick={e => e.preventDefault()}><i className="zmdi zmdi-facebook-box"></i></a></li>
									<li><a className="twitter" href="#" onClick={e => e.preventDefault()}><i className="zmdi zmdi-twitter-box"></i></a></li>
									<li><a className="linkedin" href="#" onClick={e => e.preventDefault()}><i className="zmdi zmdi-linkedin-box"></i></a></li>
									<li><a className="instagram" href="#" onClick={e => e.preventDefault()}><i className="zmdi zmdi-instagram"></i></a></li>
								</ul>
							</div>
							<ul className="d-flex list-unstyled footer-content text-center w-100 border-top mb-0">
								<li>
									<h5 className="mb-0">{author.articles}</h5>
									<span className="font-xs text-muted">Articles</span>
								</li>
								<li>
									<h5 className="mb-0">{author.followers}</h5>
									<span className="font-xs text-muted">Followers</span>
								</li>
								<li>
									<h5 className="mb-0">{author.likes}</h5>
									<span className="font-xs text-muted">Likes</span>
								</li>
							</ul>
						</div>
					))}
				</Slider>
			</div>
		)
	}
}

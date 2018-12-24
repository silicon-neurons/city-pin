import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

import request from 'services/request';

class viewPicturePage extends Component {
	constructor(props) {
		super(props);
		this.imagen = React.createRef();
		this.len = React.createRef();
		this.descripcion = React.createRef();
		this.state = {
			lens: [],
			image: '',
			data: {}
		};
	}

	getImage = () => {
		if (this.state.image === null || this.state.image === ''){
			return "https://bulma.io/images/placeholders/256x256.png";
		}
		return `${process.env.REACT_APP_BACKEND}${this.state.image.slice(1)}`;
	}

	componentDidMount() {
		const id = this.props.match.params.id;

		request({
			method: 'get',
			/* url: 'http://127.0.0.1:8000/api/v1/posts/', /* LOCAL HOST*/
			url: `api/v1/post/${id}`, /* POSTGRES ONLINE DB */
			config: { headers: {'Content-Type': 'multipart/form-data' }}
		}).then( (response)  => {
			console.log(response);
			this.setState({
				image: response.data.image,
				data: response.data
			})
		}).catch(function (error) {
			console.log(error);
		});

		request({
			method: 'get',
			/* url: 'http://127.0.0.1:8000/api/v1/lens/', /* LOCAL HOST*/
			url: 'api/v1/lens/', /* POSTGRES ONLINE DB */
			config: { headers: {'Content-Type': 'multipart/form-data' }}
		}).then(({ data })=> {
			console.log(data);
			this.setState(
				{ lens: data }
			);
		}).catch(function (error) {
			console.log(error);
		});
	}
	getDesignName(design){
		return {
			'N': 'Nudge',
			'H': 'Hostile',
			'P': 'Persuasive'
		}[design] || `${design} - Unknown`;
	}
	render() {
		return (
			<section className="section">
				
				<div className="container">
					<div className="pin-content">
						<hr></hr>
						<figure className="image-display">
							<img className="pinned-image" height="500px" width="500px" alt="pin" src={this.getImage()}></img>
						</figure>
						<hr></hr>
						<div className="field">
							<div className="control">
								<div className="select is-primary">
								<select ref={this.len}>
									{this.state.lens.map((len, i) =>
										<option key={i}>
											{len.title}
										</option>
									)}
								</select>
								</div>
							</div>
							<hr></hr>
							<div className="control">
								<div className="select is-primary">
									<span>
										<p>Design: {this.getDesignName(this.state.data.design)}</p>
										<p>Description: {this.state.data.desc}</p>
										<p>latitude: {this.state.data.geo_latitude}</p>
										<p>longitude: {this.state.data.geo_longitude}</p>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default viewPicturePage;
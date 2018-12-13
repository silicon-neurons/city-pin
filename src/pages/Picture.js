import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

class PicturePage extends Component {
	constructor(props) {
		super(props);
		this.imagen = React.createRef();
		this.len = React.createRef();
		this.descripcion = React.createRef();
		this.state = {
			lens: []
		};
	}

	submit = () => {
		var imagen = this.imagen.current.files[0];
		var len = this.len.current.value;
		var descripcion = this.descripcion.current.value;
		console.log(imagen);
		console.log(len);
		console.log(descripcion);

		var post = new FormData();
		post.append("image", imagen);
		post.set("desc", descripcion);
		post.set("design", 'P');
		post.set("user", null);
		/* solo se inserta en db cuando el atributo lens de abajo se le pasa el title de un lens ya existente en la db*/
		post.set("lens", "Lens1");
		post.set("geo_latitude", 14.1059453);
		post.set("geo_longitude", -87.2049887);

		axios({
			method: 'post',
			/*url: 'http://127.0.0.1:8000/api/v1/post/', /* LOCAL HOST*/
			url: 'https://designrecognitionbackend.herokuapp.com/api/v1/post/', /* POSTGRES ONLINE DB */
			data: post,
			config: { headers: {'Content-Type': 'multipart/form-data' }}
		}).then(function (response) {
			console.log(response);
		}).catch(function (error) {
			console.log(error);
		});
	}

	componentDidMount() {
		axios({
			method: 'get',
			/* url: 'http://127.0.0.1:8000/api/v1/posts/', /* LOCAL HOST*/
			url: 'https://designrecognitionbackend.herokuapp.com/api/v1/posts/', /* POSTGRES ONLINE DB */
			config: { headers: {'Content-Type': 'multipart/form-data' }}
		}).then(function (response) {
			console.log(response);
		}).catch(function (error) {
			console.log(error);
		});

		axios({
			method: 'get',
			/* url: 'http://127.0.0.1:8000/api/v1/lens/', /* LOCAL HOST*/
			url: 'https://designrecognitionbackend.herokuapp.com/api/v1/lens/', /* POSTGRES ONLINE DB */
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

	render() {
		return (
			<section className="section">
				
				<div className="container">
					<div className="pin-content">
						<div className="top-container" >
							<Link to="/navigate">
								<span className="button city-button button-lighty is-large is-fullwidth" onClick={this.submit}>
									Submit
								</span>
							</Link>
						</div>
						<hr></hr>
						<figure className="image-display">
							<img className="pinned-image" height="500px" width="500px" alt="pin" src="https://bulma.io/images/placeholders/256x256.png"></img>
						</figure>
						<div className="file is-boxed">
							<label className="file-label">
								<input className="file-input" type="file" name="resume" ref={this.imagen}></input>
								<span className="file-cta">
									<span className="file-icon">
										<i className="fas fa-upload"></i>
									</span>
									<span className="file-label">
										Choose a file…
									</span>
								</span>
							</label>
						</div>
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
						</div>
						<div className="field">
							<div className="control">
								<textarea className="textarea is-primary" placeholder="Primary textarea" ref={this.descripcion}></textarea>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default PicturePage;
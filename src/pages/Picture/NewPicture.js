import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import request from 'services/request';

class PicturePage extends Component {
	constructor(props) {
		super(props);
		this.imagen = React.createRef();
		this.len = React.createRef();
		this.descripcion = React.createRef();
		this.state = {
			form:{
				description: '',
				design: '',
				user: null,
				lens: '',
				image: null
			},
			data:{
				lens:[]
			}
		};
	}

	submit = () => {
		const {description, design, image} = this.state.form;

		var post = new FormData();
		post.append("image", image);
		post.set("desc", description);
		post.set("design", design);
		post.set("user", null);
		/* solo se inserta en db cuando el atributo lens de abajo se le pasa el title de un lens ya existente en la db*/
		post.set("lens", "Lens1");
		post.set("geo_latitude", this.props.latitude);
		post.set("geo_longitude", this.props.longitude);

		request({
			method: 'post',
			url: 'api/v1/post/', /* POSTGRES ONLINE DB */
			data: post,
			config: { headers: {'Content-Type': 'multipart/form-data' }}
		}).then(function (response) {
			console.log(response);
		}).catch(function (error) {
			console.log(error);
		});
	}

	componentDidMount() {
		request({
			method: 'get',
			url: 'api/v1/posts/', /* POSTGRES ONLINE DB */
			config: { headers: {'Content-Type': 'multipart/form-data' }}
		}).then(function (response) {
			console.log(response);
		}).catch(function (error) {
			console.log(error);
		});

		request({
			method: 'get',
			url: 'api/v1/lens/', /* POSTGRES ONLINE DB */
			config: { headers: {'Content-Type': 'multipart/form-data' }}
		}).then(({ data })=> {
			this.setState(prevState=>({
				data:{
					...prevState.data,
					lens: data
				}
			}));
		}).catch(function (error) {
			console.log(error);
		});
	}
	handleChange = (event) => {
		const {name, value} = event.target;
		this.setState(prevState=>({
			form:{
				...prevState.form,
				[name]: value
			}
		}));
	}
	handleImage = (event) => {
		const { files } = event.target;
		const image = files[0];
		const types = ['image/png', 'image/jpeg', 'image/gif'];
		if(!types.includes(image.type)){
			this.setState((prevState)=>{
				URL.revokeObjectURL(prevState.form.image);
				return {
					form:{
						...prevState.form,
						image:'https://bulma.io/images/placeholders/256x256.png'
					}
				}
			});
			return;
		}
		this.setState((prevState)=>{
			URL.revokeObjectURL(prevState.form.image);
			return {
				form:{
					...prevState.form,
					image: URL.createObjectURL(image)
				}
			}
		});
	}
	chooseFile = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.onchange = (event)=>this.handleImage(event);
		input.click();
	}
	render() {
		const { design } = this.state.form;
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
						<figure className="image-display" onClick={this.chooseFile}>
							<img className="pinned-image" height="500px" width="500px" alt="pin" src={this.state.form.image || 'https://bulma.io/images/placeholders/256x256.png'}></img>
						</figure>
						<div className="file is-boxed" onClick={this.chooseFile}>
							<label className="file-label">
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
								<select name="design" value={design} onChange={this.handleChange}>
										<option value="P"> Persuasive </option>
										<option value="N"> Nudge </option>
										<option value="H"> Hostile </option>
								</select>
								</div>
							</div>
						</div>
						<div className="field">
							<div className="control">
								<textarea
									className="textarea is-primary"
									placeholder="Primary textarea"
									name="description"
									value={this.state.form.description}
									onChange={this.handleChange}
								></textarea>
							</div>
						</div>
						<pre>
							latitude: {this.props.latitude}
							langitude: {this.props.longitude}
						</pre>
					</div>
				</div>
			</section>
		)
	}
}

export default PicturePage;
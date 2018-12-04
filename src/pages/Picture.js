import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PicturePage extends Component {
    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="pin-content">
                        <div className="top-container" >
                            <Link to="/navigate">
                                <span className="button city-button button-lighty is-large is-fullwidth">
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
                                <input className="file-input" type="file" name="resume"></input>
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
                        <div class="field">
                            <div class="control">
                                <div class="select is-primary">
                                <select>
                                    <option>Select dropdown</option>
                                    <option>With options</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <textarea class="textarea is-primary" placeholder="Primary textarea"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default PicturePage;
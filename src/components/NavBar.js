import React, { Component } from 'react';

class NavBar extends Component {
	render() {
		return (
			<nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<span className="navbar-item">
						{this.props.left}
					</span>
				</div>
				<div className="navbar-item item-end">
					{this.props.right}
				</div>
			</nav>
		)
	}
}

export default NavBar;
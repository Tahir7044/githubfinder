import React, { Component } from 'react';
import PropTypes from 'prop-types';
export class search extends Component {
	state = {
		text: '',
	};
	static propTypes = {
		searchUser: PropTypes.func.isRequired,
		clearUser: PropTypes.func.isRequired,
		show: PropTypes.bool.isRequired,
	};
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		if (!this.state.text) {
			console.log('empty');
			this.props.setAlert(true, 'please enter the username', 'light');
		} else {
			this.props.setAlert(false);
			this.props.searchUser(this.state.text);
			this.setState({ text: '' });
		}
	};
	render() {
		const { clearUser, show } = this.props;
		return (
			<div>
				<form onSubmit={this.onSubmit} className="form">
					<input
						type="text"
						name="text"
						placeholder="Search Users.."
						value={this.state.text}
						onChange={this.onChange}
					/>
					<input
						type="submit"
						value="Search"
						className="btn btn-dark btn-block"
					/>
				</form>
				{show && (
					<input
						onClick={clearUser}
						type="submit"
						value="Clear"
						className="btn btn-light btn-block"
					/>
				)}
			</div>
		);
	}
}

export default search;

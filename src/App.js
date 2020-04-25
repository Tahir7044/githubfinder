import React, { Fragment, Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Searchbar from './components/users/search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
class App extends Component {
	state = {
		users: [],
		user: {},
		loading: false,
		alert: null,
	};

	// for initial state
	// async componentDidMount() {
	// 	this.setState({ loading: true });
	// 	const res = await axios.get(
	// 		`https://api.github.com/users?client_id=$
	// 		{process.env.REACT_APP_GITHUB_CLIENT_ID}
	// 		&client_secret=$
	// 		{process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);
	// 	this.setState({ users: res.data, loading: false });
	// }
	// Search for users
	searchUser = async text => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=$
			{process.env.REACT_APP_GITHUB_CLIENT_ID}
			&client_secret=$
			{process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ users: res.data.items, loading: false });
	};
	getUser = async username => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=$
			{process.env.REACT_APP_GITHUB_CLIENT_ID}
			&client_secret=$
			{process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ user: res.data, loading: false });
	};
	clearUser = () => {
		this.setState({ users: [], loading: false });
	};
	setAlert = (check, msg = '', type = '') => {
		if (check) {
			this.setState({ alert: { massege: msg, type: type } });
		} else {
			this.setState({ alert: null });
		}
		// setTimeout(() => {
		// 	this.setState({ alert: null });
		// }, 2000);
	};
	render() {
		const { users, user, loading } = this.state;
		return (
			<Router>
				<div className="App">
					<Navbar title="Github Finder" icon="fab fa-github" />
					<div className="container">
						<Switch>
							<Route
								exact
								path="/"
								render={props => (
									<Fragment>
										<Alert alert={this.state.alert} />
										<Searchbar
											searchUser={this.searchUser}
											clearUser={this.clearUser}
											setAlert={this.setAlert}
											show={
												users.length > 0 ? true : false
											}
										/>
										<Users
											loading={loading}
											users={users}
										/>
									</Fragment>
								)}
							/>
							<Route exact path="/about" component={About} />
							<Route
								exact
								path="/user/:login"
								render={props => (
									<User
										{...props}
										getUser={this.getUser}
										user={user}
										loading={this.loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;

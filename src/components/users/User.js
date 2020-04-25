import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
export class User extends Component {
	componentDidMount() {
		this.props.getUser(this.props.match.params.login);
	}
	static propTypes = {
		loading: PropTypes.bool,
		user: PropTypes.object.isRequired,
		getUser: PropTypes.func.isRequired,
	};
	render() {
		const {
			name,
			avatar_url,
			location,
			company,
			bio,
			blog,
			login,
			html_url,
			followers,
			following,
			public_repos,
			public_gists,
			hireable,
		} = this.props.user;
		console.log(name);
		const { loading } = this.props;
		if (loading) return <Spinner />;

		return (
			<Fragment>
				<Link to="/" className="btn btn-light">
					Back To Search...
				</Link>
				Hireable:{' '}
				{hireable ? (
					<i className="fas fa-check text-success" />
				) : (
					<i className="fas fa-times-circle text-danger" />
				)}
				<div className="card grid-2">
					<div className="all-center">
						<img
							src={avatar_url}
							alt=""
							className="round-img"
							style={{ width: '60px' }}
						/>
						<h1>{name}</h1>
						<p>Location:{location}</p>
					</div>
					<div>
						{bio && (
							<Fragment>
								<h3>Bio</h3>
								<p>{bio}</p>
							</Fragment>
						)}
						<a href={html_url} className="btn btn-dark my-1">
							Visit Github Repo
						</a>
						<ul>
							<li>
								{login && (
									<Fragment>
										<strong>username </strong>
										{login}
									</Fragment>
								)}
							</li>
							<li>
								{company && (
									<Fragment>
										<strong>Company </strong>
										{company}
									</Fragment>
								)}
							</li>
							<li>
								{blog && (
									<Fragment>
										<strong>Website </strong>
										{blog}
									</Fragment>
								)}
							</li>
						</ul>
					</div>
				</div>
				<div className="card text-center">
					<div className="badge badge-primary">
						followers: {followers}
					</div>
					<div className="badge badge-success">
						Following: {following}
					</div>
					<div className="badge badge-light">
						Public Repos: {public_repos}
					</div>
					<div className="badge badge-dark">
						Public Gists: {public_gists}
					</div>
				</div>
			</Fragment>
		);
	}
}

export default User;

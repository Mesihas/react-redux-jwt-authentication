import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { formActions } from '../_actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        submitted: false
    };


    this.handleSubmit = this.handleSubmit.bind(this);
}

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleSubmit(e) {
      e.preventDefault();

     // this.setState({ submitted: true });
   //   const { username, password } = this.state;
      const { dispatch } = this.props;
     // if (username && password) {
          dispatch(formActions.getLookupData());
     // }
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                            </li>
                        )}
                    </ul>
                }

                <p>
                    <Link to="/login">Logout</Link>
                </p>

                <h2>get data</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <button className="btn btn-primary">Get Data</button>

                    </div>
                </form> 
            </div>
            
        );
    }
}


function mapStateToProps(state) {
    const { users, authentication, lookupData } = state;
    const { user } = authentication;
    return {
        user,
        users,
        lookupData
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { formActions } from '../_actions';
import Formu from '../_components/formu';
import config from 'config';

const friendOptions = [
  {
    key: '1',
    text: 'Jenny text',
    value: 'Jenny Hess',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg' },
  },
  {
    key: '2',
    text: 'Elliot text',
    value: 'Elliot Fu',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg' },
  },
  {
    key: '3',
    text: 'Stevie text',
    value: 'Stevie Feliciano',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg' },
  },
  {
    key: '4',
    text: 'Christian text',
    value: 'Christian',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/christian.jpg' },
  },
  {
    key: '5',
    text: 'Matt text',
    value: 'Matt',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg' },
  },
  {
    key: '6',
    text: 'Justen text',
    value: 'Justen Kitsune',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/justen.jpg' },
  },
]

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false,
      gender: 'Male',    /////
      testfield: '',
      field1: null,
      searchQuery: '',
      selected: null
      };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
      this.props.dispatch(userActions.getAll());
      const { dispatch } = this.props;
      dispatch(formActions.getLookupData());
  }

  handleSubmit(e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        field1: 0,//this.state.field1,
        field2: "xxxx", //this.state.testfield,
        gender: this.state.gender
      }),
    };

    return fetch(`${config.apiUrl}/values/formpost`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
          //  localStorage.setItem('user', JSON.stringify(user));

            //return user;
        });
  }

  // handleChange= (e) => {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  //   console.log(name);
  // }


  handleOnChange = (e, data) => {
    const { value } = data.value;
    const { key } = data.options.find(o => o.value === data.value);
    this.setState({ gender: data.value });
    console.log(data.value);
    console.log(key);
  }

  handleSubmit(e) {

  }

  handleSubmitGetData = (e) => {
      if(!this.props.lookupData.lookupData){return;} 
      return (
      <Formu 
       countries = {this.props.lookupData.lookupData.countries}
       onFormSubmit={this.handleSubmit}
       onChange={this.handleOnChange}
      /> )

  }

  render() {
    const { value, testfield, gender, searchQuery, selected  } = this.state
    const { user, users } = this.props;
    const { countries, cities } = this.props;
    
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
                <form name="form" onSubmit={this.handleSubmitGetData}>
                    <div className="form-group">
                        <button className="btn btn-primary">Get Data</button>

                    </div>
          </form> 
          {this.handleSubmitGetData()} 
      </div>
    );
  }
}

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              logout();
              location.reload(true);
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  });
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
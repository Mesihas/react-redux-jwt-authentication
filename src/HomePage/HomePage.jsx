import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { formActions } from '../_actions';
import Formu from '../_components/formu';
import config from 'config';
import { history } from '../_helpers';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      this.props.history.push("/login");
    }
  }

  componentDidMount() {
      this.props.dispatch(userActions.getAll());
      const { dispatch } = this.props;
      dispatch(formActions.getLookupData());
  }

  handleSubmit(e) {

  }

  handleOnChange = (e, data) => {
   
    console.log("-------------------"); 
    if(data.options){   
      const { key } = data.options.find(o => o.value === data.value);     
      console.log(key);
      // this.setState({ [key]: data.value });
       const { value } = data.value;
    }else if(data.type == "checkbox"){
      const { checked } = data;
      data.value = checked;
    }
    this.setState({ [data.name]: data.value });
  
    console.log(data.name);
    console.log(data.value);
    console.log("-------------------");
  }

  handleSubmit = (e) => {
    console.log("submit locooooo");
    
  }

  handleSubmitGetData = (e) => {
    if(!this.props.lookupData.lookupData){return;} 
      return (
      <Formu 
        countries = {this.props.lookupData.lookupData.countries}
        onFormSubmit={this.handleSubmit}
        onChange={this.handleOnChange}
      /> 
    )
  }

  handleLogState = (e) =>  {
    console.log("state from HomePage");
    console.log(this.state);
    console.log("-------------------");
    
  }

  render() {
    const { user, users } = this.props;

    return (
      <div className="col-md-6 col-md-offset-1">       
        <h4>Hi {user.firstName}!</h4>
        <p>You're logged in with React & JWT!!</p>
        {/* <h3>Users from secure api end point:</h3>
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
        } */}
        <p>
          <Link to="/login">Logout</Link>
        </p>
        <Link to="/raso">Raso</Link>
        <button 
          className="btn btn-primary" 
          onClick={this.handleLogState}>
            Log state
        </button>         
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
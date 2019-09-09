import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const formService = {
  getLookupData,
  handlePostForm,
  handlePostFormAxios

};

function getLookupData() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/values/getLookupData`, requestOptions).then(handleResponse);
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
        console.log("log from handleResponse");
        console.log(data);
        console.log("-------------------");
        return data;
    });
}

function handlePostForm(data) {
  // console.log("state from Form Service");
  // console.log(data);
  // console.log("-------------------");

  let user = JSON.parse(localStorage.getItem('user'));
 
  const requestOptions = {
    method: 'POST',
    headers: 
    { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + user.token,
    },
    body: JSON.stringify(data),
   // mode: 'no cors'
  };
  return fetch(`${config.apiUrl}/values/formpost`, requestOptions)
    .then(function(response) {
      return response.json();
    })
    .catch(error => console.error('Error:', error));
}

function handlePostFormAxios(data){
   let user = JSON.parse(localStorage.getItem('user'));

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user.token,
  }

  axios.post(`${config.apiUrl}/values/formpost`, data, {
      headers: headers
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      
    })
}
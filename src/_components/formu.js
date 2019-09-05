import React from 'react';
//import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

// import { userActions } from '../_actions';
// import { formActions } from '../_actions';
//import { Dropdown } from 'semantic-ui-react'

import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Dropdown,
  MenuItem
} from 'semantic-ui-react'

class Formu extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      testfield: '',
      field1: null,
      searchQuery: '',
      selected: null,
      searchQuery: '',
      value:''
    };
  }
  
  handleSubmit = e => {
    e.preventDefault();
    console.log("submit locooooo");
    this.props.onFormSubmit(this.state.term);
  }

  renderSelectOptions = () => {
    const selectList = this.props.countries.map(function(option, i){
      return <MenuItem key={option.key} value={option.value}> {option.text}</MenuItem>;
    })
   return selectList;
  }

  onChange = (e, data) => {
    console.log(this.props)
    this.setState({ selected: data.value });
    this.props.onChange(e, data);
  }

  handleChange = (e, data) => {
    console.log(this.props)
    this.setState({ selected: data.value });
    this.props.onChange(e, data);
  }
  onSearchChange = (e, data) => {
    console.log(data.searchQuery);
    this.setState({ searchQuery: data.searchQuery });
  }

  render(){
    const { value, testfield, gender, searchQuery, selected  } = this.state
 
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Dropdown
            button
            className='icon'
            fluid
            labeled
            options={this.props.countries}
            search
            text={searchQuery}
            searchQuery={searchQuery}
            value={selected}
            onChange={this.onChange}
            onSearchChange={this.onSearchChange}
          />
          {/* <Form.Field
            control={Select}
            label='paises'
            options={this.renderSelectOptions()}
            placeholder='paises'
            name='paises'
            value= {value}
            onChange={this.handleChange}
          /> */}
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='First name'
              placeholder='First name'
              name='field1'
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label='Last name'
              placeholder='Last name'
            />
            <Form.Field
              control={Select}
              label='Gender'
              options={options}
              placeholder='Gender'
              name='gender'
              value= {gender}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>Quantity</label>
            <Form.Field
              control={Radio}
              label='One'
              value='1'
             checked={value === '1'}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Radio}
              label='Two'
              value='2'
              checked={value === '2'}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Radio}
              name='Three'
              label='Three'
              value='3'
              checked={value === '3'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field
            control={TextArea}
            label='About'
            placeholder='Tell us more about you...'
          />
          <Form.Field
            control={Checkbox}
            label='I agree to the Terms and Conditions'
          />
          <div>
            <label htmlFor="testfield">TestField</label>
            <input
            type="text"
            className="form-control"
            name="testfield"
            value={testfield}
            onChange={this.handleChange}
            />
          </div>
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </div>
    );
  };
};

export default Formu;

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]
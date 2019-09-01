import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { formActions } from '../_actions';
import { Dropdown } from 'semantic-ui-react'

import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from 'semantic-ui-react'

class Formu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      testfield: '',
      field1: null,
      searchQuery: '',
      selected: null
    };

  //  this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleSubmit = e => {
    e.preventDefault();

    this.props.onFormSubmit(this.state.term);
  }

  render(){
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Dropdown
            placeholder='Select Friend'
            fluid
            selection
            name="drop"
            options={props.lookupData}
            onChange={this.handleOnChange}
          />
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
            <input type="text" className="form-control" name="testfield" value={testfield} onChange={this.handleChange} />
          </div>
          <Form.Field control={Button}>Submit</Form.Field>`
        </Form>
      </div>   
    );
  };
};

const mapStateToProps = (state) => {
  return { lookupData: state.lookupData };
}

export default connect(mapStateToProps)(Formu);


const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

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
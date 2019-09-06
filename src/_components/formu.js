import React from 'react';
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
      searchQuery: '',
      country: null,
      searchQuery: '',
      firstName:'',
      lastName:'',
      gender:null,
      quantity: null,
      
    };
  }
  
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.onFormSubmit(this.state.term);
  }

  renderSelectOptions = () => {
    const selectList = this.props.countries.map(function(option, i){
      return <MenuItem key={option.key} value={option.value}> {option.text}</MenuItem>;
    })
    return selectList;
  }

  onChange = (e, data) => {
    // console.log(this.props)
    this.setState({ [data.name]: data.value });
    this.props.onChange(e, data);
    console.log("state from Form");
    console.log(this.state);
    console.log("-------------------");
  }

  onSearchChange = (e, data) => {
    this.setState({ searchQuery: data.searchQuery });
  }

  render(){
    const { quantity, gender, searchQuery, country, firstName, lastName  } = this.state
 
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Dropdown
            button
            className='icon'
            name="country"
            fluid
            labeled
            options={this.props.countries}
            search
            text={searchQuery}
            searchQuery={searchQuery}
            value={country}
            onChange={this.onChange}
            onSearchChange={this.onSearchChange}
          />
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='First name'
              placeholder='First name'
              name='firstName'
              value= {firstName}
              onChange={this.onChange}
            />
            <Form.Field
              control={Input}
              label='Last name'
              placeholder='Last name'
              name='lastName'
              value={lastName}
              onChange={this.onChange}
            />
            <Form.Field
              control={Select}
              label='Gender'
              options={options}
              placeholder='Gender'
              name='gender'
              value= {gender}
              onChange={this.onChange}
            />
          </Form.Group>
           <Form.Group inline>
            <label>Quantity</label>
            <Form.Field
              control={Radio}
              label='One'
              name="quantity"
              value='1'
              checked={quantity === '1'}
              onChange={this.onChange}
            />
            <Form.Field
              control={Radio}
              label='Two'
              name="quantity"
              value='2'
              checked={quantity === '2'}
              onChange={this.onChange}
            />
            <Form.Field
              control={Radio}
              name='Three'
              label='Three'
              name="quantity"
              value='3'
              checked={quantity === '3'}
              onChange={this.onChange}
            />
          </Form.Group>
         <Form.Field
            control={TextArea}
            label='About'
            name='about'
            placeholder='Tell us more about you...'
            onChange={this.onChange}
          />
          <Form.Field
            control={Checkbox}
            label='I agree to the Terms and Conditions'
            name='agreenment'
            onChange={this.onChange}
          />
          {/* <div>
            <label htmlFor="testfield">TestField</label>
            <input
            type="text"
            className="form-control"
            name="testfield"
            value={testfield}
            onChange={this.handleChange}
            />
          </div> */}
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
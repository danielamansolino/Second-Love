import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

// we need to export pur class components
// one of the key distinctions between classes and functions components is the extend kewyword
// This tells our code 'get all the good stuff from the Component, but let me make it work for my porposes"
export default class SignUpForm extends Component {
    // class components hanlde state differently than functions
    // instead of hooks, we use the class field called stated 
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    };

    // handleCHange method -> handles user input in the form
    // looks at the name of the input field, and updates the vlue associated with that input field in state
    handleChange = (evt) => {
      //we'll look at the event, gather information from the event, update state
      this.setState({
        // we can use a specific syntax, to dynamically gather data from the form
        [evt.target.name]: evt.target.value,
        error: ''
      })
    }

    handleSubmit = async (evt) => {
      evt.preventDefault();
      // This was a baby step for testing our component 
      // alert(JSON.stringify(this.state));
      try {
        // this is where we'll run our api call
        // we'll start our api call process making a copy of the state object
        const formData = {...this.state};
        delete formData.error;
        delete formData.confirm;
        // another way to handle this is destructuring
        //const {name, email. password } = this.state
        //const formData = {name, email, password}
        const user = await signUp(formData);
      // Baby step!
        // console.log('This is the user singup form',user)
        this.props.setUser(user);
        } catch {
        // handle an error occurred 
        this.setState({ error: 'Sign Up Failed - Try Again' });
      }

    }
    // Every single class component NEEDS a tender method
    // This render method tell our app what this component returns
    render() {
      const disable = this.state.password !== this.state.confirm;
      return (
          <div>
              <div className="form-container">
                  <form autoComplete="off" onSubmit={this.handleSubmit}>
                      <label>Name</label> <br/>
                      <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required /><br/>
                      <label>Email</label><br/>
                      <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required /><br/>
                      <label>Password</label><br/>
                      <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required /><br/>
                      <label>Confirm</label><br/>
                      <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required /><br/>
                      <button type="submit" disabled={disable}>SIGN UP</button>
                  </form>
              </div>
              <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
      );
    }    
  }
  
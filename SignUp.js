import React from 'react';
import './App.css';
import Activities from './Activities';
class SignUp extends React.Component {
    state = {
        
        uname:"",
        password:"",
    submit:false
    }
  
    handleChange=(e)=>
    {
       this.setState({uname: e.target.value})
    }
    handlePassword=(e)=>
    {
      this.setState({password: e.target.value})
    }
    handleSubmit=()=>
    {
        
        this.setState({submit:true})
    }
render()
{
    

    return (
        <div >
            <h1>SIGN UP</h1>
            UserName:  <input type="text" onChange={this.handleChange}></input><br></br><br></br>
            Password:<input type="password" onChange={this.handlePassword}></input>
            <button onClick={this.handleSubmit}>signup</button>
            {this.state.submit?<Activities name={this.state.uname} password={this.state.password}></Activities>:null}
            

        </div>
    );
}
}

export default SignUp;

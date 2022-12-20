import React from "react";
import Tweeter from "../../Images/tweeter.svg";
import "./login.css";
import Auth from "../../components/auth/auth";
import Loader from "../../components/loader/loader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/action";
import { useNavigate, useLocation } from "react-router-dom";



class LoginPage extends React.Component {
  state = {
    error: '',
    requestBody: {
      email: "",
      password: "",
    },
  };


  inputChangedHandler = (event) => {
    const updatedFormBody = {
      ...this.state.requestBody,
    };
    updatedFormBody[event.target.name] = event.target.value;
    this.setState({ requestBody: updatedFormBody });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const formdata = this.state.requestBody;
    this.props.onAuth(formdata["email"], formdata["password"]);
  };
  
  handleLoginButtonClick = (e) => {
    this.setErrorMessage(null)
    this.props.uauth.login().catch(error => {
      console.error('login error:', error)
      this.setErrorMessage('User failed to login.')
    })
  }
  
  setErrorMessage = (msg) => {
    this.setState({ error: msg });
  }


  componentDidUpdate() {
    if (this.props.error) {
      setTimeout(this.props.onResetError, 2000);
    }
    if (this.props.auth) {
      // setTimeout(() => this.props.logout, 1000);
      if (this.props.location.state?.from) {
        this.props.navigate(this.props.location.state.from);
      }
    }
  }

  render() {
    let errorMessage = <p style={{ color: "red" }}>{this.state.error}</p>;
    return (
      <Auth>
        {this.props.loading ? <Loader /> : null}
        <div className="signupPage">
          <Link to="/">
            <img src={Tweeter} className="tweeterHome" />
          </Link>
          {errorMessage}
          <button onClick={this.handleLoginButtonClick}>Login with Unstoppable</button>
        </div>
      </Auth>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password, false)),
    onResetError: () => dispatch({ type: "RESET_ERROR" }),
    logout: () => dispatch({ type: "SET_LOGOUT" }),
  };
};

const withHooksHOC = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return <Component navigate={navigate} location={location} {...props} />;
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withHooksHOC(LoginPage));

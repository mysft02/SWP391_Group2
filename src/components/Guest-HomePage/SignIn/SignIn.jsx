import { Button, Card, Checkbox, Col, Input, Row } from "antd";
import './SignIn.css'
import { Link } from "react-router-dom";
const SignIn = () => {
  return (
    <div>
      <Card className="card_signin">
        <div className="title">
          <p>Sign in</p>
          <span className="hightline"></span>
        </div>
        <form>
          <p>Email</p>
          <Input size="large" placeholder="example@gmail.com" />
          <p>Password</p>
          <Input size="large" placeholder="aaAA@12345" />
          <div className="forgot">
            <Link to={"/forgot-password"}>Forgot password</Link>
          </div>
          <div className="button_hightline">
            <Button className="button">Login</Button>
            <span className="hightline_v2"></span>
          </div>
          <div className="return">
            <p>
              no account? <Link to={"/sign-up"}>Sign up</Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;

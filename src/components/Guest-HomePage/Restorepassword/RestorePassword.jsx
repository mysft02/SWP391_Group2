import { Button, Card, Input } from "antd";
import React from "react";
import './RestorePassword.css'
import { IoMdReturnLeft } from "react-icons/io";
import { Link } from "react-router-dom";

const RestorePassword = () => {
  return (
    <div>
      <Card className="card_restore">
        <div className="title">
          <p>
            <span>
              <Link to={"/sign-in"}>
                <IoMdReturnLeft />
              </Link>
            </span>
            Restore Password
          </p>
          <span className="hightline"></span>
        </div>
        <div className="form_restore">
          <form>
            <p>Email</p>
            <Input size="large" placeholder="example@gmail.com" />
          </form>
        </div>
        <div className="button_hightline">
          <Button className="button">Send Reset Link</Button>
          <span className="hightline_v2"></span>
        </div>
        <div className="return">
          <p>
            no account? <Link to={"/sign-up"}>Sign up</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RestorePassword;

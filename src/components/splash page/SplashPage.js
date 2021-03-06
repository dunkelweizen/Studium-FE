import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../navigation/NavBar";
import Button from "../common/Button";
import ButtonBottom from "../common/ButtonBottom";
import { PageLayout } from "../common/PageLayout";
import { Input } from "../common/Input";
import Spinner from "../common/Spinner";

let timeout;

const Form = styled.form`
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 16px;
  box-sizing: border-box;
  color: black;
  border-radius: 4px;
`;

const SplashPage = () => {
  const [email, setEmail] = useState({ email: "" });
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const routeToLogin = () => {
    let path = `/login`;
    history.push(path);
  };

  const routeToRegister = () => {
    let path = `/register`;
    history.push(path);
  };

  function handleInputChange(e) {
    e.persist();
    setEmail((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <>
      <PageLayout data-testid="landingpage">
        <NavBar />
        <img src={require("../common/header.svg")} style={{ width: "100%" }} alt="headerimage" />
        <h2 className="h2Tags">A place for students to create flashcards, share, and learn</h2>
        <p className="pTags">Master any subject, one success at a time.</p>

        <Form onSubmit={handleSubmit} className="getStarted" data-testid="form">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Input value={email.email} placeholder="Enter your email" type="text" name="email" onChange={handleInputChange} id="email" />
              <Button type="submit" onClick={routeToRegister} small>
                Get Started
              </Button>
            </>
          )}
        </Form>

        <p className="centeredOr">OR</p>

        <img src={require("../common/sprinting.svg")} style={{ width: "100%" }} alt="character sprintinging" />
        <h2 className="h2Tags">You aren’t here to waste time, we know</h2>
        <p className="pTags">Studium uses spaced repitition to help you spend your time studying only the things you don’t know. This is the most effiicent and useful way to study.</p>
        <img src={require("../common/reading.svg")} style={{ width: "100%" }} alt="character reading" />
        <h2 className="h2Tags">Share the important info from your massive textbooks</h2>
        <p className="pTags">Share the info you’ve pulled from your massive textbooks. Let friends share with you the info they’ve pulled. Together you can conquer this class.</p>
        <img src={require("../common/sitting.svg")} style={{ width: "100%" }} alt="character sitting" />
        <h2 className="h2Tags">Your textbooks are massive</h2>
        <p className="pTags">We know your textbook is over 1000 pages. Let’s help you get the most important info into online flashcards and start studying.</p>
        <ButtonBottom loginCTA onClick={routeToLogin} data-testid="loginButton">
          Log In
        </ButtonBottom>
        <ButtonBottom signupCTA onClick={routeToRegister} data-testid="signupButton">
          Sign Up
        </ButtonBottom>
      </PageLayout>
    </>
  );
};

export default SplashPage;

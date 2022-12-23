import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from 'utils/user';
import user from 'reducers/auth';
// Styles
import {
  Container,
  PageHeading,
  PageSubHeading,
} from 'components/styles/GlobalStyles';
import { Form, FormHeading, Input, Button } from 'components/styles/Forms';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState('register');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      const userId = useSelector((store) => store.user.userId);
      navigate(`/profile/${userId}`);
    }
  }, [accessToken]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    };

    fetch(API_URL(mode), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
            navigate(`/profile/${data.response.id}`);
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setEmail(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };

  return (
    <Container>
      <section>
        <div>
          <PageHeading>Don't have an account?</PageHeading>
          <PageSubHeading>
            Register and start your journey with us!
          </PageSubHeading>
        </div>
        <div>
          <Form onSubmit={onFormSubmit}>
            <FormHeading>Create Account</FormHeading>

            <Input
              className="signup-input"
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              className="signup-input"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              className="signup-input"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Sign Up</Button>
          </Form>
          <p>
            Already have an account? <Link to={`/login`}>Log in here!</Link>
          </p>
        </div>
      </section>
    </Container>
  );
};

export default Register;

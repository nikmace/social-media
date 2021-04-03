import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { useForm } from '../util/hooks';
import { AuthContext } from '../context/auth';


function Login(props) {
    const context = React.useContext(AuthContext);
    const [errors, setErrors] = React.useState({});
    
    const { onChange, onSubmit, values } = useForm(loginUserCb, {
        username: '',
        password: '',
    });
    

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result){
            context.login(result.data.login);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function loginUserCb() {
        loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input 
                    label="Username" 
                    placeholder="Username.." 
                    name="username"
                    type="text" 
                    value={values.username}
                    error={errors.username ? true : false} 
                    onChange={onChange} 
                />
                <Form.Input 
                    label="Password" 
                    placeholder="Password.." 
                    name="password"
                    type="password"  
                    value={values.password}
                    error={errors.password ? true : false} 
                    onChange={onChange} 
                />
                <Button type="submit" primary >
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            id email username createdAt token
        }
    }
`

export default Login;

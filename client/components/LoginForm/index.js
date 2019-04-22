import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './elements';
import { Form, FormRow, FormTitle, Input, Button } from '../common/elements';
import { isEmailValid, isPasswordValid } from '../../utils/validators';

class LoginForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    }

    submitHandler () {
        const { onSubmit } = this.props;
        const { email, password } = this.state;

        if (isEmailValid(email) && isPasswordValid(password)) {
            onSubmit(email, password);
        }
    }

    emailChangeHandler (event) {
        const { value } = event.target || {};

        this.setState({
            email: value,
        });
    }

    passwordChangeHandler (event) {
        const { value } = event.target || {};

        this.setState({
            password: value,
        });
    }

    render () {
        return (
            <Wrapper>
                <Form>
                    <FormTitle>Login</FormTitle>
                    <FormRow>
                        <Input type='email' placeholder='Enter email' onChange={this.emailChangeHandler} />
                    </FormRow>
                    <FormRow>
                        <Input type='password' placeholder='Enter password' onChange={this.passwordChangeHandler} />
                    </FormRow>
                    <FormRow>
                        <Button onClick={this.submitHandler}>Login</Button>
                    </FormRow>
                </Form>
            </Wrapper>
        );
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
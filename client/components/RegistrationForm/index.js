import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormRow, FormTitle, Input, Button } from '../common/elements';
import { Wrapper } from '../RegistrationForm/elements';
import { isEmailValid, isPasswordValid } from '../../utils/validators';

class RegistrationForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '(___)___-__-__',
            birthDay: '',
            passConfirm: '',
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.birthDayChangeHandler = this.birthDayChangeHandler.bind(this);
        this.passwordConfirmChangeHandler = this.passwordConfirmChangeHandler.bind(this);

        this.pass1 = '';
        this.pass2 = '';
    }

    submitHandler () {
        const { onSubmit } = this.props;
        const { email, firstName, lastName, phone, birthDay } = this.state;

        if (this.pass1 !== this.pass2) return;

        if (isEmailValid(email) && isPasswordValid(this.pass1) && firstName.length && phone) {
            onSubmit({ email, password: this.pass1, firstName, lastName, phone, birthDay });
        }
    }

    emailChangeHandler (event) {
        const { value } = event.target || {};

        this.setState({
            email: value,
        });
    }

    firstNameChangeHandler (event) {
        const { value } = event.target || {};

        this.setState({
            firstName: value,
        });
    }

    lastNameChangeHandler (event) {
        const { value } = event.target || {};

        this.setState({
            lastName: value,
        });
    }

    phoneChangeHandler (event) {
        const { value } = event.target || {};

        this.setState({
            phone: value,
        });
    }

    birthDayChangeHandler (event) {
        const { value } = event.target || {};

        this.setState({
            birthDay: value,
        });
    }

    passwordChangeHandler (event) {
        const {value} = event.target || {};

        this.pass1 = value;

        this.setState({
            password: new Array(value.length).fill('*').join(''),
        });
    }

    passwordConfirmChangeHandler (event) {
        const { value } = event.target || {};

        this.pass2 = value;

        this.setState({
            passConfirm: new Array(value.length).fill('*').join(''),
        });
    }

    render () {
        const { email, firstName, lastName, phone, birthDay, password, passConfirm } = this.state;

        return (
            <Wrapper>
                <Form>
                    <FormTitle>Registration</FormTitle>
                    <FormRow>
                        <Input type='email' placeholder='Enter email' onChange={this.emailChangeHandler} value={email} />
                    </FormRow>
                    <FormRow>
                        <Input type='text' placeholder='First name' onChange={this.firstNameChangeHandler} value={firstName} />
                    </FormRow>
                    <FormRow>
                        <Input type='text' placeholder='Last name' onChange={this.lastNameChangeHandler} value={lastName} />
                    </FormRow>
                    <FormRow>
                        <Input type='text' pattern={/^(\(0{1}\d{2}\)){1}\d{3}(\-\d{2}){2}$/} placeholder='(___)___-__-__)' onChange={this.phoneChangeHandler} value={phone} />
                    </FormRow>
                    <FormRow>
                        <Input type='text' placeholder='Date of Birth' onChange={this.birthDayChangeHandler} value={birthDay} />
                    </FormRow>
                    <FormRow>
                        <Input type='password' placeholder='Enter password' onChange={this.passwordChangeHandler} value={password} />
                    </FormRow>
                    <FormRow>
                        <Input type='password' placeholder='Confirm password' onChange={this.passwordConfirmChangeHandler} value={passConfirm} />
                    </FormRow>
                    <FormRow>
                        <Button onClick={this.submitHandler}>Sign up</Button>
                    </FormRow>
                </Form>
            </Wrapper>
        );
    }
}

RegistrationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default RegistrationForm;
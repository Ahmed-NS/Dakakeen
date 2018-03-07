import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {
  customerNameChanged,
  customerEmailChanged,
  customerAddressChanged,
  customerPasswordChanged,
  customerConfirmPasswordChanged,
  createCustomer
} from '../actions';
import { Card, CardSection, Button, Spinner, Input } from './common';

class CreateCustomer extends Component {

  onNameChange(text) {
    this.props.customerNameChanged(text);
  }

  onEmailChange(text) {
    this.props.customerEmailChanged(text);
  }

  onAddressChange(text) {
    this.props.customerAddressChanged(text);
  }

  onPasswordChange(text) {
    this.props.customerPasswordChanged(text);
  }

  onConfiremPasswordChange(text) {
    this.props.customerConfirmPasswordChanged(text);
  }

  onButtonPress() {
    const { cName, cEmail, cAddress, cPassword, cConfirmPassword } = this.props;

    this.props.createCustomer({ cName, cEmail, cAddress, cPassword, cConfirmPassword });
  }

  renderButton() {
    if (this.props.cLoading) {
      return <Spinner size='large' />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Create
      </Button>
    );
  }

  renderFB(text) {
    if (text !== '') {
      return <Text style={styles.error}>{text}</Text>;
    }
  }

  render() {
    return (
      <ScrollView>
        <Card>
          {this.renderFB(this.props.FBcName)}
          <CardSection>
            <Input
              label="Name"
              placeholder="name"
              onChangeText={this.onNameChange.bind(this)}
              value={this.props.cName}
            />
          </CardSection>

          {this.renderFB(this.props.FBcEmail)}
          <CardSection>
            <Input
              label="Email"
              placeholder="Smith@example.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.cEmail}
              keyboardType='email-address'
            />
          </CardSection>

          {this.renderFB(this.props.FBcAddress)}
          <CardSection>
            <Input
              label="Address"
              placeholder="address"
              onChangeText={this.onAddressChange.bind(this)}
              value={this.props.cAddress}
            />
          </CardSection>

          {this.renderFB(this.props.FBcPassword)}
          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.cPassword}
            />
          </CardSection>

          {this.renderFB(this.props.FBcConfirmPassword)}
          <CardSection>
            <Input
              secureTextEntry
              label="Confirm Password"
              placeholder="confirm password"
              onChangeText={this.onConfiremPasswordChange.bind(this)}
              value={this.props.cConfirmPassword}
            />
          </CardSection>

          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  error: {
    fontSize: 16,
    color: 'red',
  }
};

const mapStateToProps = ({ customer }) => {
  const { cName, cEmail, cAddress, cPassword, cConfirmPassword, cLoading,
    FBcName, FBcEmail, FBcAddress, FBcPassword, FBcConfirmPassword } = customer;

    return { cName, cEmail, cAddress, cPassword, cConfirmPassword, cLoading,
      FBcName, FBcEmail, FBcAddress, FBcPassword, FBcConfirmPassword };
    };

    export default connect(mapStateToProps, {
      customerNameChanged,
      customerEmailChanged,
      customerAddressChanged,
      customerPasswordChanged,
      customerConfirmPasswordChanged,
      createCustomer
    })(CreateCustomer);

import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {
  providerNameChanged,
  providerEmailChanged,
  providerAddressChanged,
  providerPasswordChanged,
  providerConfirmPasswordChanged,
  createProvider,
  providerNationalIDChanged,
  providerPhoneChanged
} from '../actions';
import { Card, CardSection, Button, Spinner, Input } from './common';

class CreateProvider extends Component {

  onNameChange(text) {
    this.props.providerNameChanged(text);
  }

  onEmailChange(text) {
    this.props.providerEmailChanged(text);
  }

  onNationalIDChange(text) {
    this.props.providerNationalIDChanged(text);
  }

  onPhoneChange(text) {
    this.props.providerPhoneChanged(text);
  }

  onAddressChange(text) {
    this.props.providerAddressChanged(text);
  }

  onPasswordChange(text) {
    this.props.providerPasswordChanged(text);
  }

  onConfiremPasswordChange(text) {
    this.props.providerConfirmPasswordChanged(text);
  }

  onButtonPress() {
    const { pName, pEmail, pNationalID, pPhone, pAddress, pPassword, pConfirmPassword } = this.props;

    this.props.createProvider({ pName, pEmail, pNationalID, pPhone, pAddress, pPassword, pConfirmPassword });
  }

  renderButton() {
    if (this.props.pLoading) {
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
          {this.renderFB(this.props.FBpName)}
          <CardSection>
            <Input
              label="Name"
              placeholder="name"
              onChangeText={this.onNameChange.bind(this)}
              value={this.props.pName}
            />
          </CardSection>

          {this.renderFB(this.props.FBpEmail)}
          <CardSection>
            <Input
              label="Email"
              placeholder="Smith@example.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.pEmail}
              keyboardType='email-address'
            />
          </CardSection>

          {this.renderFB(this.props.FBpNationalID)}
          <CardSection>
            <Input
              label="National ID"
              placeholder="1234567890"
              onChangeText={this.onNationalIDChange.bind(this)}
              value={this.props.pNationalID}
              keyboardType='numeric'
            />
          </CardSection>

          {this.renderFB(this.props.FBpPhone)}
          <CardSection>
            <Input
              label="Phone"
              placeholder="055-555-5555"
              onChangeText={this.onPhoneChange.bind(this)}
              value={this.props.pPhone}
              keyboardType='numeric'
            />
          </CardSection>

          {this.renderFB(this.props.FBpAddress)}
          <CardSection>
            <Input
              label="Address"
              placeholder="address"
              onChangeText={this.onAddressChange.bind(this)}
              value={this.props.pAddress}
            />
          </CardSection>

          {this.renderFB(this.props.FBpPassword)}
          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.pPassword}
            />
          </CardSection>

          {this.renderFB(this.props.FBpConfirmPassword)}
          <CardSection>
            <Input
              secureTextEntry
              label="Confirm Password"
              placeholder="confirm password"
              onChangeText={this.onConfiremPasswordChange.bind(this)}
              value={this.props.pConfirmPassword}
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

const mapStateToProps = ({ provider }) => {
  const { pName, pEmail, pAddress, pPassword, pConfirmPassword, pLoading,
    FBpName, FBpEmail, FBpAddress, FBpPassword, FBpConfirmPassword,
    pNationalID, pPhone, FBpNationalID, FBpPhone } = provider;

    return { pName, pEmail, pAddress, pPassword, pConfirmPassword, pLoading,
      FBpName, FBpEmail, FBpAddress, FBpPassword, FBpConfirmPassword,
      pNationalID, pPhone, FBpNationalID, FBpPhone };
    };

    export default connect(mapStateToProps, {
      providerNameChanged,
      providerEmailChanged,
      providerAddressChanged,
      providerPasswordChanged,
      providerConfirmPasswordChanged,
      createProvider,
      providerNationalIDChanged,
      providerPhoneChanged
    })(CreateProvider);

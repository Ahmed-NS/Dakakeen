import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class Login extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button
        onPress={this.onButtonPress.bind(this)}
        styleB={{ borderColor: 'green' }}
        styleT={{ color: 'green' }}
      >
        Login
      </Button>
    );
  }

  renderFeedback() {
    if (this.props.feedback !== '') {
      return (
        <View style={styles.feedbackContainer}>
            <Text style={styles.feedback}>{this.props.feedback}</Text>
        </View>
      );
    }
  }

  renderError() {
    if (this.props.error !== '') {
      return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.imageContainer}>
          <Image
            source={require('../images/Logo.png')}
            style={styles.imageStyle}
          />
        </View>

      {this.renderFeedback()}
      {this.renderError()}

      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            keyboardType='email-address'
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <CardSection style={{ marginTop: 5 }}>
          <Button onPress={() => Actions.chooseType()}>
            Create Account
          </Button>
        </CardSection>
      </Card>

      </View>

    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  errorContainer: {
    backgroundColor: 'rgba(255,0,0,0.2)',
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 2
  },
  feedbackContainer: {
    backgroundColor: 'rgba(0,255,0,0.2)',
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 2
  },
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red',
    padding: 5
  },
  imageStyle: {
    width: 150,
    height: 150
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  feedback: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'green',
    padding: 5
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, feedback } = auth;

  return { email, password, error, loading, feedback };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(Login);

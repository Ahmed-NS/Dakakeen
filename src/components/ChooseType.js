import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './common';


class ChooseType extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <Card>
          <CardSection>
            <Button onPress={() => Actions.createCustomer()}>
              Customer
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => Actions.createProvider()}>
              Provider
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center'
  }
};


export default ChooseType;

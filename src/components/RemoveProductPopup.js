import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { removeProduct } from '../actions';
import { Button } from './common';

class RemoveProductPopup extends Component {

  removeProd() {
    const { uid } = this.props;
    const pid = this.props.product._key;
    this.props.removeProduct({ uid, pid });
  }

  render() {
    console.log('this.props => %O', this.props);
    return (
      <View style={styles.container}>
        <Text style={styles.textStyel}>Are you sure you want to remove</Text>
        <Text style={{ color: '#f00', fontSize: 18, alignSelf: 'center', marginTop: 40, marginBottom: 20 }}>{this.props.product.productName}</Text>
        <View style={styles.btnsContainer}>
          <Button onPress={Actions.pop} styleB={styles.cancelbtnStyle} styleT={styles.canceltextStyle}>
            Cancel
          </Button>
          <Button onPress={() => this.removeProd()}>
            Yes
          </Button>
        </View>
      </View>

    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: 170,
    bottom: 170,
    left: 30,
    right: 30,
    backgroundColor: '#FFF',
    flexDirection: 'column',
    borderRadius: 6
  },
  btnsContainer: {
    marginTop: 50,
    flexDirection: 'row'
  },
  textStyel: {
    marginTop: 20,
    color: '#000',
    fontSize: 18,
    alignSelf: 'center'
  },
  cancelbtnStyle: {
    borderColor: '#000'
  },
  canceltextStyle: {
    color: '#000'
  }
};


export default connect(null, { removeProduct })(RemoveProductPopup);

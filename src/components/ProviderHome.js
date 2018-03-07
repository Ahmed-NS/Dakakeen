import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';
import { getPProducts, setupEditScreen } from '../actions';

class ProviderHome extends Component {

  componentWillMount() {
    console.log(`Provider WM  user = ${this.props.user}`);
    if (this.props.user !== null && this.props.userType === 'P') {
      this.props.getPProducts(this.props.user);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('Props recived => %O', nextProps);
    if (this.props.productFeedback !== '') {
      if (this.props.user !== null && this.props.userType === 'P') {
        this.props.getPProducts(this.props.user);
      }
    }
  }

  editProduct(product) {
    this.props.setupEditScreen(product);
    Actions.editProduct();
  }

  renderFB() {
    if (this.props.productFeedback !== '') {
      return (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedback}>{this.props.productFeedback}</Text>
        </View>
      );
    }
    if (this.props.productRemoveFB !== '') {
      return (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedback}>{this.props.productRemoveFB}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          {this.renderFB()}
          {
            this.props.pProducts.map((value, i) => {
              return (
                <View key={i} style={styles.productContiner}>
                  <Card style={styles.cardStyle}>
                    <CardSection style={{ justifyContent: 'center' }}>
                      <Text style={styles.textStyle}>{value.productName}</Text>
                    </CardSection>
                    <CardSection style={styles.imageContainer}>
                      <Image
                        source={{ uri: 'data:image/jpeg;base64,' + value.productImage }}
                        style={styles.imageStyle}
                      />
                    </CardSection>
                    <CardSection style={{ justifyContent: 'center' }}>
                      <Text style={styles.textStyle}>{value.productPrice} SAR</Text>
                    </CardSection>
                    <CardSection style={{ justifyContent: 'center' }}>
                      <Text style={styles.textStyle}>{value.productDescription}</Text>
                    </CardSection>
                  </Card>
                  <Card style={styles.manageCardStyle}>
                    <TouchableOpacity style={styles.deleteButtonStyle} onPress={() => Actions.removeP({ product: value, uid: this.props.user.uid })}>
                      <Image source={require('../images/delete_button.png')} style={styles.deleteImageStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButtonStyle} onPress={() => this.editProduct(value)}>
                      <Image source={require('../images/edit_button.png')} style={styles.editImageStyle} />
                    </TouchableOpacity>
                  </Card>
                </View>
              );
            })
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  imageStyle: {
    height: 200,
    flex: 1,
    width: null
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  textStyle: {
    fontSize: 16,
    color: '#000'
  },
  feedbackContainer: {
    backgroundColor: 'rgba(0,255,0,0.2)',
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 2
  },
  feedback: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'green',
    padding: 5
  },
  productContiner: {
    flexDirection: 'row'
  },
  cardStyle: {
    flex: 4
  },
  manageCardStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'rgba(0,0,0,0)',
    shadowOpacity: 0,
    elevation: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteImageStyle: {
    height: 40,
    width: 40
  },
  deleteButtonStyle: {
    alignSelf: 'center',
    backgroundColor: '#fcc',
    padding: 8,
    borderRadius: 10,
    borderColor: '#f00',
    borderWidth: 1,
    marginBottom: 15
  },
  editImageStyle: {
    height: 40,
    width: 40
  },
  editButtonStyle: {
    alignSelf: 'center',
    backgroundColor: '#feb',
    padding: 8,
    borderRadius: 10,
    borderColor: '#ffae00',
    borderWidth: 1
  },

};

const mapStateToProps = ({ auth, product, manageProductReducer }) => {
  const { user, userType } = auth;
  const { pProducts, productFeedback } = product;
  const { productRemoveFB } = manageProductReducer;
  return { user, pProducts, productFeedback, userType, productRemoveFB };
};

export default connect(mapStateToProps, { getPProducts, setupEditScreen })(ProviderHome);

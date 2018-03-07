import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, CardSection } from './common';
import { getCartProducts, createOrder, deleteItem } from '../actions';

class CustomerCart extends Component {
  componentWillMount() {
    if (this.props.user !== null && this.props.userType === 'C') {
      const { uid } = this.props.user;
      this.props.getCartProducts({ uid });
    }
  }

  create_order() {
    const { uid } = this.props.user;
    this.props.createOrder({ uid });
  }

  renderFB() {
    console.log('cartFB = ' + this.props.cartFB);
    if (this.props.cartFB !== '') {
      return (
        <View style={styles.FBContainer}>
          <Text style={styles.FBTextStyle}>{this.props.cartFB}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          {this.renderFB()}
          <Card>
            {
              this.props.cartProducts.map((value, i) => {
                return (
                  <CardSection key={i} style={styles.cardStyle}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: 'data:image/jpeg;base64,' + value.productImage }}
                        style={styles.imageStyle}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>Name: {value.productName}</Text>
                      <Text style={styles.textStyle}>Quantity: {value.qty}</Text>
                      <Text style={styles.textStyle}>Price: {value.productPrice} SAR</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => { this.props.deleteItem({ uid: this.props.user.uid, pid: value.pid }); this.props.getCartProducts({ uid: this.props.user.uid }); }}>
                        <Image source={require('../images/delete_icon.png')} style={{ width: 40, height: 40 }} />
                      </TouchableOpacity>
                    </View>
                  </CardSection>
                );
              })
            }
          </Card>
          { this.props.totalPrice === '' || this.props.totalPrice === 0 ? <Card>
            <Text style={styles.totalPriceStyel}>No products</Text>
          </Card> : <Card>
            <Text style={styles.totalPriceStyel}>Total Price: {this.props.totalPrice} SAR</Text>
          </Card> }
          <Button styleB={{ marginTop: 10 }} onPress={() => this.create_order()}>
            Create Order
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 2
  },
  textStyle: {
    fontSize: 14,
    color: '#000'
  },
  cardStyle: {
    flexDirection: 'row'
  },
  textContainer: {
    flex: 4,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  totalPriceStyel: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#000',
    paddingTop: 10,
    paddingBottom: 10
  },
  FBContainer: {
    backgroundColor: 'rgba(255,0,0,0.2)',
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 2
  },
  FBTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red',
    padding: 5
  }
};


const mapStateToProps = ({ auth, cart }) => {
  const { user, userType } = auth;
  const { addToCartFB, cartProducts, totalPrice, cartFB } = cart;
  return { cartProducts, user, addToCartFB, totalPrice, userType, cartFB };
};

export default connect(mapStateToProps, { getCartProducts, createOrder, deleteItem })(CustomerCart);

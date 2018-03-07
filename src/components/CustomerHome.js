import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from './common';
import { getProducts, addProductToCart, qtychanged } from '../actions';

class CustomerHome extends Component {

  onQtychange(pid, value) {
    this.props.qtychanged({ qlist: this.props.qtyList, pid, value });
    this.forceUpdate();
  }

  renderFB() {
    if (this.props.addToCartFB !== '') {
      return (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedback}>{this.props.addToCartFB}</Text>
        </View>
      );
    }
    if (this.props.createOrderFB !== '') {
      return (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedback}>{this.props.createOrderFB}</Text>
        </View>
      );
    }
  }

  addProdToCart(product) {
    const { uid } = this.props.user;
    const { providerId, productId, productName, providerName, productDescription, productPrice, productImage } = product;
    console.log('cust Provider id: ' + this.props.user.uid);
    console.log('cust user id: ' + providerId);
    this.props.addProductToCart(
      { uid,
        providerId,
        productId,
        productName,
        providerName,
        productDescription,
        productPrice,
        productImage,
        qty: this.props.qtyList[productId]
      }
    );
    this.refs['sv'].scrollTo({ x: 0, y: 0, animated: true });
  }

  renderProducts() {
    if (this.props.products[0] != null)
    return (
      this.props.products.map((value, i) => {
        console.log('value ===> %O', value);
        return (
          <Card key={i}>
            <CardSection style={{ justifyContent: 'center' }}>
              <Text style={styles.textStyle}>{value.productName}</Text>
            </CardSection>
            <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.textStyle, { color: '#AAA' }]}>By </Text>
              <Text style={styles.textStyle}>{value.providerName}</Text>
              <Text style={[styles.textStyle, { color: '#AAA', fontSize: 15 }]}> ({value.rate})</Text>
              <Image source={require('../images/star_2.png')} style={{ width: 15, height: 15, marginTop: 2 }} />
              <Text style={[styles.textStyle, { color: '#AAA', fontSize: 15 }]}> ({value.numOfRatings})</Text>
              <Image source={require('../images/user_icon.png')} style={{ width: 15, height: 15, marginTop: 2 }} />
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
            <CardSection>
              <Button onPress={() => this.addProdToCart(value)}>
                Add to Cart
              </Button>
              <View style={{ flex: 1 }}>
                <View style={{ width: 100, borderWidth: 1, borderColor: '#f1f1f1', alignSelf: 'flex-end' }}>
                  <Picker
                    selectedValue={this.props.qtyList[value.productId]}
                    onValueChange={(val) => this.onQtychange(value.productId, val)}
                  >
                      <Picker.Item label="1" value={1} />
                      <Picker.Item label="2" value={2} />
                      <Picker.Item label="3" value={3} />
                      <Picker.Item label="4" value={4} />
                      <Picker.Item label="5" value={5} />
                      <Picker.Item label="6" value={6} />
                      <Picker.Item label="7" value={7} />
                      <Picker.Item label="8" value={8} />
                      <Picker.Item label="9" value={9} />
                    </Picker>
                  </View>
                </View>
              </CardSection>
            </Card>
          );
        })
      );
      this.props.getProducts();
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Spinner />
          <Text style={{ alignSelf: 'center' }}>Getting Products</Text>
        </View>
      );
    }

    clearFB() {
      const { user, userType, createOrderFB, getProducts, rateFB, addToCartFB } = this.props;
      if ((user != null && userType === 'C' && (createOrderFB === 'Order created successfully' || addToCartFB === 'Product added to cart successfully')) || rateFB !== '') {
        setTimeout(() => {
          getProducts();
        }, 1000);
      }
    }

    render() {
    return (
        <ScrollView ref='sv'>
          <View style={{ flex: 1 }}>
            {this.renderFB()}
            {this.renderProducts()}
            {this.clearFB()}
          </View>
        </ScrollView>
      );
    }
  }

  const styles = {
    imageStyle: {
      height: 270,
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
      fontSize: 18,
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
    }
  };

  const mapStateToProps = ({ cProduct, auth, cart, order }) => {
    const { products, qtyList } = cProduct;
    const { user, userType } = auth;
    const { addToCartFB } = cart;
    const { createOrderFB, rateFB } = order;
    return { products, user, addToCartFB, createOrderFB, qtyList, userType, rateFB };
  };

  export default connect(mapStateToProps, { getProducts, addProductToCart, qtychanged })(CustomerHome);

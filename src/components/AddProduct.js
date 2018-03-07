import React, { Component } from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {
  productNameChanged,
  productPriceChanged,
  productDescriptionChanged,
  productImageChanged,
  addProduct
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class AddProduct extends Component {

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.props.productImageChanged(response.data);
      }
    });
  }


  AddProd() {
    const { productName, productPrice, productDescription, productImage, user, userName } = this.props;
    this.props.addProduct({ productName, productPrice, productDescription, productImage, user, userName });
  }

  renderFB(text) {
    if (text !== '') {
      return <Text style={{ color: 'red' }}>{text}</Text>;
    }
  }

  renderButton() {
    if (this.props.aLoading)
      return (
        <CardSection>
          <Spinner />
        </CardSection>
      );
    return (
      <CardSection>
        <Button onPress={() => this.AddProd()}>
          Add
        </Button>
      </CardSection>
    );
  }

  render() {
    return (
      <Card>
        {this.renderFB(this.props.FBProductName)}
        <CardSection>
          <Input
            label="Name"
            placeholder="Product Name"
            onChangeText={value => this.props.productNameChanged(value)}
            value={this.props.productName}
          />
        </CardSection>

        {this.renderFB(this.props.FBProductPrice)}
        <CardSection>
          <Input
            label="Price"
            placeholder="Product Price"
            onChangeText={value => this.props.productPriceChanged(value)}
            value={this.props.productPrice}
            keyboardType='numeric'
          />
        </CardSection>

        {this.renderFB(this.props.FBProductDescription)}
        <CardSection>
          <Input
            label="Description"
            placeholder="Product Description"
            onChangeText={value => this.props.productDescriptionChanged(value)}
            value={this.props.productDescription}
          />
        </CardSection>

        {this.renderFB(this.props.FBProductImage)}
        <CardSection style={styles.imageContainer}>
          <Text style={styles.labelStyle}>Image</Text>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            {
              this.props.productImage === null ?
              <Image
                source={require('../images/Default_image.png')}
                style={styles.imageStyle}
              />
              :
              <Image
                source={{ uri: 'data:image/jpeg;base64,' + this.props.productImage }}
                style={styles.imageStyle}
              />
            }
          </TouchableOpacity>
        </CardSection>

        {this.renderButton()}
      </Card>
    );
  }
}

const styles = {
  imageStyle: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
};

const mapStateToProps = ({ addProductReducer, auth }) => {
  const { productName, productPrice, productDescription, FBProductName, FBProductPrice, FBProductDescription, productImage, FBProductImage, aLoading } = addProductReducer;
  const { user, userName } = auth;

  return { productName, productPrice, productDescription, FBProductName, FBProductPrice, FBProductDescription, user, userName, productImage, FBProductImage, aLoading };
};


export default connect(mapStateToProps, {
  productNameChanged,
  productPriceChanged,
  productDescriptionChanged,
  productImageChanged,
  addProduct
})(AddProduct);

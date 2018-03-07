import React, { Component } from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {
  editProductNameChanged,
  editProductPriceChanged,
  editProductDescriptionChanged,
  editProductImageChanged,
  editProduct
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class EditProduct extends Component {

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

        this.props.editProductImageChanged(response.data);
      }
    });
  }


  editProd() {
    const { eProductName, eProductPrice, eProductDescription, eProductImage, user, pid, userName } = this.props;
    this.props.editProduct({ eProductName, eProductPrice, eProductDescription, eProductImage, user, userName, pid });
  }

  renderFB(text) {
    if (text !== '') {
      return <Text style={{ color: 'red' }}>{text}</Text>;
    }
  }

  renderName() {
    if (this.props.eLoading)
      return <Spinner />;

    return (
      <CardSection>
        <Input
          label="Name"
          placeholder="Product Name"
          onChangeText={value => this.props.editProductNameChanged(value)}
          value={this.props.eProductName}
        />
      </CardSection>
    );
  }

  renderPrice() {
    if (this.props.eLoading)
      return <Spinner />;

    return (
      <CardSection>
        <Input
          label="Price"
          placeholder="Product Price"
          onChangeText={value => this.props.editProductPriceChanged(value)}
          value={this.props.eProductPrice}
          keyboardType='numeric'
        />
      </CardSection>
    );
  }

  renderDescription() {
    if (this.props.eLoading)
      return <Spinner />;

    return (
      <CardSection>
        <Input
          label="Description"
          placeholder="Product Description"
          onChangeText={value => this.props.editProductDescriptionChanged(value)}
          value={this.props.eProductDescription}
        />
      </CardSection>
    );
  }

  renderImage() {
    if (this.props.eLoading)
      return <Spinner />;

    return (
      <CardSection style={styles.imageContainer}>
        <Text style={styles.labelStyle}>Image</Text>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          {
            this.props.eProductImage === null ?
            <Image
              source={require('../images/Default_image.png')}
              style={styles.imageStyle}
            />
            :
            <Image
              source={{ uri: 'data:image/jpeg;base64,' + this.props.eProductImage }}
              style={styles.imageStyle}
            />
          }
        </TouchableOpacity>
      </CardSection>
    );
  }

  renderButton() {
    if (this.props.eLoading)
      return <Spinner />;

    return (
      <CardSection>
        <Button onPress={() => this.editProd()}>
          Edit
        </Button>
      </CardSection>
    );
  }

  render() {
    console.log('ePName = ' + this.props.eProductName);
    return (
      <Card>
        {this.renderFB(this.props.FBEProductName)}
        {this.renderName()}

        {this.renderFB(this.props.FBEProductPrice)}
        {this.renderPrice()}

        {this.renderFB(this.props.FBEProductDescription)}
        {this.renderDescription()}

        {this.renderFB(this.props.FBEProductImage)}
        {this.renderImage()}

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

const mapStateToProps = ({ manageProductReducer, auth }) => {
  const { eProductName, eProductPrice, eProductDescription, FBEProductName, FBEProductPrice, FBEProductDescription, eProductImage, FBEProductImage, eLoading, pid } = manageProductReducer;
  const { user, userName } = auth;

  return { eProductName, eProductPrice, eProductDescription, FBEProductName, FBEProductPrice, FBEProductDescription, user, userName, eProductImage, FBEProductImage, eLoading, pid };
};


export default connect(mapStateToProps, {
  editProductNameChanged,
  editProductPriceChanged,
  editProductDescriptionChanged,
  editProductImageChanged,
  editProduct
})(EditProduct);

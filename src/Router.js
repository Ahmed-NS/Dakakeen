import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import { logout } from './actions';
import Login from './components/Login';
import ChooseType from './components/ChooseType';
import CreateCustomer from './components/CreateCustomer';
import CreateProvider from './components/CreateProvider';
import CustomerHome from './components/CustomerHome';
import ProviderHome from './components/ProviderHome';
import AddProduct from './components/AddProduct';
import CustomerCart from './components/CustomerCart';
import ProviderOrders from './components/ProviderOrders';
import CustomerOrders from './components/CustomerOrders';
import RemoveProductPopup from './components/RemoveProductPopup';
import EditProduct from './components/EditProduct';


class RouterComponent extends Component {

  render() {
    return (
      <Router>
        <Stack key='root' hideNavBar>

          <Scene key='auth'>
            <Scene
              key='login'
              component={Login}
              title='Login'
              titleStyle={{ alignSelf: 'center' }}
              initial
            />
            <Scene
              key='chooseType'
              component={ChooseType}
              title='Choose Type'
              titleStyle={{ alignSelf: 'center', paddingRight: 55 }}
            />
            <Scene
              key='createCustomer'
              component={CreateCustomer}
              title='Create Customer'
              titleStyle={{ alignSelf: 'center', paddingRight: 50 }}
            />
            <Scene
              key='createProvider'
              component={CreateProvider}
              title='Create Provider'
              titleStyle={{ alignSelf: 'center', paddingRight: 50 }}
            />
          </Scene>

          <Scene key='customer'>
            <Scene
              key='customerTabbar'
              tabs
              tabBarStyle={{ backgroundColor: '#FFF', height: 33 }}
              tabBarPosition='bottom'
              activeBackgroundColor='#007aff'
              activeTintColor='#fff'
              labelStyle={{ fontSize: 18 }}
              hideNavBar
            >

                <Scene
                  key='customerHome'
                  component={CustomerHome}
                  title='Home'
                  titleStyle={{ alignSelf: 'center' }}
                  leftTitle='Logout'
                  onLeft={() => this.props.logout(this.props.userEmail)}
                  leftButtonTextStyle={{ width: 60 }}
                  rightButtonImage={require('./images/cart.png')}
                  onRight={() => Actions.customerCart()}
                  rightButtonIconStyle={{ width: 30, height: 30 }}
                />

                <Scene
                  key='customerOrders'
                  component={CustomerOrders}
                  title='My Orders'
                  titleStyle={{ alignSelf: 'center' }}
                  leftTitle='Logout'
                  onLeft={() => this.props.logout(this.props.userEmail)}
                  leftButtonTextStyle={{ width: 60 }}
                  rightButtonImage={require('./images/cart.png')}
                  onRight={() => Actions.customerCart()}
                  rightButtonIconStyle={{ width: 30, height: 30 }}
                />

              </Scene>

              <Scene
                key='customerCart'
                component={CustomerCart}
                title='Cart'
                titleStyle={{ alignSelf: 'center', paddingRight: 70 }}
              />
            </Scene>

            <Scene key='provider'>
              <Scene
                key='providerTabbar'
                tabs
                tabBarStyle={{ backgroundColor: '#FFF', height: 44 }}
                tabBarPosition='bottom'
                activeBackgroundColor='#007aff'
                activeTintColor='#fff'
                labelStyle={{ fontSize: 18 }}
                hideNavBar
              >

                  <Scene
                    key='providerOrders'
                    component={ProviderOrders}
                    title='Received Orders'
                    titleStyle={{ alignSelf: 'center', paddingRight: 45 }}
                    leftTitle='Logout'
                    onLeft={() => this.props.logout(this.props.userEmail)}
                    leftButtonTextStyle={{ width: 60 }}
                  />

                  <Scene
                    key='providerHome'
                    component={ProviderHome}
                    title='Home'
                    titleStyle={{ alignSelf: 'center', paddingRight: 60 }}
                    leftTitle='Logout'
                    onLeft={() => this.props.logout(this.props.userEmail)}
                    leftButtonTextStyle={{ width: 60 }}
                  />

                  <Scene
                    key='addProduct'
                    component={AddProduct}
                    title='Add Product'
                    titleStyle={{ alignSelf: 'center', paddingRight: 45 }}
                    leftTitle='Logout'
                    onLeft={() => this.props.logout(this.props.userEmail)}
                    leftButtonTextStyle={{ width: 60 }}
                  />

                </Scene>

                <Scene key='removeP' component={RemoveProductPopup} hideNavBar hideTabBar />

                <Scene
                  key='editProduct'
                  component={EditProduct}
                  title='Edit Product'
                  titleStyle={{ alignSelf: 'center', paddingRight: 50 }}
                />

            </Scene>

            </Stack>
          </Router>
        );
      }
    }

    const mapStateToProps = ({ auth }) => {
      const { userEmail } = auth;
      return { userEmail };
    };

    export default connect(mapStateToProps, { logout })(RouterComponent);

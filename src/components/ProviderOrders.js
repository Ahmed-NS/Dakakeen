import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { getProviderOrders, acceptOrder, denyOrder, outOfStock } from '../actions';

class ProviderOrders extends Component {
  componentWillMount() {
    if (this.props.user !== null && this.props.userType === 'P') {
      const { uid } = this.props.user;
      this.props.getProviderOrders({ uid });
    }
  }

  clearFB() {
    if (this.props.providerOrdersFB !== '') {
      if (this.props.user !== null && this.props.userType === 'P') {
        const { uid } = this.props.user;
        setTimeout(() => {
          this.props.getProviderOrders({ uid });
        }, 1000);
      }
    }
  }

  confirmOrder(con, oid, cid) {
    switch (con) {
      case 1:
        this.props.acceptOrder({ oid, cid }); break;
      case 2:
        this.props.denyOrder({ oid, cid }); break;
      case 3:
        this.props.outOfStock({ oid, cid }); break;
      default:
    }
  }

  renderConfirmation(status, oid, cid) {
    if (this.props.user !== null && this.props.userType === 'P') {
      if (status === 'Waiting for response') {
        return (
          <CardSection style={styles.confirmationCardSectionStyle}>
            <Button
              styleB={styles.acceptButton}
              styleT={styles.acceptButtonText}
              onPress={() => this.confirmOrder(1, oid, cid)}
            >Accept</Button>
              <Button
                styleB={styles.denyButton}
                styleT={styles.denyButtonText}
                onPress={() => this.confirmOrder(2, oid, cid)}
              >Deny</Button>
              <Button
                styleB={styles.oOSButton}
                styleT={styles.oOSButtonText}
                onPress={() => this.confirmOrder(3, oid, cid)}
              >Out of stock</Button>
              </CardSection>
            );
          }
        }
      }

      renderFB() {
        if (this.props.providerOrdersFB !== '') {
          if (this.props.providerOrdersFB === 'Order is accepted') {
            return (
              <View style={styles.acceptFBContainer}>
                <Text style={styles.acceptFBTextStyle}>{this.props.providerOrdersFB}</Text>
              </View>
            );
          }
          if (this.props.providerOrdersFB === 'Order is denied') {
            return (
              <View style={styles.denyFBContainer}>
                <Text style={styles.denyFBTextStyle}>{this.props.providerOrdersFB}</Text>
              </View>
            );
          }
          return (
            <View style={styles.oOSFBContainer}>
              <Text style={styles.oOSFBTextStyle}>{this.props.providerOrdersFB}</Text>
            </View>
          );
        }
      }

      render() {
        return (
          <View style={{ flex: 1 }}>
            <ScrollView>
              {this.renderFB()}
              {
                this.props.providerOrders.map((value, i) => {
                  return (
                    <Card key={i} style={value.status === 'Waiting for response' ? styles.cardStyle : (value.status === 'Accepted' ? styles.aCardStyle : (value.status === 'Denied' ? styles.dCardStyle : styles.oCardStyle))}>
                      <CardSection style={styles.topCardSectionStyle}>
                        <Text style={styles.statusTextStyle}>{value.status}</Text>
                        <Text style={styles.dateTextStyle}>{value.date}</Text>
                        <Text style={styles.headerTextStyle}>Customer Name: {value.customerName}</Text>
                        <Text style={styles.headerTextStyle}>Customer Address: {value.customerAddress}</Text>
                      </CardSection>
                      {
                        value.products.map((value2, j) => {
                          return (
                            <CardSection key={j} style={styles.bottomCardSectionStyle}>
                              <Text style={styles.textStyle}>Product: {value2.productName}</Text>
                              <Text style={styles.qtyTextStyle}>Quantity: {value2.qty}</Text>
                            </CardSection>
                          );
                        })
                      }
                      <CardSection style={styles.bottomCardSectionStyle}>
                        <Text style={styles.textStyle}>Total Price: {value.totalPrice} SAR</Text>
                      </CardSection>
                      {this.renderConfirmation(value.status, value.orderId, value.customerId)}
                    </Card>
                  );
                })
              }
              {this.clearFB()}
            </ScrollView>
          </View>
        );
      }
    }

    const styles = {
      cardStyle: {
        flexDirection: 'column',
        borderColor: '#000',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: '#fff'
      },
      aCardStyle: {
        flexDirection: 'column',
        borderColor: '#000',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: '#A3ffC5'
      },
      dCardStyle: {
        flexDirection: 'column',
        borderColor: '#000',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: '#ffA4A4'
      },
      oCardStyle: {
        flexDirection: 'column',
        borderColor: '#000',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: '#fea'
      },
      topCardSectionStyle: {
        flexDirection: 'column',
        borderColor: '#000',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: 'rgba(0,0,0,0)'
      },
      bottomCardSectionStyle: {
        flexDirection: 'row',
        borderColor: '#000',
        borderTopWidth: 0.5,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: 'rgba(0,0,0,0)'
      },
      confirmationCardSectionStyle: {
        flexDirection: 'row',
        borderColor: '#000',
        borderTopWidth: 0.5,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: '#fff'
      },
      textContainer: {
        marginRight: 10,
        paddingTop: 5,
        paddingBottom: 5
      },
      textStyle: {
        fontSize: 14,
        color: '#000',
        flex: 3
      },
      qtyTextStyle: {
        fontSize: 14,
        color: '#000',
        flex: 1
      },
      headerTextStyle: {
        fontSize: 14,
        color: '#000'
      },
      dateTextStyle: {
        fontSize: 14,
        color: '#555',
        alignSelf: 'center'
      },
      statusTextStyle: {
        fontSize: 16,
        color: '#000',
        alignSelf: 'center'
      },
      acceptButton: {
        backgroundColor: '#2ecc71',
        borderColor: '#000'
      },
      acceptButtonText: {
        color: '#fff'
      },
      denyButton: {
        backgroundColor: '#e74c3c',
        borderColor: '#000'
      },
      denyButtonText: {
        color: '#fff'
      },
      oOSButton: {
        backgroundColor: '#fb5',
        borderColor: '#000'
      },
      oOSButtonText: {
        color: '#fff'
      },
      acceptFBContainer: {
        backgroundColor: 'rgba(0,255,0,0.2)',
        width: '90%',
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 2
      },
      acceptFBTextStyle: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'green',
        padding: 5
      },
      denyFBContainer: {
        backgroundColor: 'rgba(255,0,0,0.2)',
        width: '90%',
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 2
      },
      denyFBTextStyle: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'red',
        padding: 5
      },
      oOSFBContainer: {
        backgroundColor: 'rgba(255,240,0,0.2)',
        width: '90%',
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 2
      },
      oOSFBTextStyle: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'orange',
        padding: 5
      }
    };

    const mapStateToProps = ({ auth, order }) => {
      const { user, userType } = auth;
      const { providerOrders, providerOrdersFB } = order;
      return { user, providerOrders, userType, providerOrdersFB };
    };

    export default connect(mapStateToProps, { getProviderOrders, acceptOrder, denyOrder, outOfStock })(ProviderOrders);

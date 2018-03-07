import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from './common';
import { getCustomerOrders, updateRate, rate } from '../actions';

class CustomerOrders extends Component {

  componentWillReceiveProps(nextProps) {
    const { createOrderFB, rateFB } = this.props;
    if ((nextProps.createOrderFB !== createOrderFB) || (nextProps.rateFB !== rateFB)) {
      setTimeout(() => {
        this.props.getCustomerOrders({ uid: this.props.user.uid });
      }, 1100);
    }
  }

  renderRate(flag, oid, pid, isRated, rate) {
    if (flag) {
      const rating = this.props.ratings[oid];
      console.log('CustomerOrder comp. rating = ' + rating);
      console.log('CustomerOrder comp. ratings = ' + this.props.ratings);
      return (
        <CardSection style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 3, flexDirection: 'row' }}>

            <TouchableOpacity onPress={() => { this.props.updateRate({ oid, rating: 1, ratings: this.props.ratings }); this.forceUpdate(); }}>
            <Image
              source={rating > 0 ? require('../images/star_1.png') : require('../images/star_0.png')}
              style={{ width: 35, height: 35, marginRight: 4 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.props.updateRate({ oid, rating: 2, ratings: this.props.ratings }); this.forceUpdate(); }}>
            <Image
              source={rating > 1 ? require('../images/star_1.png') : require('../images/star_0.png')}
              style={{ width: 35, height: 35, marginRight: 4 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.props.updateRate({ oid, rating: 3, ratings: this.props.ratings }); this.forceUpdate(); }}>
            <Image
              source={rating > 2 ? require('../images/star_1.png') : require('../images/star_0.png')}
              style={{ width: 35, height: 35, marginRight: 4 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.props.updateRate({ oid, rating: 4, ratings: this.props.ratings }); this.forceUpdate(); }}>
            <Image
              source={rating > 3 ? require('../images/star_1.png') : require('../images/star_0.png')}
              style={{ width: 35, height: 35, marginRight: 4 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.props.updateRate({ oid, rating: 5, ratings: this.props.ratings }); this.forceUpdate(); }}>
            <Image
              source={rating > 4 ? require('../images/star_1.png') : require('../images/star_0.png')}
              style={{ width: 35, height: 35, marginRight: 4 }}
            />
          </TouchableOpacity>

          </View>
          <Button style={{ flex: 2 }} onPress={() => { this.props.rate({ uid: this.props.user.uid, oid, pid, rating }); }}>Rate</Button>
        </CardSection>
      );
    }
    if (isRated && rate > 0) {
      return (
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>

          <Image
            source={rate > 0 ? require('../images/star_1.png') : require('../images/star_0.png')}
            style={{ width: 20, height: 20, marginRight: 2 }}
          />
          <Image
            source={rate > 1 ? require('../images/star_1.png') : require('../images/star_0.png')}
            style={{ width: 20, height: 20, marginRight: 2 }}
          />
          <Image
            source={rate > 2 ? require('../images/star_1.png') : require('../images/star_0.png')}
            style={{ width: 20, height: 20, marginRight: 2 }}
          />
          <Image
            source={rate > 3 ? require('../images/star_1.png') : require('../images/star_0.png')}
            style={{ width: 20, height: 20, marginRight: 2 }}
          />
          <Image
            source={rate > 4 ? require('../images/star_1.png') : require('../images/star_0.png')}
            style={{ width: 20, height: 20, marginRight: 2 }}
          />
        </View>
      );
    }
  }

  renderOrders() {
    if (this.props.user !== null && this.props.userType === 'C') {
      if (this.props.customerOrders[0] != null) {
        return (
          this.props.customerOrders.map((value, i) => {
            return (
              <Card key={i} style={value[0].status === 'Waiting for response' ? styles.cardStyle : (value[0].status === 'Accepted' ? styles.aCardStyle : (value[0].status === 'Denied' ? styles.dCardStyle : styles.oCardStyle))}>
                <CardSection style={styles.topCardSectionStyle}>
                  <Text style={styles.headerTextStyle}>{typeof value[0].status !== 'undefined' ? value[0].status : 'No Status available'}</Text>
                  <Text style={styles.dateTextStyle}>{typeof value[0].date !== 'undefined' ? value[0].date : 'No time available'}</Text>
                </CardSection>
                {
                  value.map((value2, j) => {
                    return (
                      <CardSection key={j} style={styles.bottomCardSectionStyle}>
                        <Text style={styles.textStyle}>Product: {value2.productName}</Text>
                        <Text style={styles.priceTextStyle}>Price: {value2.poductPrice} SAR</Text>
                        <Text style={styles.qtyTextStyle}>Quantity: {value2.qty}</Text>
                      </CardSection>
                    );
                  })
                }
                <CardSection style={styles.bottomCardSectionStyle}>
                  <View style={{ flex: 3, flexDirection: 'row' }}>
                    <Text style={styles.totlaPriceTextStyle}>Total Price: {value[0].totalPrice} SAR </Text>
                  </View>
                  {this.renderRate(false, 0, 0, true, value[0].rate)}
                </CardSection>
                {this.renderRate(value[0].status === 'Accepted' && value[0].rate === 0, value[0].oid, value[0].pid, false, 0)}
              </Card>
            );
          })
        );
      }

      this.props.getCustomerOrders({ uid: this.props.user.uid });
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Spinner />
          <Text style={{ alignSelf: 'center' }}>Getting Orders</Text>
        </View>
      );
    }
  }

  renderFB() {
    if (this.props.rateFB !== '') {
      return (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedback}>{this.props.rateFB}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <ScrollView>
        {this.renderFB()}
        {this.renderOrders()}
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
  textContainer: {
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  textStyle: {
    fontSize: 14,
    color: '#000',
    flex: 10
  },
  qtyTextStyle: {
    fontSize: 14,
    color: '#000',
    flex: 4
  },
  priceTextStyle: {
    fontSize: 14,
    color: '#000',
    flex: 6
  },
  headerTextStyle: {
    fontSize: 16,
    color: '#000',
    alignSelf: 'center'
  },
  dateTextStyle: {
    fontSize: 14,
    color: '#555',
    alignSelf: 'center'
  },
  totlaPriceTextStyle: {
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
  }
};

const mapStateToProps = ({ auth, order }) => {
  const { user, userType } = auth;
  const { customerOrders, ratings, createOrderFB, rateFB } = order;
  return { user, userType, customerOrders, ratings, createOrderFB, rateFB };
};

export default connect(mapStateToProps, { getCustomerOrders, updateRate, rate })(CustomerOrders);

import React, { Component } from 'react';

import myConfig from '../../config/Config';
import { callGetApi } from '../../util/rest';
import myConfig from '../config/Config';

export default class AddClaim extends Component {
  const state = {
      loading: true,
      error: false,
    };
  }

  async updateSiebel() {
    var url = myConfig.siebelUrl + '/claims/addClaim/' + myConfig.customer;
    try {
      const claimDetails = await callPostApi(url);
      this.setState({claimDetails: claimDetails,loading: false, error: false,});
    }
    catch (e) {
        this.setState({
        loading: false,
        error: true,
      });
    }
  }

  render() {
    const { loading, claimDetails, error } = this.state;
    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}
        {!loading &&
          !error && (
            <FlatList
              data={contactsSorted}
              keyExtractor={keyExtractor}
              renderItem={this.renderClaim}
            />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
});

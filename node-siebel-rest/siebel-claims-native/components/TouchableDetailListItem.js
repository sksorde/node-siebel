import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import colors from '../utils/colors';

export default function TouchableDetailListItem({ icon, title, subtitle, rightIcon=false, onPress }) {
  return (
    <TouchableHighlight
      underlayColor={colors.grey}
      style={styles.touchContainer}
      onPress={onPress}
    >
    <View style={[styles.wrapper]}>
          {icon && (
            <Icon
              name={icon}
              size={24}
              style={{
                color: colors.black,
                marginLeft: 20,
              }}
            />
          )}
          <View style={styles.contentContainer}>
            <Text style={[styles.title]}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
            {rightIcon && (<Icon
              name={rightIcon}
              size={24}
              style={{
                color: colors.black,
              }}
              />
            )}
    </View>
  </TouchableHighlight>
  );
}

TouchableDetailListItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  rightIcon: PropTypes.string,
};

TouchableDetailListItem.defaultProps = {
  icon: null,
  subtitle: null,
};

const styles = StyleSheet.create({
  touchContainer: {
    paddingLeft: 24,
  },
  wrapper: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    marginLeft: 6,
    flex: 1,
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: colors.blue,
    fontSize: 15,
    marginTop: 4,
  },
});

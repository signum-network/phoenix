import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../../../core/components/base/Text';
import { Colors } from '../../../../core/theme/colors';
import { FontSizes } from '../../../../core/theme/sizes';
import { RecipientType, RecipientValidationStatus } from '../../store/utils';

interface Props {
  status: RecipientValidationStatus;
  type: RecipientType;
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 5,
    marginLeft: 5
  },
  unknown: {
    backgroundColor: Colors.GREY
  },
  invalid: {
    backgroundColor: Colors.ORANGE
  },
  valid: {
    backgroundColor: Colors.GREEN
  }
});

export class AccountStatusPill extends React.PureComponent<Props> {

  getRecipientTypeName = (): string => RecipientType[this.props.type];

  getValidationHint (): string {
    // TODO: localization
    switch (this.props.status) {
      case RecipientValidationStatus.UNKNOWN:
        return 'The address was not validated yet';
      case RecipientValidationStatus.VALID:
        return 'Address was successfully verified';
      case RecipientValidationStatus.INVALID:
        return 'This address does not seem valid. Verify if it really exists!';
    }
  }

  getValidationIcon (): string {
    switch (this.props.status) {
      case RecipientValidationStatus.UNKNOWN:
        return 'help_outline';
      case RecipientValidationStatus.VALID:
        return 'check_circle';
      case RecipientValidationStatus.INVALID:
        return 'error_outline';
    }
  }

  getBackgroundColor = () => {
    switch (this.props.status) {
      case RecipientValidationStatus.UNKNOWN:
        return styles.unknown;
        break;
      case RecipientValidationStatus.VALID:
        return styles.valid;
        break;
      case RecipientValidationStatus.INVALID:
        return styles.invalid;
        break;
    }
  }

  render () {
    return (
      <View style={[styles.wrapper, this.getBackgroundColor()]}>
        <Text size={FontSizes.SMALL}>{this.getRecipientTypeName()}</Text>
      </View>
    );
  }
}

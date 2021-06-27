import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../../../core/components/base/Text';
import { i18n } from '../../../../core/i18n';
import { Colors } from '../../../../core/theme/colors';
import { FontSizes } from '../../../../core/theme/sizes';
import { RecipientType, RecipientValidationStatus } from '../../store/utils';
import { transactions } from '../../translations';

interface Props {
  status: RecipientValidationStatus;
  type: RecipientType;
  address: string;
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
  },
  outage: {
    backgroundColor: Colors.RED
  }
});

interface State {
  expanded: boolean;
}

export class AccountStatusPill extends React.PureComponent<Props, State> {

  state = {
    expanded: false
  };

  getLabelText (): string {
    return this.state.expanded ? this.getExpandedText() : this.getShortText();
  }

  getExpandedText (): string {
    switch (this.props.status) {
      case RecipientValidationStatus.UNKNOWN:
        return i18n.t(transactions.screens.send.invalidAddress);
      case RecipientValidationStatus.VALID:
        return this.props.address;
      case RecipientValidationStatus.INVALID:
        return i18n.t(transactions.screens.send.noPublicKey);
      case RecipientValidationStatus.ZIL_OUTAGE:
        return i18n.t(transactions.screens.send.zilOutage);
      default:
        return '';
    }
  }

  getShortText = (): string => RecipientType[this.props.type];

  getValidationIcon (): string {
    switch (this.props.status) {
      case RecipientValidationStatus.UNKNOWN:
        return 'help_outline';
      case RecipientValidationStatus.VALID:
        return 'check_circle';
      case RecipientValidationStatus.INVALID:
      case RecipientValidationStatus.ZIL_OUTAGE:
        return 'error_outline';
      default:
        return '';
    }
  }

  getBackgroundColor = () => {
    switch (this.props.status) {
      case RecipientValidationStatus.UNKNOWN:
        return styles.unknown;
      case RecipientValidationStatus.VALID:
        return styles.valid;
      case RecipientValidationStatus.INVALID:
        return styles.invalid;
      case RecipientValidationStatus.ZIL_OUTAGE:
        return styles.outage;
    }
  }

  getTextColor = () => {
    switch (this.props.status) {
      case RecipientValidationStatus.ZIL_OUTAGE:
        return Colors.WHITE;
      default:
        return Colors.BLACK;
    }
  }

  handleTap = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render () {
    return (
      <TouchableOpacity onPress={this.handleTap} style={[styles.wrapper, this.getBackgroundColor()]}>
          <Text size={FontSizes.SMALLER} color={this.getTextColor()}>{this.getLabelText()}</Text>
      </TouchableOpacity>
    );
  }
}

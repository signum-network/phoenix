import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../../../../core/components/base/Text';
import {i18n} from '../../../../core/i18n';
import {Colors} from '../../../../core/theme/colors';
import {FontSizes} from '../../../../core/theme/sizes';
import {RecipientType, RecipientValidationStatus} from '../../store/utils';
import {transactions} from '../../translations';

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
    marginLeft: 5,
  },
  unknown: {
    backgroundColor: Colors.GREY,
  },
  invalid: {
    backgroundColor: Colors.ORANGE,
  },
  valid: {
    backgroundColor: Colors.GREEN,
  },
  outage: {
    backgroundColor: Colors.RED,
  },
});

export const AccountStatusPill: React.FC<Props> = ({status, type, address}) => {
  const timeoutRef = useRef<number>();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
    timeoutRef.current = setTimeout(() => {
      setExpanded(status === RecipientValidationStatus.VALID && true);
    }, 1000);

    return () => {
      clearTimeout(timeoutRef.current || 0);
    };
  }, [status]);

  const getLabelText = (): string =>
    expanded ? getExpandedText() : getShortText();

  const getExpandedText = (): string => {
    switch (status) {
      case RecipientValidationStatus.UNKNOWN:
        return i18n.t(transactions.screens.send.invalidAddress);
      case RecipientValidationStatus.VALID:
        return address;
      case RecipientValidationStatus.INVALID:
        return i18n.t(transactions.screens.send.noPublicKey);
      case RecipientValidationStatus.ZIL_OUTAGE:
        return i18n.t(transactions.screens.send.zilOutage);
      default:
        return '';
    }
  };

  const getShortText = (): string => RecipientType[type];

  const getBackgroundColor = () => {
    switch (status) {
      case RecipientValidationStatus.UNKNOWN:
        return styles.unknown;
      case RecipientValidationStatus.VALID:
        return styles.valid;
      case RecipientValidationStatus.INVALID:
        return styles.invalid;
      case RecipientValidationStatus.ZIL_OUTAGE:
        return styles.outage;
    }
  };

  const getTextColor = () => {
    switch (status) {
      case RecipientValidationStatus.ZIL_OUTAGE:
        return Colors.WHITE;
      default:
        return Colors.BLACK;
    }
  };

  const handleTap = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity
      onPress={handleTap}
      style={[styles.wrapper, getBackgroundColor()]}>
      <Text size={FontSizes.SMALLER} color={getTextColor()}>
        {getLabelText()}
      </Text>
    </TouchableOpacity>
  );
};

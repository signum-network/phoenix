import { Account } from "@signumjs/core";
import { Amount } from "@signumjs/util";
import { toNumber } from "lodash";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Swipeout from "react-native-swipeout";
import { accountIcons, actionIcons } from "../../../assets/icons";
import { Text, TextAlign } from "../../../core/components/base/Text";
import { i18n } from "../../../core/i18n";
import { AccountColors, Colors } from "../../../core/theme/colors";
import { defaultSideOffset, FontSizes, Sizes } from "../../../core/theme/sizes";
import { core } from "../../../core/translations";
import { amountToString } from "../../../core/utils/numbers";
import { PriceInfoReduxState, PriceType } from "../../price-api/store/reducer";
import { shortenRSAddress } from "../../../core/utils/account";
import { AmountText } from "../../../core/components/base/Amount";

interface IProps {
  onPress: (account: Account) => void;
  onDelete: (account: Account) => void;
  account: Account;
  priceApi?: PriceInfoReduxState;
  accountIndex: number;
}

type Props = IProps;

const styles: any = {
  view: {
    paddingHorizontal: defaultSideOffset,
    paddingVertical: Sizes.MEDIUM,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  accountCol: {
    display: "flex",
    flex: 1,
    maxWidth: "40%",
  },
  amountCol: {
    display: "flex",
    flex: 1,
  },
  alignRight: {
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
  },
  row: {
    display: "flex",
    width: "100%",
  },
  del: {
    alignSelf: "center",
    marginBottom: "auto",
    marginTop: "auto",
  },
  accountIcon: {
    height: 16,
    width: 16,
    marginRight: 4,
  },
};

export class AccountListItem extends React.PureComponent<Props> {
  handlePress = () => {
    const { onPress, account } = this.props;
    onPress(account);
  };

  handleDelete = () => {
    const { onDelete, account } = this.props;
    onDelete(account);
  };

  getSwipeButtons = () => [
    {
      component: <Image source={actionIcons.del} style={styles.del} />,
      backgroundColor: Colors.RED,
      underlayColor: Colors.GREY,
      style: styles.buttonStyles,
      onPress: this.handleDelete,
    },
  ];

  render() {
    const {
      type,
      accountRS = "",
      balanceNQT = '0',
      name = "",
    } = this.props.account;
    const { priceApi, accountIndex } = this.props;

    const address = shortenRSAddress(accountRS);
    const balanceAmount = Amount.fromPlanck(balanceNQT);
    const balance = toNumber(balanceAmount.getSigna());

    const balanceBTC =
      priceApi && priceApi.priceInfo
        ? toNumber(priceApi.priceInfo.price_btc) * balance
        : 0;
    const balanceUSD =
      priceApi && priceApi.priceInfo
        ? toNumber(priceApi.priceInfo.price_usd) * balance
        : 0;

    return (
      <Swipeout
        right={this.getSwipeButtons()}
        autoClose={true}
        backgroundColor="transparent"
      >
        <TouchableOpacity style={styles.view} onPress={this.handlePress}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              backgroundColor: AccountColors[accountIndex],
              width: "5%",
              minHeight: 50,
              marginTop: -10,
              marginRight: 10,
              marginBottom: -10,
              marginLeft: -10,
            }}
          />
          <View style={styles.accountCol}>
            <View style={styles.row}>
              <Text bold bebasFont color={Colors.WHITE}>
                {address}
              </Text>
            </View>
            <View
              style={[
                styles.row,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              {type !== "offline" && (
                <Image
                  source={accountIcons.active}
                  style={styles.accountIcon}
                />
              )}
              {
                <Text color={Colors.WHITE} size={FontSizes.SMALLER}>
                  {name || " "}
                </Text>
              }
            </View>
          </View>
          <View style={[styles.amountCol, styles.alignRight]}>
            <View style={[styles.row]}>
              <View style={{ position: "absolute", right: 0 }}>
                <AmountText
                  amount={balanceAmount}
                  color={Colors.WHITE}
                  size={FontSizes.SMALL}
                />
              </View>
            </View>
            {priceApi && priceApi.priceInfo && (
              <View style={styles.row}>
                <Text
                  size={FontSizes.SMALLER}
                  textAlign={TextAlign.RIGHT}
                  color={Colors.WHITE}
                >
                  {priceApi.selectedCurrency === PriceType.USD
                    ? i18n.t(core.currency.USD.value, {
                        value: balanceUSD.toFixed(2),
                      })
                    : i18n.t(core.currency.BTC.value, {
                        value: amountToString(balanceBTC),
                      })}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

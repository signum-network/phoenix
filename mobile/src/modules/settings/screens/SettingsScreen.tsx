import { translations } from "i18n-js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Image } from "react-native";
import VersionNumber from "react-native-version-number";
import { NavigationInjectedProps } from "react-navigation";
import { BSelect, SelectItem } from "../../../core/components/base/BSelect";
import { Button, ButtonThemes } from "../../../core/components/base/Button";
import { BCheckbox } from "../../../core/components/base/BCheckbox";
import { Text } from "../../../core/components/base/Text";
import { HeaderTitle } from "../../../core/components/header/HeaderTitle";
import { i18n } from "../../../core/i18n";
import { InjectedReduxProps } from "../../../core/interfaces";
import { FullHeightView } from "../../../core/layout/FullHeightView";
import { Screen } from "../../../core/layout/Screen";
import { routes } from "../../../core/navigation/routes";
import { AppReduxState } from "../../../core/store/app/reducer";
import { Colors } from "../../../core/theme/colors";
import { FontSizes, Sizes } from "../../../core/theme/sizes";
import { resetAuthState } from "../../auth/store/actions";
import { AuthReduxState } from "../../auth/store/reducer";
import { settings } from "../translations";
import { autoSelectNode, setNode } from "../../../core/store/app/actions";
import { defaultSettings } from "../../../core/environment";
import { useNavigation } from "@react-navigation/native";
import {
  selectCurrentNode,
  selectIsAutomaticNodeSelection,
} from "../../../core/store/app/selectors";
import { SwitchItem } from "../../../core/components/base/SwitchItem";
import { logos } from "../../../assets/icons";
import { ResetModal } from "../../../core/components/modals/ResetModal";

interface IProps extends InjectedReduxProps {
  auth: AuthReduxState;
  app: AppReduxState;
}

type Props = IProps & NavigationInjectedProps;

const styles = StyleSheet.create({
  container: {
    height: "90%",
    display: "flex",
    justifyContent: "center",
  },
  settingsZone: {
    flex: 4,
  },
  hintView: {
    paddingTop: Sizes.SMALL,
    flexGrow: 1,
  },
  bodyText: {
    padding: 10,
  },
  dangerZone: {
    position: "relative",
    flex: 1,
    padding: Sizes.MEDIUM,
    borderRadius: 4,
    borderColor: Colors.WHITE,
    borderStyle: "solid",
    borderWidth: 1,
  },
  dangerZoneLabel: {
    position: "absolute",
    backgroundColor: Colors.BLUE,
    top: -10,
    left: 8,
    paddingHorizontal: 2,
  },
  flexBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signumjs: {
    height: 40,
    width: 40,
    marginRight: 8,
  },
});

export const SettingsScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [erasePromptVisible, setErasePromptVisible] = useState(false);
  const [showTestnetNodes, setShowTestnetNodes] = useState(false);
  const currentNode = useSelector(selectCurrentNode);
  const isAutomatic = useSelector(selectIsAutomaticNodeSelection);

  const toggleConfirmDeletePrompt = () => {
    setErasePromptVisible(!erasePromptVisible);
  };

  const confirmErase = () => {
    dispatch(resetAuthState());
    navigation.navigate(routes.home);
    toggleConfirmDeletePrompt();
  };

  const getLocales = () => {
    return Object.keys(translations).map((locale) => {
      return {
        value: locale,
        label: locale,
      };
    });
  };

  const handleNodeSelect = (node: string) => {
    // setSelectedNode(node);
    if (node !== currentNode) {
      dispatch(setNode(node));
    }
  };

  const setNodeAutoSelection = (automatic: boolean) => {
    dispatch(autoSelectNode(automatic));
  };

  const getNodeList = () =>{
    const nodeHosts: String[] = defaultSettings.reliableNodeHosts.concat(showTestnetNodes ? defaultSettings.testnetNodeHosts: [])
    return nodeHosts.map((n) => ({
      label: n,
      value: n,
    } as SelectItem<string>));
  }
  return (
    <Screen>
      <FullHeightView>
        <HeaderTitle>{i18n.t(settings.screens.settings.title)}</HeaderTitle>
        <View style={styles.container}>
          <View style={styles.settingsZone}>
            <BSelect
              value={currentNode}
              items={getNodeList()}
              onChange={handleNodeSelect}
              title={i18n.t(settings.screens.settings.selectNode)}
              placeholder={i18n.t(settings.screens.settings.selectNode)}
              disabled={isAutomatic}
            />

            <View>
              <SwitchItem
                onChange={setNodeAutoSelection}
                text={i18n.t(settings.screens.settings.autoNodeSelection)}
                labelColor={Colors.WHITE}
                value={isAutomatic}
              />
            </View>

            <BCheckbox
              label={i18n.t(settings.screens.settings.showTestnetNodes)}
              value={showTestnetNodes}
              onCheck={(checked) => setShowTestnetNodes(checked)}
            />

          </View>
          <View style={styles.dangerZone}>
            <View style={styles.dangerZoneLabel}>
              <Text color={Colors.WHITE} size={FontSizes.SMALLER}>
                Danger Zone
              </Text>
            </View>
            <Button
              theme={ButtonThemes.DANGER}
              onPress={toggleConfirmDeletePrompt}
            >
              {i18n.t(settings.screens.settings.erase)}
            </Button>
          </View>

          <View style={[styles.flexBottom, styles.bodyText]}>
            <View>
              <Image source={logos.signumjs} style={styles.signumjs} />
            </View>
            <View>
              <Text color={Colors.WHITE} size={FontSizes.SMALLER}>
                Phoenix Signum Wallet {VersionNumber.appVersion} (
                {VersionNumber.buildVersion})
              </Text>
              <Text color={Colors.WHITE} size={FontSizes.SMALLER}>
                {i18n.t(settings.screens.settings.copyright)}
              </Text>
              <Text color={Colors.WHITE} size={FontSizes.SMALLER}>
                {i18n.t(settings.screens.settings.credits)}
              </Text>
            </View>
          </View>
          <ResetModal
            visible={erasePromptVisible}
            onConfirm={confirmErase}
            onCancel={toggleConfirmDeletePrompt}
          />
        </View>
      </FullHeightView>
    </Screen>
  );
};

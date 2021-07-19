package com.signum.phoenix;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import org.reactnative.camera.RNCameraPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.horcrux.svg.SvgPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.reactcommunity.rnlocalize.RNLocalizePackage;
import com.oblador.keychain.KeychainPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNPermissionsPackage(),
          new RNVersionNumberPackage(),
          new AsyncStoragePackage(),
          new RNCameraPackage(),
          new ReactSliderPackage(),
          new SvgPackage(),
          new FingerprintAuthPackage(),
          new RNLocalizePackage(),
          new KeychainPackage(),
          new RNGestureHandlerPackage(),
          new SafeAreaContextPackage()
          // new ReactNativePushNotificationPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}

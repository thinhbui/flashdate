package com.rabiloo.flashday;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
//fb
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage; 

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new LinearGradientPackage(),
            new MapsPackage(),
            new FBSDKPackage(mCallbackManager),
            new VectorIconsPackage(),
            new ReactNativePushNotificationPackage() 
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
     FacebookSdk.sdkInitialize(getApplicationContext());
  // If you want to use AppEventsLogger to log events.
    AppEventsLogger.activateApp(this);
   // SoLoader.init(this, /* native exopackage */ false);
  }
  
}

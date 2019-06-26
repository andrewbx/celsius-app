package com.celsius.generated;

import java.util.Arrays;
import java.util.List;
import org.unimodules.core.interfaces.Package;

public class BasePackageList {
  public List<Package> getPackageList() {
    return Arrays.<Package>asList(
        new expo.modules.analytics.segment.SegmentPackage(),
        new expo.modules.barcodescanner.BarCodeScannerPackage(),
        new expo.modules.camera.CameraPackage(),
        new expo.modules.constants.ConstantsPackage(),
        new expo.modules.contacts.ContactsPackage(),
        new expo.modules.filesystem.FileSystemPackage(),
        new expo.modules.font.FontLoaderPackage(),
        new expo.modules.google.signin.GoogleSignInPackage(),
        new expo.modules.imagemanipulator.ImageManipulatorPackage(),
        new expo.modules.imagepicker.ImagePickerPackage(),
        new expo.modules.permissions.PermissionsPackage(),
        new expo.modules.securestore.SecureStorePackage()
    );
  }
}

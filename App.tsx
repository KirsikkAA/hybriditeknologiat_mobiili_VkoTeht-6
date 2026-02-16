import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { useEffect, useState } from "react";
import {CameraView, CameraType, useCameraPermissions, BarcodeScanningResult} from "expo-camera";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState("");

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function handleBarcodeScanned(result: BarcodeScanningResult) {
    setScanned(true);
    setBarcode(result.data);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8"],
        }}
      />

      <View style={styles.barcode}>
        <Text>Barcode: {barcode}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  barcode: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(130, 234, 255, 0.7)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

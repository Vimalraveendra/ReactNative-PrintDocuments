import React from 'react';

import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

class App extends React.Component {
  state = {
    selectedPrinter: null,
  };

  forIosOnly = () => (
    <View style={styles.ios}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Choose Printer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Silent Printing</Text>
      </TouchableOpacity>
    </View>
  );

  // @NOTE iOS Only
  selectPrinter = async () => {
    const selectedPrinter = await RNPrint.selectPrinter({x: 100, y: 100});
    this.setState({selectedPrinter});
  };

  // @NOTE iOS Only
  silentPrint = async () => {
    if (!this.state.selectedPrinter) {
      alert('Must Select Printer First');
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Print Documents</Text>
        <View style={styles.content}>
          {(Platform.OS = 'ios' && this.forIosOnly())}
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Print HTML</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Print PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Print Remote PDF</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    width: '100%',
    height: 70,
    padding: 20,
    textAlign: 'center',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,255,0.7)',
    borderRadius: 20,
    marginBottom: 15,
  },
  btnText: {
    fontSize: 20,
    padding: 12,
    color: '#fff',
  },
  ios: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
});

export default App;

import React from 'react';

import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

class App extends React.Component {
  state = {
    selectedPrinter: null,
  };

  forIosOnly = () => (
    <View style={styles.ios}>
      <TouchableOpacity style={styles.btn} onPress={this.selectPrinter}>
        <Text style={styles.btnText}>Choose Printer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={this.silentPrint}>
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
    } else {
      await RNPrint.print({
        printerURL: this.state.selectedPrinter.url,
        html: '<h1>Silent Print</h1>',
      });
    }
  };
  printHTML = async () => {
    await RNPrint.print({
      html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>',
    });
  };

  printPDF = async () => {
    const results = await RNHTMLtoPDF.convert({
      html: '<h1>Custom converted PDF Document</h1>',
      fileName: 'test pdf',
      base64: true,
    });

    await RNPrint.print({filePath: results.filePath});
  };

  printRemotePDF = async () => {
    await RNPrint.print({
      filePath: 'https://graduateland.com/api/v2/users/jesper/cv',
    });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Print Documents</Text>
        <View style={styles.content}>
          {(Platform.OS = 'ios' && this.forIosOnly())}
          <TouchableOpacity style={styles.btn} onPress={this.printHTML}>
            <Text style={styles.btnText}>Print HTML</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.printPDF}>
            <Text style={styles.btnText}>Print PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.printRemotePDF}>
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

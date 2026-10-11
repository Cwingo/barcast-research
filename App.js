import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [barName, setBarName] = useState('');
  const [crowd, setCrowd] = useState('Quiet');
  const [reports, setReports] = useState([]);

  function addReport() {
    setReports([...reports, { barName, crowd }]);
    setBarName('');
  }

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>BarCast Research</Text>
      <Text>Try a crowd report using a sample bar name.</Text>
      <Text>Bar name</Text>
      <TextInput
        accessibilityLabel="Bar name"
        style={styles.input}
        value={barName}
        onChangeText={setBarName}
      />
      <Text>Crowd level: {crowd}</Text>
      <View style={styles.row}>
        {['Quiet', 'Buzzing', 'Packed'].map((level) => (
          <Button key={level} title={level} onPress={() => setCrowd(level)} />
        ))}
      </View>
      <Button title="Submit report" onPress={addReport} />
      <Text style={styles.heading}>Reports ({reports.length})</Text>
      {reports.length === 0 && <Text>No reports yet.</Text>}
      {reports.map((report, index) => (
        <Text key={index}>{report.barName}: {report.crowd}</Text>
      ))}
      <Text>Reports reset when the app reloads.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 24, paddingTop: 50, gap: 12, maxWidth: 500, width: '100%', alignSelf: 'center' },
  heading: { fontSize: 22, fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 10, fontSize: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});

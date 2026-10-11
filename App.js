import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [barName, setBarName] = useState('');
  const [crowd, setCrowd] = useState('Quiet');
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  function addReport() {
    const name = barName.trim();
    if (!name) {
      setError('Enter a bar name.');
      return;
    }
    setReports([...reports, { barName: name, crowd }]);
    setError('');
    setBarName('');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.title}>BarCast</Text>
        <Text style={styles.muted}>Crowd report demo</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Bar name</Text>
        <TextInput
          accessibilityLabel="Bar name"
          style={styles.input}
          placeholder="e.g. Sample Bar"
          placeholderTextColor="#777"
          maxLength={60}
          value={barName}
          onChangeText={(text) => { setBarName(text); setError(''); }}
        />
        <Text style={styles.label}>Crowd level</Text>
        <View style={styles.row}>
          {['Quiet', 'Buzzing', 'Packed'].map((level) => (
            <Pressable
              key={level}
              accessibilityRole="button"
              accessibilityState={{ selected: crowd === level }}
              style={[styles.option, crowd === level && styles.selected]}
              onPress={() => setCrowd(level)}
            >
              <Text style={crowd === level ? styles.buttonText : styles.label}>{level}</Text>
            </Pressable>
          ))}
        </View>
        {error !== '' && <Text style={styles.error} accessibilityRole="alert">{error}</Text>}
        <Pressable accessibilityRole="button" style={styles.submit} onPress={addReport}>
          <Text style={styles.buttonText}>Submit report</Text>
        </Pressable>
      </View>
      <Text style={styles.heading}>Reports ({reports.length})</Text>
      <View>
        <View style={styles.reportRow}>
          <Text style={[styles.barName, styles.label]}>Bar</Text>
          <Text style={[styles.crowd, styles.label]}>Crowd</Text>
        </View>
        {reports.length === 0 && <Text style={styles.empty}>No reports yet.</Text>}
        {reports.map((report, index) => (
          <View key={index} style={styles.reportRow}>
            <Text style={styles.barName}>{report.barName}</Text>
            <Text style={styles.crowd}>{report.crowd}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.muted}>Reports reset when the app reloads.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: 'white' },
  page: { padding: 24, paddingTop: 40, gap: 12, maxWidth: 600, width: '100%', alignSelf: 'center' },
  header: { gap: 4, borderBottomWidth: 3, borderBottomColor: '#73000a', paddingBottom: 16, marginBottom: 12 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#73000a' },
  heading: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  muted: { color: '#666', lineHeight: 21 },
  form: { gap: 12 },
  label: { fontWeight: '600', color: '#222' },
  input: { borderWidth: 1, borderColor: '#aaa', borderRadius: 3, padding: 10, fontSize: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  option: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 3, borderWidth: 1, borderColor: '#aaa' },
  selected: { backgroundColor: '#73000a', borderColor: '#73000a' },
  submit: { backgroundColor: '#73000a', padding: 12, paddingHorizontal: 20, borderRadius: 3, alignSelf: 'flex-start', marginTop: 4 },
  buttonText: { color: 'white', fontWeight: '600' },
  error: { color: '#b42318' },
  reportRow: { flexDirection: 'row', gap: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  barName: { flex: 1, fontSize: 16 },
  crowd: { width: 80, fontSize: 16 },
  empty: { color: '#666', paddingVertical: 16 },
});

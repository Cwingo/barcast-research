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
    <View style={styles.background}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>BarCast</Text>
          <Text style={styles.subtitle}>Crowd report demo</Text>
        </View>
        <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>Report the vibe</Text>
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
            {reports.length === 0 && <Text style={styles.empty}>No reports yet.</Text>}
            {reports.map((report, index) => (
              <View key={index} style={styles.reportRow}>
                <Text style={styles.barName}>{report.barName}</Text>
                <Text style={styles.crowd}>{report.crowd}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.footer}>Reports reset when the app reloads.</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#e8e8e8' },
  screen: { flex: 1, backgroundColor: 'white', maxWidth: 420, width: '100%', alignSelf: 'center' },
  header: { backgroundColor: '#73000a', padding: 20, paddingTop: 28, gap: 4 },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  subtitle: { color: '#f2dadd', fontSize: 14 },
  page: { flexGrow: 1, padding: 20, gap: 16 },
  heading: { fontSize: 21, fontWeight: 'bold', color: '#222' },
  form: { gap: 12, marginBottom: 16 },
  label: { fontSize: 15, fontWeight: '600', color: '#222' },
  input: { borderWidth: 1, borderColor: '#aaa', borderRadius: 5, padding: 12, minHeight: 48, fontSize: 16, color: '#222' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  option: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 48, borderRadius: 5, borderWidth: 1, borderColor: '#aaa' },
  selected: { backgroundColor: '#73000a', borderColor: '#73000a' },
  submit: { backgroundColor: '#73000a', minHeight: 48, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  buttonText: { color: 'white', fontSize: 15, fontWeight: '600' },
  error: { color: '#b42318' },
  reportRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  barName: { flex: 1, fontSize: 16, color: '#222' },
  crowd: { fontSize: 14, color: '#73000a', backgroundColor: '#f7edef', padding: 8, borderRadius: 5 },
  empty: { color: '#666', paddingVertical: 20, textAlign: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 5 },
  footer: { color: '#666', fontSize: 12, textAlign: 'center', marginTop: 'auto', paddingTop: 24 },
});

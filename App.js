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
        <Text style={styles.title}>BarCast Research</Text>
        <Text style={styles.muted}>Try a crowd report using a sample bar name.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Bar name</Text>
        <TextInput
          accessibilityLabel="Bar name"
          style={styles.input}
          placeholder="e.g. Sample Bar"
          placeholderTextColor="#637572"
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
      {reports.length === 0 && <Text style={styles.muted}>No reports yet. Add your first one above.</Text>}
      {reports.map((report, index) => (
        <View key={index} style={[styles.card, styles.row]}>
          <Text style={styles.barName}>{report.barName}</Text>
          <Text style={styles.badge}>{report.crowd}</Text>
        </View>
      ))}
      <Text style={styles.muted}>Reports reset when the app reloads.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#f4f7f7' },
  page: { padding: 20, paddingTop: 50, gap: 16, maxWidth: 540, width: '100%', alignSelf: 'center' },
  header: { gap: 8, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#123a36' },
  heading: { fontSize: 20, fontWeight: 'bold', marginTop: 8 },
  muted: { color: '#546767', lineHeight: 21 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 20, gap: 14 },
  label: { fontWeight: '600', color: '#123a36' },
  input: { borderWidth: 1, borderColor: '#b6c8c4', borderRadius: 6, padding: 12, fontSize: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  option: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 6, backgroundColor: '#e9efed' },
  selected: { backgroundColor: '#14665b' },
  submit: { backgroundColor: '#14665b', padding: 14, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '600' },
  error: { color: '#b42318' },
  barName: { flex: 1, fontSize: 16, fontWeight: '600' },
  badge: { color: '#14665b', backgroundColor: '#e9efed', padding: 8, borderRadius: 6 },
});

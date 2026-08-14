import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState<'teacher' | 'nurse' | 'chat'>('teacher');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'Melis Öğretmen', text: 'Mila bugün ikindi resim etkinliğinde harika bir gökkuşağı çizdi! 🎨', time: '13:45' },
    { sender: 'Ahmet Bey (Veli)', text: 'Çok teşekkürler Melis Öğretmen, öksürük şurubunu 16:00da verebilir misiniz?', time: '13:48' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      sender: activeTab === 'teacher' ? 'Melis Öğretmen' : 'Ahmet Bey (Veli)',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📱 KinderLog & CareLog Mobile</Text>
        <Text style={styles.headerSub}>Live Native App Workspace</Text>
      </View>

      {/* TAB NAVIGATION */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'teacher' && styles.tabActive]} onPress={() => setActiveTab('teacher')}>
          <Text style={styles.tabText}>🏫 Öğretmen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'nurse' && styles.tabActive]} onPress={() => setActiveTab('nurse')}>
          <Text style={styles.tabText}>👵 Hemşire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'chat' && styles.tabActive]} onPress={() => setActiveTab('chat')}>
          <Text style={styles.tabText}>💬 Canlı Chat</Text>
        </TouchableOpacity>
      </View>

      {/* SCREEN CONTENT */}
      <ScrollView style={styles.content}>
        {activeTab === 'teacher' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🏫 Öğretmen 2-Tık Hızlı Bulgu Kaydı</Text>
            <Text style={styles.label}>Öğrenci: Mila Yılmaz (Sınıf 102)</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#0d9488' }]}>
                <Text style={styles.btnText}>🍽️ Yemek %100</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#2563eb' }]}>
                <Text style={styles.btnText}>💤 Uyku 1.5 Saat</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'nurse' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>👵 CareLog Hemşire Vital Bulgular</Text>
            <Text style={styles.label}>Sakin: Ayşe Teyze (Oda 204)</Text>
            <View style={styles.vitalsBox}>
              <Text style={styles.vitalText}>Tansiyon: 120/80 mmHg</Text>
              <Text style={styles.vitalText}>Nabız: 72 bpm | Şeker: 98 mg/dL</Text>
              <Text style={styles.vitalText}>Ateş: 36.6 °C | SpO2: %98</Text>
            </View>
          </View>
        )}

        {activeTab === 'chat' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>💬 Supabase Realtime Anlık Veli-Öğretmen Sohbeti</Text>
            {chatMessages.map((msg, index) => (
              <View key={index} style={styles.msgBubble}>
                <Text style={styles.msgSender}>{msg.sender} ({msg.time})</Text>
                <Text style={styles.msgText}>{msg.text}</Text>
              </View>
            ))}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Mesajınızı yazın..."
                value={inputText}
                onChangeText={setInputText}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
                <Text style={styles.btnText}>Gönder ➜</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { padding: 20, backgroundColor: '#1e293b', borderBottomWidth: 1, borderBottomColor: '#334155' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  headerSub: { color: '#94a3b8', fontSize: 13 },
  tabBar: { flexDirection: 'row', backgroundColor: '#1e293b', padding: 6 },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: '#0d9488' },
  tabText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  content: { flex: 1, padding: 16 },
  card: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#334155' },
  cardTitle: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  label: { color: '#cbd5e1', fontSize: 13, marginBottom: 12 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
  vitalsBox: { backgroundColor: '#0f172a', padding: 12, borderRadius: 8 },
  vitalText: { color: '#38bdf8', fontWeight: '600', marginBottom: 4 },
  msgBubble: { backgroundColor: '#334155', borderRadius: 10, padding: 12, marginBottom: 8 },
  msgSender: { color: '#2dd4bf', fontWeight: 'bold', fontSize: 12, marginBottom: 4 },
  msgText: { color: 'white', fontSize: 13 },
  inputContainer: { flexDirection: 'row', marginTop: 12, gap: 8 },
  input: { flex: 1, backgroundColor: '#0f172a', color: 'white', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#475569' },
  sendBtn: { backgroundColor: '#0d9488', paddingHorizontal: 16, justifyContent: 'center', borderRadius: 8 }
});

export interface ChatMessage {
  id: string;
  sender: string;
  role: 'TEACHER' | 'PARENT' | 'NURSE';
  text: string;
  timestamp: string;
  roomTopic: string;
}

class SupabaseRealtimeChatEngine {
  private messages: ChatMessage[] = [
    {
      id: 'm-1',
      sender: 'Melis Öğretmen',
      role: 'TEACHER',
      text: 'Mila bugün ikindi resim etkinliğinde harika bir gökkuşağı çizdi! 🎨',
      timestamp: '13:45',
      roomTopic: 'room:102-mila-yilmaz'
    },
    {
      id: 'm-2',
      sender: 'Ahmet Yılmaz (Veli)',
      role: 'PARENT',
      text: 'Çok teşekkürler Melis Öğretmen, öksürük şurubunu 16:00da verebilir misiniz?',
      timestamp: '13:48',
      roomTopic: 'room:102-mila-yilmaz'
    }
  ];

  private subscribers: ((messages: ChatMessage[]) => void)[] = [];

  subscribe(callback: (messages: ChatMessage[]) => void) {
    this.subscribers.push(callback);
    callback(this.getMessages());
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  getMessages() {
    return [...this.messages];
  }

  sendMessage(sender: string, role: 'TEACHER' | 'PARENT' | 'NURSE', text: string) {
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender,
      role,
      text,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      roomTopic: 'room:102-mila-yilmaz'
    };
    this.messages.push(newMsg);
    this.notifySubscribers();
    return newMsg;
  }

  private notifySubscribers() {
    const msgs = this.getMessages();
    this.subscribers.forEach(cb => cb(msgs));
  }
}

export const realtimeChatEngine = new SupabaseRealtimeChatEngine();

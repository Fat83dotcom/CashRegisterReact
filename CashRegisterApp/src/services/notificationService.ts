import { apiClient, BASE_URL } from "../lib/api";

export interface NotificationMessage {
  type: string;
  message: string;
  requisitionId?: number;
  status?: string;
  timestamp: Date;
  id: string;
}

class NotificationService {
  private eventSources: Map<string, EventSource> = new Map();
  private subscribers: Map<string, ((msg: NotificationMessage) => void)[]> = new Map();

  subscribe(topic: string, callback: (msg: NotificationMessage) => void) {
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, []);
    }
    
    const callbacks = this.subscribers.get(topic);
    if (callbacks) {
      callbacks.push(callback);
    }

    if (!this.eventSources.has(topic)) {
      const eventSource = new EventSource(`${BASE_URL}/Notifications/stream/${topic}`, {
        withCredentials: true, 
      });

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const notification: NotificationMessage = {
            ...data,
            timestamp: new Date(),
            id: crypto.randomUUID()
          };

          const topicCallbacks = this.subscribers.get(topic);
          topicCallbacks?.forEach((cb) => cb(notification));
        } catch (error) {
          console.error("Erro ao fazer parse da notificação SSE:", error);
        }
      };

      eventSource.onerror = (error) => {
        console.error(`Erro no EventSource do tópico ${topic}:`, error);
      };

      this.eventSources.set(topic, eventSource);
    }

    return () => {
      const topicCallbacks = this.subscribers.get(topic);
      if (topicCallbacks) {
        this.subscribers.set(topic, topicCallbacks.filter((cb) => cb !== callback));
        
        if (this.subscribers.get(topic)?.length === 0) {
          this.eventSources.get(topic)?.close();
          this.eventSources.delete(topic);
        }
      }
    };
  }
}

export const notificationService = new NotificationService();

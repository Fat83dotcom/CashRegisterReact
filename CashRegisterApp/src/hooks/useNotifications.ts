import { useEffect } from "react";
import { BASE_URL } from "../lib/api";

export interface NotificationMessage {
  type: string;
  message: string;
  requisitionId?: number;
  status?: string;
  timestamp: Date;
  id: string;
}

// Memória global mantida fora do React para que múltiplas instâncias 
// do hook compartilhem os mesmos EventSources
const eventSources: Map<string, EventSource> = new Map();
const subscribers: Map<string, ((msg: NotificationMessage) => void)[]> = new Map();

export function useNotifications(topic: string, callback: (msg: NotificationMessage) => void) {
  useEffect(() => {
    if (!subscribers.has(topic)) {
      subscribers.set(topic, []);
    }
    
    const callbacks = subscribers.get(topic);
    if (callbacks) {
      callbacks.push(callback);
    }

    if (!eventSources.has(topic)) {
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

          const topicCallbacks = subscribers.get(topic);
          topicCallbacks?.forEach((cb) => cb(notification));
        } catch (error) {
          console.error("Erro ao fazer parse da notificação SSE:", error);
        }
      };

      eventSource.onerror = (error) => {
        console.error(`Erro no EventSource do tópico ${topic}:`, error);
      };

      eventSources.set(topic, eventSource);
    }

    return () => {
      const topicCallbacks = subscribers.get(topic);
      if (topicCallbacks) {
        subscribers.set(topic, topicCallbacks.filter((cb) => cb !== callback));
        
        if (subscribers.get(topic)?.length === 0) {
          eventSources.get(topic)?.close();
          eventSources.delete(topic);
        }
      }
    };
  }, [topic, callback]);
}

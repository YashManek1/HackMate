// src/types/hackathonTypes.ts

export interface HackathonInput {
  name: string;
  description?: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  location?: string;
  rules?: string;
  prizeDetails?: Record<string, any>;
  domains: string[];
  timeline: {
    eventName: string;
    eventTime: string; // ISO string
    description?: string;
  }[];
}

export interface WhatsappMediaObject {
  id?: string;
  link?: string;
  caption?: string;
  filename?: string;
}

export interface WhatsappLocationObject {
  longitude: number;
  latitude: number;
  name?: string;
  address?: string;
}

export interface WhatsappContactName {
  formatted_name: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  suffix?: string;
  prefix?: string;
}

export interface WhatsappContactPhone {
  phone?: string;
  wa_id?: string;
  type?: string;
}

export interface WhatsappContactEmail {
  email?: string;
  type?: string;
}

export interface WhatsappContactUrl {
  url?: string;
  type?: string;
}

export interface WhatsappContactAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  country_code?: string;
  type?: string;
}

export interface WhatsappContactOrg {
  company?: string;
  department?: string;
  title?: string;
}

export interface WhatsappContactObject {
  name: WhatsappContactName;
  phones?: WhatsappContactPhone[];
  emails?: WhatsappContactEmail[];
  urls?: WhatsappContactUrl[];
  addresses?: WhatsappContactAddress[];
  org?: WhatsappContactOrg;
  birthday?: string;
}

export interface WhatsappButtonComponent {
  type: 'button';
  sub_type: 'quick_reply' | 'url';
  index: number;
  parameters: {
    type: 'text' | 'payload';
    text?: string;
    payload?: string;
  }[];
}

export interface WhatsappHeaderComponent {
  type: 'header';
  parameters: {
    type: 'text' | 'image' | 'document' | 'video' | 'location';
    text?: string;
    image?: WhatsappMediaObject;
    document?: WhatsappMediaObject;
    video?: WhatsappMediaObject;
    location?: WhatsappLocationObject;
  }[];
}

export interface WhatsappBodyComponent {
  type: 'body';
  parameters: {
    type: 'text' | 'currency' | 'date_time';
    text?: string;
    currency?: {
      fallback_value: string;
      code: string;
      amount_1000: number;
    };
    date_time?: {
      fallback_value: string;
      day_of_week?: number;
      year?: number;
      month?: number;
      day_of_month?: number;
      hour?: number;
      minute?: number;
      calendar?: string;
    };
  }[];
}

export interface WhatsappTemplate {
  name: string;
  language: {
    code: string;
    policy?: 'deterministic';
  };
  components?: (WhatsappHeaderComponent | WhatsappBodyComponent | WhatsappButtonComponent)[];
}

export interface WhatsappTextObject {
  body: string;
  preview_url?: boolean;
}

export interface WhatsappInteractiveAction {
  button?: string;
  buttons?: {
    type: 'reply';
    reply: {
      id: string;
      title: string;
    };
  }[];
  sections?: {
    title?: string;
    rows: {
      id: string;
      title: string;
      description?: string;
    }[];
  }[];
}

export interface WhatsappInteractiveObject {
  type: 'button' | 'list';
  header?: {
    type: 'text' | 'image' | 'document' | 'video';
    text?: string;
    image?: WhatsappMediaObject;
    document?: WhatsappMediaObject;
    video?: WhatsappMediaObject;
  };
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  action: WhatsappInteractiveAction;
}

export interface WhatsappReactionObject {
  message_id: string;
  emoji: string;
}

export interface WhatsappContext {
  message_id: string;
}

export class WhatsappMessage {
  messaging_product: string; // Always "whatsapp"
  recipient_type?: 'individual' | 'group'; // Default: individual
  to: string; // Phone number or Group ID
  type: 'text' | 'template' | 'image' | 'audio' | 'video' | 'document' | 'location' | 'contacts' | 'interactive' | 'reaction' | 'sticker';
  
  // Context for replying to messages
  context?: WhatsappContext;
  
  // Message content based on type
  text?: WhatsappTextObject;
  template?: WhatsappTemplate;
  image?: WhatsappMediaObject;
  audio?: WhatsappMediaObject;
  video?: WhatsappMediaObject;
  document?: WhatsappMediaObject;
  sticker?: WhatsappMediaObject;
  location?: WhatsappLocationObject;
  contacts?: WhatsappContactObject[];
  interactive?: WhatsappInteractiveObject;
  reaction?: WhatsappReactionObject;
  
  // Status tracking
  status?: 'sent' | 'delivered' | 'read' | 'failed';
  
  // Backward compatibility - will be deprecated
  messagingProduct?: string;
}

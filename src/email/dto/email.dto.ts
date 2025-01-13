export interface Attachment {
  content: string;
  filename: string;
  type: string; 
  disposition: string;
  encoding: string;
}

export class Email {
  from: string;
  to: string | string[];
  subject: string;
  content: string;
  cc?: string[];
  bcc?: string[];
  attachments?: Attachment[];
}

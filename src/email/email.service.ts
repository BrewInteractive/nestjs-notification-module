import { Email } from "./dto";

export abstract class EmailService {
  abstract sendEmailAsync(email: Email): Promise<void>;
}

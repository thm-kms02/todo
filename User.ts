export class User {
  id: number;
  email: string;
  pw: string;

  constructor(mail: string, pword: string, id?: number) {
    this.email = mail;
    this.pw = pword;
    this.id = id;
  }
}

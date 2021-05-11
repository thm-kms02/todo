export class Aufgabe {
  id: number;
  user: number;
  ueberschrift: string;
  beschreibung: string;
  kategorie: number;
  prio: number;

  constructor(
    user: number,
    ueberschrift: string,
    beschreibung: string,
    kategorie?: number,
    prio?: number,
    id?: number
  ) {
    this.user = user;
    this.ueberschrift = ueberschrift;
    this.beschreibung = beschreibung;
    this.kategorie = 1;
    this.prio = 1;
    this.id = id;
  }

  public toArray(): [number, string, string, number, number] {
    return [
      this.user,
      this.ueberschrift,
      this.beschreibung,
      this.kategorie,
      this.prio,
    ];
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe = void 0;
var Aufgabe = /** @class */ (function () {
    function Aufgabe(user, ueberschrift, beschreibung, kategorie, prio, id) {
        this.user = user;
        this.ueberschrift = ueberschrift;
        this.beschreibung = beschreibung;
        this.kategorie = 1;
        this.prio = 1;
        this.id = id;
    }
    Aufgabe.prototype.toArray = function () {
        return [this.user, this.ueberschrift, this.beschreibung, this.kategorie, this.prio];
    };
    return Aufgabe;
}());
exports.Aufgabe = Aufgabe;

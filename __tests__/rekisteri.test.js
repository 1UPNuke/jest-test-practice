'use strict';

const Tietokonerekisteri = require('../tietokonerekisteri.js');
const tietokoneet = require('../tietokoneet.json');
let tietokonerekisteri;

describe('konstruktori', () => {

    test('olio luotu', () => {
        tietokonerekisteri = new Tietokonerekisteri(tietokoneet);
        expect(tietokonerekisteri.tietokonerekisteri).toEqual(tietokoneet);
    });

    test('parametrin puute aiheuttaa poikkeuksen', () => {
        expect(() => new Tietokonerekisteri()).toThrow('tietokoneet puuttuvat');
    });

});

describe('haeValmistajat', () => {

    beforeEach(() => {
        tietokonerekisteri = new Tietokonerekisteri(tietokoneet);
    });

    test('palauttaa taulukon ["BMI", "CERA"]', () => {
        expect(tietokonerekisteri.haeValmistajat()).toEqual(['BMI', 'CERA']);
    });

});

describe('haeNumerolla', () => {

    beforeEach(() => {
        tietokonerekisteri = new Tietokonerekisteri(tietokoneet);
    });

    test('haku ilman numeroa aiheuttaa poikkeuksen', () => {
        expect(() => tietokonerekisteri.haeNumerolla()).toThrow('numerolla ei löydy konetta');
    });
    test('haku numerolla 2 palauttaa oikean koneen', () => {
        expect(tietokonerekisteri.haeNumerolla(2)).toEqual({ "hinta": 350, "numero": 2, "ohjelmat": [{ "hinta": 10, "nimi": "Teksturi" }, { "hinta": 20, "nimi": "Laskuri" }], "tyyppi": "läppäri", "valmistaja": "CERA", "varusteet": ["hiiri"] });
    });
    test('palauttaa numerolla ei löydy konetta', () => {
        expect(() => tietokonerekisteri.haeNumerolla(10).toThrow('numerolla ei löydy konetta'));
    });

});

describe('haeValmistajalla', () => {

    beforeEach(() => {
        tietokonerekisteri = new Tietokonerekisteri(tietokoneet);
    });

    test('palauttaa tyhjän taulukon ilman hakua', () => {
        expect(tietokonerekisteri.haeValmistajalla()).toEqual([]);
    });
    test('palauttaa [1, 3] haulla "BMI"', () => {
        expect(tietokonerekisteri.haeValmistajalla('BMI')).toEqual([1, 3]);
    })

});

describe('haeTyypilla', () => {

    beforeEach(() => {
        tietokonerekisteri = new Tietokonerekisteri(tietokoneet);
    });

    test('palauttaa puuttuva parametri', () => {
        expect(() => tietokonerekisteri.haeTyypilla().toThrow('parametri puuttuu'));
    });
    test('palauttaa tyhjän taulukon väärällä haulla', () => {
        expect(tietokonerekisteri.haeTyypilla('foo')).toEqual([]);
    });
    test('palauttaa läppärien numerot', () => {
        expect(tietokonerekisteri.haeTyypilla('läppäri')).toEqual([2, 3]);
    });

});

describe('haeVarusteet', () => {

    beforeEach(() => {
        tietokonerekisteri = new Tietokonerekisteri(tietokoneet);
    });

    test('palauttaa puuttuva parametri', () => {
        expect(() => tietokonerekisteri.haeVarusteet().toThrow('parametri puuttuu'));
    });
    test('palauttaa numerolla ei löytynyt tietokonetta', () => {
        expect(() => tietokonerekisteri.haeVarusteet(8).toThrow('numerolla ei löytynyt tietokonetta'));
    });
    test('palauttaa tyhjän taulukon jos ei varusteita', () => {
        expect(tietokonerekisteri.haeVarusteet(3)).toEqual([]);
    });
    test('palauttaa koneen varusteet', () => {
        expect(tietokonerekisteri.haeVarusteet(1)).toEqual(["näppis", "näyttö", "hiiri"]);
    });

});

describe('haeHinta', () => {

    beforeEach(() => {
        tietokonerekisteri = new Tietokonerekisteri(tietokoneet);
    });

    test('palauttaa poikkeuksen ilman hakua', () => {
        expect(() => tietokonerekisteri.haeHinta().toThrow('numerolla ei löytynyt tietokonetta'));
    });
    test('palauttaa poikkeuksen väärällä numerolla', () => {
        expect(() => tietokonerekisteri.haeHinta(8).toThrow('numerolla ei löytynyt tietokonetta'));
    });
    test('palauttaa koneen hinnan', () => {
        expect(tietokonerekisteri.haeHinta(1)).toEqual(250);
    });

});

describe('haeOhjelmienHinta', () => {

    beforeEach(() => {
        tietokonerekisteri = new Tietokonerekisteri(tietokoneet);
    });

    test('palauttaa puuttuva parametri', () => {
        expect(() => tietokonerekisteri.haeOhjelmienHinta().toThrow('parametri puuttuu'));
    });
    test('palauttaa numerolla ei löytynyt tietokonetta', () => {
        expect(() => tietokonerekisteri.haeOhjelmienHinta(8).toThrow('numerolla ei löytynyt tietokonetta'));
    });
    test('palauttaa 0 ilman ohjelmia', () => {
        expect(tietokonerekisteri.haeOhjelmienHinta(3)).toEqual(0);
    });
    test('palauttaa koneen varusteet', () => {
        expect(tietokonerekisteri.haeOhjelmienHinta(1)).toEqual(133);
    });

});

describe('onkoOhjelmia', () => {

    beforeEach(() => {
        tietokonerekisteri = new Tietokonerekisteri(tietokoneet);
    });

    test('palauttaa false ilman hakua', () => {
        expect(tietokonerekisteri.onkoOhjelmia()).toEqual(false);
    });
    test('palauttaa false väärällä numerolla', () => {
        expect(tietokonerekisteri.onkoOhjelmia(8)).toEqual(false);
    });
    test('palauttaa false ilman ohjelmia', () => {
        expect(tietokonerekisteri.onkoOhjelmia(3)).toEqual(false);
    });
    test('palauttaa true', () => {
        expect(tietokonerekisteri.onkoOhjelmia(1)).toEqual(true);
    });

});

describe('Testataan onkoVarusteita', () => {

    beforeEach(() => {
        tietokonerekisteri = new Tietokonerekisteri(tietokoneet);
    });
    
    test('palauttaa false ilman hakua', () => {
        expect(tietokonerekisteri.onkoVarusteita()).toEqual(false);
    });
    test('palauttaa false väärällä numerolla', () => {
        expect(tietokonerekisteri.onkoVarusteita(8)).toEqual(false);
    });
    test('palauttaa false ilman ohjelmia', () => {
        expect(tietokonerekisteri.onkoVarusteita(3)).toEqual(false);
    });
    test('palauttaa true', () => {
        expect(tietokonerekisteri.onkoVarusteita(1)).toEqual(true);
    });

});
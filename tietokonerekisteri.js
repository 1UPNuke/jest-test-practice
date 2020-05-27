'use strict';

module.exports = class Tietokonerekisteri {

    constructor(tietokonerekisteri)
    {
        if (tietokonerekisteri == null)
        {
            throw new Error('tietokoneet puuttuvat');
        }
        this.tietokonerekisteri = tietokonerekisteri;
    }

    haeValmistajat()
    {
        let valmistajat = [];
        for (let kone of this.tietokonerekisteri)
        {
            if (!valmistajat.includes(kone.valmistaja))
            {
                valmistajat.push(kone.valmistaja);
            }
        }
        return valmistajat;
    }

    haeNumerolla(num)
    {
        if (num == null) 
        {
            throw new Error('numerolla ei löydy konetta');
        }
        for (let kone of this.tietokonerekisteri)
        {
            if (kone.numero == num)
            {
                return kone;
            }
        }
        throw new Error('numerolla ei löydy konetta');
    }

    haeValmistajalla(valmistaja)
    {
        if(valmistaja == null)
        {
            return [];
        }
        let nums = [];
        for (let kone of this.tietokonerekisteri)
        {
            if (kone.valmistaja == valmistaja)
            {
                nums.push(kone.numero);
            }
        }
        return nums;
    }

    haeTyypilla(tyyppi)
    {
        if (tyyppi == null)
        {
            throw new Error('parametri puuttuu');
        }
        let nums = [];
        for (let kone of this.tietokonerekisteri)
        {
            if (kone.tyyppi == tyyppi)
            {
                nums.push(kone.numero);
            }
        }
        return nums;
    }

    haeVarusteet(num)
    {
        if (num == null)
        {
            throw new Error('parametri puuttuu');
        }
        let found = false;
        for (let kone of this.tietokonerekisteri)
        {
            if (kone.numero == num)
            {
                found = true;
                break;
            }
        }
        if (!found)
        {
            throw new Error('numerolla ei löytynyt tietokonetta');
        }
        for (let kone of this.tietokonerekisteri)
        {
            if (kone.numero == num)
            {
                return kone.varusteet;
            }
        }
    }

    haeHinta(num)
    {
        if(num == null)
        {
            throw new Error('numerolla ei löytynyt tietokonetta');
        }
        let found = false;
        for (let kone of this.tietokonerekisteri)
        {
            if (kone.numero == num) 
            {
                found = true;
                break;
            }
        }
        if (!found)
        {
            throw new Error('numerolla ei löytynyt tietokonetta');
        }
        for (let kone of this.tietokonerekisteri)
        {
            if (kone.numero == num)
            {
                return kone.hinta;
            }
        }
    }

    haeOhjelmienHinta(num)
    {
        let found = false;
        for (let kone of this.tietokonerekisteri)
        {
            if (kone.numero == num)
            {
                found = true;
                break;
            }
        }
        if (!found)
        {
            throw new Error('numerolla ei löytynyt tietokonetta');
        }
        let hinta = 0;
        for (let kone of this.tietokonerekisteri)
        {
            if (kone.numero == num)
            {
                for (let ohjelma of kone.ohjelmat)
                {
                    hinta += ohjelma.hinta;
                }
            }
            return hinta;
        }
    }

    onkoOhjelmia(num)
    {
        for (let kone of this.tietokonerekisteri)
        {
            if (kone.numero == num)
            {
                if (kone.ohjelmat.length > 0)
                {
                    return true
                }
            }
            return false;
        }
    }

    onkoVarusteita(num)
    {
        for (let kone of this.tietokonerekisteri)
        {
            if (kone.numero == num)
            {
                if (kone.varusteet.length > 0)
                {
                    return true;
                }
            }
        }
        return false;
    }
}
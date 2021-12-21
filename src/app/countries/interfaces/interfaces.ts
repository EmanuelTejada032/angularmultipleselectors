export interface Country {
    capital:      string[];
    name:         Name;
    region:       string;
    subregion:    string;
    cca3:         string;
}

interface Name {
    common: string;
    nativeName: {official: string, common:string};
    official: string;
}

export interface smallCountries {
    name: string;
    code: string;
}

export interface BorderCountries {
    borders: string[];
}
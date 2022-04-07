export interface ICurrentCityList {
    id: number;
    coord: Coord;
    country: string;
    geoname: Geoname;
    langs: Lang[];
    name: string;
    stat: Stat;
    stations: Station[];
    zoom: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface Geoname {
    cl: string;
    code: string;
    parent: number;
}

export interface Lang {
    de?: string;
    fa?: string;
}

export interface Stat {
    level: number;
    population: number;
}

export interface Station {
    id: number;
    dist: number;
    kf: number;
}

export default class NavBarLink{
    private _name: string;
    private _URL: string;

    constructor(name: string, URL: string){
        this._name = name;
        this._URL = URL;
    }

    public get name():string {
        return this._name
    }

    public get URL():string {
        return this._URL
    }
}


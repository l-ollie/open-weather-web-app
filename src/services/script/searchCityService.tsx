export default class SearchCityService {
    private stringSimilarity = require("string-similarity");
    private _cityList;
    constructor(cityList: any) {
        this._cityList = cityList;
    }
    cityList(searchTerm: string) {
        const jsonCity = JSON.stringify(this._cityList);
        const _local = JSON.parse(jsonCity);
        const filterdList = _local.filter((item: any) => {
            const cityName = item.name.toLowerCase();
            const _searchTerm = searchTerm.toLowerCase();
            const simularity = this.stringSimilarity.compareTwoStrings(cityName, _searchTerm);
            // const length = 1 - 1 / _searchTerm.length;;
            return simularity > 0.7;
            //  item.name.toLowerCase() === searchTerm.toLowerCase() 

        });

        return filterdList;
    }

}
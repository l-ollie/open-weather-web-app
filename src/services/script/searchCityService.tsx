export default class SearchCityService {
    private stringSimilarity = require("string-similarity");
    private _cityList;

    constructor(cityList: any) {
        this._cityList = JSON.parse(JSON.stringify(cityList));
    }

    cityList(searchTerm: string) {
        const filterdList = this._cityList.filter((item: any) => {
            const cityName = item.name.toLowerCase();
            const _searchTerm = searchTerm.toLowerCase();
            const simularity = this.stringSimilarity.compareTwoStrings(cityName, _searchTerm);
            if (simularity > 0.6)
                return item["simularity"] = simularity;
        });
        // console.log(filterdList);
        return this.orderBySimularity(filterdList);
    }

    orderBySimularity(list: any) {
        const orderedList = list.sort((a: any, b: any) => {
            return ((b.simularity) - (a.simularity));
        });
        if (orderedList.length > 10)
            orderedList.length = 10;

        return orderedList
    }

}
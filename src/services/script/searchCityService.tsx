import { ICurrentCityItem } from "../../models/ICurrentCityItem";

export default class SearchCityService {
    private stringSimilarity = require("string-similarity");
    private _cityList;

    constructor(cityList: any) {
        this._cityList = JSON.parse(JSON.stringify(cityList));
    }

    cityList(searchTerm: string): ICurrentCityItem[] {
        const _filteredList = this._cityList.filter((item: ICurrentCityItem) => {
            const _cityName = item.name.toLowerCase();
            const _searchTerm = searchTerm.toLowerCase();
            const _similarity = this.stringSimilarity.compareTwoStrings(_cityName, _searchTerm);
            if (_similarity > 0.6)
                return item["similarity"] = _similarity;
            return false;
        });
        return this.orderBySimilarity(_filteredList);
    }

    orderBySimilarity(list: ICurrentCityItem[]) {
        const orderedList = list.sort((a: ICurrentCityItem, b: ICurrentCityItem) => {
            return ((b.similarity!) - (a.similarity!));
        });
        if (orderedList.length > 10)
            orderedList.length = 10;

        return orderedList
    }

}
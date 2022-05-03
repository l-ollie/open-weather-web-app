export default class Capitalize {
    private _sentence: string;

    constructor(sentence: string) {
        this._sentence = sentence;
    }

    get sentence(): string {
        return this._sentence.charAt(0).toUpperCase() + this._sentence.slice(1)
    }

    get firstWord(): string {
        const _firstWord = this._sentence.split(' ')[0];
        return _firstWord.split(' ')[0].charAt(0).toUpperCase() + _firstWord.slice(1);
    }

}
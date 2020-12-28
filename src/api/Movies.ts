import Resource from "../types/Resource";

export default class Movies implements Resource {
    constructor(public dataArray: object[] = []) {
        this.dataArray = dataArray;
    }

    get(key: string): object[] {
        return this[key];
    }

    create(data: object): object {
        this.dataArray.push(data);
        return data;
    }

    findMany(): object[] {
        return this.get("dataArray");
    }
}

import Resource from '../typings/Resource';

export default class Movies implements Resource {
  constructor(public dataArray: object[] = []) {
    this.dataArray = dataArray;
  }

  get(key: string) {
    return this[key];
  }

  create(data: object) {
    this.dataArray.push(data);
    return data;
  }

  findMany() {
    return this.get('dataArray');
  }
}

export default interface Resource {
    dataArray: object[];
    create(data: object): object;
    findMany(): object[];
}

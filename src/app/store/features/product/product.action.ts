export class GetAllProducts {
    static readonly type = '[Product] Get All';
    constructor() {}
}
export class GetAllSuppliers {
    static readonly type = '[Suppliers] Get All';
    constructor() {}
}
export class GetAllCategories {
    static readonly type = '[Categories] Get All';
    constructor() {}
}
export class SeletCategory {
    static readonly type = '[Categories] Select CategoryId';
    constructor(public payload: {cateogryId: number}) {}
}
export class GetProductById {
    static readonly type = '[Product] Get By Id';
    constructor(public payload: { productId: number }) {}
}

export interface IProduct{
    _id?:string,
    name:string,
    price:number,
    category:string,
    category_name:string,
    description:string,
    file:string
}

export interface ICartProduct{
    productid:string,
    price:number,
    quantity:number
}
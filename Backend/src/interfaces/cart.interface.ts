export interface ICart{
    userid?:string,
    products:Array<ICartProduct>
}
export interface ICartProduct{
    id:string,
    price:number,
    quantity:number
}
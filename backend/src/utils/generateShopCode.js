const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function generateShopCode (){
    let code ="";
    for(let i=0;i<5;i++){
        code+=CHARS.charAt(Math.floor(Math.random() * CHARS.length))
    }
    return `SHOP-${code}`;
}
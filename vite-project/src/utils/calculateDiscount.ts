// import { IMenuItem } from "../models/menuModel";

// export const calculateFinalPrice = (item: IMenuItem, quantity: number): number => {
//   if (item.discountType === "PERCENTAGE" && item.discountValue) {
//     return (item.price * quantity) * (1 - item.discountValue / 100);
//   }

//   if (item.discountType === "BOGO") {
//     const payableQty = Math.ceil(quantity / 2);
//     return item.price * payableQty;
//   }

//   return item.price * quantity;
// };
 

import { IMenuItem } from "../models/menuModel"; // Verify that 'menuModel.ts' exists in 'src/models' or adjust the path to the correct location.

export const calculateFinalPrice = (item: IMenuItem, quantity: number): number => {
  if (item.discountType === "PERCENTAGE" && item.discountValue) {
    return (item.price * quantity) * (1 - item.discountValue / 100);
  }

  if (item.discountType === "BOGO") {
    const payableQty = Math.ceil(quantity / 2);
    return item.price * payableQty;
  }

  return item.price * quantity;
};

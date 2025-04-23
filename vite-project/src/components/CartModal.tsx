// src/components/CartModal.tsx
import { Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { calculateFinalPrice } from "@/utils/calculateDiscount";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formatCurrency = (amount: number) =>
  `$${amount.toFixed(2)}`;

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-25 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
          <Dialog.Title className="text-xl font-bold mb-4">
            Your Cart
          </Dialog.Title>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Cart is empty.</p>
          ) : (
            <ul className="space-y-4 mb-4">
              {cartItems.map((item) => {
                const origTotal = item.price * item.quantity;
                const discTotal = calculateFinalPrice(item, item.quantity);

                return (
                  <li
                    key={item._id}
                    className="flex justify-between items-start border-b pb-2"
                  >
                    <div className="flex-1 pr-4">
                      <p className="font-semibold">{item.name}</p>

                      {item.discountType && (
                        <span className="text-sm text-red-600">
                          {item.discountType === "PERCENTAGE"
                            ? `${item.discountValue}% off`
                            : "BOGO"}
                        </span>
                      )}

                      <div className="mt-1 flex items-center space-x-2 text-sm">
                        <label htmlFor={`qty-${item._id}`}>Qty:</label>
                        <input
                          id={`qty-${item._id}`}
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item._id!,
                              Math.max(1, parseInt(e.target.value, 10))
                            )
                          }
                          className="w-16 border rounded px-2 py-1"
                        />
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      {item.discountType ? (
                        <>
                          <div className="line-through text-gray-500 text-sm">
                            {formatCurrency(origTotal)}
                          </div>
                          <div className="text-lg font-bold text-indigo-700">
                            {formatCurrency(discTotal)}
                          </div>
                        </>
                      ) : (
                        <div className="text-lg font-bold">
                          {formatCurrency(origTotal)}
                        </div>
                      )}

                      <button
                        onClick={() =>
                          removeFromCart(item._id!, item.quantity)
                        }
                        className="text-red-500 hover:underline text-sm mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {cartItems.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold text-indigo-700">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CartModal;

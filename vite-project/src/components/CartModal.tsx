import { Dialog } from "@headlessui/react";
import { useCart } from "@/context/CartContext";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const CartModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-25 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
          <Dialog.Title className="text-xl font-bold mb-4">Your Cart</Dialog.Title>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Cart is empty.</p>
          ) : (
            <ul className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <li key={item._id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id!)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleCheckout}
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CartModal;

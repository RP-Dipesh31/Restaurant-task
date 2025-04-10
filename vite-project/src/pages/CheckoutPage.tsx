import PaymentForm from "@/components/PaymentForm";
import Footer from "@/components/Footer"; // <-- import Footer component
import MainNav from "@/components/MainNav";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <MainNav onLogout={() => console.log("User logged out")} />
      <div className="p-10">
        <h1 className="text-3xl font-bold text-center mb-6">Payment Page</h1>
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
          <PaymentForm />
        </div>
      </div>

      <Footer /> {/* <-- render Footer at the bottom */}
    </div>
  );
};

export default CheckoutPage;

import React, { useEffect, useState } from 'react';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiApp, setUpiApp] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    if (paymentMethod === 'UPI' && !upiApp) {
      alert('Please select a UPI App.');
      return;
    }

    const tracking = 'TRK' + Math.floor(100000 + Math.random() * 900000);
    setTrackingId(tracking);
    setOrderPlaced(true);
    localStorage.removeItem('cartItems');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {step === 1 && (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Shipping Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full border rounded p-2" />
              <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full border rounded p-2" />
              <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="w-full border rounded p-2" />
              <input name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} required className="w-full border rounded p-2" />
              <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full border rounded p-2" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Continue to Payment</button>
            </form>
          </div>
        </div>
      )}

      {step === 2 && !orderPlaced && (
        <>
          <h2 className="text-2xl font-semibold mb-4 mt-8">Payment Method</h2>
          <div className="space-y-2 mb-4">
            {['Cash on Delivery', 'UPI', 'EMI', 'ATM Card'].map(method => (
              <div key={method}>
                <label className="block">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setUpiApp(''); // Clear UPI app selection if another payment is selected
                    }}
                    className="mr-2"
                  />
                  {method}
                </label>

                {/* Show UPI options directly under the UPI radio button */}
                {method === 'UPI' && paymentMethod === 'UPI' && (
                  <div className="ml-6 mt-2 space-y-1 text-sm text-gray-700">
                    {['PhonePe', 'Google Pay', 'Paytm'].map(app => (
                      <label key={app} className="block cursor-pointer">
                        <input
                          type="radio"
                          name="upiApp"
                          value={app}
                          checked={upiApp === app}
                          onChange={e => {
                            setUpiApp(e.target.value);
                            // Open the app's URL scheme in a new tab
                            let url = '';
                            if (e.target.value === 'PhonePe') url = 'https://phon.pe';
                            if (e.target.value === 'Google Pay') url = 'https://gpay.app.goo.gl';
                            if (e.target.value === 'Paytm') url = 'https://paytm.com';
                            if (url) window.open(url, '_blank');
                          }}
                          className="mr-2"
                        />
                        {app}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </>
      )}

      {orderPlaced && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
          <h3 className="text-xl font-bold text-green-800 mb-2">✅ Order placed successfully!</h3>
          <p className="text-green-700">Tracking ID: <strong>{trackingId}</strong></p>
          <p className="text-green-700">Payment Method: <strong>{paymentMethod}</strong></p>
          {paymentMethod === 'UPI' && <p className="text-green-700">UPI App: <strong>{upiApp}</strong></p>}
        </div>
      )}

      {/* Order Summary */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-4">
                  <img src={item.images?.[0] || item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-amber-700">₹{item.price * item.quantity}</p>
              </div>
            ))}
            <div className="text-xl font-semibold mt-4">Total: ₹{total}</div>
          </div>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;

import './App.css';
import Axios from 'axios';

function App() {

  async function razorPayPaymentHandler(){

    const API_URL = `http://localhost:5000/razorpay/`
    const orderUrl = `${API_URL}order`;
    const response = await Axios.get(orderUrl);
    const { data } = response;
    console.log();
    console.log("App -> razorPayPaymentHandler -> data", data)

    const options={
      key:"rzp_test_MexHrymeetkiP0",
      name:"Anil",
      description:"Anil Patidar",
      order_id:data.id,
      handler:async (response)=>{
        try{
          const paymentId=response.razorpay_payment_id;
          const url = `${API_URL}capture/${paymentId}`;
         const captureResponse = await Axios.post(url, {})
         const successObj = JSON.parse(captureResponse.data)
         const captured = successObj.captured;
         console.log("App -> razorPayPaymentHandler -> captured", successObj)
          
         if(captured){
           alert(`${(data.amount/100)} Rs Payment successful`);
         }

        }catch(err){
          console.log(err);
        }
      },
      theme:{
        color:"aqua",
      },
    };
    const rzp1=new window.Razorpay(options)
    rzp1.open();
  }

  return (
    <div className="App">
      <button
        onClick={razorPayPaymentHandler}
        className="btn btn-primary">
          Pay Now
        </button>
    </div>
  );
}

export default App;

import React, { useReducer, useState } from 'react';
import './App.css';

const formReducer = (state, event) => {
  if(event.reset) {
    return {
      stock_ticker: '',
      time_period: '',
      algo_1: '',
      algo_2: '',
      metric: '',
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
 }

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    // setTimeout(() => {
    //   setSubmitting(false);
    //   setFormData({
    //     reset: true
    //   })
    // }, 3000)

    console.log("making request")
    
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    const Url = 'http://127.0.0.1:5000/app';
    const requestMetadata = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    };

    fetch(Url, requestMetadata)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

    console.log({ value });
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  const handle_algo = event => {
    if (formData.algo_1 === 'ARIMA' || formData.algo_2 === 'ARIMA') {
      document.getElementById("ARIMA").style.display = "block";
    }

    if (formData.algo_1 === 'KNN' || formData.algo_2 === 'KNN') {
      document.getElementById("KNN").style.display = "block";
    }

    if (formData.algo_1 === 'SVR' || formData.algo_2 === 'SVR') {
      document.getElementById("SVR").style.display = "block";
    }

    if (formData.algo_1 === 'XGB' || formData.algo_2 === 'XGB') {
      document.getElementById("XGB").style.display = "block";
    }
  }


  return (
    <div className="wrapper">
      <h1>Algorithm Comparison</h1>
      {submitting &&
       <div>
         You are submitting the following:
         <ul>
           {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}
         </ul>
       </div>
     }

      <form onSubmit={handleSubmit}>

        <fieldset>
          <label>
            <p>Stock Ticker</p>
            <select name="stock_ticker" onChange={handleChange} value={formData.stock_ticker || ''}>
              <option value="">--Please choose a stock ticker--</option>
              <option value="FB">FB</option>
              <option value="AMZN">AMZN</option>
              <option value="AAPL">AAPL</option>
              <option value="NFLX">NFLX</option>
              <option value="GOOG">GOOG</option>
              <option value="TSLA">TSLA</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <label>
            <p>Time Period</p>
            <select name="time_period" onChange={handleChange} value={formData.time_period || ''}>
              <option value="">--Please choose a time period--</option>
              <option value="1">1 year</option>
              <option value="3">3 years</option>
              <option value="5">5 years</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <label>
            <p>Algorithm 1</p>
            <select name="algo_1" onChange={handleChange} value={formData.algo_1 || ''}>
              <option value="">--Please choose an algorithm--</option>
              <option value="LR">Linear Regression</option>
              <option value="ARIMA">ARIMA</option>
              <option value="KNN">K Nearest Neigbhours</option>
              <option value="SVR">Support Vector Machines</option>
              <option value="XGB">XGBoost</option>
              <option value="LSTM">LSTM</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <label>
            <p>Algorithm 2</p>
            <select name="algo_2" onChange={handleChange} value={formData.algo_2 || ''}>
              <option value="">--Please choose an algorithm--</option>
              <option value="LR">Linear Regression</option>
              <option value="ARIMA">ARIMA</option>
              <option value="KNN">K Nearest Neigbhours</option>
              <option value="SVR">Support Vector Machines</option>
              <option value="XGB">XGBoost</option>
              <option value="LSTM">LSTM</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <label>
            <p>Metric</p>
            <select name="metric" onClick={handle_algo} onChange={handleChange} value={formData.metric || ''}>
              <option value="">--Please choose a metric--</option>
              <option value="RMSE">Root Mean Squared Error (RMSE)</option>
              <option value="MAPE">Mean Absolute Percent Error (MAPE)</option>
            </select>
          </label>
        </fieldset>

        <fieldset id = "ARIMA" className = "hidden">
          <label>
            <p><em>ARIMA Hyperparameters</em></p>
            <p>p value</p>
            <input name="ARIMA_hyper_1" onChange={handleChange} value={formData.ARIMA_hyper_1 || ''} />
            <p>d value</p>
            <input name="ARIMA_hyper_2" onChange={handleChange} value={formData.ARIMA_hyper_2 || ''} />
            <p>q value</p>
            <input name="ARIMA_hyper_3" onChange={handleChange} value={formData.ARIMA_hyper_3 || ''} />
          </label>
        </fieldset>

        <fieldset id = "KNN" className = "hidden">
          <label>
            <p><em>KNN Hyperparameters</em></p>
            <p>p value</p>
            <select name="KNN_hyper_1" onChange={handleChange} value={formData.KNN_hyper_1 || ''}>
              <option value="">--Please choose a p value--</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            <p>Weights</p>
            <input name="KNN_hyper_2" onChange={handleChange} value={formData.KNN_hyper_2 || ''} />
            <p>Number of Neighbours</p>
            <input name="KNN_hyper_3" onChange={handleChange} value={formData.KNN_hyper_3 || ''} />
          </label>
        </fieldset>

        <fieldset id = "SVR" className = "hidden">
          <label>
            <p><em>SVR Hyperparameters</em></p>
            <p>Kernel</p>
            <select name="SVR_hyper_1" onChange={handleChange} value={formData.SVR_hyper_1 || ''}>
              <option value="">--Please choose a kernel value--</option>
              <option value="linear">Linear</option>
              <option value="poly">Poly</option>
              <option value="rbf">RBF</option>
              <option value="sigmoid">Sigmoid</option>
              <option value="precomputed">Precomputed</option>
            </select>
            <p>C value</p>
            <input name="SVR_hyper_2" onChange={handleChange} value={formData.SVR_hyper_2 || ''} />
            <p>Epsilon</p>
            <input name="SVR_hyper_3" onChange={handleChange} value={formData.SVR_hyper_3 || ''} />
          </label>
        </fieldset>

        <fieldset id = "XGB" className = "hidden">
          <label>
            <p><em>XGBoost Hyperparameters</em></p>
            <p>Maximum Depth</p>
            <input name="XGB_hyper_1" onChange={handleChange} value={formData.XGB_hyper_1 || ''} />
            <p>Learning Rate</p>
            <input name="XGB_hyper_2" onChange={handleChange} value={formData.XGB_hyper_2 || ''} />
            <p>Minimum Child Weight</p>
            <input name="XGB_hyper_3" onChange={handleChange} value={formData.XGB_hyper_3 || ''} />
          </label>
        </fieldset>

        <p>{Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}</p>

        <button type="submit">Submit</button>

      </form>
    </div>
  );
}

export default App;

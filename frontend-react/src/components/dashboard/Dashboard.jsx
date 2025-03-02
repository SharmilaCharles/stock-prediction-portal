import React, {useEffect, useState} from 'react'
import axiosInstance from '../../axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  const [ ticker,setTicker] = useState ('')
  const [ error, setError] = useState()
  const [loading,setLoading] = useState(false)
  // const accessToken =localStorage.getItem('access_token')
  const [plot, setPlot] = useState()
  const [ma100, setMA100] = useState()
  const [ma200, setMA200] = useState()
  const [ prediction, setPrediction] = useState()
  const [ mse, setMSE] = useState()
  const [ rmse, setRMSE] = useState()
  const [ r2, setR2] = useState()

  useEffect(()=> {
    const fetchProtectedData = async () => {
        try {
            const response = await axiosInstance.get('/protected-view');
            console.log('Success', response.data);
        }catch (error) {
            console.error('Error getching data', error)
        }
    }
    fetchProtectedData();
  },[])  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axiosInstance.post('/predict/', {
        ticker:ticker
      });
      console.log(response.data)
      
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT
      const plotUrl = `${backendRoot}${response.data.plot_img}`
      const maa100Url = `${backendRoot}${response.data.plot_100_dma}`
      const maa200Url = `${backendRoot}${response.data.plot_200_dma}`
      const predictionUrl = `${backendRoot}${response.data.plot_prediction}`
      // console.log(plotUrl);

      setPlot(plotUrl)
      setMA100(maa100Url)
      setMA200(maa200Url)
      setPrediction(predictionUrl)
      setMSE(response.data.mse)
      setRMSE(response.data.rmse)
      setR2(response.data.r2)

      // set Plots 

      if (response.data.error) {
        setError(response.data.error)
      }

    }catch(error) {
      console.error('There was an error making the API Request', error)
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className = 'container'>
      
    <div className='row'>
      <h3 className='text-dark' > Stock Price Prediction using ML (LSTM), Django, and React</h3>
     <br/><br/>
      <p className=''>Stock price prediction is a challenging yet interesting problem in 
      financial forecasting. This project leverages Long Short-Term Memory (LSTM) networks, 
      Django (Django REST Framework) for the backend, and React for the frontend to create an interactive 
      stock price prediction system. The system allows users to enter a stock ticker and receive a prediction 
      based on historical stock data.</p>
      <br/><br/><br/><br/>
      <div className='p-3 bg-light-dark'>
        <div className='col-md-8 mx-auto'>
          <form onSubmit={handleSubmit}> 
          
            <input type='text' className='form-control' placeholder='Enter stock Ticker' 
            onChange = {(e)=> setTicker(e.target.value)} required/>
            <small>{error && <div className='text-danger'>{error}</div>}</small>
            <button type='submit' className='btn btn-info mt-3'> 
              { loading ? <span>
                <FontAwesomeIcon icon={faSpinner} spin/>Please wait.. </span> : 'See Prediction'}
            </button> 
          </form>
        </div>
        
        </div> 
        <br/><br/><br/><br/>
        <div className='container'>
        <table className='text-dark'>
        <thead>
            <tr>
                <th>Company</th>
                <th>Ticker</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Apple Inc.</td>
                <td>AAPL</td>
            </tr>
            <tr>
                <td>Microsoft Corp.</td>
                <td>MSFT</td>
            </tr>
            <tr>
                <td>Google (Alphabet)</td>
                <td>GOOG</td>
            </tr>
            <tr>
                <td>TESLA</td>
                <td>TSLA</td>
            </tr>
        </tbody>
    </table>
    
    </div>

        {/*print prediction plots */}
        {prediction && (
                 <div className='prediction mt-5'>
                 <div className='p-3'>
                   {plot && (
                     <img src={plot} style={{maxWidth:'100%'}}/>
                   )}
                 </div>
       
                 <div className='p-3'>
                   {ma100 && (
                     <img src={ma100} style={{maxWidth:'100%'}}/>
                   )}
                 </div>
       
                 <div className='p-3'>
                   {ma200 && (
                     <img src={ma200} style={{maxWidth:'100%'}}/>
                   )}
                 </div>
                 
                 <div className='p-3'>
                   {prediction && (
                     <img src={prediction} style={{maxWidth:'100%'}}/>
                   )}
                 </div>
       
                 <div className='text-dark p-3'>
                   <h4>Model Evaluation</h4>
                   <p>Mean Squared Error(MSE): {mse}</p>
                   <p>Root Mean Squared Error(RMSE): {rmse}</p>
                   <p>R- Squared (R2): {r2}</p>
                 </div>
       
               </div>
        )}
 
      </div>
    </div>
  )
}

export default Dashboard
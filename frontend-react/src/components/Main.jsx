import React from 'react'
import Button from './Button'

const Main = () => {
  return (
    <>
    <div className='container'>
        <div className='p-5 text-center bg-light-dark'>
            <h1 className='text-light'>Stock Prediction</h1>
            <p className='text-light lead'>Stock prediction in Machine Learning (ML) refers to using algorithms and historical market data to forecast future stock prices or trends. It involves techniques like time series analysis, regression, deep learning (LSTMs), and reinforcement learning. ML models analyze patterns in stock prices, trading volumes, and external factors (news, economic indicators) to make predictions. However, due to market volatility and unpredictability, perfect accuracy is impossible.</p>
            <Button text='Login' class ='btn-info'/>
        </div>
    </div>
    </>
  )
}

export default Main
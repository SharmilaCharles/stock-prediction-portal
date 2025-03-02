import React from 'react'

const About = () => {
  return (
    <> 
        

        <div class="container">
        <div class="col-10"><h3> About Stock Price Prediction Project</h3></div>
        <div class="row">
                <div class="col-3 border"> <h5>Objective</h5></div>
                <div class="col-7 border">
                The portal aims to assist users in making informed investment decisions by providing data-driven stock price forecasts.
                For more detailed information, you can visit the project's GitHub repository:
                <br/>
                <a href='https://github.com/SharmilaCharles/stock-prediction-portal' target="_blank" class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"  >Source</a>
                <br/><br/>
                </div>
            </div>
            <div class="row">
                
                <div class="col-3 border"> <h5>About Project</h5></div>
                <div class="col-7 border">
                The "Stock Prediction Portal" is a web-based application designed 
                to forecast stock prices by integrating machine learning models with 
                a user-friendly interface. Developed using Django for the backend and 
                React for the frontend, this portal allows users to input stock ticker 
                symbols and receive predictive insights based on historical data. 
                <br/><br/>
                <h5>Key Components</h5>
                    <ul>
                        <li><b>Backend (Django):</b> Manages data processing, model training, and serves the prediction results through APIs.</li>
                        <li><b>Frontend (React):</b> Provides an interactive platform for users to input stock symbols and view predictions.</li>
                    </ul>
                </div>

            </div>
            
            <div class="row">
                <div class="col-3 border"> <h5>yfinance</h5></div>
                <div class="col-7 border">
                yfinance is a Python library that allows users to access financial data 
                from Yahoo Finance. It is widely used for retrieving historical stock 
                prices, real-time market data, company financials, and more.
                </div>
            </div>
            <div class="row">
                <div class="col-3 border"> <h5>Functionality</h5></div>
                <div class="col-7 border">
                <b>User Input:</b> Users enter a stock ticker symbol into the portal.
                <br/>
                <b>Data Retrieval:</b> The system fetches historical stock data corresponding to the provided ticker.
                <br/>
                <b>Prediction:</b> Utilizing machine learning algorithms, the portal analyzes the historical data to forecast future stock prices.
                <br/>
                <b>Display Results:</b> Predicted stock prices are presented to the user in an accessible format.
                </div>
            </div>
            <div class="row">
                <div class="col-3 border"> <h5>Machine Learning Models</h5></div>
                <div class="col-7 border">
                While the specific models employed are not detailed in the available information, common approaches for stock price prediction include:
                <br/><br/>
                <b>Linear Regression</b>: Establishes a linear relationship between historical prices and time.
                <br/>
                <b>Long Short-Term Memory (LSTM)</b>: A type of recurrent neural network adept at capturing temporal dependencies in sequential data.
                <br/>
                <b>ARIMA (AutoRegressive Integrated Moving Average):</b> Combines autoregression and moving averages for time series forecasting.
                </div>
            </div>
        </div>




    </>
  )
}

export default About
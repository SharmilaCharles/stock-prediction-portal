from ast import mod
from django.shortcuts import render
from rest_framework.views import APIView
import yfinance
from .serializers import StockPredictionSerializer
from rest_framework import status
from rest_framework.response import Response
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import os 
from django.conf import settings
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error,r2_score

class StockPredictionAPIView(APIView):
    def post(self, request): 
        serializer  = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            # Fetch the data from yfinance
            now = datetime.now()
            start = datetime (now.year-10, now.month, now.day)
            end = now
            df = yf.download(ticker,start,end)
            # print(df)
            if df.empty:
                return Response({
                    'error': "No Data found for the given ticker",
                    'status': status.HTTP_404_NOT_FOUND
                })
            df = df.reset_index()
            print(df)
            # GENERATE BASIC PLOT
            plt.switch_backend('AGG') # Anti-
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='CLOSING PRICE')
            plt.title(f'closing price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()

            # Save the Plot to a file
            plot_img_path = f'{ticker}_plot.png'
            plot_img = save_plot(plot_img_path)
            # print(plot_img)

            # 100 Days Moving average
            ma100 = df.Close.rolling(100).mean()
            plt.switch_backend('AGG') # Anti-
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='CLOSING PRICE')
            plt.plot(ma100, 'r', label='100 Days Moving Avg')
            plt.title(f'100 Days Moving Avg of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()
            # Save the Plot to a file
            plot_img_path = f'{ticker}_100_dma.png'
            plot_100_dma = save_plot(plot_img_path)
            # print(plot_img)

            # 200 Days Moving average
            ma200 = df.Close.rolling(200).mean()
            plt.switch_backend('AGG') # Anti-
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='CLOSING PRICE')
            plt.plot(ma100, 'r', label='100 Days Moving Avg')
            plt.plot(ma200, 'g', label='200 Days Moving Avg')
            plt.title(f' 200 Days Moving Avg of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()
            # Save the Plot to a file
            plot_img_path = f'{ticker}_200_dma.png'
            plot_200_dma = save_plot(plot_img_path)
            # print(plot_img)

            #splitting the Data into training and testing datasets
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            # print(data_training)

            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7):int(len(df))])
            # print(data_testing)

            # Scaling down the data betwen 0 and   1
            scaler = MinMaxScaler(feature_range=(0,1))

            #Load ML Model
            model = load_model('stock_prediction_model.keras')

            # Preparing test data
            past_100_days = data_training.tail(100)
            final_df  = pd.concat([past_100_days,data_testing],ignore_index=True)
            input_data = scaler.fit_transform(final_df)
            
            x_test = []
            y_test = []

            for i in range(100,input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i,0])

            x_test, y_test = np.array(x_test), np.array(y_test)

            #Making Predictions
            y_predicted = model.predict(x_test)

            # Revert the scaled price to original price
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()
            
            print('y_predicted', y_predicted)
            print('y_test', y_test)

            # Plot the final prediction
            plt.switch_backend('AGG') # Anti-
            plt.figure(figsize=(12,5))
            plt.plot(y_test,'b', label='Oringinal Price')
            plt.plot(y_predicted, 'r', label=' Predicted Price')
            plt.title(f' Final Prediction {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()
            # Save the Plot to a file
            plot_img_path = f'{ticker}_final_prediction.png'
            plot_prediction = save_plot(plot_img_path)

            # Model Evaluation


            # Mean Squard Error
            mse = mean_squared_error(y_test,y_predicted)

            # Root Mean Squard error
            rmse = np.sqrt(mse)

            #r-squard
            r2 = r2_score(y_test, y_predicted)




            return Response({
                'status': 'success', 
                'plot_img':plot_img,
                'plot_100_dma':plot_100_dma,
                'plot_200_dma' : plot_200_dma,
                'plot_prediction' : plot_prediction,
                'mse' : mse,
                'rmse' : rmse,
                'r2' : r2,
                })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
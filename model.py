

# In[1]:


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn import metrics


# In[2]:


# loading the csv data to a Pandas DataFrame
gold_data = pd.read_csv(r'C:\Users\tusha\OneDrive\Desktop\gold price predictor\gld_price_data.csv')


# In[3]:


# print first 5 rows in the dataframe
gold_data.head()


# In[4]:


# print last 5 rows of the dataframe
gold_data.tail()


# In[5]:


# number of rows and columns
gold_data.shape


# In[6]:


# getting some basic informations about the data
gold_data.info()


# In[7]:


# checking the number of missing values
gold_data.isnull().sum()


# In[8]:


# getting the statistical measures of the data
gold_data.describe()


# In[9]:


X = gold_data.drop(['Date','GLD'],axis=1)
Y = gold_data['GLD']
Z = gold_data.drop(['Date'],axis=1)


# In[10]:


# Calculating the correlation matrix including 'GLD'
correlation_matrix = Z.corr()

# Constructing a heatmap to understand the correlation
plt.figure(figsize=(8,8))
sns.heatmap(correlation_matrix, cbar=True, square=True, fmt='.1f', annot=True, annot_kws={'size':8}, cmap='Blues')
plt.show()

# Correlation values of GLD
print(correlation_matrix['GLD'])


# In[11]:


# checking the distribution of the GLD Price
sns.distplot(gold_data['GLD'],color='green')


# In[12]:


print(Y)


# In[13]:


X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size = 0.2, random_state=2)


# In[14]:


regressor = RandomForestRegressor(n_estimators=100)


# In[15]:


# training the model
regressor.fit(X_train,Y_train)


# In[16]:


# prediction on Test Data
test_data_prediction = regressor.predict(X_test)


# In[17]:


print(test_data_prediction)


# In[18]:


# R squared error
error_score = metrics.r2_score(Y_test, test_data_prediction)
print("R squared error : ", error_score)


# In[19]:


Y_test = list(Y_test)


# In[20]:


plt.plot(Y_test, color='blue', label = 'Actual Value')
plt.plot(test_data_prediction, color='green', label='Predicted Value')
plt.title('Actual Price vs Predicted Price')
plt.xlabel('Number of values')
plt.ylabel('GLD Price')
plt.legend()
plt.show()


# In[21]:





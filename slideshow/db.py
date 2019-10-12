#### Put Database Manipulation Code Here
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine, func
import json


#################################################
# Database Setup
# #################################################
# engine = create_engine()

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)

# Set data directory
file_path = '../Data/clean_data.csv'
# Read head of dataset
def loadJson():
    jsondata = pd.read_csv(file_path).to_json(orient="records")
    return json.loads(jsondata)

city_file_path = "../Data/city_count.csv"
def loadcity():
    citydata = pd.read_csv(city_file_path).to_json(orient="records")
    return json.loads(citydata)

score_file_path = "../Data/score_df.csv"
def loadscore():
    scoredata = pd.read_csv(score_file_path).to_json(orient="records")
    return json.loads(scoredata)

listing_file_path = "../Data/host_df.csv"
def loadlist():
    listdata = pd.read_csv(listing_file_path).to_json(orient="records")
    return json.loads(listdata)

property_file_path = "../Data/Property_type.csv"
def loadproperty():
    propertydata = pd.read_csv(property_file_path).to_json(orient="records")
    return json.loads(propertydata)

house_file_path = "../Data/house_price.csv"
def loadhouse():
    housedata = pd.read_csv(house_file_path).to_json(orient="records")
    return json.loads(housedata)

chart_file_path = "../Data/pricetype.csv"
def loadchart():
    chartdata = pd.read_csv(chart_file_path).to_json(orient="records")
    return json.loads(chartdata)
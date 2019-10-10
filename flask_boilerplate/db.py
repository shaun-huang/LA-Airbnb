#### Put Database Manipulation Code Here
import pandas as pd
# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy import create_engine, func
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
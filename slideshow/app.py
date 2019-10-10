from flask import Flask, jsonify, render_template,request
from flask import json as fjson
import json
import pandas as pd
import db
#################################################
# Flask Setup
#################################################
app = Flask(__name__)
#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():

    return render_template("index.html")  

@app.route("/map")
def map():

    return render_template("map.html")  


@app.route("/json")
def json():
    data = db.loadJson()
    json = jsonify(data)
    return json

@app.route("/city")
def city():
    data2 = db.loadcity()
    json2 = jsonify(data2)
    return json2

@app.route("/score")
def score():
    data3 = db.loadscore()
    json3 = jsonify(data3)
    return json3
@app.route("/listing")
def listing():
    data4 = db.loadlist()
    json4 = jsonify(data4)
    return json4

@app.route("/property")
def propertyType():
    data5 = db.loadproperty()
    json5 = jsonify(data5)
    return json5


if __name__ == '__main__':
    app.run(debug=True)

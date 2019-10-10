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


if __name__ == '__main__':
    app.run(debug=True)

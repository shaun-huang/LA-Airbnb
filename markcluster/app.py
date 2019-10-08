from flask import Flask, jsonify, render_template,request
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
    data = db.scrape()
    json = jsonify(data)
    return render_template("index.html",json=json)  

@app.route("/json")
def json():
    data = db.scrape()
    json = jsonify(data)
    return json


if __name__ == '__main__':
    app.run(debug=True)

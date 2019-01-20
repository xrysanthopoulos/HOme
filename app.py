from flask import Flask
from flask import jsonify
from flask import request
from bson.json_util import dumps
import pymongo
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["lampdb"]
places = mydb["places"]

# mydict = {"place": "Kitchen", "switch": 1}
# x = place.insert_one(mydict)
# places.drop()

@app.route('/place', methods=['GET'])
def get_all_time():
  output = []
  for s in places.find():
    output.append({'place': s['place'], 'switch': s['switch'], 'status': s['status']})
    print(output)
  return jsonify({'result' : output})

@app.route('/add_place', methods=['POST'])
def add_places():
  place = request.json['place']
  switch = request.json['switch']
  uuid = places.insert({"place": place, "switch": switch, 'status': False})
  new_place = places.find_one({'_id': uuid })
  output = {'place': new_place['place'], 'switch' : new_place['switch'], 'status': False}
  print(output)
  return jsonify({'result' : output})

@app.route('/change_time/<string:place>', methods=['PUT'])
def change_timetable(place):
  for s in places.find({'place': place}):
    new_time = request.json['time']
    time = s['time']
    places.update({ "time": time }, { "$set": { "time": new_time } })
    return jsonify({'time' : time})

@app.route('/open_switch/switch=<int:switch>', methods=['PUT'])
def open_switch(switch):
  for t in places.find({ 'switch': switch }):
    prev_status = t['status']
    new_status = not prev_status
    places.update_one({ "switch": switch }, { "$set": { "status": new_status } })
    return jsonify({'status': new_status})

@app.route('/delete_place/<int:switch>', methods=['DELETE'])
def delete_place(switch):
  print(switch)
  myquery = { "switch": switch }
  places.delete_one(myquery)
  return jsonify({'switch': switch})


if __name__ == '__main__':
    app.run(debug=True)

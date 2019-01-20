import datetime
import time
import pymongo
import json
from bson.json_util import dumps

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["lampdb"]
places = mydb["places"]

switch_id = 0

for x in places.find():
  print(x)


# GPIO.setmode(GPIO.BCM)
# VALVE_1 = 2
#VALVE_2 = 3
#PUMP = 17
# PUMP = 3
# GPIO.setup(2, GPIO.OUT)
# GPIO.setup(3, GPIO.OUT)
# GPIO.setup(PUMP, GPIO.OUT)
# GPIO.output(2, GPIO.HIGH)
# GPIO.output(3, GPIO.HIGH)
# GPIO.output(PUMP, GPIO.HIGH)

def status():
  output = []
  for s in places.find():
    output.append({ 'switch': s['switch'], 'status': s['status'] })
    # print(output)
  return output
    
def switch(switch_id):
    print("open", switch_id)
    open_valve(switch_id)

# def change_status(details):

# def close_valve(valve):
    # GPIO.output(valve, GPIO.HIGH)

def open_valve(switch_id):
  print(switch_id)
  # GPIO.output(valve, GPIO.LOW)

while True:
  details = status()
  for s in details:
    if s['status']==True:
      switch_id = s['switch']
      switch(switch_id)

import datetime
import time
import pymongo
import json
import RPi.GPIO as GPIO
from bson.json_util import dumps

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["lampdb"]
places = mydb["places"]

GPIO.setmode(GPIO.BCM)

def status():
  output = []
  for s in places.find():
    output.append({ 'switch': s['switch'], 'status': s['status'] })
  return output
    
def switch(switch_id):
    open_valve(switch_id)

def close_valve(switch_id):
    GPIO.output(switch_id, GPIO.LOW)

def open_valve(switch_id):
    #print(switch_id)
    GPIO.output(switch_id, GPIO.HIGH)
  
def intialize():
    details = status()
    switches_len = len(details)
    #print(switches_len)
    for s in details:
        switch_id = s.get('switch')
        status_id = s.get('status')
        GPIO.setup(switch_id, GPIO.LOW)
    return switches_len
        

switches_len = intialize()
while True:
    details = status()
    if switches_len != len(details):
        print(switches_len)
        switches_len = intialize()
    for i in details:
        switch_id = i.get('switch')
        status_id = i.get('status')
        #print(switch_id,status_id)
        if status_id==True:
            switch(switch_id)
        if status_id==False:
            close_valve(switch_id)
              

    
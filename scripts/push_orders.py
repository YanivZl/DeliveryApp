import datetime
import random, sys
from msvcrt import getch

sys.path.append('../')
from python_server.orders import pushOrder

status = "In preparaion"
fullName = input("Insert Full Name: ")

address = input("Insert Address: ")
temp_address = address.split()
address = []
address.append(temp_address[0] + " " + temp_address[1])
address.append(temp_address[2] + " " + temp_address[3])
date = str(datetime.datetime.now().date())
time = str(datetime.datetime.now().time())
total = random.randint(50, 1000)

order = {"method": "Delivery", "fullName": fullName, "address": address, "total": total, "Date": date, "Time": time}
pushOrder(order)

print("Order with the above details succesfully inserted to the database.")
getch()

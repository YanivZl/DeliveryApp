from orders import pushOrder
from datetime import datetime
import random
from msvcrt import getch

status = "In preparaion"
fullName = input("Insert Full Name: ")
address = input("Insert Address: ")
date = str(datetime.datetime.now().date())
time = str(datetime.datetime.now().time())
total = random.randint(50, 1000)

order = {"method": "Delivery", "fullName": fullName, "address": address, "total": total, "Date": date, "Time": time}
pushOrder(order)

print("Order with the above details succesfully inserted to the database.")
getch()

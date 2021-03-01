from mongoDB import db
from msvcrt import getche

courier_name = input("Courier Name: ")


res = db["Orders"].find()
orders = []
couriers = []
for r in res:
    if courier_name.lower() in r["Courier"].lower() and r["Status"] == "On the way":
        orders.append((r["_id"], r["address"], r["Time"]))
        couriers.append(r["Courier"])

print("\nFound {} couriers select by number: ".format(len(couriers)))
for i in range(len(couriers)):
    print("{}. {}".format(str(i+1), couriers[i]))

courier = int(input())


print("\nOrders to confirm: (Courier: {})".format(couriers[courier-1]))
for i in range(len(orders)):
    address = ""
    for a in orders[i][1]:
        if len(a) < 2:
            break
        address += a + " "
    print(str(i+1) + ". " + address + " " + orders[i][2][:orders[i][2].find(".")])

print("Drop First Order?(y/n)")
while 1:
    ch = str(getche())[2:-1].lower()
    if ch == 'y' or ch == 'n':
        break

if ch.lower() == 'y':
    db["Orders"].update_one({"_id": orders[0][0]}, {"$set": {"Status": "Done"}})



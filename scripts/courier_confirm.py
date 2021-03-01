from msvcrt import getche
import pymongo

client = pymongo.MongoClient("mongodb+srv://DelApp:delappdelapp@cluster0.uojol.mongodb.net/DeliveryApp?retryWrites=true&w=majority")
db = client["DeliveryApp"]

courier_name = input("Courier Name: ")


res = db["Orders"].find()
orders = []
couriers = []
for r in res:
    if r["Courier"]:
        if courier_name.lower() in r["Courier"].lower() and r["Status"] == "Ready":
            orders.append((r["_id"], r["address"], r["Time"]))
            couriers.append(r["Courier"])

couriers = list(set(couriers))
print("\nFound {} couriers select by number: ".format(len(couriers)))
for i in range(len(couriers)):
    print("{}. {}".format(str(i+1), couriers[i]))

courier = int(input())

if courier > len(couriers) + 1:
    print("Wrong Input")
    exit()

print("\nOrders to confirm: (Courier: {})".format(couriers[courier-1]))
for i in range(len(orders)):
    address = ""
    for a in orders[i][1]:
        if len(a) < 2:
            break
        address += a + " "
    print(str(i+1) + ". " + address + " " + orders[i][2][:orders[i][2].find(".")])

print("Confirm First Order?(y/n)")
while 1:
    ch = str(getche())[2:-1].lower()
    if ch == 'y' or ch == 'n':
        break

if ch.lower() == 'y':
    db["Orders"].update_one({"_id": orders[0][0]}, {"$set": {"Status": "On the way"}})

    res = db["Orders"].find({"Courier": couriers[courier-1], "Status": {"$ne": "On the way"}})
    orders = []
    for r in res:
        orders.append(r)
    # print("First Name: {}".format(couriers[courier-1].split()[0]))
    # print("Last Name: {}".format(couriers[courier-1].split()[1]))

    if len(orders) == 0:
        # res = db["Workers"].find()
        # for r in res:
        #     print(r["First Name"] + " " + r["Last Name"])
        #     if r["First Name"] == couriers[courier-1].split()[0] and r["Last Name"] == couriers[courier-1].split()[1]:
        #         print("Match")
        db["Workers"].update_one({"First Name": couriers[courier-1].split()[0], "Last Name": couriers[courier-1].split()[1]}, {"$set": {"Status": ["On the way"]}})


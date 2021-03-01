import pymongo

client = pymongo.MongoClient("mongodb+srv://DelApp:delappdelapp@cluster0.uojol.mongodb.net/DeliveryApp?retryWrites=true&w=majority")
db = client["DeliveryApp"]

res = db["Workers"].find()
workers = []
for r in res:
    workers.append(r)
for i in range(len(workers)):
    # print(workers[i]["First Name"])
    print("{0}. {1} {2}, Password: {3}".format(i+1, workers[i]["First Name"], workers[i]["Last Name"], workers[i]["Password"]))
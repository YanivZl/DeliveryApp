import pymongo

client = pymongo.MongoClient("mongodb+srv://DelApp:delappdelapp@cluster0.uojol.mongodb.net/DeliveryApp?retryWrites=true&w=majority")
db = client["DeliveryApp"]

res = db["Workers"].find({"Active": {"$ne": ""}})
for r in res:
    db["Workers"].update_one({"_id": r["_id"]}, {"$set": {"Active": ""}})
    if r["Role"] == "Courier":
        db["Workers"].update_one({"_id": r["_id"]}, {"$set": {"Status": []}})

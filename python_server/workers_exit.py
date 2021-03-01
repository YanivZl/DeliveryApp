from mongoDB import db

res = db["Workers"].find({"Active": {"$ne": ""}})
for r in res:
    db["Workers"].update_one({"_id": r["_id"]}, {"$set": {"Active": ""}})
    if r["Role"] == "Courier":
        db["Workers"].update_one({"_id": r["_id"]}, {"$set": {"Status": []}})

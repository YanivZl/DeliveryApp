if "python_server" in __name__:
    from python_server.mongoDB import db
else:
    from mongoDB import db
import datetime


def get_online_couriers():
    res = db["Workers"].find({"Active": {"$ne": ""}, "Role": "Courier"})
    result = {}
    for r in res:
        for a, b in r.items():
            if a == '_id':
                result[str(b)] = {}
                temp = result[str(b)]
            else:
                temp[str(a)] = str(b)
    wait_dict = {}
    at_task_dict = {}
    for a, b in result.items():
        # print(int(b['Status'].split()[1][1:-2]) <= 3)
        if b['Status'].split()[0][2:-2] == 'Wait':
            wait_dict[a] = b
        else:
            at_task_dict[a] = b
    wait_dict = dict(sorted(wait_dict.items(), key=lambda item: int(item[1]['Status'].split()[1][1:-2])))
    for a, b in at_task_dict.items():
        wait_dict[a] = b
    # print(wait_dict)
    return wait_dict

def get_manager_with_spec_pass(password):
    res = db["Workers"].find({"Role": "Manager", "Password": password})
    result = ""
    for r in res:
         result = (r["First Name"] + " " + r["Last Name"])
    return result

def get_active_workers():
    res = db["Workers"].find({"Active": {"$ne": ""}})
    result = {}
    for r in res:
        for a, b in r.items():
            if a == '_id':
                result[str(b)] = {}
                temp = result[str(b)]
            else:
                temp[str(a)] = str(b)
    return result

def update_worker_entry(password):
    res = db["Workers"].find({"Password": password})
    for r in res:
        db["Workers"].update_one({"_id": r["_id"]}, {"$set": {"Active": str(datetime.datetime.now())}})
        return (r["First Name"] + " " + r["Last Name"])
    return ""


def update_worker_exit(password):
    res = db["Workers"].find({"Password": password, "Active": {"$ne": ""}})
    for r in res:
        if "Shifts Stats" in r.keys():
            shifts_dict = r["Shifts Stats"]
        else:
            shifts_dict = {}
        shifts_dict[r["Active"].split()[0]] = {"Start": r["Active"].split()[1], "End": str(datetime.datetime.now().time())}
        db["Workers"].update_one({"_id": r["_id"]}, {"$set": {"Shifts Stats": shifts_dict, "Active": ""}})


def update_worker_hours(password, active):
    print(password, active)
    db["Workers"].update_one({"Password": password}, {"$set": {"Active": active}})

def is_pass_exsist(password):
    res = db["Workers"].find({"Password": password})
    for r in res:
        return True
    return False

def add_new_worker(data):
    new_worker = {}
    new_worker["First Name"] = data["firstName"]
    new_worker["Last Name"] = data["lastName"]
    new_worker["ID"] = data["id"]
    new_worker["Role"] = data["role"]
    new_worker["Phone Number"] = data["phone"]
    new_worker["Password"] = data["password"]
    new_worker["Salary"] = data["salary"]
    new_worker["Active"] = ""
    db["Workers"].insert_one(new_worker)


def set_order_to_corier(order):
    order["_id"]
# get_online_couriers()


if "python_server" in __name__:
    from python_server.mongoDB import db
    from python_server import Main_Algo
else:
    from mongoDB import db
    import Main_Algo
import datetime




def pushOrder(order):
    order["Status"] = "Preparation"
    db["Orders"].insert_one(order)


def getTodayOrders():
    date = str(datetime.datetime.now().date())
    res = db["Orders"].find({"Date": date})
    orders_dict = {}
    for order in res:
        for a, b in order.items():
            if a == '_id':
                orders_dict[str(b)] = {}
                tmp = orders_dict[str(b)]
                tmp["id"] = str(b)[-5:]
            else:
                tmp[a] = b
    return orders_dict


def get_ready_deliveries():
    date = str(datetime.datetime.now().date())
    res = db["Orders"].find({"Date": date, "Status": "Ready"})
    return res

def set_ready(order):
    db["Orders"].update_one({"Time": order["Time"], "fullName": order["fullName"]}, {"$set": {"Status": "Ready"}})

def set_courier_to_order(order, name):
    db["Orders"].update_one({"Time": order["Time"], "fullName": order["fullName"]}, {"$set": {"Courier": name}})
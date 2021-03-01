import pymongo


# Documentaion
#
# Workers : _id, first name, last name, ID, role, phone number, (hours by date)
#
# Products : _id, class, sub-class, price, ingredients,
#
# Customers : _id, first name, last name, phone number, discount,
# adresses(street, number, apartment, floor, city, note),
#
# Orders: order id, order type(TA or delivery), date, time, products, customer id, payment(method? cash, credit, another), price,


client = pymongo.MongoClient("mongodb+srv://DelApp:delappdelapp@cluster0.uojol.mongodb.net/DeliveryApp?retryWrites=true&w=majority")
db = client["DeliveryApp"]

# print(db.list_collection_names())


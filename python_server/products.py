if "python_server" in __name__:
    from python_server.mongoDB import db
else:
    from mongoDB import db


def get_classes():
    products_col = db["Products"]
    classes = []
    for product in products_col.find():
        if product["Class"] not in classes:
            classes.append(product["Class"])
    return classes


def get_all_products():
    prod_dict = {}
    for prod in db["Products"].find():
        for a, b in prod.items():
            if a == '_id':
                prod_dict[str(b)] = {}
                tmp = prod_dict[str(b)]
            else:
                tmp[a] = b
    return prod_dict

#
# def get_sub_classes_by_class(cls):
#     products_col = db["Products"]
#     sub_classes = []
#     for product in products_col.find():
#         if product["Class"] == cls and product["Sub-Class"]:
#             sub_classes.append(product["Sub-Class"])
#     return sub_classes
#
# def get_products_by_sub_class(sub_cls):
#     products_col = db["Products"]
#     products = []
#     for product in products_col.find():
#         if product["Sub-Class"] and product["Sub-Class"] == sub_cls:
#             print(product["Sub-Class"])
#             products.append(product["Name"])
#     return products

# from mongoDB import db
import pandas as pd

csv = pd.read_csv("streets.csv", encoding="ISO-8859-8")
print(csv)
# print(csv[1]['street_name_status'])

csv = csv.loc[(csv["city_code"] == 5000) & ('official' in csv['street_name_status'])]

csv.to_csv("tel-aviv.csv")

print(csv.head()[0]['stret_name_status'])



def push_ready_orders(num):
    pass

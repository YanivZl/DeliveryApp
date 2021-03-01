if "python_server" in __name__:
    from python_server import workers, orders
else:
    import workers, orders
import requests
import re

'''
How frequent customers order goods

Statistics of customers order

Areas with the most order and those with the least

Number of vehicles available for delivery

Geographical distance of pickup location to delivery
'''

# class Area:
#
#     def __init__(self, name, avg_time, order_frequency):
#         self.name = name
#         self.avg_time = avg_time
#         self.order_frequency = order_frequency  # Orders Per Hour
#
# ORDER_FREQUENCY = 0;
# TIME_LIMIT = 0;
# AREAS = []
# AVAILABLE_COURIERS = 0;



'''
Algoritm Priority:

1. Delivery on time
2. Fastest Delivery
3. Keep enough couriers for estimated future deliveries
'''


def arrange_orders(new_order):

    # Check if order close to another one (500 meters max)

    order_list = orders.get_ready_deliveries()
    for order in order_list:
        origin = new_order['address'][0] + ' ' + new_order['address'][1]
        destanation = order['address'][0] + ' ' + order['address'][1]
        origin = re.sub('\s', '+', origin)
        destanation = re.sub('\s', '+', destanation)
        response = requests.get("https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + origin + "&destinations=" + destanation + "&mode=driving&language=en&key=AIzaSyB8q6jkiKT_lmaRe7mcRdfzzJ7BuuRG-w0")
        distance_in_km = float(response.json()['rows'][0]['elements'][0]['distance']['text'].split()[0])
        if distance_in_km <= 1.0:
            orders.set_courier_to_order(new_order, order['Courier'])
            workers.set_order_to_courier(new_order)
            return

    # Set First Courier at the line to the Deilivery
    # Verify without an order

    couriers = workers.get_online_couriers()
    for courier in couriers.values():
        # print(courier_name)
        courier_name = courier['First Name'] + ' ' + courier['Last Name']
        # print(courier_name)
        has_order_flag = False
        order_list = orders.get_ready_deliveries()
        for o in order_list:
            if 'Courier' in o.keys():
                if o['Courier'] == courier_name:
                    print(o['address'], courier_name)
                    has_order_flag = True
        if not has_order_flag:
            print(courier_name)
            orders.set_courier_to_order(new_order, courier_name)
            return

# arrange_orders({'address': ['Shenkar', 'Ramat Gan']})
# arrange_orders()

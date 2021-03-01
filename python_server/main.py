from flask import Flask, jsonify, request
import datetime
from flask_cors import CORS
if __name__ == "__main__":
    import products, orders, workers
    import Main_Algo

if "python_server" in __name__:
    from python_server import products, orders, workers, Main_Algo
app = Flask(__name__)

CORS(app)


@app.route('/')
def get_all_classes():
    return 'Hello, World!'

@app.route('/orders/setready', methods=['POST'])
def set_order_ready():
    data = request.get_json()
    Main_Algo.arrange_orders(data)
    orders.set_ready(data)
    return "OK"

@app.route('/workers/couriers/online')
def get_online_couriers():
    return workers.get_online_couriers()

@app.route('/workers/new', methods=['POST'])
def add_new_worker():
    data = request.get_json()
    # print(data)
    if workers.is_pass_exsist(data['password']):
        return "Pass Exception"
    else:
        workers.add_new_worker(data)
        return "OK"


@app.route('/workers/updateHours', methods=['POST'])
def update_worker_hours():
    data = request.get_json()
    password = data['pass']
    active = data['active']
    if password and active:
        workers.update_worker_hours(password, active)
    return 'OK'


@app.route('/workers/active/exit')
def update_worker_exit():
    password = request.args.get('pass')
    if password:
        workers.update_worker_exit(password)
    return "OK"

@app.route('/workers/active/entry')
def update_worker_entry():
    password = request.args.get('pass')
    if password:
        return workers.update_worker_entry(password)
    return "OK"


@app.route('/workers')
def get_worker_by_pass():
    password = request.args.get('pass')
    if password:
        return workers.get_worker_with_spec_pass(password)

@app.route('/workers/active')
def get_active_workers():
    return workers.get_active_workers()

@app.route('/workers/managers')
def managers_route():
    password = request.args.get('pass')
    if password:
        return workers.get_manager_with_spec_pass(password)
    return "OK"


@app.route('/orders', methods=['GET', 'POST'])
def orders_route():
    if request.method == "POST":
        data = request.get_json()
        data["Date"] = str(datetime.datetime.now().date())
        data["Time"] = str(datetime.datetime.now().time())
        orders.pushOrder(data)
        return "Success"
    if request.method == "GET":
        return orders.getTodayOrders()


@app.route('/products')
def get_all_products():
    return products.get_all_products()

#
# @app.route('/products/classes')
# def get_products_classes():
#     products.get_classes()
#     return jsonify(products.get_classes())
#
#
# @app.route('/products/sub-classes')
# def get_sub_classes_by_class():
#     arg = request.args["class"]
#     return jsonify(products.get_sub_classes_by_class(arg))
#

# @app.route('/products/')
# def get_products_by_sub_class():
#     arg = request.args["subclass"]
#     return jsonify(products.get_sub_classes_by_class(arg))


if __name__ == '__main__':
    app.run()

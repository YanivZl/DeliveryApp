# DeliveryApp

Names : Jonatan Kobany & Yaniv Zlotnik


This Project uses Python as server side & React and Electron(NodeJs Package) as client side.
The App is a Desktop/Tablet version for Shop/Restaurant Workers, so it designed to interface with a couriers app.

To simulate the couriers app we wrote a few scripts that will simulate a change in the database, similar to the courier app. 


Opening the app:

	1. Open CMD and go to this directory and install the node packages with "npm install".
	2. In the CMD run command "pip install Flask".
	3. run command "pip install Flask-Cors".
	4. run command "pip install pymongo".
	5. run command "pip install dnspython".
	6. Run the server side locally 
		a. Go to "this_directory"/python_server with the CMD
		b. run command "python main.py" to start the server.
		c. the server started to work on localhost:5000.
	3. Run the client 
		a. Open another CMD window and go to this directory.
		b. run command "npm run electron" to start the client.


Using the app:

	1. As a worker, you can make an order by clicking on 'New order' Tab.
	2. If you not sure about the address you can use the 'Area Map' Tab.
	3. You can watch on the orders under 'Orders' Tab. 
	4. As Manager, you can control your workers under the 'Workers' Tab. *Manager's features require a manager pass - see "Workers Passwords" paragraph.


Open for expansion:

	1. Manager Options. *Manager
	2. Stock Update. *Manager
	3. Customers Management. 
	4. Business Statistics. 


Included Scripts:

	1. get_workers_pass.py - To check workers passwords if you forgot. 
	2. push_orders.py - To push order directly to the databse - without use the client. 
	3. courier_confirm.py - simulate courier app, to mark order as picked from the restaurant.
	4. courier_drop.py - simulate courier app, to mark order as arrived to the costumer.


Workers Passwords:

	1. Daniel Modilevsky (Manager) - 123123
	2. Anar Djafarov (Courier) - 098765
	3. Omri Haham (Chef) - 258085
	4. Lucas Kujawski (Worker) - 147*74
	5. Daniel Machluf (Courier) - 808080
	6. Saar Pernik (Worker) - 909090
	7. Dudi Tal (Courier) - 707070
	8. Yoav Drei (Courier) - 606060
	9. Aviram Shemesh (Courier) - 505050

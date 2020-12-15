SELECT r."type" as "room categories" ,
	   r."number" as "number of room",
	   r."available" as "number of available rooms",
	   r."price" as "Room price",
	   r."exprice" as "Extra facilities price"
FROM roomtype r ;
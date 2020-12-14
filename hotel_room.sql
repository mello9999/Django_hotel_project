CREATE VIEW hotel_room AS
	SELECT r.type as "room category" ,
	   r."price" as "room price" ,
	   r."exprice" as "extra price" ,
	   r."available" as "availability"
FROM roomtype r ;

DROP view hotel_room;


SELECT * FROM hotel_room;
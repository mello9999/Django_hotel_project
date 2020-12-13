CREATE VIEW hotel_room AS
	SELECT r.type as "room category" ,
	   r."price" as "fare" ,
	   r."available" as "availability"
FROM roomtype r ;

SELECT * FROM hotel_room;
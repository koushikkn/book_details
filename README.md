# book_details

created a db called book_details and collection name as manage_book_details.

start with install npm packages.
have considered only 3 column in collections i.e id,name,author.

Following details shows the API method, end point and required input elements.

Insert API-

method :- Post
end point :- /api/insertBook
input :- {
    "id": "2",
    "name": "Malenada Magalu",
    "author": "Kuvempu"
}
---------------------------------------
List API:-

method :- Get
end point :- /api/listBooks
-----------------------------------------
Update API:--

method :- Post
end point :- /api/updateBook
input :- {
    "id": "2",
    "name": "Malenada Magalu"    
}
----------------------------------------
Get API for book details

method :- Get
end point :- /api/getBookDetails
input :- id(with query params)

---------------------------------------

delete api

method :- Delete
end point :- /api/deleteBook
input : id (with query params)





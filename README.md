curl --location --request POST 'http://localhost:3000/api/movie' \
--header 'Content-Type: application/json' \
--data-raw '{
    "SearchTerm": "Laapata Ladies"
}'

===================

.env File Contents--

PORT=3000
API_KEY=your_key

=========================

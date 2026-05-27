curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d "{\"username\":\"Zama\",\"password\":\"mypassword123\"}"

{"message":"Login successful","user":{"_id":"6a1615b343c533774fb83ece","username":"Zama","password":"mypassword123"}}
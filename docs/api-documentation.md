# Horizon REST API Documentation

Version: 0.1.0

Status: Design Phase

---

# 1. Overview

Horizon exposes REST APIs consumed by the React frontend.

Base URL:


```
/api/v1
```


Communication format:


```
JSON
```


Authentication:

```
JWT Bearer Token
```


---

# 2. Authentication Flow


```

User

 |

Login

 |

Spring Security

 |

Validate Credentials

 |

Generate JWT

 |

Frontend Stores Token

 |

Future Requests Include Token


```

---

# 3. Authentication APIs


## Register User


Endpoint:


```
POST /api/v1/auth/register
```


Request:


```json
{
 "username":"anushka",
 "email":"user@example.com",
 "password":"password"
}
```


Response:


```json
{
 "message":"User registered successfully"
}
```


---

## Login


Endpoint:


```
POST /api/v1/auth/login
```


Request:


```json
{
 "email":"user@example.com",
 "password":"password"
}
```


Response:


```json
{
 "token":"jwt-token",
 "expiresIn":3600
}
```

---

# 4. User APIs


## Get Profile


```
GET /api/v1/users/profile
```


Response:


```json
{
"name":"Anushka",
"role":"Software Engineer",
"company":"Capgemini"
}
```

---

# 5. Goal APIs


## Create Goal


```
POST /api/v1/goals
```


Request:


```json
{
"title":"Become Backend Engineer",
"description":"Learn Spring Boot",
"deadline":"2027-01-01"
}
```


---

## Get Goals


```
GET /api/v1/goals
```


Response:


```json
[
 {
  "title":"Learn Spring Boot",
  "progress":60
 }
]
```

---

## Update Goal


```
PUT /api/v1/goals/{id}
```


---

## Delete Goal


```
DELETE /api/v1/goals/{id}
```


---

# 6. Milestone APIs


## Create Milestone


```
POST /api/v1/goals/{goalId}/milestones
```


Request:


```json
{
"title":"Learn Spring Security",
"completed":false
}
```


---

# 7. Skill APIs


## Add Skill


```
POST /api/v1/skills
```


Request:


```json
{
"skillName":"Java",
"level":80
}
```


---

## Get Skills


```
GET /api/v1/skills
```


---

# 8. Vision Board APIs


## Create Vision Item


```
POST /api/v1/vision
```


Request:


```json
{
"title":"Become AI Engineer",
"targetDate":"2027",
"progress":40
}
```


---

## Get Vision Board


```
GET /api/v1/vision
```


---

# 9. Dashboard APIs


Dashboard combines information from multiple modules.


Endpoint:


```
GET /api/v1/dashboard
```


Response:


```json
{
"profile":{
"name":"Anushka"
},

"goals":{
"active":5
},

"skills":{
"averageProgress":70
},

"github":{
"commits":120
}

}
```

---

# 10. Integration APIs


## GitHub Sync


Endpoint:


```
POST /api/v1/integrations/github/sync
```


Purpose:

Fetch latest GitHub statistics.


---

## Get GitHub Stats


```
GET /api/v1/integrations/github
```


Response:


```json
{
"repositories":20,
"commits":500
}
```

---

# 11. Notification APIs


## Get Notifications


```
GET /api/v1/notifications
```


---

## Mark Notification Read


```
PUT /api/v1/notifications/{id}
```


---

# 12. Error Response Format


All errors follow:


```json
{
"timestamp":"2026-01-01",
"status":400,
"message":"Invalid request",
"path":"/api/v1/goals"
}
```

---

# 13. HTTP Status Codes


| Code | Meaning |
|-|-|
|200|Success|
|201|Created|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|500|Server Error|

---

# API Versioning Strategy


Current:

```
/api/v1
```


Future:


```
/api/v2
```


---

# Documentation Tools


Future:

- Swagger / OpenAPI
- SpringDoc
- Postman Collection


---

# API Version

```
v0.1.0
```

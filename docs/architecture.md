# Horizon System Architecture

Version: 0.1.0

Status: Design Phase

---

# 1. Overview

Horizon is designed as a scalable SaaS platform that acts as a Personal Operating System.

The system helps users manage:

- Goals
- Skills
- Learning
- Productivity
- Personal analytics
- Developer growth

The first version follows a **Modular Monolith Architecture**.

The goal is to create a production-quality application while keeping the system simple enough for rapid development.

---

# 2. Architecture Philosophy

## Why Modular Monolith?

Horizon will NOT start with microservices.

Instead, we create strong boundaries inside a single application.

Advantages:

- Easier development
- Easier deployment
- Lower infrastructure complexity
- Faster iteration
- Clear separation of responsibilities


Future migration path:

```
Current:

                 Spring Boot Application

        Auth
        Goals
        Skills
        Dashboard


Future:

        Auth Service

        Goal Service

        Analytics Service

        Notification Service

```

Each module can later become an independent service.

---

# 3. High-Level Architecture


```
                         USER

                           |

                           |

                  React Frontend

             JavaScript + Tailwind CSS

                           |

                           |

                    REST API Layer

                           |

                           |

                Spring Boot Backend


        ------------------------------------------------

        |              |              |                |

      Auth          Goals          Skills        Dashboard

        |              |              |                |

 Spring Security   Goal Logic    Skill Logic    Analytics


        ------------------------------------------------


                           |

                           |

                    PostgreSQL Database


                           |

             -----------------------------

             |                           |

          Redis                    External APIs

          Cache                   

                                      |

                            ------------------

                            |                |

                       GitHub API       LeetCode API



                           |

                           |

                 Background Scheduler


                           |

                           |

                 Monitoring System


                  Spring Actuator

                         |

                    Prometheus

                         |

                     Grafana


                           |

                           |

                    Deployment Pipeline


                         GitHub

                            |

                         Jenkins

                            |

                      Docker Image

                            |

                        Deployment

```

---

# 4. Frontend Architecture

Technology:

- React
- JavaScript
- Tailwind CSS
- Chart.js


Responsibilities:

- User interface
- User interaction
- Data visualization
- API communication


Structure:

```
frontend

src

├── components

├── pages

├── services

├── hooks

├── context

├── utils

└── styles

```

---

# 5. Backend Architecture

Technology:

- Java 21
- Spring Boot
- Spring Security
- Hibernate
- JPA


Backend follows layered architecture.


```

Controller Layer

        |
        |

Service Layer

        |
        |

Repository Layer

        |
        |

Database


```


---

# 6. Backend Package Structure


```
com.horizon


├── common

│   ├── config

│   ├── exception

│   ├── security

│   └── utils



├── auth

│   ├── controller

│   ├── service

│   ├── repository

│   ├── entity

│   └── dto



├── user


├── goal


├── skill


├── visionboard


├── dashboard


├── integration


│   ├── github

│   └── leetcode



├── notification


└── scheduler

```

---

# 7. Core Modules


# Authentication Module

Responsible for:

- Registration
- Login
- JWT generation
- Password encryption
- User authentication


Technology:

- Spring Security
- BCrypt
- JWT


---

# User Module

Responsible for:

- User profile
- Personal information
- Preferences


Example:

```
User

Name
Email
Role
Profile Image

```

---

# Goal Module

Responsible for:

- Goals
- Milestones
- Tasks


Example:

```
Goal:

Become Backend Engineer


Milestones:

Java

Spring Boot

Docker

Kubernetes

```

---

# Skill Module

Responsible for:

- Skill tracking
- Progress measurement


Example:

```
Java        80%

Spring      60%

Docker      40%

```

---

# Vision Board Module

Responsible for:

- Future objectives
- Visual motivation
- Long-term planning


Example:

```
Become AI Engineer

Target Year:

2027

Progress:

40%

```

---

# Dashboard Module

Responsible for:

- Aggregating user data
- Displaying analytics


Example:

Dashboard:

```
Current Goals

Skill Progress

Learning Activity

GitHub Statistics

```

---

# Integration Module

Responsible for external APIs.


Initial integrations:


## GitHub API

Purpose:

Developer activity tracking.


Data:

- Repository count
- Contributions
- Languages


## LeetCode API

Purpose:

Coding progress tracking.


Data:

- Problems solved
- Difficulty distribution

---

# Scheduler Module

Responsible for background tasks.


Examples:


Daily:

```
Fetch GitHub statistics

Update dashboard metrics

Calculate progress

Send reminders

```

Technology:

- Spring Scheduler

---

# 8. Database Architecture


Primary Database:

PostgreSQL


Responsibilities:

- User data
- Goals
- Skills
- Progress
- Analytics


Caching Layer:

Redis


Used for:

- Frequently accessed dashboard data
- Session data
- API responses

---

# 9. API Communication


Frontend communicates through REST APIs.


Example:


```
React

 |

GET /api/goals

 |

Spring Controller

 |

Goal Service

 |

Database

```


Response:


```json
{
 "goal":"Learn Spring Boot",
 "progress":60
}

```

---

# 10. Security Architecture


Authentication Flow:


```
User

 |

Login Request

 |

Spring Security

 |

Validate Credentials

 |

Generate JWT Token

 |

Return Token


 |

Future Requests Include JWT


```

---

Security Features:

- Password hashing
- JWT authentication
- Role-based authorization
- API validation

---

# 11. Deployment Architecture


Production deployment:


```

Developer

   |

GitHub Repository

   |

Jenkins Pipeline

   |

Run Tests

   |

Build Docker Image

   |

Container Registry

   |

Production Server


```

---

# 12. Monitoring Architecture


Application Metrics:


```

Spring Boot Application

        |

Spring Actuator

        |

Prometheus

        |

Grafana Dashboard


```


Monitor:

- CPU usage
- Memory usage
- API response time
- Error rate
- Database performance

---

# 13. Future Architecture Evolution


## Phase 1

Modular Monolith

```
Single Spring Boot Application

```

---

## Phase 2

Extract heavy modules


Example:


```
Main Application


        |

        |

Analytics Service


        |

        |

AI Recommendation Service


```

---

## Phase 3

AI Platform


Architecture:


```

User Data

    |

Data Processing Layer

    |

AI Models

    |

Personal Recommendations

```

---

# 14. Architecture Principles


Horizon follows:


## Clean Architecture

Separate:

- Business logic
- Infrastructure
- External systems


## API First

Design APIs before implementation.


## Security First

Authentication and authorization from the beginning.


## Cloud Ready

Everything containerized and deployable.


## Observability First

Every production system should be measurable.


---

# Document Status

Current Version:

```
0.1.0

```

Next Update:

After MVP implementation.

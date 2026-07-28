# Horizon Database Design

Version: 0.1.0

Status: Design Phase

---

# 1. Overview

Horizon uses PostgreSQL as its primary relational database.

The database is designed to support:

- User management
- Goal tracking
- Skill development
- Learning progress
- Personal analytics
- External integrations
- Notifications

The design follows:

- Normalized relational design
- UUID-based identifiers
- Audit tracking
- Foreign key relationships
- Future scalability

---

# 2. Database Technology

Primary Database:

```
PostgreSQL
```

ORM:

```
Hibernate + JPA
```

Migration Tool:

```
Flyway
```

Caching Layer:

```
Redis
```

---

# 3. Database Design Principles

## UUID Primary Keys

All entities use UUID identifiers.

Example:

```
user_id

550e8400-e29b-41d4-a716-446655440000
```

Benefits:

- Secure API exposure
- Distributed system compatibility
- Easier future microservice migration


---

## Audit Fields

Every table contains:


```
created_at
updated_at
```


Purpose:

- Track creation time
- Track modifications
- Enable analytics


---

# 4. Entity Relationship Diagram


```

                         USER

                           |

        --------------------------------------

        |                 |                  |

     PROFILE           GOAL              SKILL

                         |

                         |

                  GOAL_MILESTONE

                         |

                         |

                       TASK



USER

 |

 |

VISION_ITEM



USER

 |

 |

LEARNING_RESOURCE



USER

 |

 |

HABIT

 |

 |

HABIT_LOG



USER

 |

 |

JOURNAL_ENTRY



USER

 |

 |

GITHUB_STATS



USER

 |

 |

LEETCODE_STATS



USER

 |

 |

NOTIFICATION


```

---

# 5. Table Design


# USER TABLE


Stores authentication information.


Table:

```
users
```


Columns:


| Column | Type | Description |
|-|-|-|
| id | UUID | Primary Key |
| username | VARCHAR | Unique username |
| email | VARCHAR | User email |
| password | VARCHAR | Encrypted password |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update |


Relationships:

```
USER 1 ---- MANY GOALS

USER 1 ---- MANY SKILLS

USER 1 ---- ONE PROFILE

```

---

# PROFILE TABLE


Stores user information.


Table:

```
profiles
```


Columns:


| Column | Type |
|-|-|
| id | UUID |
| user_id | UUID |
| bio | TEXT |
| profile_image | VARCHAR |
| location | VARCHAR |
| current_role | VARCHAR |
| company | VARCHAR |


Relationship:


```
USER

1

|

1

PROFILE

```

---

# GOAL TABLE


Stores user objectives.


Table:

```
goals
```


Columns:


| Column | Type |
|-|-|
| id | UUID |
| user_id | UUID |
| title | VARCHAR |
| description | TEXT |
| category | VARCHAR |
| deadline | DATE |
| status | VARCHAR |
| progress | INTEGER |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |


Example:


```
Goal:

Become Backend Engineer

Progress:

60%

```

---

# GOAL_MILESTONE TABLE


Stores smaller goal steps.


Table:

```
goal_milestones
```


Columns:


| Column | Type |
|-|-|
| id | UUID |
| goal_id | UUID |
| title | VARCHAR |
| completed | BOOLEAN |


Relationship:


```
GOAL

1

|

MANY

MILESTONES

```

---

# TASK TABLE


Stores actionable tasks.


Table:

```
tasks
```


Columns:


| Column | Type |
|-|-|
| id | UUID |
| milestone_id | UUID |
| title | VARCHAR |
| status | VARCHAR |
| priority | VARCHAR |
| due_date | DATE |


---

# SKILL TABLE


Tracks user skills.


Table:

```
skills
```


Columns:


| Column | Type |
|-|-|
| id | UUID |
| user_id | UUID |
| skill_name | VARCHAR |
| category | VARCHAR |
| level | INTEGER |
| progress | INTEGER |


Example:


```
Java

Progress:

80%

```

---

# LEARNING_RESOURCE TABLE


Tracks learning activities.


Table:

```
learning_resources
```


Columns:


| Column | Type |
|-|-|
| id | UUID |
| user_id | UUID |
| title | VARCHAR |
| type | VARCHAR |
| url | VARCHAR |
| progress | INTEGER |


Types:


```
COURSE

BOOK

CERTIFICATION

PROJECT

```

---

# VISION_ITEM TABLE


Stores future goals.


Table:


```
vision_items
```


Columns:


| Column | Type |
|-|-|
| id | UUID |
| user_id | UUID |
| title | VARCHAR |
| description | TEXT |
| image_url | VARCHAR |
| category | VARCHAR |
| target_date | DATE |
| progress | INTEGER |


---

# HABIT TABLE


Stores habits.


Table:


```
habits
```


Columns:


| Column | Type |
|-|-|
| id | UUID |
| user_id | UUID |
| name | VARCHAR |
| frequency | VARCHAR |


---

# HABIT_LOG TABLE


Tracks habit completion.


Table:

```
habit_logs
```


Columns:


| Column | Type |
|-|-|
| id | UUID |
| habit_id | UUID |
| date | DATE |
| completed | BOOLEAN |


---

# JOURNAL_ENTRY TABLE


Stores user reflections.


Table:


```
journal_entries
```


Columns:


| Column | Type |
|-|-|
| id | UUID |
| user_id | UUID |
| content | TEXT |
| created_at | TIMESTAMP |


---

# GITHUB_STATS TABLE


Stores GitHub integration data.


Table:


```
github_stats
```


Columns:


| Column | Type |
|-|-|
| id | UUID |
| user_id | UUID |
| repositories | INTEGER |
| commits | INTEGER |
| followers | INTEGER |
| contributions | INTEGER |
| updated_at | TIMESTAMP |


---

# LEETCODE_STATS TABLE


Stores coding statistics.


Table:


```
leetcode_stats
```


Columns:


| Column | Type |
|-|-|
| id | UUID |
| user_id | UUID |
| easy | INTEGER |
| medium | INTEGER |
| hard | INTEGER |
| rating | INTEGER |


---

# NOTIFICATION TABLE


Stores system notifications.


Table:


```
notifications
```


Columns:


| Column | Type |
|-|-|
| id | UUID |
| user_id | UUID |
| message | TEXT |
| type | VARCHAR |
| read_status | BOOLEAN |


---

# 6. Index Strategy


Important indexes:


Users:

```
email
username
```


Goals:

```
user_id
deadline
status
```


Skills:

```
user_id
skill_name
```


Notifications:

```
user_id
read_status
```


---

# 7. Database Migration Strategy


Tool:

```
Flyway
```


Structure:


```
database

migrations

|
├── V1__create_users.sql

├── V2__create_goals.sql

├── V3__create_skills.sql

```

Every database change creates a new migration.

---

# Database Version

```
v0.1.0
```

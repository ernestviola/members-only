# Members only message board

The access code is: Best App Ever

An exclusive message board where users will only be able to see anonymous messages unless they're authenticated.

## Architecture

The pattern for this system is MVC and we're hosting our application and database on Google Cloud Platform. The server is sitting on a container in Cloud Run and the database on Cloud SQL.

### Architecture Design

```mermaid
flowchart LR
  client[Client Browser]


  subgraph gcp[☁️ Google Cloud Platform]
    subgraph gcr[Google Cloud Run]
      express[Express Server]
    end
    subgraph gsql[Google Cloud SQL]
      db[(PostgreSQL DB)]
    end
  end

  client <-->|HTTPS| express
  express <-->|Google Private Network| db



  style db fill:#336791,stroke:#1a3a52,color:#fff
  style express fill:#68a063,stroke:#2d5016,color:#fff
```

### System Design

```mermaid
flowchart RL
  client
  express[Express Server]
  passport
  session
  database

  subgraph express[Express Server]
    passport
    session
  end


  express -->|session ID| client
  client -->|username/password| express
  express <-->|data| database
```

### Database Design

```mermaid
erDiagram
  direction LR
  ACCOUNT ||--o{MESSAGE : ""
  SESSION ||--||ACCOUNT : ""

  ACCOUNT {
    int id PK
    varchar username
    varchar password
  }

  SESSION {
    int sid PK
    json sess
    date expire
  }

  MESSAGE {
    int id PK
    int acccount_id FK
    varchar(255) title
    text message
    added timestamp
  }
```

## Installation

After setting the .env variables the project can be ran with
`npm install` then `npm run dev`

## Attributions

CSS reset from [Josh Comeau](https://www.joshwcomeau.com/css/custom-css-reset/)

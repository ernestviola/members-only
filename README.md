# Members only message board

An exclusive message board where users will only be able to see anonymous messages unless they're authenticated.

## Architecture

The pattern for this system is MVC and we're hosting our application and database on Google Cloud Platform. The server is sitting on a container in Cloud Run and the database on Cloud SQL.

### System Design

```mermaid
flowchart LR
  client[Client Browser]


  subgraph gcp[☁️ Google Cloud Platform]
    subgraph gcr[Google Cloud Run]
      express[Express Server]
    end
    subgraph gsql[Google SQL]
      db[(PostgreSQL DB)]
    end
  end

  client <-->|HTTPS| express
  express <-->|Google Private Network| db



  style db fill:#336791,stroke:#1a3a52,color:#fff
  style express fill:#68a063,stroke:#2d5016,color:#fff
```

### Database Schema

```mermaid
erDiagram
  direction LR
  ACCOUNT ||--o{MESSAGE : ""
  SESSION ||--o{ACCOUNT : ""

  ACCOUNT {
    int id PK
    varchar username
    varchar password
    varchar salt
  }

  SESSION {
    int sid PK
    json sess
    date expire
  }

  MESSAGE {
    int id PK
    varchar name
    int quantity
    float price
    text imageUrl
    int category_id FK
  }
```

## Installation

After setting the .env variables the project can be ran with
`npm install` then `npm run dev`

## Attributions

CSS reset from [Josh Comeau](https://www.joshwcomeau.com/css/custom-css-reset/)

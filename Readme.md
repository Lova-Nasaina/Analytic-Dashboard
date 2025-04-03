# Déscription 

    Elaboration de tableau de board pour analyser les facteurs de Risque de tout les régions SUD-EST de Madagascar pour Utilisateur et Administrateur 


## Requirements

- NodeJS + NPM
- MySQL
- Python

## Structure

```
.
├── client : Unicef/
└── server : BackEnd/
```

## Development

### Client (front-end)

 React + ChartJS

#### Initialization

```bash
npm install # install dependencies
```

#### Scripts

```bash
npm run dev # run develpment server on http://localhost:5173

```

### Server (back-end)

FastAPI + SQLAlchemy

#### Initialization

```bash
pip install fastapi uvicorn sqlalchemy mysql-connector-python pydantic databases numpy pandas

```

#### Configuration

Config your routeName and Password of mysql connector:

```env

engine = create_engine("mysql+pymysql://{routeName}:{Password}@localhost:3306/unicef_db", echo=True)

```

#### Scripts

```bash
uvicorn main:app --reload

```




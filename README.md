# final-project-4geeks


## Backend from ./Backend:

```
pipenv install
pipenv shell
pipenv run python src/app.py
```

## Frontend from ./front-end:

```
npm install
npm start

```
## Migrate db
```
pipenv run init  -> para iniciar la db (solo se hace una vez)
pipenv run migrate -> registrar los cambios de la db
pipenv run upgrade -> aplicar los cambios en la db
pipenv run downgrade -> deshacer el ultimo cambio de la db
```

# proyecto-final-4geeks

Proyecto final de @Geo504, @Lucaso1992 y @dasktorm

## Backend desde ./Backend:

```
pipenv install
pipenv shell
pipenv run python src/app.py
```

## Frontend desde ./front-end:

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
## Comando git
git push -u origin (nombre de la rama)
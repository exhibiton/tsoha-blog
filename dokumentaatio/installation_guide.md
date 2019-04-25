# Softium Blog

This is a guide to how to run the project locally.

Prequisites:

- SQLite3
- Python 3
- [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
- [Typescript](https://www.typescriptlang.org/#download-links)

## Steps

1. Clone this repository && open backend
```
git clone git@github.com:exhibiton/tsoha-blog.git
cd tsoha-blog/backend
```
2. Initialize Python venv:
```
python3 -m venv venv
source venv/bin/activate
```
3. Install Python dependencies 
``` 
pip install -r requirements.txt
```
4. Install javascript dependencies in frontend folder
```
cd frontend
yarn
```
5. Run migrations (this will create the local database file with the correct database schema)
```
python3 run.py db upgrade
```
6. Start backend server (in backend folder)
```
python3 run.py
```
7. Start frontend server (in frontend folder)
```
yarn start
```
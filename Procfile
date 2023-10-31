web: node server.js
api: backend/venv/Scripts/activate && python backend/manage.py migrate && python backend/manage.py collectstatic --noinput && gunicorn backend.wsgi --log-file -

web: node server.js
web: . venv/bin/activate && pip install -r backend/requirements.txt && python backend/manage.py migrate && python backend/manage.py collectstatic --noinput && gunicorn backend.wsgi --log-file -

# Generated by Django 4.2.4 on 2023-10-29 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0027_studentaverage'),
    ]

    operations = [
        migrations.CreateModel(
            name='Queries',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('message', models.TextField()),
            ],
        ),
    ]
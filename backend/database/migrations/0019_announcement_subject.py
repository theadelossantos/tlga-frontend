# Generated by Django 4.2.4 on 2023-10-08 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0018_announcement'),
    ]

    operations = [
        migrations.AddField(
            model_name='announcement',
            name='subject',
            field=models.CharField(default=1, max_length=50),
            preserve_default=False,
        ),
    ]

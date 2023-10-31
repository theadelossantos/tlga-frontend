# Generated by Django 4.2.4 on 2023-10-28 01:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0026_studentgrade_pt_score_10_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentAverage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('average', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('gradelevel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.gradelevel')),
                ('quarter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.quarter')),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.section')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.student')),
            ],
        ),
    ]

# Generated by Django 5.1 on 2024-08-31 15:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('event_participants', '0001_initial'),
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventparticipant',
            name='eventId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.event', verbose_name='Event'),
        ),
    ]

# Generated by Django 5.1 on 2024-09-28 13:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chats', '0003_chat_event'),
        ('events', '0003_event_participants'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chats', to='events.event'),
        ),
    ]
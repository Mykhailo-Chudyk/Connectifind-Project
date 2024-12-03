from django.db import models
import uuid

class Category(models.Model):
    CATEGORY_CHOICES = [
        ('Business', 'Business'),
        ('Education', 'Education'),
        ('Health', 'Health'),
        ('Music', 'Music'),
        ('Sports', 'Sports'),
        ('Arts', 'Arts'),
        ('Food', 'Food'),
        ('Technology', 'Technology'),
        ('Charity', 'Charity'),
        ('Travel', 'Travel'),
        ('Community', 'Community'),
        ('Career', 'Career'),
        ('Personal', 'Personal'),
        ('Film', 'Film'),
        ('Environment', 'Environment'),
        ('Gaming', 'Gaming'),
        ('Fashion', 'Fashion'),
        ('History', 'History'),
        ('Science', 'Science'),
        ('Language', 'Language'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.name
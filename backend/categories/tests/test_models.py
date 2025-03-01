from django.test import TestCase
from categories.models import Category

class CategoryModelTest(TestCase):
    def setUp(self):
        """Set up test data for Category model tests"""
        self.category = Category.objects.create(name='Technology')

    def test_category_creation(self):
        """Test the creation of a category"""
        self.assertEqual(self.category.name, 'Technology')
        self.assertIsNotNone(self.category.id)  # UUID should be generated
        
    def test_category_string_representation(self):
        """Test the string representation of a category"""
        # Assuming the __str__ method just returns the name
        self.assertEqual(str(self.category), self.category.name)
        
    def test_category_choices(self):
        """Test that the category name is in the valid choices"""
        valid_choices = [choice[0] for choice in Category.CATEGORY_CHOICES]
        self.assertIn(self.category.name, valid_choices)

    def test_invalid_category(self):
        """Test that an invalid category choice raises an error"""
        # This test depends on whether Django validates choices when saving.
        # If it does, this would raise a ValidationError.
        from django.core.exceptions import ValidationError
        
        # Create a category instance with an invalid choice
        invalid_category = Category(name='InvalidCategory')
        
        # Django doesn't check choices at the database level automatically
        # but we can check with full_clean()
        with self.assertRaises(ValidationError):
            invalid_category.full_clean() 
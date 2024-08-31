from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
import uuid

class UUIDBackend(ModelBackend):
    def get_user(self, user_id):
        UserModel = get_user_model()
        try:
            if isinstance(user_id, uuid.UUID):
                user_id = str(user_id)
            uuid_user_id = uuid.UUID(user_id)
            return UserModel.objects.get(pk=uuid_user_id)
        except UserModel.DoesNotExist:
            return None
        except ValueError:
            return None
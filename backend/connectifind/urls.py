from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from users.views import register_user, login_user, get_user_info, update_profile, change_password, delete_account, google_auth
from events.views import create_event, list_events, get_event, join_event, join_event_with_code, leave_event, list_user_events, delete_event
from feed_posts.views import list_feed_posts, create_feed_post
from chats.views import list_chat_messages, send_chat_message, list_users_with_messages
from categories.views import list_categories
from event_participants.views import update_goal
from django.http import JsonResponse

def home_view(request):
    return JsonResponse({"message": "Welcome to ConnectiFind API"}, status=200)

urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_user, name='register_user'),
    path('login/', login_user, name='login_user'),
    path('users/get_user_info/', get_user_info, name='get_user_info'),
    path('events/create/', create_event, name='create-event'),
    path('events/list/', list_events, name='list-event'),
    path('events/<uuid:uuid>/', get_event, name='get-event'),
    path('events/join/<uuid:uuid>/', join_event, name='join-event'),
    path('events/join-with-code/', join_event_with_code, name='join-event-with-code'),
    path('events/leave/<uuid:uuid>/', leave_event, name='leave-event'),
    path('feedposts/list/<uuid:eventId>/', list_feed_posts, name='list-feed-posts'),
    path('feedposts/create/<uuid:eventId>/', create_feed_post, name='create-feed-post'),
    path('chats/messages/<uuid:eventId>/<uuid:senderId>/', list_chat_messages, name='list-chat-messages'),
    path('chats/send/<uuid:eventId>/<uuid:recipientId>/', send_chat_message, name='send-chat-message'),
    path('events/<uuid:eventId>/users-with-messages/', list_users_with_messages, name='users-with-messages'),
    path('events/user/', list_user_events, name='list-user-events'),
    path('api/categories/', list_categories, name='list-categories'),
    path('users/update_profile/', update_profile, name='update_profile'),
    path('users/change_password/', change_password, name='change_password'),
    path('users/delete_account/', delete_account, name='delete_account'),
    path('events/<uuid:event_id>/update-goal/', update_goal, name='update-goal'),
    path('google-auth/', google_auth, name='google_auth'),
    path('events/delete/<uuid:uuid>/', delete_event, name='delete-event'),
]
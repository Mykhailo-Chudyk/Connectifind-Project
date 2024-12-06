from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from users.views import register_user, login_user, get_user_info, update_user_profile, change_password, delete_account
from events.views import create_event, list_events, get_event, join_event, leave_event, list_user_events
from feed_posts.views import list_feed_posts, create_feed_post
from chats.views import list_chat_messages, send_chat_message, list_users_with_messages
from categories.views import list_categories

urlpatterns = [
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
    path('events/leave/<uuid:uuid>/', leave_event, name='leave-event'),
    path('feedposts/list/<uuid:eventId>/', list_feed_posts, name='list-feed-posts'),
    path('feedposts/create/<uuid:eventId>/', create_feed_post, name='create-feed-post'),
    path('chats/messages/<uuid:eventId>/<uuid:senderId>/', list_chat_messages, name='list-chat-messages'),
    path('chats/send/<uuid:eventId>/<uuid:recipientId>/', send_chat_message, name='send-chat-message'),
    path('events/<uuid:eventId>/users-with-messages/', list_users_with_messages, name='users-with-messages'),
    path('events/user/', list_user_events, name='list-user-events'),
    path('api/categories/', list_categories, name='list-categories'),
    path('users/update_profile/', update_user_profile, name='update_user_profile'),
    path('users/change_password/', change_password, name='change_password'),
    path('users/delete_account/', delete_account, name='delete_account'),
]
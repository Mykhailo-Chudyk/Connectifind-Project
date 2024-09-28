from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from users.views import register_user, login_user, delete_user
from events.views import create_event, list_events, get_event, join_event, leave_event
from feed_posts.views import list_feed_posts, create_feed_post
from chats.views import list_chat_messages, send_chat_message

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_user, name='register_user'),
    path('login/', login_user, name='login_user'),
    path('users/delete/', delete_user, name='delete_user'),
    path('events/create/', create_event, name='create-event'),
    path('events/list/', list_events, name='list-event'),
    path('events/<uuid:uuid>/', get_event, name='get-event'),
    path('events/join/<uuid:uuid>/', join_event, name='join-event'),
    path('events/leave/<uuid:uuid>/', leave_event, name='leave-event'),
    path('feedposts/list/<uuid:eventId>/', list_feed_posts, name='list-feed-posts'),
    path('feedposts/create/<uuid:eventId>/', create_feed_post, name='create-feed-post'),
    path('chats/messages/<uuid:eventId>/<uuid:senderId>/', list_chat_messages, name='list-chat-messages'),
    path('chats/send/<uuid:eventId>/<uuid:recipientId>/', send_chat_message, name='send-chat-message'),
]
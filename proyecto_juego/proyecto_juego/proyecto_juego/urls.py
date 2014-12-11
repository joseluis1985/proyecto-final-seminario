
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
# from proyecto_juego.apps.inicio.views import *

# from proyecto_juego.apps.error.views import *

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'proyecto_juego.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
  
    url(r'^admin/', include(admin.site.urls)),
    # urls('',include('social.apps.django_app.urls',namespace='social')),
    # urls('',include('django.contrib.auth.urls',namespace='auth')),
    url(r'^', include('proyecto_juego.apps.inicio.urls')),
    url(r'^error/', include("proyecto_juego.apps.error.urls")),
    #url(r'^',include("social_auth.urls")),
    #url(r'^account/post_login/$',bienbenidofb),
    url(r'^media/(?P<path>.*)$','django.views.static.serve',
    {'document_root':settings.MEDIA_ROOT,}
    ),
)


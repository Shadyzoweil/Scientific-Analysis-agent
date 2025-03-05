from django.urls import path
from .views import research_paper_agent

urlpatterns = [
    path('research-paper-agent/', research_paper_agent, name='research_paper_agent'),
]
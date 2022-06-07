"""
Django settings for project.
"""
from pathlib import Path

# Build paths inside the project
APP = Path(__file__).resolve().parent.name

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'rest_framework',
]

ROOT_URLCONF = ".".join([APP, "urls"])

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ]
}
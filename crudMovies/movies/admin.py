from django.contrib import admin
from .models import Movie
# Register your models here.

class MoviesModelAdmin(admin.ModelAdmin):
    list_display = ["title","genre","year","created_at","updated_at","creator"]

    class Meta:
        model = Movie


admin.site.register(Movie, MoviesModelAdmin)



from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django import template
from django.utils.safestring import mark_safe
from .malware_analysis.network_analysis import NetworkAnalysis
from django.http import JsonResponse
from .forms import UploadFileForm
from .models import UploadedFile


def home(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            
            # get the uploaded file
            file = UploadedFile.objects.last().file

            # create a network analysis object
            network_analysis = NetworkAnalysis(file)
            overview = network_analysis.network_overview()
            
            context = {
                'success': True,
                'overview_graph': mark_safe(overview),
            }
            
            return JsonResponse(context)

        else:
            context = {
                'success': False,
                'form': form.errors,
            }

            return JsonResponse(context)

    form = UploadFileForm()
    context = {
        'form': form,
    }

    return render(request, 'index.html', context)


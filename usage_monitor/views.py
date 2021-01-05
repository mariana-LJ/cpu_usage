import psutil
from pyramid.view import view_config

class CPU_Usage:
    def __init__(self, request):
        self.request = request

    @view_config(route_name='home', renderer='templates/home.jinja2')
    def home(self):
        return dict()

    @view_config(route_name='cpu_usage', renderer='json')
    def cpu_usage(self):
        return dict(cpu_percent=psutil.cpu_percent(percpu=True))
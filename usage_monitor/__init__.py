from pyramid.config import Configurator

def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')
    config.add_static_view(name='static', path='usage_monitor:static_resources')
    config.add_route('home', '/')
    config.add_route('cpu_usage', '/cpu_usage')
    config.scan()
    return config.make_wsgi_app()

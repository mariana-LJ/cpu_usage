from setuptools import setup

requires = [
    'pyramid',
    'pyramid_jinja2'
]
setup(name='usage_monitor',
      install_requires=requires,
      entry_points="""\
      [paste.app_factory]
      main = usage_monitor:main
      """
      )
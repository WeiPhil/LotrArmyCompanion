"""
    Settings for the webserver.
"""

import os

WEBSERVER_PORT = int(os.getenv('WEBSERVER_PORT', 3000))

DATABASE_CFG = {
    'user': os.getenv('MYSQL_USER', 'root'),
    'password': os.getenv('MYSQL_PASSWORD', os.getenv('MYSQL_ROOT_PASSWORD', 'root')),
    'host': os.getenv("MYSQL_HOST", 'database'),
    'port': 3306,
    'database': 'lotr'
}

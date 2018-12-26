import _mysql as mariadb

# TODO: remove this


def favorite_colors():
    cursor = db_connection.cursor()
    cursor.execute('SELECT * FROM favorite_colors')
    results = [{name: color} for (name, color) in cursor]
    cursor.close()

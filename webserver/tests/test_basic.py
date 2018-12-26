from server import create_app
"""
    Basic tests for the flask webserver.
"""

import os
import unittest

class BasicTests(unittest.TestCase):

    def setUp(self):
        app = create_app(debug=False)
        self.app = app.test_client()

    def tearDown(self):
        pass

    def test_main_page(self):
        response = self.app.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    unittest.main()

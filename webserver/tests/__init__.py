import sys, os

cur_dir = os.path.dirname(os.path.abspath(__file__))
par_dir = os.path.join(cur_dir, os.path.pardir)
sys.path.insert(0, par_dir)
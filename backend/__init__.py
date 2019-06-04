import os
import sys

# Ensure apps is on the system path.
current_path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_path)
sys.path.append(os.path.join(current_path, 'apps'))
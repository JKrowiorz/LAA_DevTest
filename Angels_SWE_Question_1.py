import json
import pandas as pd

with open('Angels_SWE_Question_1.json') as json_file:
    data = json.load(json_file)

leagues_list = data['leagues']
leagues_str = json.dumps(leagues_list)
dd = json.loads(leagues_str)
df = pd.json_normalize(dd)
df.to_csv('Angels_SWE_Question_1.csv')
# chat GPT generated test data needs correcting to match expectations
import json

fn = './products.json'

with open(fn, 'r') as f:
    data = json.load(f)

print('imported json discovering entities...')
print(len(data))

for product in data:
    upc = product['uniqueProductCode']
    l = len(upc)

    # trim excess
    if l > 12:
        product['uniqueProductCode'] = upc[:12]

    # add a prefix
    if l < 12:
        product['uniqueProductCode'] = (12 - l) * '_' + upc


with open(fn + '.res', 'a') as f:
    f.write(json.dumps(data))

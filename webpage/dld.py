import json
import urllib.request
with open("countries.json") as c:
	countries = json.load(c)
for country in countries:
	file = f"https://worldle.teuteuf.fr/images/countries/{country['code'].lower()}/vector.svg"
	print(f"retreving {file}")
	req = urllib.request.Request(file)
	req.add_header("User-Agent", "Mozilla/5.0")
	save = f".\\countries\\{country['code']}.svg"
	with urllib.request.urlopen(req) as response:
		with open(save, "wb") as f:
			f.write(response.read())
	print(f"got {country['name']} saved to {save}")
print("DONE")

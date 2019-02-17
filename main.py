from flask import Flask
from flask import render_template
from flask import url_for
import requests
import xmltodict
import redis

app = Flask(__name__)

def get_podcasts():
    file = requests.get('http://www.cadenaser.com/rssaudio/hoy-por-hoy.xml')
    data = file.text
    data = xmltodict.parse(data)
    items = data['rss']['channel']['item']
    podcasts = []
    for item in items:
        title = item['title']
        url = item['enclosure']['@url']
        length = int(int(item['enclosure']['@length'])/60000)
        podcasts.append({'title':title, 'url':url, 'length':length})
    return podcasts

@app.route("/")
def home():
    return render_template('home.html', podcasts=get_podcasts())

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0')

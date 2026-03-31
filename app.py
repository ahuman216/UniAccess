"""
UniAccess – Accessibility Web Application
Flask backend serving all routes for the UniAccess platform.
Accessibility decisions are annotated with [A11Y] comments throughout.
"""

from flask import Flask, render_template, session
import os

app = Flask(__name__)
# [A11Y] Session used only for storing user preferences — no personal data collected.
app.secret_key = os.urandom(24)


@app.route("/")
def index():
    """Home page: explains the problem and invites users to start."""
    return render_template("index.html")


@app.route("/caption")
def caption():
    """LiveSpeak — Real-time speech-to-text captioning for hearing-impaired users."""
    return render_template("caption.html")


@app.route("/read")
def read():
    """ReadAssist — Accessible text transformation & text-to-speech."""
    return render_template("read.html")


@app.route("/vision")
def vision():
    """VisionSense — Camera-based object & text recognition for vision-impaired users."""
    return render_template("vision.html")


@app.route("/alerts")
def alerts():
    """SafeAlert — Multimodal notification & emergency alert demos."""
    return render_template("alerts.html")


@app.route("/settings")
def settings():
    """Accessibility Control Panel — user preference dashboard."""
    return render_template("settings.html")


@app.route("/about")
def about():
    """About page — impact, ethics, and inclusive design statement."""
    return render_template("about.html")


if __name__ == "__main__":
    app.run(debug=True)

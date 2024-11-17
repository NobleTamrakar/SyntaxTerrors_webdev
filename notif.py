import time
import pyttsx3
from datetime import datetime

# Predefined notifications
notifications = [
    "Miss your vacation days? It's time to recreate it now!",
    "Craving biriyani for lunch? Go to Meghana's right now",
    "Roses are red, Violet are Blue, your holidays miss you, do you miss them too?",
    "Your vacation is just one click way!"
]

# Initialize the text-to-speech engine
try:
    voice = pyttsx3.init()
    print("Text-to-Speech engine initialized.")
except Exception as e:
    print(f"Error initializing TTS engine: {e}")

# Set voice properties
try:
    voices = voice.getProperty('voices')
    voice.setProperty('voice', voices[0].id)  # Use the default voice
    voice.setProperty('rate', 150)  # Set speaking rate
except Exception as e:
    print(f"Error setting TTS properties: {e}")

def speak_notification(notification):
    """Speak the given notification using text-to-speech."""
    print(f"Notification triggered: {notification}")
    try:
        voice.say(notification)
        voice.runAndWait()
    except Exception as e:
        print(f"Error speaking notification: {e}")

def notification_scheduler():
    """Trigger notifications at predefined times."""
    scheduled_times = ["09:00", "12:00", "15:00", "18:00"]  # Notification times in 24-hour format
    
    print("Starting notification scheduler...")
    while True:
        try:
            # Get the current time in HH:MM format
            now = datetime.now().strftime("%H:%M")
            print(f"Current time: {now}")

            if now in scheduled_times:
                # Fetch the corresponding notification
                index = scheduled_times.index(now)
                speak_notification(notifications[index])

                # Wait for a minute to avoid triggering the same notification multiple times
                time.sleep(60)
            else:
                # Wait for a minute before checking the time again
                time.sleep(60)
        except Exception as e:
            print(f"Error in scheduler: {e}")

# Start the notification scheduler
try:
    notification_scheduler()
except KeyboardInterrupt:
    print("\nNotification scheduler stopped.")
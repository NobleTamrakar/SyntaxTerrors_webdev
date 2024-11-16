import subprocess
import sys
import wikipedia
import pyttsx3

# Ensure required libraries are installed
def install_library(lib_name):
    try:
        __import__(lib_name)
    except ImportError:
        print(f"{lib_name} library not found. Installing...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", lib_name])

# Install necessary libraries
install_library("wikipedia")
install_library("pyttsx3")

# Initialize the text-to-speech engine
voice = pyttsx3.init()

# Check if the speech engine is working
voices = voice.getProperty('voices')
voice.setProperty('voice', voices[0].id)  # Set the default voice

# Get user input for the Wikipedia search
query = input("Enter the topic to search on Wikipedia: ")

try:
    # Search for the query on Wikipedia and fetch a summary
    print("Searching Wikipedia...")
    result = wikipedia.summary(query, sentences=3)
    print("\nWikipedia Summary:")
    print(result)
    
    # Use the text-to-speech engine to speak the result
    print("Speaking result...")
    voice.say(result)
    voice.runAndWait()

except wikipedia.exceptions.DisambiguationError as e:
    print(f"\nDisambiguationError: The topic is ambiguous. Possible options:\n{e.options}")
except wikipedia.exceptions.PageError:
    print("\nPage not found. Please try a different query.")
except Exception as e:
    print(f"\nAn error occurred: {e}")

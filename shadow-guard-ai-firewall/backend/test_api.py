import requests
import time
import subprocess

def test():
    # Start the server in the background
    process = subprocess.Popen(["python", "-m", "uvicorn", "main:app", "--port", "8001"])
    time.sleep(3) # wait for server to start

    try:
        response = requests.post("http://127.0.0.1:8001/api/guard", json={"prompt": "Test query"})
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        logs_response = requests.get("http://127.0.0.1:8001/api/logs")
        print(f"Logs Status Code: {logs_response.status_code}")
        print(f"Logs: {logs_response.json()}")
    finally:
        process.terminate()

if __name__ == "__main__":
    test()

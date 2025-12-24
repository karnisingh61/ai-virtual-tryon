from fastapi import FastAPI, UploadFile, File
import requests
import base64
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


REPLICATE_MODEL_VERSION = "jeffreyshen/virtual-try-on"

@app.get("/")
def home():
    return {"message": "Python backend running!"}

@app.post("/tryon")
async def tryon(person: UploadFile = File(...), cloth: UploadFile = File(...)):

    # Read files
    person_bytes = await person.read()
    cloth_bytes = await cloth.read()

    # Convert to base64 (Replicate accepts base64)
    person_b64 = "data:image/jpeg;base64," + base64.b64encode(person_bytes).decode()
    cloth_b64 = "data:image/jpeg;base64," + base64.b64encode(cloth_bytes).decode()

    # Replicate API call
    url = "https://replicate.com/api/models/jeffreyshen/virtual-try-on/predictions"

    payload = {
        "input": {
            "image": person_b64,
            "garment": cloth_b64
        }
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    try:
        data = response.json()
        return data
    except:
        return {"error": "Failed to contact Replicate", "status": response.status_code}

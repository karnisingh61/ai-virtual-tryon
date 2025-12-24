from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import subprocess
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/tryon")
async def tryon(person: UploadFile = File(...), cloth: UploadFile = File(...)):
    # Save uploaded files
    with open("person.jpg", "wb") as f:
        f.write(await person.read())

    with open("cloth.jpg", "wb") as f:
        f.write(await cloth.read())

    # Run tryon generator
    subprocess.run(["python", "tryon.py"])

    if not os.path.exists("output.jpg"):
        return {"error": "Try-on failed!"}

    return {"output": "http://127.0.0.1:5001/output.jpg"}

@app.get("/output.jpg")
def get_output():
    return FileResponse("output.jpg")

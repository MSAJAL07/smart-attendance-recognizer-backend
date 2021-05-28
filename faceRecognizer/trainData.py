import cv2,os
from PIL import Image
import numpy as np


def getImagesAndLabels(path):

    imagePaths=[os.path.join(path,f) for f in os.listdir(path)] 
    faces=[]
    Ids=[]
    for imagePath in imagePaths:
        pilImage=Image.open(imagePath).convert('L')
        imageNp=np.array(pilImage,'uint8')
        Id=int(os.path.split(imagePath)[-1].split(".")[1])
        faces.append(imageNp)
        Ids.append(Id)        
    return faces,Ids

def TrainImages():
    recognizer = cv2.face_LBPHFaceRecognizer.create()
    harcascadePath = "./faceRecognizer/haarcascade_frontalface_default.xml"
    detector =cv2.CascadeClassifier(harcascadePath)
    faces,Id = getImagesAndLabels("./faceRecognizer/TrainingImage")
    recognizer.train(faces, np.array(Id))
    recognizer.save("./faceRecognizer/TrainingImageLabel/Trainner.yml")
    res = "Image Trained"
    print(res)

TrainImages()
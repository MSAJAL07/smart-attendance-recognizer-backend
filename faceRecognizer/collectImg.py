import cv2
import csv
import sys

def TakeImages(Id,name):        
        cam = cv2.VideoCapture(0)
        harcascadePath = "./faceRecognizer/haarcascade_frontalface_default.xml"
        detector=cv2.CascadeClassifier(harcascadePath)
        sampleNum=0
        while(True):
            ret, img = cam.read()
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = detector.detectMultiScale(gray, 1.3, 5)
            for (x,y,w,h) in faces:
                cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)        
 
                sampleNum=sampleNum+1

                cv2.imwrite("./faceRecognizer/TrainingImage/TrainingImage "+name +"."+Id +'.'+ str(sampleNum) + ".jpg", gray[y:y+h,x:x+w])

                cv2.imshow('frame',img)

            if cv2.waitKey(100) & 0xFF == ord('q'):
                break

            elif sampleNum>500:
                break
        cam.release()
        cv2.destroyAllWindows() 
        res = "Images Saved for ID : " + Id +" Name : "+ name
        row = [Id , name]
        with open('./faceRecognizer/StudentDetails/StudentDetails.csv','a+') as csvFile:
            writer = csv.writer(csvFile)
            writer.writerow(row)
        csvFile.close()
        print(res)

TakeImages(sys.argv[1],sys.argv[2])